// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

// utilisation du module express
var app = express();

// Module d'ouverture de fichier et de lecture
var fs = require('fs');

// Module de parsage d'une en-tête de requete POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Définition des variables globales
var URL_DATA = 'citizen_press/public/data/data.json';
var NB_MAX_ASSESSEURS_SCRUTATEUR = 8;

// Recuperation des chemins relatifs
app.use(express.static(path.join(__dirname, 'public')));  

// Route d'accès à la page d'accueil
app.get("/", (req,res) => {

	// Lecture du fichier et écriture de celui-ci dans la réponse
	fs.readFile('citizen_press/public/html/accueil/accueil.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});	
});


// Route d'accès à la carte présentant les bureaux
app.get("/select", (req, res) => {

	// Formatage de la réponse au format html
	res.set({"Content-Type" : "text/html"});
	
	// Récupération du header de la page
	var header = fs.readFileSync('citizen_press/public/html/select/header.html','utf8');
	res.write(header);	// Ecriture dans la réponse 

	// Préparation du parsage JSON pour la création des éléments
	var body = fs.readFileSync(URL_DATA, 'utf8');
    
    var obj = JSON.parse(body);
   
   	// Initialisation des variables
    var tab = [];
    var calc = 1;

    // Parcours des bureaux pour création de points d'intêrets
    for(var i=0; i<=obj.bureaux.length-1; i++){
    	if (tab.indexOf(obj.bureaux[i].adresse) == -1){
	    	res.write ('<section class="POI POI'+calc+'">\
	    				<div class="bureaux"></div>\
	    				<div class="data-container">\
	    					<h2 id="TitrRemplissage"> Remplissage </h2>\
	    					<div id="txts">\
	    						<div class="txtRemplissage" id="txtAssesseurs">\
		    						<h3>Assesseurs inscrits</h3>\
		    					</div>\
		    					<div class="txtRemplissage" id="txtScrutateurs">\
		    						<h3> Scrutateurs inscrits</h3>\
		    					</div>\
		    				</div>\
	    					<div class="graphsContenu"> \
	    						<div class="divGraphContenuAssesseur">\
	    							<canvas id="graphContenuAssesseur'+calc+'"></canvas>\
	    						</div>\
	    						<div class="divGraphContenuScrutateur">\
	    							<canvas id="graphContenuScrutateur'+calc+'"></canvas>\
								</div>\
	    					</div> \
	    					<div id="txtsBasiquesNombres">\
	    						<div class="assesseursChiffre">\
	    							<h4 class="percentAss"></h4>\
		    						<h4 class="inscrit nbAssesseurs"><h4>\
		    						<h4 class="placeMax 8P"> 8 PERSONNES </h4> \
		    					</div>\
		    					<div class="scrutateursChiffre">\
		    						<h4 class="percentScrut"></h4>\
		    						<h4 class="inscrit nbScrutateurs"><h4>\
		    						<h4 class="placeMax 25P"> 25 PERSONNES </h4> \
		    					</div>\
	    					</div>\
	    				</div>\
    					<img class="fermer" src="./img/select/arrow.png"> \
        			</section> \n');
        	calc++;
        	tab.push(obj.bureaux[i].adresse);
    	};
    
	};

// Récupération du footer
	var footer = fs.readFileSync('citizen_press/public/html/select/footer.html','utf8'); 
	res.write(footer);	// Ecriture dans la réponse
	res.end();
});

// Route d'accès aux crédits
app.get("/credits", (req, res) => {

	// Ecriture de la page
	fs.readFile('citizen_press/public/html/accueil/bandeau.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});	
});

// Route d'accès au formulaire pour s'inscrire
app.post("/inscription", (req,res) => {

	// Formatage de la réponse au format html
	res.set({"Content-Type" : "text/html"});

	// Récupération des informations sur le bureau, l'inscription en tant qu'assesseur ou scrutateurs
	var idBureau = req.body.idBureau;
	var checkAss = req.body.checkAss;
	var checkScrut = req.body.checkScrut;

	// Récupération du header de la page et ecriture
	var content_header = fs.readFileSync('citizen_press/public/html/formulaire/header_formulaire.html','utf8');
	res.write(content_header);

	// Ecriture des valeurs dans les champs cachés
	res.write('<input type="hidden" name="idBureau" value="'+idBureau+'"/>');
	res.write('<input type="hidden" name="checkAss" value="'+checkAss +'"/>');
	res.write('<input type="hidden" name="checkScrut" value="'+checkScrut +'"/>');

	// Récupération et écriture du footer
	var content_footer = fs.readFileSync('citizen_press/public/html/formulaire/footer_formulaire.html','utf8');
	res.write(content_footer);

	// Envoi de la réponse
	res.end();

});

// Route d'accès à la page de remerciement
app.get("/merci", (req,res) => {

	// Formatage de la réponse au format html
	res.set({"Content-Type" : "text/html"});

	// Ecriture de la page
	fs.readFile('citizen_press/public/html/merci/merci.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});
});


// Route d'accès AJAX pour récupérer les bureaux
app.get("/bureaux", (req, res) => {
	fs.readFile(URL_DATA, 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    // Formatage de la réponse au format JSON
	    res.contentType('json');
	    // Parcours de l'objet JSON pour renvoyer l'objet contenant tous les bureaux
	    res.send(JSON.stringify(obj.bureaux))
	});
});

// Route d'accès AJAX aux informations d'un bureau (utilisé lors de l'inscription)
app.get("/bureaux/:id", (req, res) => {
	// Récuperation de l'identifiant du bureau
	var idBureau = req.params.id;

	fs.readFile(URL_DATA, 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    // Formatage de la réponse au format JSON
	    res.contentType('json');
	    for (var bureau in obj.bureaux) {
	    	// le bon bureau
	    	if (idBureau == obj.bureaux[bureau].id) {
	    		// Ecriture dans la réponse du bureau au format JSON 
	    		res.write(JSON.stringify(obj.bureaux[bureau]));
	    	}
	    }
	    // Envoi de la réponse
	    res.send();
	});
});

// Récupère les données des bureaux à l'adresse :adresse pour poouvoir renvoyer le bon SVG. Utilisé en AJAX
app.get("/bureaux/:adresse/:numPOI/:width/:height", (req, res) => {
	
	var nbAssesseursInscrit = 0;
	var bureaux = new Map();
	var bureau;
	// Récupération des informations transmise en GET
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
	    		}
	    		// Ajout du nombre d'assesseur inscrit par rapport au bureau
	    		bureaux.set(bureau.id, nbAssesseursInscrit);
	    		// Resmise à 0 du nombre d'inscrit
	    		nbAssesseursInscrit = 0;
	    	}
	    }
	    // On envoie l'URL du fichier créé
	    res.send(writeSvg(bureaux, numPOI, req.params.width, req.params.height));
	});
});

// Route utilisé pour créer les données de la personne bénévole
app.post("/citizen_press/form", function (req, res) {
	
	// Ecriture dans le fichier de données
	fs.readFile(URL_DATA, 'utf8', function readFileCallback(err, data){
    	if (err){
       		console.log(err);
   		}
   		else {
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
   		
   			var idBureau = req.body.idBureau;
   			var assesseurDemande = false;
   			var scrutateurDemande = false;

   			// vérification de la demande assesseur ou scrutateur
   			if (req.body.checkAss=="on") {
   				assesseurDemande = true;
   			}
   			if (req.body.checkScrut=="on") {
   				scrutateurDemande = true;
   			}

   			// Récupération des données au format JSON
    		var obj = JSON.parse(data); // Parsage du json au format texte

    		//on récupère l'id dernière assesseur
    		var numberPattern = /\d+/g;

    		// Récupération du dernier assesseur de la liste
    		var lastAss = obj.assesseurs[obj.assesseurs.length-1].id;
    		lastAss.toString();
    		// Déclaration du nouvel identifiant
    		var num = new Number();
    		num = lastAss.match(numberPattern);
    		num = parseInt(num,10);
    		num += 1;
    		// Composition de l'identifiant nouveau
    		var idAsse = "idAsse" + num.toString();

    		// AJout de l'assesseur dans l'objet globale
    		obj.assesseurs.push({"id": idAsse,"nom": nom,"prenom": prenom,"age": getAge(naissance),"mail": email,"tel": mobile,"sexe": "male","potentiel_assesseur": assesseurDemande,"potentiel_scrutateur": scrutateurDemande});//add some data

    		// Parcours des bureaux pour ajout de l'assesseur au bureau dont il est relié
   			for (var i = 0; i < obj.bureaux.length-1;i++) {
  				if (obj.bureaux[i].id == idBureau) {
  					// Par défaut il n'est pas validé, seul le président le peux
  					obj.bureaux[i].assesseurs.push({"id" : idAsse,"valide_assesseur" : false, "valide_scrutateur": false});
  				};
			}
			// Ecriture du fichier de données
			fs.writeFile(URL_DATA, JSON.stringify(obj), 'utf8', -1); // write it back
		}
	});

	// Ecriture de la page de remerciement
	fs.readFile('citizen_press/public/html/merci/merci.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);	// Ecriture dans la réponse
		res.end();
	});
});


// Ajout assesseurs
app.post("/assesseurs/:id", (req, res) => {
	//console.log("Ajout d'un assesseurs...");
	fs.readFile('data.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	    var nbAssesseurs = obj.assesseurs.length;
	    obj.assesseurs[nbAssesseurs+1].id = req.params.id;

	    // Écriture du nouveau fichier
	    fs.writeFile('data.json', JSON.stringify(obj));
	});
});

// Route d'accès au bureau d'un président avec visibilité de tous les assesseurs ou scrutateurs validés ou non
app.get("/president/:id", (req, res) => {

	// Formatage de la réponse au format JSON
 	res.set({"Content-Type" : "text/html"});

	// Récupération du header de la page et écriture dans la réponse
	var header = fs.readFileSync('citizen_press/public/html/liste_president/header.html','utf8');
	res.write(header);
	 

	// Préparation du parsage JSON pour la création des éléments
	var body = fs.readFileSync('citizen_press/public/data/data.json', 'utf8');

	var obj = JSON.parse(body);
	   
	var idBureau = req.params.id;

	// Initialisation des variables
	var assesseurs = [];
	var asseseurTemp;

	// Parcours des bureaux pour retrouver le bureau concerné et récupération des informations
	for(var index in obj.bureaux){
		// Quand c'est le bon bureau
	  	if (obj.bureaux[index].id == idBureau){
	   		res.write("<div class=\"resume_buro\"><p class = \"nom_lieu_adresse\">");
	   		res.write(obj.bureaux[index].nom_lieu + "<br><span>" + obj.bureaux[index].adresse);
       		res.write("</span><br><span class = \"codepo_ville\" >");
	   		res.write(obj.bureaux[index].code_postal + " " + obj.bureaux[index].ville);
       		res.write("</span></p><p>\n\n</p></div>");
       		// Récupération des informations de l'assesseur
       		for(var index2 in obj.bureaux[index].assesseurs){
       			asseseurTemp = obj.bureaux[index].assesseurs[index2];
       			assesseurs.push([asseseurTemp.id,asseseurTemp.valide_assesseur,asseseurTemp.valide_scrutateur]);
       		}
	   	}
	};

	res.write('<div class="Filtrage"> \
   				<h2>FILTRAGE : </h2> \
   				<form class="input01" action=""> \
				<div><label for="check01">Assesseurs</label><input type="radio" id="check01" name="type_benevole" value="Assesseurs" checked></div> \
				<div><label for="check02">Scrutateurs</label><input type="radio" id="check02" name="type_benevole" value="Scrutateurs"></div> \
				</form><form class="input02" action=""<div><label for="check03">Demandes en cours</label><input type="radio" id="check03" name="type_demande" value="en_cours" checked > \
				<label for="check04"> Demandes validées</label><input type="radio" id="check04" name="type_demande" value="valides"></div> \
				</form> \
				<table id="table_benevoles" class="display" cellspacing="0" width="100%"> \
				<thead> \
				<tr> \
				<th>NOM Prénom</th> \
				<th class="colonneAge">Age</th> \
				<th>Email</th> \
				<th>Téléphone</th> \
				<th>Décision</th> \
				</tr> \
				</thead> \
				<tbody>');

	

	for(var index3 in assesseurs){
		for (var index4 in obj.assesseurs){
			if (obj.assesseurs[index4].id == assesseurs[index3][0]){
				//Assesseur en cours
				asseseurTemp = obj.assesseurs[index4];
				res.write("<tr ");
				//Asseseur et scrutateur
				if (asseseurTemp.potentiel_assesseur && asseseurTemp.potentiel_scrutateur){
					if (assesseurs[index3][1]){//Assesseur valide
						res.write("class=\"assesseur_valide");
					}else{
						res.write("class=\"assesseur_non_valide");
					}
					if (assesseurs[index3][2]){//Scrutateur valide
						res.write(" scrutateur_valide\"");
					}else{
						res.write(" scrutateur_non_valide\"");
					}
				}
				//Juste scrutateur
				else if (asseseurTemp.potentiel_assesseur){
					if (assesseurs[index3][1]){//Asseseurs valides
						res.write("class=\"assesseur_valide\" ");
					}else{ 
						res.write("class=\"assesseur_non_valide\" ");
					}
				}
				//Juste assesseur
				else if (asseseurTemp.potentiel_scrutateur){
					if (assesseurs[index3][2]){//Scrutateurs valides
						res.write("class=\"scrutateur_valide\" ");
					}else{
						res.write("class=\"scrutateur_non_valide\" ");
					}
				}
				res.write(">");
				res.write("<td>"+asseseurTemp.nom.toUpperCase()+" "+asseseurTemp.prenom+"</td>");
				res.write("<td>"+asseseurTemp.age+"</td>");
				res.write("<td>"+asseseurTemp.mail+"</td>");
				res.write("<td>"+asseseurTemp.tel+"</td>");
				//Choix par défaut, au démarrage de la page : Assesseurs en cours
				res.write('<td class="decision"><input type="button" class="boutonValider" id="'+ assesseurs[index3][0] +'" name="ValiderAss" value="Valider"></td></tr>');
				res.write("</tr>");
			}
		}
	};

	// Récupération et écriture du footer
	var footer = fs.readFileSync('citizen_press/public/html/liste_president/footer.html','utf8');
	res.write(footer);
	res.end();
});

// Route d'accès au validation d'un bénévole en assesseur ou scrutateur
app.get("/valider/:idBureau/:idAssesseur/:type_benevole", function (req, res) {

	// Récupération des données
	fs.readFile('citizen_press/public/data/data.json', 'utf8', function readFileCallback(err, data){
    	if (err){
       		console.log(err);
   		}
   		else{
 
 		// Récupération des informations transmise dans la route
		var idBureau = req.params.idBureau;
		var idAssesseur = req.params.idAssesseur;
		var benevole = req.params.type_benevole;

		// Parsage du JSON en objet
		var obj = JSON.parse(data); 
    
    	// Pour l'assesseur concerné
    	for(var index in obj.bureaux){
    		if (obj.bureaux[index].id == idBureau){
    			for (var index2 in obj.bureaux[index].assesseurs) {
					if(obj.bureaux[index].assesseurs[index2].id == idAssesseur) {
						// Validation concerné
		    			if(benevole ==  "ValiderAss"){
		        			obj.bureaux[index].assesseurs[index2].valide_assesseur = true;
		        		}
		        		else if(benevole ===  "ValiderScrut"){
		        			obj.bureaux[index].assesseurs[index2].valide_scrutateur = true;
		        		}
		        	}
	        	}
    		}
    	}
    	// Conversion de l'objet json et écriture
		var json = JSON.stringify(obj); 
		fs.writeFile('citizen_press/public/data/data.json', json, 'utf8', -1);  
		}
	});
});


/*****************************************************************************************************************************
********************************************     Fonctions outils     ********************************************************
****************************************************************************************************************************/


// Écrit un SVG à partir des bureaux entré en entrée
// Les bureaux sont à la même adresse (un seul POI)
function writeSvg(bureaux, numPOI,width,height) {	
	var colors = new Array();
	var tauxRemplissage;	
	var nbAssesseursScrutMin = NB_MAX_ASSESSEURS_SCRUTATEUR;
	var svg = new SVG(numPOI,width,height);
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
	svg.setNumber(NB_MAX_ASSESSEURS_SCRUTATEUR - nbAssesseursScrutMin);

	// Ecriture des fichiers
	fs.writeFile("./citizen_press/public/img/icones_SVG/"+svg.url, svg.getContent());
}



/*
 * Fichier pour l'accès à l'image SVG
 * Permet ses modifications :
 	* L'ajout de point,
 	* La modification des couleurs
 	* La modification du chiffre
*/

function SVG(numPOI,width,height) {
	this.url = "svg"+numPOI+".svg";
	this.contentSVG_littleCircles = "";
	this.nbBureau = 0;

	// Init du SVG
	this.contentSVG_init = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
		width="'+width*0.25+'" height="'+height*0.45+'" viewBox="0 0 '+(width-(width*0.25))+' '+height+'" \
		style="enable-background:new 0 0 0 0;" xml:space="preserve">\
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
		if (number < 0) {
			number = 0;
		}
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

// Fonction de récupération de l'âge grâce à la date de naissance
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

module.exports = app;
