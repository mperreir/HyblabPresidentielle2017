// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

// Module d'ouverture de fichier et de lecture
var fs = require('fs');

var d3 = require('d3');

var bodyParser = require('body-parser')

/*app.get("/", (req, res) => {
	console.log("Page principale");
	res.set({"Content-Type" : "text/html"});	// Typage du texte
	fs.readFile('citizen_press/public/html/formulaire.html','utf8', function(err,data){	// Lecture d'un fichier
		res.write(data);
		res.end();
	});	// Ecriture dans la réponse*/
var URL_DATA = 'citizen_press/public/data/data2.json';

// Recuperation des chemins relatifs
app.use(express.static(path.join(__dirname, 'public')));  

// Route d'accès client
app.get("/select", (req, res) => {

	res.set({"Content-Type" : "text/html"});
	
	// Récupération du header de la page
	fs.readFile('citizen_press/public/html/header.html','utf8', function(err,data){	// Lecture d'un fichier
		res.write(data);	// Ecriture dans la réponse
	});	 

	// Préparation du parsage JSON pour la création des éléments
	fs.readFile(URL_DATA, 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	   
	   	// Initialisation des variables
	    var tab = [];
	    var calc = 1;
	      
	    // Parcours des bureaux pour création de points d'intêrets
	    for(var i=0; i<=obj.bureaux.length-1; i++){
	    	if (tab.indexOf(obj.bureaux[i].adresse) == -1){
		    	res.write ('<section class="POI POI'+calc+'">\
		    				<div class="bureaux"></div>\
        					<img class="fermer" src="./img/arrow.png"> \
        					<div class="data-container"></div> \
            			</section> \n');
            	calc++;
            	tab.push(obj.bureaux[i].adresse);
	    	};
		};

		// Récupération du footer
		fs.readFile('citizen_press/public/html/footer.html','utf8', function(err,data){	// Lecture d'un fichier
			res.write(data);	// Ecriture dans la réponse
			res.end();

		});
	});
});


app.get("/", (req,res) => {

	fs.readFile('citizen_press/public/html/accueil/accueil.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});	
});

app.get("/formulaire/:idBureau", (req,res) => {

	// Penser a faire : var idBureau = req.params.idBureau;
	fs.readFile('citizen_press/public/html/formulaire/formulaire.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});
});


app.get("/merci", (req,res) => {

	fs.readFile('citizen_press/public/html/merci/merci.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});
});


// GET bureaux (pour la map)
app.get("/bureaux", (req, res) => {
	console.log("Chargement des bureaux...");
	fs.readFile(URL_DATA, 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    res.contentType('json');
	    res.send(JSON.stringify(obj.bureaux))
	});
});

// GET informations sur un bureau (pour récupérer les informations lors de l'inscription)
app.get("/bureaux/:id", (req, res) => {
	var idBureau = req.params.id;
	fs.readFile(URL_DATA, 'utf8', function (err, data) {
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
app.get("/	assesseurs", (req, res) => {
 // TODO
});


app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/citizen_press/form", function (req, res) {
	/*var id = req.params.id;
	var assesseur = req.params.assesseur;
	var scrutateur = req.params.scrutateur;*/
	
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function readFileCallback(err, data){
    	if (err){
       		console.log(err);
   		} else {
   			//On récupère chaque variables
   			var nom = req.body.nom;
   			var prenom = req.body.prenom;
   			var email = req.body.email;
   			var mobile = req.body.mobile;
   			var jour = req.body.jour;
   			var mois = req.body.mois;
   			var annee = req.body.annee;
   			var naissance = annee + "-" + mois + "-" + jour;
   			var civilite = req.body.civilite;

    		var obj = JSON.parse(data); //now it an object

    		//on récupère l'id dernière assesseur
    		var numberPattern = /\d+/g;

    		var lastAss = obj.assesseurs[obj.assesseurs.length-1].id;
    		lastAss.toString();
    		var num = new Number();
    		num = lastAss.match(numberPattern);
    		num = parseInt(num,10);
    		num += 1;
    		console.log(num);
    		var idAsse = "idAsse" + num.toString();
    		console.log(idAsse);

    		obj.assesseurs.push({"id": idAsse,"nom": nom,"prenom": prenom,"age": getAge(naissance),"mail": email,"tel": mobile,"sexe": "male","potentiel_assesseur": false,"potentiel_scrutateur": true});//add some data
   			var json = JSON.stringify(obj); //convert it back to json
   			fs.writeFile('citizen_press/public/data/data.json', json, 'utf8', -1); // write it back 
	}});
	fs.readFile('citizen_press/public/html/merci/merci.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});
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

function cleanInt(x) {
    x = Number(x);
    return x >= 0 ? Math.floor(x) : Math.ceil(x);
}
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