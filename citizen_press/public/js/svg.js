/*
 * Fichier pour l'accès à l'image SVG
 * Permet ses modifications :
 	* L'ajout de point,
 	* La modification des couleurs
 	* La modification du chiffre
*/

var svg = function SVG(numPOI) {
	this.url = "svg_"+numPOI+".svg":


	// Execute une requête pour avoir le contenu du fichier
	this.initialise = function() {
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
	}

	// Ajoute le cercle principale 
	// classColor : la classe à ajouter
	this.setBigCircle = function (classColor) {
		this.contentSVG_bigCircle = '<circle class="'+classColor+'"cx="66.7" cy="95.9" r="63.4"/>';
	}

	this.addPoint1 = function(classColor) {
		this.contentSVG_littleCircles = '<circle class="'+classColor+'" cx="66.7" cy="12.9" r="12.4"/>';
	}

	this.addPoint2 = function(classColor) {
		this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="105.4" cy="21.1" r="12.4"/>';
	}

	this.addPoint3 = function(classColor) {
		this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="134.4" cy="44.3" r="12.4"/>';
	}

	this.addPoint4 = function(classColor) {
		this.contentSVG_littleCircles += '<circle class="'+classColor+'" cx="150.4" cy="78.1" r="12.4"/>';
	}

	this.setNumber = function(number) {
		if (number > 9) {
			this.contentSVG_text = '<text transform="matrix(1 0 0 1 37.9507 113.4561)" class="st2 st3 st4">'+number+'</text>';
		}
		else {
			this.contentSVG_text = '<text transform="matrix(1 0 0 1 37.9507 113.4561)" class="st2 st3 st4">0'+number+'</text>';
		}
	}

	this.getContent = function() {
		return this.contentSVG_init+this.contentSVG_bigCircle+this.contentSVG_littleCircles+this.contentSVG_text+"</svg>";
	}
}
module.exports.svg;


