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
 * @api {get} / route d'accueil de l'api commande
 * @apiDescription affiche un message de bienvenue
*/
app.get("/", (req, res) => {
    res.status(200).end("Bienvenue sur GeoQuizz API pour l'application mobile");
});


/**
 * @api {post} /utilisateurs/:email/auth permet l'authentification
 * @apiParam {String} email email de l'utilisateur
 * @apiHeader {String} authorization "Basic chaineEncodeeB64" avec chaineEncodeeB64 qui vaut "email:mdp" le tout encodé en base 64
 * @apiDescription permet l'authentification
 * @apiSuccess {JSON} tokenJWT json avec le token d'authentification jwt et le code de retour
 *
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

    db.query("select `email`, `mdp` from `utilisateur` where `email`=?", [mail], (error, result) => {
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
            {sub: result[0].email},
            privateKey,
            {expiresIn: '3h'}
        );

        console.log("utilisateur connecté");
        res.status(200).end(JSON.stringify({tokenJWT: token, code: 200}));
    });

});

/**
 * @api {post} /photos permet d'ajouter une photo en bdd
 * @apiDescription route permettant d'ajouter une photo en bdd, par défaut elle n'est ratachée à aucune série
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {json} body {
                        "position": {
                            "positionX": 64.44,
                            "positionY": 48.44,
                        },
                        "urlImage": "non vide",
                    }
 */
app.post("/photos", async (req, res) => {
    let jsonPhoto = req.body;

    if(typeof jsonPhoto === "undefined"){
        res.status(500).end(getMessageFromHTTPCode(500));
    }
    //verif du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        //ajout de la photo en bdd
        db.query("INSERT INTO `photo` (`url`, `positionX`, `positionY`) values (?, ?, ?);", [jsonPhoto.urlImage, jsonPhoto.position.positionX, jsonPhoto.position.positionY],
            (err, result) => {
                if(err){
                    res.status(500).end(getMessageFromHTTPCode(500));
                }else{
                    console.log("photo ajoutée");
                    res.status(200).end(JSON.stringify(getMessageFromHTTPCode(200)));
                }
            });

    } else {
        res.status(codeValidToken).end(getMessageFromHTTPCode(codeValidToken))
    }
  
});

/**
 * @api {post} /utilisateurs permet d'ajouter un utilisateur en bdd
 * @apiDescription route permettant d'ajouter un utilisateur en bdd
 * @apiHeader {String} authorization "Basic chaineEncodeeB64" avec chaineEncodeeB64 correspondant à "email:motDePasse" encodé en base 64
 * @apiParam {json} body {
    "login": "bb",
    "mail": "bob@test.fr",
    "mdp": "michel"
}
 */
app.post("/utilisateurs", (req, res) => {
    let jsonUser = req.body;
    if(isUndefined(jsonUser)){
        res.status(500).end(getMessageFromHTTPCode(500));
    }
    //vérification du contenu du json
    let login = jsonUser.login;
    let mail = jsonUser.mail;
    let mdp = jsonUser.mdp;
    console.log("ok");
    if(isUndefined(login) || isUndefined(mail) || isUndefined(mdp) || isEmptyString(mail) || isEmptyString(mdp)){
        res.status(666).end(getMessageFromHTTPCode(666));
    }

    //hashage du mot de passe
    let salt = bcrypt.genSaltSync(saltRounds);
    mdp = bcrypt.hashSync(mdp, salt);
    //insertion en bdd
    db.query("insert into `utilisateur` (`login`, `email`, `mdp`) values (?, ?, ?);", [login, mail, mdp], (error, result) => {
        if(error){
            res.status(500).end(getMessageFromHTTPCode(500));
        }
        else{
            console.log("utilisateur créé");
            res.status(200).end(getMessageFromHTTPCode(200));
        }
    })
});

/**
 * @api {post} /series permet d'ajouter une série en bdd
 * @apiDescription route permettant d'ajouter une série en bdd
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {json} body {
        "ville": "Ncy",
        "map_refs": {
            "map_x": 00.00,
            "map_y": 00.00,
            "map_zoom": 0
        }
 */
app.post("/series", async (req, res) => {

    let jsonSerie = req.body;
    if(typeof jsonSerie === "undefined"){
        res.status(500).json(getMessageFromHTTPCode(500));
    }

    //vérification du format du json
    let ville = jsonSerie.ville;
    let map_x = jsonSerie.map_refs.map_x;
    let map_y = jsonSerie.map_refs.map_y;
    let map_zoom = jsonSerie.map_refs.map_zoom;

    if(isUndefined(ville) || isUndefined(map_x) || isUndefined(map_y) || isUndefined(map_zoom)){
        res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(666));
    }
    if(!isString(ville) || isEmptyString(ville) || !isPositive(map_x) || !isPositive(map_y) || !isPositive(map_zoom)){
        res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(666));
    }

    //verif du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        //ajout de la série en bdd
        db.query("insert into `serie` (`ville`, `map_x`, `map_y`, `map_zoom`, `distance`) values (?, ?, ?, ?, 0.0022561023667568847)", [ville, map_x, map_y, map_zoom], (err, result) => {
            if(err){
                res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
            }else{
                console.log("série crée");
                res.status(200).header("Content-Type", "application/json; charset=utf-8").send(getMessageFromHTTPCode(200));
            }
        })
    } else {
        res.status(codeValidToken).end(getMessageFromHTTPCode(codeValidToken))
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
        case 666:
            message = "JSON non conformé !!";
            break;
    }

    message = {"code": code, "message": message};

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

/**
 * fonction qui permet de savoir si un élément est de type String
 * @param element
 * @returns {boolean}
 */
function isString(element){
    return (typeof element === "string");
}

/**
 * fonction qui permet de définir si un élément est de type undefined
 * @param element
 * @returns {boolean}
 */
function isUndefined(element) {
    return (typeof element === "undefined");
}

/**
 * permet de définir si un élément est une chaîne vide
 * @param element
 * @returns {boolean}
 */
function isEmptyString(element){
    return (element === "");
}

/**
 * permet de définir si un élément est de type nombre
 * @param element
 * @returns {boolean}
 */
function isNumber(element){
    return (typeof element === "number");
}

/**
 * permet de définir si un élément est positif
 * @param element
 * @returns {boolean}
 */
function isPositive(element) {
    return (isNumber(element) && element >= 0);
}

/**
 * permet de définir si un élément est strictement positif
 * @param element
 * @returns {boolean}
 */
function isStrictlyPositive(element) {
    return (isNumber(element) && element > 0);
}