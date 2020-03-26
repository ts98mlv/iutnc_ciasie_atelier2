CREATE DATABASE IF NOT EXISTS `geoquizz`;
use `geoquizz`;

CREATE TABLE IF NOT EXISTS utilisateur(
  id int(50) AUTO_INCREMENT,
  login varchar(100),
  email varchar(200) not null unique,
  mdp varchar(512),
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS serie(
  id int(50) AUTO_INCREMENT,
  ville varchar(150),
  map_x varchar(200),
  map_y varchar(200),
  map_zoom varchar(200),
  distance float(250,2),
  PRIMARY KEY (id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS photo(
  id int(50) AUTO_INCREMENT,
  description text,
  positionX text,
  positionY text,
  url text not null,
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
  joueur varchar(150),
  serie_id int(50),
  PRIMARY KEY (id),
  FOREIGN KEY (serie_id) REFERENCES serie(id)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

INSERT INTO `utilisateur` (`login`, `email`, `mdp`) VALUES ('Michel2i', 'michel@test.fr', '$2b$10$yZTjIy7Jk94v4JkToPUnAuShefZM0vUQndKLtl0LH1kMeOtvq.R52');

ALTER TABLE `serie` CHANGE `distance` `distance` FLOAT(250,25) NULL DEFAULT NULL;

INSERT INTO `serie` (`id`, `ville`, `map_x`, `map_y`, `map_zoom`, `distance`) VALUES ('1', 'Paris', '48.849806', '2.407379', NULL, NULL), ('2', 'Nancy', '48.689827', '6.194057', NULL, NULL), ('3', 'Metz', '49.11658', '6.193886', NULL, NULL), ('4', 'Strasbourg', '48.581718', '7.760124', NULL, NULL)
UPDATE `serie` SET `distance`= 0.0022561023667568847 WHERE 1