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
 *     "serie_id" : 1,
 *     "pseudo" : "pseudo"
 * }
 * @apiSuccess {json} result fichier json avec les données fournies en entrée (jsonFourni) et le token de la partie (token) et l'id de la partie
 */
app.post("/parties", (req, res) => {
   //vérification des données envoyées
   let jsonPartie = req.body;
   let login = jsonPartie.pseudo;
   let serie_id = jsonPartie.serie_id;

   if(isUndefined(login) || isUndefined(serie_id) || isEmptyString(login) || !isStrictlyPositive(serie_id)){
       res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(666));
   }

    //génération du token uuid
    let token = uuid();

    //enregistrement en bdd
    db.query("insert into `partie` (`token`, `joueur`, `serie_id`, `status`, `score`) values (?, ?, ?, 2, 0)", [token, login, serie_id], (err, result) => {
        if(err){
            res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
        }
        console.log("partie créée");
        res.status(200).header("Content-Type", "application/json; charset=utf-8").json({"jsonFourni" : jsonPartie, "token": token, "idPartie" : result.insertId});
    });

});

/**
 * @api {get} /series permet d'obtenir la liste des séries disponibles en bdd
 * @apiDescription permet d'obtenir la liste des séries disponibles en bdd
 * @apiSuccess {Json} fichier json avec un tableau d'objets correspondant à une série en bdd
 */
app.get("/series", (req, res) => {
    db.query("select * from `serie`;", [], (err, result) => {
       if(err){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
       }
       if(result.length <= 0){
           res.status(404).end(getMessageFromHTTPCode(404));
       }
       res.status(200).json(result);
    });
});

/**
 * @api {get} /series/:id permet d'obtenir les infos d'une série disponibles en bdd
 * @apiDescription permet d'obtenir les infos d'une série disponibles en bdd
 * @apiParam {Number} id id de la série concernée
 * @apiSuccess {Json} fichier json avec un tableau d'objets correspondant à une série en bdd
 */
app.get("/series/:id", (req, res) => {
    //vérification de l'id
    let id = req.params["id"];
    id = parseInt(id);
    if(typeof id !== "number" || id <= 0){
        res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
    }

    db.query("select * from `serie` where id=?;", [id], (err, result) => {
       if(err){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
       }
       if(result.length <= 0){
           res.status(404).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(404));
       }
       res.status(200).json(result);
    });
});

/**
 * @api {get} /series/:id/photos permet d'avoir un n photos aléatoires d'une série ou toutes les photos si n==all
 * @apiDescription permet d'avoir un n photos aléatoires d'une série ou toutes les photos si n==-1. Par défaut n vaut 10.
 * @apiParam {Number} id id de la série concernée
 * @apiParam {Number} [n] nombre de photos retournées souhaité. Par défaut n vaut 10 et si n==-1 retourne toutes les photos de la série
 */
app.get("/series/:id/photos", (req, res) => {
    //vérification de l'id
    let id = req.params["id"];
    id = parseInt(id);
    if(typeof id !== "number" || id <= 0){
        res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
    }

    //vérification de n
    let n = req.query["n"];
    if(typeof n !== "undefined"){
        id = parseInt(id);
        if(typeof id !== "number" || id <= -2){
            res.status(500).header("Content-Type", "application/json; charset=utf-8").end(getMessageFromHTTPCode(500));
        }
    }else{
        n = 10;
    }

    let lesPhotos = [];

        db.query("select * from `photo` where `serie_id` = ?", [id], (err, result) => {
            if(err){
                res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
            }
            if(result.length <= 0){
                res.status(404).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(404));
            }
 
            //dans le cas où on veut toutes les photos
            if(n === -1 || n === "-1") {
                res.status(200).json(result);
            }
             else{// sinon
                if(n > result.length){ //si la série comporte moins de photos que n
                    res.status(200).header("Content-Type", "application/json; charset=utf-8").json({
                        "message" : "La série ne comporte pas assez de photos",
                        "demande": n,
                        "disponibles": result.length,
                        "photos": result
                    })
                }else{
                    let aleat = 0;
                    let aleatJoues = [];
                    for(let i = 0; i < n; i++){
                        aleat = entierAleatoire(0, result.length - 1);
                        while (aleatJoues.includes(aleat)){
                            aleat = entierAleatoire(0, result.length - 1);
                        }
                        aleatJoues.push(aleat);
                        lesPhotos.push(result[aleat]);
                    }
                    res.status(200).header("Content-Type", "application/json; charset=utf-8").json({
                        "demande": n,
                        "disponible": result.length,
                        "photos": lesPhotos
                    })
                }
            }
        })

});

/**
 * @api {put} /parties/:id permet de modifier une partie
 * @apiDescription permet de modifier une partie, utilisé surtout pour finir une partie
 * @apiParam {Number} id id de la partie concernée
 * @apiParam {Json} body json avec le token de la partie, le score et le nombre de photos
 * @apiParamExample {Json} {
 *     "partie_token" : "string token",
 *     "score" : 1,
 *     "nb_photos": 10
 * }
 */
app.put("/parties/:id", (req, res) => {
    let partie_id = parseInt(req.params.id);

    //vérification des données envoyées
    let jsonPartie = req.body;
    let partie_token = jsonPartie.partie_token;
    let score = parseInt(jsonPartie.score);
    let nb_photos = parseInt(jsonPartie.nb_photos);

    if(isUndefined(partie_id) || isUndefined(partie_token) || isUndefined(score) || isUndefined(nb_photos) || !isStrictlyPositive(partie_id) || isEmptyString(partie_token) || !isPositive(score) || ! isStrictlyPositive(nb_photos)){
        res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(666));
    }

    db.query("select * from `partie` where `id`=?", [partie_id], (err, partie) => {
        partie = partie[0];
        //vérification du token
        if(partie.token !== partie_token){
            res.status(403).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(403));
        }

        //maj de la partie
        db.query("UPDATE `partie` SET `nb_photos`=?,`status`=?,`score`=? WHERE id=?", [nb_photos, 3, score, partie_id], (error, result) => {
            if(err){
                res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
            }
            console.log("partie modifiée");
            res.status(200).header("Content-Type\", \"application/json; charset=utf-8").json(getMessageFromHTTPCode(200));
        })
    })

});

/**
 * @api {get} /parties permet d'avoir la liste des parties
 * @apiDescription permet d'avoir la liste des parties
 * @apiSuccess {Json} Json avec la liste des parties
 */
app.get("/parties", (req, res) => {
   db.query("select * from `partie`", [], (err, result) => {
       if(err){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
       }
       if(result.length <= 0){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
       }
       console.log("get /parties");
       res.status(200).header("Content-Type", "application/json; charset=utf-8").json(result);
   })
});

/**
 * @api {get} /parties/:id permet d'avoir les infos d'une partie
 * @apiDescription permet d'avoir les infos d'une partie
 * @apiParam {Number} id id de la partie concernée
 * @apiSuccess {Json} Json avec la liste des infos de la partie
 */
app.get("/parties/:id", (req, res) => {
    let id = parseInt(req.params.id);
    if(id <= 0 || isUndefined(id)){
       res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
    }
   db.query("select * from `partie` where `id`=?", [id], (err, result) => {
       if(err){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
       }
       if(result.length <= 0){
           res.status(500).header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(500));
       }
       console.log("get /parties/" + id);
       res.status(200).header("Content-Type", "application/json; charset=utf-8").json(result);
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
    res.header("Content-Type", "application/json; charset=utf-8").json(getMessageFromHTTPCode(400
    ));
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
        console.log(err);
        throw new Error(err);
    }else{
        console.log("Connected to database");
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          Fonctions                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    message = {"code": code, "message": message};

    return message;
}

/**
 * fonction qui permet de générer un nombre entier aléatoire entre deux bornes
 * @param {Number} min borne inférieure
 * @param {Number} max borne supérieure
 * @returns {Number}
 */
function entierAleatoire(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
