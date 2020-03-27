define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "route d'accueil de l'api commande",
    "description": "<p>affiche un message de bienvenue</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "Get"
  },
  {
    "type": "get",
    "url": "/parties",
    "title": "permet d'avoir la liste des parties",
    "description": "<p>permet d'avoir la liste des parties</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Json",
            "description": "<p>avec la liste des parties</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "GetParties"
  },
  {
    "type": "get",
    "url": "/parties/:id",
    "title": "permet d'avoir les infos d'une partie",
    "description": "<p>permet d'avoir les infos d'une partie</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la partie concernée</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "Json",
            "description": "<p>avec la liste des infos de la partie</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "GetPartiesId"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "permet d'obtenir la liste des séries disponibles en bdd",
    "description": "<p>permet d'obtenir la liste des séries disponibles en bdd</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "fichier",
            "description": "<p>json avec un tableau d'objets correspondant à une série en bdd</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "GetSeries"
  },
  {
    "type": "get",
    "url": "/series/:id",
    "title": "permet d'obtenir les infos d'une série disponibles en bdd",
    "description": "<p>permet d'obtenir les infos d'une série disponibles en bdd</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la série concernée</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "fichier",
            "description": "<p>json avec un tableau d'objets correspondant à une série en bdd</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "GetSeriesId"
  },
  {
    "type": "get",
    "url": "/series/:id/photos",
    "title": "permet d'avoir un n photos aléatoires d'une série ou toutes les photos si n==all",
    "description": "<p>permet d'avoir un n photos aléatoires d'une série ou toutes les photos si n==-1. Par défaut n vaut 10.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la série concernée</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "n",
            "description": "<p>nombre de photos retournées souhaité. Par défaut n vaut 10 et si n==-1 retourne toutes les photos de la série</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "GetSeriesIdPhotos"
  },
  {
    "type": "post",
    "url": "/parties",
    "title": "crée une nouvelle partie en fonction d'un json fourni",
    "description": "<p>crée une nouvelle partie en fonction d'un json fourni</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>{ &quot;serie_id&quot; : 1, &quot;pseudo&quot; : &quot;pseudo&quot; }</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "result",
            "description": "<p>fichier json avec les données fournies en entrée (jsonFourni) et le token de la partie (token) et l'id de la partie</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "PostParties"
  },
  {
    "type": "put",
    "url": "/parties/:id",
    "title": "permet de modifier une partie",
    "description": "<p>permet de modifier une partie, utilisé surtout pour finir une partie</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la partie concernée</p>"
          },
          {
            "group": "Parameter",
            "type": "Json",
            "optional": false,
            "field": "body",
            "description": "<p>json avec le token de la partie, le score et le nombre de photos</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "{",
          "content": "    \"partie_token\" : \"string token\",\n    \"score\" : 1,\n    \"nb_photos\": 10\n}",
          "type": "Json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/front/server.js",
    "name": "PutPartiesId"
  }
] });
