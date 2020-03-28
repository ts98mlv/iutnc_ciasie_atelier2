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

-- insertion d'un utilisateur de test
INSERT INTO `utilisateur` (`login`, `email`, `mdp`) VALUES ('Michel2i', 'michel@test.fr', '$2b$10$yZTjIy7Jk94v4JkToPUnAuShefZM0vUQndKLtl0LH1kMeOtvq.R52');

ALTER TABLE `serie` CHANGE `distance` `distance` FLOAT(250,25) NULL DEFAULT NULL;

-- insertion de séries et de photos
INSERT INTO `serie` (`id`, `ville`, `map_x`, `map_y`, `map_zoom`, `distance`) VALUES
(1, 'Paris', '48.849806', '2.407379', NULL, 0.0022561023943126200000000),
(2, 'Nancy', '48.689827', '6.194057', NULL, 0.0022561023943126200000000),
(3, 'Metz', '49.11658', '6.193886', NULL, 0.0022561023943126200000000),
(4, 'Strasbourg', '48.581718', '7.760124', NULL, 0.0022561023943126200000000);


INSERT INTO `photo` (`id`, `description`, `positionX`, `positionY`, `url`, `serie_id`) VALUES
(14, 'Musée du louvre', '48.861373', '2.337923', 'https://res.cloudinary.com/du5jifpgg/image/upload/t_opengraph_image/Surcharge-APIDAE/Mus%C3%A9e%20du%20Louvre%20Paris.jpg', 1),
(15, 'Tour Eiffel', '48.858603', '2.294481', 'https://www.toureiffel.paris/themes/custom/tour_eiffel/img/picto_myGoogleBusiness_1.jpg', 1),
(16, 'Place Stanislas', '48.693838', '6.183273', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Place_Stanislas_et_ses_grilles_%C3%A0_Nancy.jpg/444px-Place_Stanislas_et_ses_grilles_%C3%A0_Nancy.jpg', 2),
(17, 'Cathédrale de Metz', '49.120526', '6.175851', 'https://cdn.radiofrance.fr/s3/cruiser-production/2019/11/7892ebf0-e2bd-4152-a664-b4a92fa7f450/870x489_gettyimages-1179612762_2.jpg', 3),
(18, 'Centre Pompidou Metz', '49.108423', '6.181698', 'https://www.centrepompidou-metz.fr/sites/default/files/gallery-home/181017_ancart_metz_012_col3_v1_current.jpg.crop_display.jpg', 3),
(20, 'Place Kléber', '48.583608', '7.745816', 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Place_Kl%C3%A9ber_on_a_rainy_day.jpg', 4),
(27, 'Pépinière', '48.69846725463867', '6.186564922332764', 'https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAwMjY3XzQuanBn.jpg', 2),
(28, 'Parc Sainte-Marie', '48.680477142333984', '6.170690059661865', 'https://www.tourisme-lorraine.fr/sitlorimg/1920/0/aHR0cHM6Ly93d3cuc2l0bG9yLmZyL3Bob3Rvcy83MzcvNzM3MDAwMjY5XzQuanBn.jpg', 2),
(29, 'Eglise Saint Sébastien', '48.68904113769531', '6.181229114532471', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/%C3%89glise_Saint-S%C3%A9bastien.jpg', 2),
(30, 'Basilique Saint-Epvre', '48.124815', '8.324825', 'https://cdn-s-www.estrepublicain.fr/images/654447B3-180E-46CB-9B3E-4BF7167C3DA4/NW_raw/les-deux-individus-ivres-se-sont-invites-lundi-soir-a-l-office-de-la-basilique-saint-epvre-photo-d-archives-er-cedric-jacquot-1571858721.jpg', 2),
(36, 'Petite France', '48.57893753051758', '7.743443012237549', 'https://upload.wikimedia.org/wikipedia/commons/d/df/Strasbourg_%283187697047%29.jpg', 4);
