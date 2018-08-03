Drop database if exists User;
CREATE DATABASE if not exists User;

USE User;

CREATE TABLE IF NOT EXISTS `user_table` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  `first_name` VARCHAR(32),
  `last_name` VARCHAR(32),
  `good` bit(1),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

INSERT INTO `user_table` (`name`, `first_name`, `last_name`, `good`) VALUES
  ('Superman', 'Clark', 'Kent', 1),
  ('Silver Banshee', 'Siobhan', 'McDougal', 0),
  ('Schubidu', 'Felix', 'Schubi', 0),
  ('Meier', 'Hans', 'Wimmer', 0),
  ('Donald', 'Duck', 'DuckiDonal', 1);
  
  
