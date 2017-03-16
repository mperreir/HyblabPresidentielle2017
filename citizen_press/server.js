// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

var fs = require('fs');

app.use('/', express.static('public'));
// Création du serveur web pour notre application sur le port 8080
var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Application lancée à l\'adresse suivante http://%s:%s', host, port);

});

app.get("/", (req, res) => {
	console.log("Page principale");
	res.send("Hello world this is the home page");
});

// GET bureaux
app.get("/bureaux", (req, res) => {
	console.log("Chargement des bureaux...");
	fs.readFile('data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    res.write(obj.bureaux[0].id);
	    res.send();
	});
});

// GET informations bureaux (pour récupérer les informations lors de l'inscription)
app.get("/bureaux/:id", (req, res) => {

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

// La page des assesseurs validé sur un bureau
app.get("/connexion", (req, res) => {
 // TODO
});

// La page des assesseurs validé sur un bureau
app.get("/bureaux/:id/assesseurs", (req, res) => {
 // TODO
});

// La page des stats globales sur les assesseurs
app.get("/assesseurs", (req, res) => {
 // TODO
});


// Minimum routing: serve static content from the html directory
//app.use(express.static(path.join(__dirname, 'public')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;
