## Allan IZZI ##
# backend de l'application GeoQuizz

> Backend of application
*Être sur la branche backoffice
    > git checkout backoffice

## Build Setup in 'backend' folder

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Que permet l'application backend de GeoQuizz ?

# Connexion

Pour accéder aux fonctionnalités de l'application, il est nécessaire de se connecter via 'Se connecter' avec les identifiants :
    email: michel@test.fr
    password: michel

La fonctionnalité permettant de s'inscrire n'est pas fonctionnelle, la requête axios n'est pas prise en compte pour le post des identifiants en base de données.

# Connecté

Une fois connecté il est possible d'accéder à plusieurs fonctionnalités de l'application:


>>>>>   # Ajout de photos

Permet de visualiser toutes les photos de la base de données, et d'assigner une (ou plusieurs) photo(s), n'étant pas liée(s) à une série (série_id), à une série choisie via une liste déroulante.

La liste déroulante des séries recensera toutes les séries disponibles de l'application.

La liste déroulante des photos recensera toutes les photos n'ayant pas de 'serie_id' dans la base de données. Qui sont donc sans série.

Le bouton assigner permettra d'assigner la photo choisie à la série choisie.

* Un refresh de la page peut être nécessaire afin d'actualiser la liste déroulante recensant les photos.

* Au cas où toutes les photos sont assignées à une série, il est alors impossible d'accéder à cette fonctionnalité.


>>>>>   # Voir toutes les photos

Permets de visualiser toutes les photos de l'application et de pouvoir accéder à ses détails via le bouton 'Détail >'

Si une photo est assignée à une série, elle possèdera dont la valeur 'oui' dans le tableau, sinon 'non'.

        ## Détail d'une photo

        Permet de visualiser plus de détails de la photo choisie

>>>>>   # Ajout de photos

Permets de visualiser toutes les séries de l'application et de pouvoir accéder à ses détails via le bouton 'Détail >'

        ## Détail d'une série

        Permet de visualiser plus de détails de la série choisie

>>>>>   # Voir toutes les photos non localisées

Permets de visualiser toutes les photos non localisée (avec des coordonées positionX et positionY à 0)

        ## Détail d'une photo non localisée

        Permet d'accéder à plus de détails concernant la photo choisie, ainsi que d'assigner des valeurs pour la positionX et positionY de la photo.

        Le bouton 'Localiser' enregistrera ces données en BDD, un message de confirmation s'affichera, puis redirigera l'utilisateur à la liste des photos non localisées.

>>>>>   # Créer une série

Permet de créer une série, amenant à un formulaire nécessitant plusieurs informations

Le bouton 'Créer' va enregistrer la série en BDD et redirigera à l'accueil.

>>>>>   # Se déconnecter

Permets de se déconnecter et de restreindre donc l'accés à certaines fonctionnalités.