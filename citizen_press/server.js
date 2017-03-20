// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

// Module d'ouverture de fichier et de lecture
var fs = require('fs');

var URL_DATA = 'citizen_press/public/data/data2.json';
var NB_MAX_ASSESSEURS_SCRUTATEUR = 8;

// Recuperation des chemins relatifs
app.use(express.static(path.join(__dirname, 'public')));  

// Écrit un SVG à partir des bureaux entré en entrée
// Les bureaux sont à la même adresse (un seul POI)
function writeSvg(bureaux, numPOI) {	
	var colors = new Array();
	var tauxRemplissage;	
	var nbAssesseursScrutMin = NB_MAX_ASSESSEURS_SCRUTATEUR;
	var svg = new SVG(numPOI);
	// Détermination de la couleur de chaque petit cercle
	bureaux.forEach(function(element, key) {
		if (nbAssesseursScrutMin > element){
			nbAssesseursScrutMin = element;
		}
		tauxRemplissage = element/NB_MAX_ASSESSEURS_SCRUTATEUR;
		if (tauxRemplissage < 0.4) {
			colors.push("red");
		}
		else if ((tauxRemplissage >= 0.4)&&(tauxRemplissage < 0.7)) {
			colors.push("orange");
		}
		else if ((tauxRemplissage >= 0.7)&&(tauxRemplissage < 1)) {
			colors.push("yellow");
		}
		else {
			colors.push("green");
		}
		//Trie des couleurs pour avoir un effet "bar de progression"
		colors.sort(function(a, b) {
			if (a == b) {
				return 0;
			}
			if (a == "red") {
				return -1;
			}
			else if (a == "orange") {
				if ((b == "yellow")||(b == "green")) {
					return -1;
				}
				// Red
				else {
					return 1;
				}
			}
			else if (a == "yellow") {
				if (b == "green") {
					return -1;
				}
				else {
					return 1;
				}
			}
			else if (a == "green") {
				return 1;
			}
		});
	});
	// Ajout des petites cercles à l'image
	colors.forEach(function(color){
		svg.addPoint(color);
	});
	// Gros cercle
	if (colors.indexOf("red") != -1) {
		svg.setBigCircle("red");
	}
	else if (colors.indexOf("orange") != -1) {
		svg.setBigCircle("orange");
	}
	else if (colors.indexOf("yellow") != -1) {
		svg.setBigCircle("yellow");
	}
	else {
		svg.setBigCircle("green");
	}
	// Nombre à l'intérieur
	svg.setNumber(nbAssesseursScrutMin);

	// Ecriture des fichiers
	fs.writeFile("./citizen_press/public/img/"+svg.url, svg.getContent());
}

// Route d'accès client
app.get("/", (req, res) => {

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
		    				<div class="contenu">\
		    					<h2 id="TitrRemplissage"> Remplissage </h2>\
		    					<div id="txts">\
		    						<div class="txtRemplissage" id="txtAssesseurs">\
			    						<h3> Assesseurs inscrits </h3>\
			    					</div>\
			    					<div class="txtRemplissage" id="txtScrutateurs">\
			    						<h3> Scrutateurs inscrits </h3>\
			    					</div>\
			    				</div>\
		    					<div class="graphsContenu"> \
		    						<div id="graphContenuAssesseur" class="graphContenu"></div>\
		    						<div id="graphContenuScrutateur" class="graphContenu"></div>\
		    					</div> \
		    				</div>\
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

app.get("/test", (req, res) => {
	res.sendFile(path.join(__dirname, '../citizen_press/public', 'html/test.html'));
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
	    		res.write(JSON.stringify(obj.bureaux[bureau]));
	    	}
	    }
	    res.send();
	});
});

// Récupère les données des bureaux à l'adresse :adresse pour poouvoir renvoyer le bon SVG
app.get("/bureaux/:adresse/:numPOI", (req, res) => {
	var nbAssesseursInscrit = 0;
	//var nbScrutateursInscrit = 0;
	var bureaux = new Map();
	var bureau;
	var adresse = req.params.adresse;
	var numPOI = req.params.numPOI;
	fs.readFile(URL_DATA, 'utf8', function(err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);

	    // Parcours des bureaux
	    for (var bureauIndex in obj.bureaux) {
	    	// Selection des bons bureaux à la même adresse
	    	bureau = obj.bureaux[bureauIndex];
	    	if (bureau.adresse == adresse) {
	    		// Parcours des assesseurs
	    		for (var assesseur in bureau.assesseurs) {
	    			// Si assesseur inscrit on augmente le compteur
	    			if (bureau.assesseurs[assesseur].valide_assesseur) {
	    				nbAssesseursInscrit++;
	    			}
	    			// Compter les scrutateurs aussi
	    			/*if (bureau.assesseurs[assesseur].valide_scrutateur) {
						nbScrutateursInscrit++;
	    			}*/
	    		}
	    		// Ajout du nombre d'assesseur inscrit par rapport au bureau
	    		bureaux.set(bureau.id, nbAssesseursInscrit);
	    		// Resmise à 0 du nombre d'inscrit
	    		nbAssesseursInscrit = 0;
	    		//nbScrutateursInscrit = 0;
	    	}
	    }
	    // On envoie l'URL du fichier créé
	    res.send(writeSvg(bureaux, numPOI));
	   // res.send(writeSvg(bureaux, numPOI));
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

});

// La page des statistique globales sur les assesseurs
app.get("/assesseurs", (req, res) => {
 // TODO
});

/*
 * Fichier pour l'accès à l'image SVG
 * Permet ses modifications :
 	* L'ajout de point,
 	* La modification des couleurs
 	* La modification du chiffre
*/

function SVG(numPOI) {
	this.url = "svg"+numPOI+".svg";
	this.contentSVG_littleCircles = "";
	this.nbBureau = 0;

	// Init du SVG
	this.contentSVG_init = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
		viewBox="0 0 1350 1360" style="enable-background:new 0 0 0 0;" xml:space="preserve">\
		<style type="text/css">\
			.red{fill:#EE5A58;}\
		    .orange {fill:#F1A72E;}\
		    .green{fill:#AED17C;}\
			.yellow{fill:#F4D05D;}\
			.st2{fill:#FFFFFF;}\
			.st3{font-family:Lato-Bold, Lato;font-weight:700;}\
			.st4{font-size:46.3393px;}\
		</style>';
	

	// Ajoute le cercle principale 
	// classColor : la classe à ajouter
	this.setBigCircle = function (classColor) {
		this.contentSVG_bigCircle = '<circle class="'+classColor+'" cx="66.7" cy="95.9" r="63.4"/>';
	}

	this.addPoint = function(classColor) {
		this.nbBureau++;
		if (this.nbBureau == 1) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="66.7" cy="12.9" r="12.4"/>';
		}
		else if (this.nbBureau == 2) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="105.4" cy="21.1" r="12.4"/>';
		}
		else if (this.nbBureau == 3) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="134.4" cy="44.3" r="12.4"/>';
		}
		else if (this.nbBureau == 4) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="150.4" cy="78.1" r="12.4"/>';
		}
		else if (this.nbBureau == 5) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="150.4" cy="118.2" r="12.4"/>';
		}
		else if (this.nbBureau == 6) {
			this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="132.4" cy="152.1" r="12.4"/>';
		}
	}

	this.setNumber = function(number) {
		if (number < 10) {
			this.contentSVG_text = '<text transform="matrix(1 0 0 1 53.9507 113.4561)" class="st2 st3 st4">'+number+'</text>';
		}
		else {
			this.contentSVG_text = '<text transform="matrix(1 0 0 1 37.9507 113.4561)" class="st2 st3 st4">'+number+'</text>';
		}
	}

	this.getContent = function() {
		return this.contentSVG_init+this.contentSVG_bigCircle+this.contentSVG_littleCircles+this.contentSVG_text+"</svg>";
	}

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