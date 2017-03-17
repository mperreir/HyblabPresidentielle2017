// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

// Module d'ouverture de fichier et de lecture
var fs = require('fs');

// Recuperation des chemins relatifs
app.use(express.static(path.join(__dirname, 'public')));  

// Route d'accès client
app.get("/", (req, res) => {

	res.set({"Content-Type" : "text/html"});
	
	// Initialisation de la page renvoyé
	var body = "";

	// Récupération du header de la page
	fs.readFile('citizen_press/public/html/header.html','utf8', function(err,data){	// Lecture d'un fichier
		body += data;	// Ecriture dans la réponse
	});	 

	// Préparation du parsage JSON pour la création des éléments
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	   
	   	// Initialisation des variables
	    var tab = [];
	    var calc = 0;
	      
	    // Parcours des bureaux pour création de points d'intêrets
	    for(var i=0; i<=obj.bureaux.length-1; i++){
	    	if (tab.indexOf(obj.bureaux[i].adresse) == -1){
		    	body += '<section class="POI'+calc+'">\
		    				<div class="bureaux"></div>\
	    					<div class="fermer"></div> \
        					<div class="header"> \
        						<div class="adress"></div>\
        						<div class="data-container"></div> \
        					</div>\
        					<div class="other"></div> \
            			</section> \n';
            	calc++;
            	tab.push(obj.bureaux[i].adresse);
	    	};
		};

		// Récupération du footer
		fs.readFile('citizen_press/html/footer.html','utf8', function(err,data){	// Lecture d'un fichier
			body += data;	// Ecriture dans la réponse
		});

		// Ecriture et envoi de la réponse
		res.write(body);
		res.end();
	});
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


// Minimum routing: serve static content from the html directory
//app.use(express.static(path.join(__dirname, 'public')));

// You can then add whatever routing code you need

// This module is exported and served by the main server.js located
// at the root of this set of projects. You can access it by lanching the main
// server and visiting http(s)://127.0.0.1:8080/name_of_you_project/ (if on a local server)
// or more generally: http(s)://server_name:port/name_of_you_project/
module.exports = app;



// Définition des variables à donner au template
	    //var taille_liste_bureaux = obj.bureaux.length;
	    //res.render('test.ejs', {objPrincipal: obj});
	    /*for (var bureau in obj.bureaux) {
	    	res.write(JSON.stringify(obj.bureaux[bureau]));
	    }
	    res.send();
	});
	//res.send();

	/*var l_s = "Ecole primaire";
	var l_a = "18 rue des blabla";
	var le_num_b = 1;
	var tab = [1,2,3,4];
	res.render('test.ejs', {lieu_site: l_s, lieu_adresse: l_a, taille_liste: tab.length, liste_bureau: tab,
	le_num_bureau: le_num_b});*/