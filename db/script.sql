DROP DATABASE IF EXISTS `piranha`;

CREATE DATABASE piranha;

USE piranha;

DROP TABLE IF EXISTS `itineraries`;

CREATE TABLE `itineraries` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `start` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` DATETIME,
  `userId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `location` VARCHAR(200) NOT NULL ,
  `visitDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `longitude` DOUBLE NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `id_itineraries` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE `locations` ADD FOREIGN KEY (id_itineraries) REFERENCES `itineraries` (`id`);

