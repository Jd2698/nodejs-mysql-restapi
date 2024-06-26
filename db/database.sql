CREATE DATABASE IF NOT EXISTS pruebas_express;

USE companydb;

CREATE TABLE users(
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(45) DEFAULT NULL,
	email VARCHAR(45) NOT NULL,
	password VARCHAR(60) DEFAULT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY (email)
)

DESCRIBE users;

INSERT INTO users VALUES(1, 'admin', 'admin@gmail.com', 'admin123')
