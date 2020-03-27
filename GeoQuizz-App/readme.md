# Application mobile du jeu GeoQuiZz
## Groupe
SERRES Thomas
LEGRAND Théo
IZZI Allan
HELF Théo

## Utilisation
L'application mobile, pour communiquer avec l'API, sur Docketu, il faut utiliser un VPN (AnyConnect ici)

## Fonctionnement
La première page, de connexion, prend l'adresse e-mail du compte crée, ainsi que le mot de passe, qui est envoyé à l'API, qui renvoie un Token, utilisé dans toutes les autres requêtes.
On peut y prendre des photos, ou prendre celles de notre galerie.
Sachant que la géolocalisation est utilisée qu'à la prise de photos, pas en prenant une photo de la galerie.

Il est ensuite possible de créer une série, cela prend notre localisation, et le nom de la ville, envoyant toutes les informations à l'API.

Tout fonctionne, quand Docketu le veut, donc, pas souvent, surtout avec NodeJS.
