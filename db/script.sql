-- DROP DATABASE IF EXISTS `piranha`;

CREATE DATABASE IF NOT EXISTS `piranha`;

USE piranha;

-- DROP TABLE IF EXISTS `itineraries`;

CREATE TABLE IF NOT EXISTS `itineraries` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
<<<<<<< HEAD
  `name` VARCHAR(50) NOT NULL,
  `start` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end` DATETIME,
=======
  `name` TEXT NOT NULL,
  `start` TEXT NOT NULL,
  `end` TEXT NOT NULL,
>>>>>>> 6ab9b2216560aa284613746ce00026ead96c9150
  `userId` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `locations`;

CREATE TABLE  IF NOT EXISTS `locations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
<<<<<<< HEAD
  `location` VARCHAR(200) NOT NULL ,
  `visitDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `longitude` DOUBLE NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `id_itineraries` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
=======
  `itineraryId` INTEGER NOT NULL,
  `location` TEXT NOT NULL ,
  `date` TEXT NOT NULL,
  `time` TEXT NOT NULL,
  `longitude` INTEGER NOT NULL,
  `latitude` INTEGER NOT NULL,

>>>>>>> 6ab9b2216560aa284613746ce00026ead96c9150
  PRIMARY KEY (`id`)
);

ALTER TABLE `locations` ADD FOREIGN KEY (id_itineraries) REFERENCES `itineraries` (`id`);

