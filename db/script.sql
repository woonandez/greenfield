-- DROP DATABASE IF EXISTS `piranha`;

CREATE DATABASE IF NOT EXISTS `piranha`;

USE piranha;

-- DROP TABLE IF EXISTS `itineraries`;

CREATE TABLE IF NOT EXISTS `itineraries` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `start` TEXT NOT NULL,
  `end` TEXT NOT NULL,
  `userId` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- DROP TABLE IF EXISTS `locations`;

CREATE TABLE  IF NOT EXISTS `locations` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `itineraryId` INTEGER NOT NULL,
  `location` TEXT NOT NULL ,
  `date` TEXT NOT NULL,
  `time` TEXT NOT NULL,
  `longitude` INTEGER NOT NULL,
  `latitude` INTEGER NOT NULL,

  PRIMARY KEY (`id`)
);

ALTER TABLE `locations` ADD FOREIGN KEY (itineraryId) REFERENCES `itineraries` (`id`);

