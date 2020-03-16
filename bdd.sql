CREATE DATABASE IF NOT EXISTS `geoquizz`;
use `geoquizz`;

CREATE TABLE IF NOT EXISTS partie(
  id int(50) AUTO_INCREMENT,
  token text,
  nb_photos int(5),
  status int(5),
  score int(250),
  joueur text,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS serie(
  id int(50) AUTO_INCREMENT,
  ville varchar(150),
  map_refs text,
  distance float(250,2),
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS photo(
  id int(50) AUTO_INCREMENT,
  desc text,
  positionX text,
  positionY text,
  url text,
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
