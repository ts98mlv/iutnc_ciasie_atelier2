CREATE DATABASE IF NOT EXISTS `geoquizz`;
use `geoquizz`;

CREATE TABLE IF NOT EXISTS utilisateur(
  id int(50) AUTO_INCREMENT,
  login varchar(100),
  email varchar(200),
  mdp varchar(512),
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
  description text,
  positionX text,
  positionY text,
  url text,
  serie_id int(50),
  PRIMARY KEY (id),
  FOREIGN KEY (serie_id) REFERENCES serie(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS partie(
  id int(50) AUTO_INCREMENT,
  token text,
  nb_photos int(5),
  status int(5),
  score int(250),
  joueur int(50),
  serie_id int(50),
  PRIMARY KEY (id),
  FOREIGN KEY (joueur) REFERENCES utilisateur(id),
  FOREIGN KEY (serie_id) REFERENCES serie(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

