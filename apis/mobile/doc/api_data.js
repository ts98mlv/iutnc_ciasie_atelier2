define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "route d'accueil de l'api commande",
    "description": "<p>affiche un message de bienvenue</p>",
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "name": "Get"
  },
  {
    "type": "post",
    "url": "/photos",
    "title": "permet d'ajouter une photo en bdd",
    "description": "<p>route permettant d'ajouter une photo en bdd, par défaut elle n'est ratachée à aucune série</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;Bearer tokenJWT&quot; avec tokenJWT correspondant au token JWT récupéré lors de la connexion</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>{ &quot;position&quot;: { &quot;positionX&quot;: 64.44, &quot;positionY&quot;: 48.44, }, &quot;urlImage&quot;: &quot;non vide&quot;, }</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "name": "PostPhotos"
  },
  {
    "type": "post",
    "url": "/utilisateurs",
    "title": "permet d'ajouter un utilisateur en bdd",
    "description": "<p>route permettant d'ajouter un utilisateur en bdd</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;Basic chaineEncodeeB64&quot; avec chaineEncodeeB64 correspondant à &quot;email:motDePasse&quot; encodé en base 64</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "body",
            "description": "<p>{ &quot;login&quot;: &quot;bb&quot;, &quot;mail&quot;: &quot;bob@test.fr&quot;, &quot;mdp&quot;: &quot;michel&quot; }</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./server.js",
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "name": "PostUtilisateurs"
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
    "group": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "groupTitle": "/home/thomas/Documents/ciasie/atelier2/iutnc_ciasie_atelier2/apis/mobile/server.js",
    "name": "PostUtilisateursEmailAuth"
  }
] });
