"use strict";

const express = require("express");
const mysql = require("mysql");
const fs = require("file-system");
const jwt = require('jsonwebtoken');
// Constantes
const PORT = 3000;
const HOST = "0.0.0.0";

// Gestion du token
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bcrypt_password = 'jesuislemotdepasse';

const axios = require("axios");
// App
const bodyParser = require('body-parser');


// CORS
const cors = require('cors');
// On peut remplacer cette URL par les sites que l'on voudra autoriser par la suite, pour le moment, étant donné qu'on n'a pas d'application client on ne peut pas vraiment utiliser cette fonctionnalité.
var whitelist = ['http://example1.com'];
// On autorise les requêtes ne présentant pas d'origine afin d'autoriser Postman à effectuer les requêtes.
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };
const uuid = require('uuid/v1');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

/**
 * @api  {get} / route d'accueil de l'api commande
 * @apiDescription affiche un message de bienvenue
 */
app.get("/", (req, res) => {
    res.status(200).end("Bienvenue sur GeoQuizz API du front office ");
});

/**
 * @api {post} /parties crée une nouvelle partie en fonction d'un json fourni
 * @apiDescription crée une nouvelle partie en fonction d'un json fourni
 * @apiParam {json} body {
 *     "nb_photos" : 1,
 *     "joueur_id" : 1
 * }
 * @apiSuccess {json} result fichier json avec les données fournies en entrée (jsonFourni) et le token de la partie (token)
 */
app.post("/parties", (req, res) => {
   //vérification des données envoyées
   let jsonPartie = req.body;
   let nb_photos = jsonPartie.nb_photos;
   let joueur_id = jsonPartie.joueur_id;

   if(isUndefined(nb_photos) || isUndefined(joueur_id) || !isStrictlyPositive(nb_photos) || !isPositive(joueur_id)){
       res.status(500).end(getMessageFromHTTPCode(666));
   }

   //génération du token uuid
    let token = uuid();

   //enregistrement en bdd
    db.query("insert into partie (`token`, `nb_photos`, `joueur`) values (?, ?, ?)", [token, nb_photos, joueur_id], (err, result) => {
        if(err){
            res.status(500).end(getMessageFromHTTPCode(500));
        }
        res.status(200).end(JSON.stringify({jsonFourni : jsonPartie, token: token}));
    })

});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Fin des routes                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @root *
 * @method all
 * envoie une erreur : bad request
 */
app.all("*", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.end(JSON.stringify({type: "error", error: 400, message: "Requête daubée du cul : " + req.url}));
});

// lance l'application
app.listen(PORT, HOST);
console.log(`GeoQuizz API Running on http://${HOST}:${PORT}`);

// créé la bdd
const db = mysql.createConnection({
    host: "mysql",
    user: "api_geoquizz",
    password: "api_geoquizz",
    database: "api_geoquizz"
});

// connexion à la bdd
db.connect(err => {
    if (err) {
        throw err;
    }else{
        console.log("Connected to database");
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          Fonctions                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function isUndefined(element) {
    return (typeof element === "undefined");
}

function isEmptyString(element){
    return (element === "");
}

function isNumber(element){
    return (typeof element === "number");
}

function isPositive(element) {
    return (isNumber(element) && element >= 0);
}

function isStrictlyPositive(element) {
    return (isNumber(element) && element > 0);
}

/**
 * fonction qui retourne un json avec le code d'erreur et le message
 * @param code
 * @returns json
 */
function getMessageFromHTTPCode(code) {
    code = parseInt(code);
    let message = "";

    switch (code) {
        case 400:
            message = "Requête invalide : mauvaise requête ou paramètre manquant";
            break;
        case 401:
            message = "Accès non autorisé / Utilisateur non connecté";
            break;
        case 403:
            message = "Accès interdit, vous n'avez pas les droits suffisants";
            break;
        case 404:
            message = "Ressource non trouvée";
            break;
        case 500:
            message = "Erreur du serveur";
            break;
        case 200:
            message = "Tout s'est bien passé :)";
            break;
        case 666:
            message = "JSON non conforme !!";
            break;
    }

    message = JSON.stringify({code: code, message: message});

    return message;
}

