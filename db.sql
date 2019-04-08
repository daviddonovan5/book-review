----Creating user table----

CREATE TABLE users (
	userID        SERIAL Primary Key,
	firstName     VARCHAR(30) NOT NULL,
	lastName      VARCHAR(30) NOT NULL,
	userName      VARCHAR(30) NOT NULL UNIQUE, 
	password      VARCHAR(30) NOT NULL 
	);



CREATE TABLE wishList (
	bookId        SERIAL Primary Key,
	title         VARCHAR(255) NOT NULL,
	author        VARCHAR(255),
	rate          DECIMAL(1,1), 
	pic           VARCHAR(255)  
	);
---Inserting into user

INSERT INTO users (firstName, lastName, userName, password) 
VALUES ('David', 'Donovan', 'daviddonovan', 'abc123');

INSERT INTO wishList(title, author, rate, pic) 
VALUES ('Rocket Men: The Epic Story of the First Men on the Moon', 'Craig Nelson', 4.12, 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'),
('Grit', 'Angela Duckworth', 4.07, 'https://images.gr-assets.com/books/1457889762m/27213329.jpg'),
('The Power of Positive Thinking', 'Norman Vincent Peale', 4.11, 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'),
('Endurance: A Year in Space, A Lifetime of Discovery', 'Scott Kelly', 4.24, 'https://images.gr-assets.com/books/1488392710m/29947651.jpg'),
('Wild: From Lost to Found on the Pacific Crest Trail', 'Cheryl Strayed', 3.99, 'https://images.gr-assets.com/books/1453189881m/12262741.jpg');

--- Alter Table 
ALTER TABLE wishList
ALTER rate TYPE FLOAT;