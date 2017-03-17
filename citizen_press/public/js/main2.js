/*var fs = require('fs');
$(document).ready(function(){

	$("#bouton").click(function (){

		var civilte = $('select[name=civilite]').text();
		var nom = $("#nom").val();
		var prenom = $("#prenom").val();
		var naissance = $("#naissance").val();
		var email = $("#email").val();
		var mobile = $("#mobile").val();

		fs.readFile('./data/data.json', 'utf8', function readFileCallback(err, data){
    		if (err){
        		console.log(err);
    		} else {
    			obj = JSON.parse(data); //now it an object
    			obj.assesseurs.push({"id": "idAsse1995","nom": "Billaud","prenom": "Quentin","age": 21,"mail": "jg44@gmail.com","tel": "02 51 40 70 25","sexe": "male","potentiel_assesseur": false,"potentiel_scrutateur": true});//add some data
    			json = JSON.stringify(obj); //convert it back to json
    			fs.writeFile('./data/data.json', json, 'utf8', callback); // write it back 
		}});
	});
});*/



