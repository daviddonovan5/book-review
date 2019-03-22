----Creating user table----

CREATE TABLE users (
	userID        SERIAL Primary Key,
	firstName     VARCHAR(30) NOT NULL,
	lastName      VARCHAR(30) NOT NULL,
	userName      VARCHAR(30) NOT NULL UNIQUE, 
	password      VARCHAR(30) NOT NULL 
	);

---Inserting into user

INSERT INTO users (firstName, lastName, userName, password) 
VALUES ('David', 'Donovan', 'daviddonovan', 'abc123');

