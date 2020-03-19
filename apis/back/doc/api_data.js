define({ "api": [
  {
    "type": "get",
    "url": "/photos",
    "title": "route pour récupérer toutes les photos",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "nonAssignee",
            "description": "<p>paramètre optionnel qui si à true permet de ne retourner que les photos qui ne sont pas assignées à une série</p>"
          }
        ]
      }
    },
    "description": "<p>route pour récupérer toutes les photos</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetPhotos"
  },
  {
    "type": "get",
    "url": "/photos/:id",
    "title": "route pour récupérer toutes les infos d'une photo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la photo concernée</p>"
          }
        ]
      }
    },
    "description": "<p>route pour récupérer toutes les infos d'une photo</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetPhotosId"
  },
  {
    "type": "get",
    "url": "/series",
    "title": "route pour modifier les series",
    "description": "<p>route pour modifier les series</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetSeries"
  },
  {
    "type": "get",
    "url": "/series/:id",
    "title": "route pour avoir les infos d'une série",
    "description": "<p>route pour avoir les infos d'une série</p>",
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
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetSeriesId"
  },
  {
    "type": "get",
    "url": "/series/:id/parties",
    "title": "route pour avoir les parties liées à une série",
    "description": "<p>route pour avoir les parties liées à une série</p>",
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
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetSeriesIdParties"
  },
  {
    "type": "get",
    "url": "/series/:id/photos",
    "title": "route pour avoir les photos liées à une série",
    "description": "<p>route pour avoir les photos liées à une série</p>",
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
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "GetSeriesIdPhotos"
  },
  {
    "type": "post",
    "url": "/utilisateurs/:email/auth",
    "title": "permet l'authentification",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email de l'utilisateur</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;Basic chaineEncodeeB64&quot; avec chaineEncodeeB64 qui vaut &quot;email:mdp&quot; le tout encodé en base 64</p>"
          }
        ]
      }
    },
    "description": "<p>permet l'authentification</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "JSON",
            "optional": false,
            "field": "tokenJWT",
            "description": "<p>json avec le token d'authentification jwt et le code de retour</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "PostUtilisateursEmailAuth"
  },
  {
    "type": "put",
    "url": "/photos/:id",
    "title": "route pour modifier les infos d'une photo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id de la photo concernée</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>de format</p> <p>{ &quot;id&quot;: 00, &quot;serie_id&quot;: 00, &quot;description&quot;: &quot;&quot;, &quot;position&quot;: { &quot;positionX&quot;: 48.55, &quot;positionY&quot;: 64.25 } }</p>"
          }
        ]
      }
    },
    "description": "<p>route pour modifier les infos d'une photo</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "name": "PutPhotosId"
  },
  {
    "type": "get",
    "url": "/",
    "title": "route d'accueil de l'api commande",
    "name": "getHomePage",
    "description": "<p>affiche un message de bienvenue</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/back/server.js"
  }
] });
