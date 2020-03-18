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
 * route d'accueil de l'api commande
 * affiche un message de bienvenue
 * @root /
 * @method get
 */
app.get("/", (req, res) => {
    res.status(200).end("Bienvenue sur GeoQuizz API du backoffice");
});

app.get("/photos", (req, res) => {
    let nonAssignees = req.query.nonAssignee;
    if(typeof nonAssignees === "undefined" || ! nonAssignees){
        db.query("select * from photo;", [], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            res.status(200).end(JSON.stringify(result));
        })
    }else{
        db.query("select * from photo where serie_id is not null;", [], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            res.status(200).end(JSON.stringify(result));
        })
    }

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
    }

    message = JSON.stringify({code: code, message: message});

    return message;
}

/**
 * Controle du token avec l'user
 * @param email, email de l'utilisateur
 * @param token token transmit par l'utilisateur
 * @returns {Promise<unknown>}
 */
function isValidTokenForSelectUser(email, token) {
    return new Promise((resolve, reject) => {
        token = token.split(" ")[1]; // recup du token
        if (isTokenUnaltered(token)) {
            // Recup Payload
            token = token.split(".")[1]; // recup subject du token
            // Decoder Payload
            let buffer = new Buffer(token, 'base64');
            token = buffer.toString('ascii');
            // Parse en JSON
            token = JSON.parse(token);

            if(email === token.sub){
                resolve(200)
            }else{
                reject(401)
            }
        }
    });
}

/**
 * Verifier que le token ai le bon format
 * @param token token a tester
 * @returns {boolean} true si le token est ok
 */
function isTokenUnaltered(token) {
    let isGood = false;
    // Si token non vide
    if (typeof token !== "undefined") {
        let privateKey = fs.readFileSync("./private.key"); // recup fichier keypass pour verifier authenticite
        jwt.verify(token, privateKey, {algorithm: "HS256"}, (err, user) => {
            if (!err) {
                isGood = true;
            }
        });
    }
    return isGood;
}
