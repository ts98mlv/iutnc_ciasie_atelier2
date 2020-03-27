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
const uuid = require('uuid/v1');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/**
 * @api {get} / route d'accueil de l'api commande
 * @apiName getHomePage
 * @apiDescription
 * affiche un message de bienvenue
 * 
 */
app.get("/", (req, res) => {
    res.status(200).end("Bienvenue sur GeoQuizz API du backoffice");
});

/**
 * @api {get} /photos route pour récupérer toutes les photos
 * @apiParam {Boolean} [nonAssignee] paramètre optionnel qui si à true permet de ne retourner que les photos qui ne sont pas assignées à une série
 * @apiDescription route pour récupérer toutes les photos
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 */
app.get("/photos", async (req, res) => {
    getConnexion();
    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        let nonAssignees = req.query.nonAssignee;
        if(typeof nonAssignees === "undefined" || ! nonAssignees || nonAssignees === "false"){
            db.query("select * from `photo`;", [], (error, result) => {
                if(error){
                    res.status(500).end(getMessageFromHTTPCode(500));
                }
                res.status(200).json(JSON.stringify(result));
            })
        }else{
            db.query("select * from `photo` where `serie_id` is null;", [], (error, result) => {
                if(error){
                    res.status(500).end(getMessageFromHTTPCode(500));
                }
                res.status(200).json(JSON.stringify(result));
            })
        }
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }
});

/**
 * @api {get} /photos/:id route pour récupérer toutes les infos d'une photo
 * @apiParam {Number} id id de la photo concernée
 * @apiDescription route pour récupérer toutes les infos d'une photo
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 */
app.get("/photos/:id", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        db.query("select * from `photo` where `id`=?;", [req.params.id], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            res.status(200).end(JSON.stringify(result));
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }
});

/**
 * @api {put} /photos/:id route pour modifier les infos d'une photo
 * @apiParam {Number} id id de la photo concernée
 * @apiDescription route pour modifier les infos d'une photo
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {json} body de format
 * 
 * {
 *     "id": 00,
 *     "serie_id": 00,
 *     "description": "",
 *     "position":
 *           {
 *               "positionX": 48.55,
 *               "positionY": 64.25
 *           }
 * }
 */
app.put("/photos/:id", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        let id = req.params.id;
        let jsonPhoto = req.body;
        if(typeof jsonPhoto === "undefined"){
            res.status(500).end(getMessageFromHTTPCode(500));
        }
        //verification des champs du json
        let coordX = jsonPhoto.position.positionX;
        let coordY = jsonPhoto.position.positionY;
        let descr = jsonPhoto.description;
        let serie_id = jsonPhoto.serie_id;
        let photo_id = jsonPhoto.id;


        if(photo_id != id){
            res.status(403).end(getMessageFromHTTPCode(403));
        }

        if(serie_id <= 0)
            serie_id = null;

        if(typeof coordY === "undefined" || typeof coordX === "undefined" || typeof descr === "undefined" || typeof serie_id === "undefined" || typeof photo_id === "undefined"){
            res.status(500).end(getMessageFromHTTPCode(666));
        }

        db.query("select * from `photo` where `id`=?;", [req.params.id], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
                res.status(404).end(getMessageFromHTTPCode(404));
            }

            db.query("update `photo` set `description`=?, `positionX`=?, `positionY`=?, `serie_id`=? where `id`=?", [descr, coordX, coordY, serie_id, id], (err, rslt) => {
                if(err){
                    res.status(500).end(getMessageFromHTTPCode(500));
                }
                res.status(200).end(getMessageFromHTTPCode(200));
            })
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }
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
    getConnexion();

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

        res.status(200).json(JSON.stringify({tokenJWT: token, code: 200}));
    });

});

/**
 * @api {get} /series route pour modifier les series
 * @apiDescription route pour modifier les series
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 */
app.get("/series", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        db.query("select * from `serie`;", [], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            res.status(200).json(JSON.stringify(result));
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }
});

/**
 * @api {get} /series/:id route pour avoir les infos d'une série
 * @apiDescription route pour avoir les infos d'une série
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {Number} id id de la série concernée
 */
app.get("/series/:id", async (req, res) => {
    getConnexion();


    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        db.query("select * from `serie` where `id`=?;", [req.params.id], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
                res.status(404).end(getMessageFromHTTPCode(404));
            }
            res.status(200).json(JSON.stringify(result));
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }

});

/**
 * @api {get} /series/:id/photos route pour avoir les photos liées à une série
 * @apiDescription  route pour avoir les photos liées à une série
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {Number} id id de la série concernée
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 */
app.get("/series/:id/photos", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        db.query("select * from `photo` where `serie_id`=?;", [req.params.id], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
                res.status(404).end(getMessageFromHTTPCode(404));
            }
            res.status(200).json(JSON.stringify(result));
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }

});

/**
 * @api {get} /series/:id/parties route pour avoir les parties liées à une série
 * @apiDescription route pour avoir les parties liées à une série
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiParam {Number} id id de la série concernée
 * 
 */
app.get("/series/:id/parties", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        db.query("select * from `partie` where `serie_id`=?;", [req.params.id], (error, result) => {
            if(error){
                res.status(500).end(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
                res.status(404).end(getMessageFromHTTPCode(404));
            }
            res.status(200).json(JSON.stringify(result));
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
    }
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
}
 */
app.post("/series", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        let jsonSerie = req.body;
        if(typeof jsonSerie === "undefined"){
            res.status(500).end(getMessageFromHTTPCode(500));
        }

        //vérification du format du json
        let ville = jsonSerie.ville;
        let map_x = jsonSerie.map_refs.map_x;
        let map_y = jsonSerie.map_refs.map_y;
        let map_zoom = jsonSerie.map_refs.map_zoom;

        if(isUndefined(ville) || isUndefined(map_x) || isUndefined(map_y) || isUndefined(map_zoom)){
            res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(666));
        }
        if(!isString(ville) || isEmptyString(ville) || !isPositive(map_x) || !isPositive(map_y) || !isPositive(map_zoom)){
            res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(666));
        }

        db.query("insert into `serie` (`ville`, `map_x`, `map_y`, `map_zoom`, `distance`) values (?, ?, ?, ?, ?)", [ville, map_x, map_y, map_zoom, 0.0022561023667568847], (err, result) => {
            if(err){
                res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
            }else{
                console.log("série créée");
                res.status(200).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(200));
            }
        })
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
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
    getConnexion();

    let jsonUser = req.body;
    if(isUndefined(jsonUser)){
        res.status(500).end(getMessageFromHTTPCode(500));
    }
    //vérification du contenu du json
    let login = jsonUser.login;
    let mail = jsonUser.mail;
    let mdp = jsonUser.mdp;
    if(isUndefined(login) || isUndefined(mail) || isUndefined(mdp) || isEmptyString(mail) || isEmptyString(mdp)){
        res.status(500).end(getMessageFromHTTPCode(666));
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
            res.status(200).end(getMessageFromHTTPCode(200));
        }
    })
});

/**
 * @api {delete} /series/:id permet de supprimer une série
 * @apiDescription permet de supprimer une série
 * @apiParam {Number} id id de la série concernée
 * @apiHeader {String} authorization "Bearer tokenJWT" avec tokenJWT correspondant au token JWT récupéré lors de la connexion
 * @apiHeader {String} mail email de l'utilisateur connecté
 */
app.delete("/series/:id", async (req, res) => {
    getConnexion();

    //vérification du token
    let codeValidToken;
    try {
        codeValidToken = await isValidTokenForSelectUser(req.headers.mail, req.headers.authorization);
    } catch (e) {
        codeValidToken = e;
    }
    if (codeValidToken === 200) {
        console.log("sup : code 200");
        //vérification de l'existence de la série
        let id = parseInt(req.params.id);
        db.query("select * from `serie` where `id`=?", [id], (err, result) => {
            if(err){
                res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
              res.status(404).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(404));
            }

            //suppression des photos de la series
            db.query("delete from `photo` where `serie_id`=?", [id], (err2, result2) => {
                if(err2){
                    res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
                }

                //suppression des parties de la series
                db.query("delete from `partie` where `serie_id`=?", [id], (err3, result2) => {
                    if(err3){
                        res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
                    }

                    //suppression de la serie
                    db.query("delete from `serie` where `id`=?", [id], (err4, result3) => {
                        if(err4){
                            res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
                        }

                        console.log("série supprimée");
                        res.status(200).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(200));
                    });
                });
            });
        });
    } else {
        res.status(codeValidToken).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(codeValidToken));
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
let db;
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
            message = "JSON non conforme !!";
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


/**
 * fonction qui permet de savoir si un élément est de type String
 * @param element
 * @returns {boolean}
 */
function isString(element){
    return (typeof element === "string");
}

/**
 * fonction singleton qui permet d'initialiser la connexion si ce n'est pas déjà le cas
 */
function getConnexion() {
    if (isUndefined(db)) {
        db = mysql.createConnection({
            host: "db",
            user: "api_geoquizz",
            password: "api_geoquizz",
            database: "api_geoquizz"
        });

        // connexion à la bdd
        db.connect(err => {
            if (err) {
                return err; //c'est cette ligne
            } else {
                console.log("Connected to database");
            }
        });
    }
}
