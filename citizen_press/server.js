// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

var fs = require('fs');

var d3 = require('d3');
var bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
	console.log("Page principale");
	res.set({"Content-Type" : "text/html"});	// Typage du texte
	fs.readFile('citizen_press/public/html/formulaire.html','utf8', function(err,data){	// Lecture d'un fichier
		res.write(data);
		res.end();
	});	// Ecriture dans la réponse
});

// GET bureaux (pour la map)
app.get("/bureaux", (req, res) => {
	console.log("Chargement des bureaux...");
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    res.contentType('json');
	    res.send(JSON.stringify(obj.bureaux))
	});
});

// GET informations sur un bureau (pour récupérer les informations lors de l'inscription)
app.get("/bureaux/:id", (req, res) => {
	var idBureau = req.params.id;
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    res.contentType('json');
	    for (var bureau in obj.bureaux) {
	    	// le bon bureau
	    	if (idBureau == obj.bureaux[bureau].id) {
	    		res.write(obj.bureaux[bureau]);
	    	}
	    }
	    res.send();
	});
});

// La page du formulaire d'inscription
app.get("/bureaux/:id/inscription" , (req, res) => {

});

// Ajout assesseurs
app.post("/assesseurs/:id", (req, res) => {
	console.log("Ajout d'un assesseurs...");
	fs.readFile('data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    var nbAssesseurs = obj.assesseurs.length;
	    obj.assesseurs[nbAssesseurs+1].id = req.params.id;
	    // ajout des autres caractéristiques de l'objet bureau

	    // Écriture du nouveau fichier
	    fs.writeFile('data.json', JSON.stringify(obj));
	});
});

// La page de connexion  d'un président
app.get("/connexion", (req, res) => {
 // TODO
});

// La page des assesseurs validé sur un bureau
app.get("/bureaux/:id/assesseurs", (req, res) => {
 // TODO
});

// La page des statistique globales sur les assesseurs
app.get("/assesseurs", (req, res) => {
 // TODO
});


app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/", function (req, res) {
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function readFileCallback(err, data){
    	if (err){
       		console.log(err);
   		} else {
   			//On récupère chaque variables
   			var nom = req.body.nom;
   			var prenom = req.body.prenom;
   			var email = req.body.email;
   			var mobile = req.body.mobile;
   			var naissance = req.body.naissance;
   			var civilite = req.body.civilite;

   			if (civilite=='monsieur'){civilite = 'male'};
   			if (civilite=='madame'){civilite='female'};

    		var obj = JSON.parse(data); //now it an object
    		obj.assesseurs.push({"id": "idAsse1995","nom": nom,"prenom": prenom,"age": naissance,"mail": email,"tel": mobile,"sexe": "male","potentiel_assesseur": false,"potentiel_scrutateur": true});//add some data
   			var json = JSON.stringify(obj); //convert it back to json
   			fs.writeFile('citizen_press/public/data/data.json', json, 'utf8', -1); // write it back 
	}});
    res.send('<h1>Hello</h1> '+ req.body.nom);
});

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Minimum routing: serve static content from the html directory
//app.use(express.static(path.join(__dirname, 'public')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
