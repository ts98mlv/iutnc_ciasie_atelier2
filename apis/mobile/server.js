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
    res.status(200).end("Bienvenue sur GeoQuizz API pour l'application mobile");
});


/**
 * @root /utilisateurs/:id/auth
 * @method post
 * @param id, id de l'utilisateur
 * permet l'authentification
 * @return token jwt
 */
app.post("/utilisateurs/:email/auth", (req, res) => {

    let autorization = req.headers["authorization"];
    if (typeof autorization === "undefined") {
        res.status(401);
        res.end(getMessageFromHTTPCode(401));
    }

    let dataDecodedB64 = autorization.split(" ");
    let buffer = new Buffer(dataDecodedB64[1], 'base64');
    dataDecodedB64 = buffer.toString('ascii');

    dataDecodedB64 = dataDecodedB64.split(':');
    let emailGiven = dataDecodedB64['0'];
    emailGiven = emailGiven.toLowerCase().replace(/ /g, "");
    let passwordGiven = dataDecodedB64['1'];

    let mail = req.params.email;

    db.query("select email, mdp from utilisateur where email=?", [mail], (error, result) => {
        if (error) {
            res.status(500);
            res.end(getMessageFromHTTPCode(500));
        }
        if (result.length <= 0) {
            res.status(404);
            res.end(getMessageFromHTTPCode(404));
        }

        let verifm2p = bcrypt.compareSync(passwordGiven, result[0].mdp);
        let verifLogin = (result[0].email.toLowerCase().replace(/ /g, "") === emailGiven);

        if(!verifm2p || !verifLogin){
            res.status(401).end(getMessageFromHTTPCode(401));
        }

        //génération du token

        const privateKey = fs.readFileSync('private.key');
        const token = jwt.sign(
            {sub: result[0].mail_client},
            privateKey,
            {expiresIn: '3h'}
        );

        res.status(200).end(JSON.stringify({tokenJWT: token, code: 200}));
    });

});

app.get("/utilisateurs", (req, res) => {
   db.query("select * from utilisateur", (err, result) => {
       if(err){
           res.status(500).end(getMessageFromHTTPCode(500));
       }
       if(result.length <= 0){
           res.status(404).end(getMessageFromHTTPCode(404));
       }
       res.status(200).end(JSON.stringify(result));
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
    }

    message = JSON.stringify({code: code, message: message});

    return message;
}