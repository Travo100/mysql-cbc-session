// CRUD 

// CREATE - Add new students or rooms

// READ - Select students or rooms 

// UPDATE - Update students or rooms 

// DELETE - Delete students or rooms

var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host     : "localhost",
    port     : 3306,
    user     : "root",
    password : "Fj39al2013",
    database : "school"
});

connection.connect(function(err){
    if (err) throw err;
    start();
});

function start() {
    console.log("START");
    // ask user what would they like to do?

    inquirer.prompt([{
        message: "What would you like to do?",
        name: "userChoice",
        type: "list",
        choices: ["Create room or students", "Update room or student", "Read/View room or student", "Remove/delete room or student"]
    }]).then(function(answer){
        console.log(answer);
        switch(answer.userChoice) {
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
    console.log("Create room or student");
}

function updateRoomOrStudent() {
    console.log("updateRoomOrStudent");
}

function viewRoomOrStudent() {
    console.log("viewRoomOrStudent");
}

function deleteRoomOrStudent() {
    console.log("deleteRoomOrStudent");
}