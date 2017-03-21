// Use strict mode
'use strict';

// Load usefull expressjs and nodejs objects / modules
var express = require('express');
var path = require('path');

var app = express();

// Module d'ouverture de fichier et de lecture
var fs = require('fs');


var bodyParser = require('body-parser')

// Recuperation des chemins relatifs
app.use(express.static(path.join(__dirname, 'public')));  

// Route d'accès client
app.get("/", (req, res) => {


});

app.get("/test", (req,res) => {

	res.set({"Content-Type" : "text/html"});
	
	fs.readFile('citizen_press/public/html/test.html','utf8', function(err,data){	// Lecture d'un fichier
		if (err) throw err;
		res.write(data);
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

 	res.set({"Content-Type" : "text/html"});

	// Récupération du header de la page
	fs.readFile('citizen_press/public/html/liste_president/header.html','utf8', function(err,data){	// Lecture d'un fichier
		res.write(data);
	// Ecriture dans la réponse
	});

	 

	// Préparation du parsage JSON pour la création des éléments
	fs.readFile('citizen_press/public/data/data2.json', 'utf8', function (err, data) {
	    if (err) throw err; // à voir 
	    var obj = JSON.parse(data);
	   
	    //var id = req.params.id;
	    var idBureau = req.params.id;

	   	// Initialisation des variables
	    var assesseurs = [];
	    var asseseurTemp;
	    // Parcours des bureaux pour création de points d'intêrets
	    for(var index in obj.bureaux){
	    	if (obj.bureaux[index].id == idBureau){
	    		res.write("<div class=\"resume_buro\"><p class = \"nom_lieu_adresse\">");
	    		res.write(obj.bureaux[index].nom_lieu + "<br><span>" + obj.bureaux[index].adresse);
        		res.write("</span><br><span class = \"codepo_ville\" >");
	    		res.write(obj.bureaux[index].code_postal + " " + obj.bureaux[index].ville);
        		res.write("</span></p><p>\n\n</p></div>");
        		for(var index2 in obj.bureaux[index].assesseurs){
        			asseseurTemp = obj.bureaux[index].assesseurs[index2];
        			assesseurs.push([asseseurTemp.id,asseseurTemp.valide_assesseur,asseseurTemp.valide_scrutateur]);
        		}
	    	}
		};

		res.write('<div class="Filtrage">');
        res.write('<h2>FILTRAGE : </h2>');
        res.write('<form class="input01" action="">');
  		res.write('<div><label for="check01">Assesseurs</label><input type="radio" id="check01" name="type_benevole" value="Assesseurs" checked></div>');
  		res.write('<div><label for="check02">Scrutateurs</label><input type="radio" id="check02" name="type_benevole" value="Scrutateurs"></div>');
  		res.write('</form><form class="input02" action=""<div><label for="check03">Demandes en cours</label><input type="radio" id="check03" name="type_demande" value="en_cours" checked ></div>');
  		res.write('<div><label for="check04">Demandes validées</label><input type="radio" id="check04" name="type_demande" value="valides"></div>');
		res.write('</form>');
		res.write('<table id="table_benevoles" class="display" cellspacing="0" width="100%">');
		res.write('<thead>');
	    res.write('<tr>');
	    res.write('<th>NOM Prénom</th>');
	    res.write('<th class="colonneAge">Age</th>');
	    res.write('<th>Email</th>');
      	res.write('<th>Téléphone</th>');
      	res.write('<th>Décision</th>');
    	res.write('</tr>');
  		res.write('</thead>');
 		res.write(' <tbody>');


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
		}
		res.write("</tbody></table>");
		res.write('<input type="hidden" class="idBureau" id="'+idBureau+'">');

		// Récupération du footer
		fs.readFile('citizen_press/public/html/liste_president/footer.html','utf8', function(err,data){	// Lecture d'un fichier
			res.write(data);	// Ecriture dans la réponse
			res.end();
		});
	});
});

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get("/valider/:idBureau/:idAssesseur/:type_benevole", function (req, res) {
	fs.readFile('citizen_press/public/data/data2.json', 'utf8', function readFileCallback(err, data){
    	if (err){
       		console.log(err);
   		} else {
   			//On récupère chaque variables

   			var idBureau = req.params.idBureau;
   			var idAssesseur = req.params.idAssesseur;
   			var benevole = req.params.type_benevole;

			
    		var obj = JSON.parse(data); //now it an object
	    
	    	for(var index in obj.bureaux){
	    		if (obj.bureaux[index].id == idBureau){
	    			for (var index2 in obj.bureaux[index].assesseurs) {
						if(obj.bureaux[index].assesseurs[index2].id == idAssesseur) {
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
	    	console.log("mdr");
   			var json = JSON.stringify(obj); //convert it back to json
   			fs.writeFile('citizen_press/public/data/data2.json', json, 'utf8', -1); // write it back 
		}
	});
	//Rediriger vers la page, avec les bons checkbox de cochés dans les radio

});


// La page des statistique globales sur les assesseurs
app.get("/	assesseurs", (req, res) => {
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