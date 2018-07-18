// CRUD 

// CREATE - Add new students or rooms

// READ - Select students or rooms 

// UPDATE - Update students or rooms 

// DELETE - Delete students or rooms

var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Fj39al2013",
    database: "school"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    // ask user what would they like to do?
    inquirer.prompt([{
        message: "What would you like to do?",
        name: "userChoice",
        type: "list",
        choices: ["Create room or students", "Update room or student", "Read/View room or student", "Remove/delete room or student"]
    }]).then(function (answer) {
        console.log(answer);
        switch (answer.userChoice) {
            case "Create room or students":
                createRoomOrStudent();
                break;
            case "Update room or student":
                updateRoomOrStudent();
                break;
            case "Read/View room or student":
                viewRoomOrStudent();
                break;
            case "Remove/delete room or student":
                deleteRoomOrStudent();
                break;
            default:
                console.log("Please pick a valid command!");
                start();
        }
    });
}

function createRoomOrStudent() {

    inquirer.prompt([
        {
            message: "Select ROOM or STUDENT",
            type: "list",
            choices: ["STUDENT", "ROOM"],
            name: "roomOrStudent"
        }
    ]).then(function (answer) {
        if (answer.roomOrStudent === "STUDENT") {
            inquirer.prompt([
                {
                    message: "What name would like to give to your student?",
                    type: "input",
                    name: "name"
                },
                {
                    message: "What GPA would like to give to your student?",
                    type: "input",
                    name: "GPA"
                },
                {
                    message: "What room would like to give to your student?",
                    type: "input",
                    name: "room"
                }
            ]).then(function (answer) {
                // add that student to the DB
                // go to the start prompt
                connection.query("INSERT INTO students (`name`, `GPA`, `room`) VALUES (?, ?, ?)",
                    [
                       answer.name,
                       parseFloat(answer.GPA),
                       parseInt(answer.room)
                    ], function (err, res) {
                        if (err) throw err;
                        start();
                    });
            });
        } else {
            inquirer.prompt([
                {
                    message: "Who is your instructor?",
                    type: "input",
                    name: "instructor"
                },
                {
                    message: "What's the class subject?",
                    type: "input",
                    name: "subject"
                },
                {
                    message: "What's room number?",
                    type: "input",
                    name: "room"
                }
            ]).then(function (answer) {
                connection.query("INSERT INTO classroom (`roomNumber`, `instructor`, `subject`) VALUES (?, ?, ?)",
                [
                   answer.room,
                   answer.instructor,
                   answer.subject
                ], function (err, res) {
                    if (err) throw err;
                    start();
                });
            });
        }
    });
}

function updateRoomOrStudent() {
    inquirer.prompt([
        {
            message: "Select ROOM or STUDENT",
            type: "list",
            choices: ["STUDENT", "ROOM"],
            name: "roomOrStudent"
        }
    ]).then(function (answer) {
        if (answer.roomOrStudent === "STUDENT") {
            inquirer.prompt([
                {
                    message: "What name would like to give to your student?",
                    type: "input",
                    name: "name"
                },
                {
                    message: "What GPA would like to give to your student?",
                    type: "input",
                    name: "GPA"
                },
                {
                    message: "What room would like to give to your student?",
                    type: "input",
                    name: "room"
                }
            ]).then(function (answer) {
                // add that student to the DB
                // go to the start prompt
                connection.query("UPDATE students SET ? WHERE ?",
                    [
                       {
                           name: answer.name,
                           GPA: answer.GPA,
                           room: answer.room
                       },
                       {
                           name: answer.name
                       }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        start();
                    });
            });
        } else {
            inquirer.prompt([
                {
                    message: "Who is your instructor?",
                    type: "input",
                    name: "instructor"
                },
                {
                    message: "What's the class subject?",
                    type: "input",
                    name: "subject"
                },
                {
                    message: "What's room number?",
                    type: "input",
                    name: "room"
                }
            ]).then(function (answer) {
                // add that student to the DB
                // go to the start prompt
                connection.query("UPDATE classroom SET ? WHERE ?",
                    [
                       {
                           instructor: answer.instructor,
                           subject: answer.subject,
                           roomNumber: answer.room
                       },
                       {
                            roomNumber: answer.room
                       }
                    ], function (err, res) {
                        if (err) throw err;
                        console.log(res);
                        start();
                    });
            });
        }
    });
}

function viewRoomOrStudent() {
    inquirer.prompt([
        {
            message: "View ROOMS or STUDENTS",
            type: "list",
            choices: ["STUDENTS", "ROOMS"],
            name: "roomOrStudent"
        }
    ]).then(function (answer) {
        if(answer.roomOrStudent === "STUDENTS") {
            connection.query("SELECT * FROM students", function(err, res){
                console.table(res);
                start();
            });
        } else {
            connection.query("SELECT * FROM classroom", function(err, res){
                console.table(res);
                start();
            });
        }
    });
}

function deleteRoomOrStudent() {
    inquirer.prompt([
        {
            message: "DELETE ROOM or STUDENT",
            type: "list",
            choices: ["STUDENT", "ROOM"],
            name: "roomOrStudent"
        }
    ]).then(function (answer) {
        if(answer.roomOrStudent === "STUDENT") {
            connection.query("SELECT * FROM students", function(err, res){
                if(err) throw err;
                inquirer.prompt([{
                    message: "Who would you like to delete?",
                    type:"rawlist",
                    name: "name",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                          choiceArray.push(res[i].name);
                        }
                        return choiceArray;
                      } 
                }]).then(function(answer){
                    connection.query("DELETE from students WHERE ?", {name: answer.name}, function(err, res){
                        if(err) throw err;
                        console.log("Student deleted");
                        start();
                    });
                });
            });
        } else {
            connection.query("SELECT * FROM classroom", function(err, res){
                if(err) throw err;
                console.table(res);
                inquirer.prompt([{
                    message: "Which classroom would you like to delete?",
                    type: "rawlist",
                    name: "classroom",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                          choiceArray.push(res[i].roomNumber.toString());
                        }
                        return choiceArray;
                      } 
                }]).then(function(answer){
                    connection.query("DELETE from classroom WHERE ?", {roomNumber: answer.classroom}, function(err, res){
                        if(err) throw err;
                        console.log("classroom deleted");
                        start();
                    });
                });
            });
        }
    });
}