DROP DATABASE IF EXISTS `school`;
CREATE DATABASE `school`;

USE `school`;

CREATE TABLE students(
	`id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `GPA` DECIMAL(5,3) NOT NULL,
    `room` INT NOT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO students (`name`, `GPA`, `room`)
VALUES ("Mike", 23.532, 308);

INSERT INTO students (`name`, `GPA`, `room`)
VALUES ("Kevin", 24.5, 308);

INSERT INTO students (`name`, `GPA`, `room`)
VALUES ("Nick", 2.5, 311);

-- 3.75 -- 4.0 -- 23.532


CREATE TABLE classroom(
	`id` INT NOT NULL AUTO_INCREMENT,
    `roomNumber` INT NOT NULL,
    `instructor` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO classroom(`roomNumber`, `instructor`, `subject`) 
VALUES (308, "Travis Thompson", "Full Stack Web Development"); 

INSERT INTO classroom(`roomNumber`, `instructor`, `subject`) 
VALUES (311, "Manner Tarkeson", "Underwater Basket Weaving"); 

SELECT * FROM students;
SELECT * FROM classroom;

-- doing an INNER JOIN between the classroom and the students
SELECT classroom.roomNumber, classroom.instructor, classroom.subject, students.name, students.GPA 
FROM classroom
INNER JOIN students ON classroom.roomNumber = students.room
WHERE classroom.roomNumber = 311;
