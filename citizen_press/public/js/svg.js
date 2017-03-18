/*
 * Fichier pour l'accès à l'image SVG
 * Permet ses modifications :
 	* L'ajout de point,
 	* La modification des couleurs
 	* La modification du chiffre
*/



// Le chemin du fichier
var URL_FICHIER_SVG = "./img/map_icon.svg";

// L'objet qui vas nous permettre de modifier le SVG
// TOOD changer avec AJAX
var svg = SVG('drawing').size(600, 600);

var contentSVG_init, contentSVG_bigCircle, contentSVG_littleCircles, contentSVG_text;

initialise();
setBigCircle("red");
addPoint1("green");
addPoint2("yellow");
addPoint3("orange");
setNumber(2);
show();
console.log(svg.svg());


// Execute une requête pour avoir le contenu du fichier
function initialise() {
	contentSVG_init = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
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
function setBigCircle(classColor) {
	contentSVG_bigCircle = '<circle class="'+classColor+'"cx="66.7" cy="95.9" r="63.4"/>';
}

function addPoint1(classColor) {
	contentSVG_littleCircles = '<circle class="'+classColor+'" cx="66.7" cy="12.9" r="12.4"/>';
}

function addPoint2(classColor) {
	contentSVG_littleCircles += '<circle class="'+classColor+'" cx="105.4" cy="21.1" r="12.4"/>';
}

function addPoint3(classColor) {
	contentSVG_littleCircles += '<circle class="'+classColor+'" cx="134.4" cy="44.3" r="12.4"/>';
}

function addPoint4(classColor) {
	contentSVG_littleCircles += '<circle class="'+classColor+'" cx="150.4" cy="78.1" r="12.4"/>';
}

function setNumber(number) {
	if (number > 9) {
		contentSVG_text = '<text transform="matrix(1 0 0 1 37.9507 113.4561)" class="st2 st3 st4">'+number+'</text>';
	}
	else {
		contentSVG_text = '<text transform="matrix(1 0 0 1 37.9507 113.4561)" class="st2 st3 st4">0'+number+'</text>';
	}
}

function show() {
	svg.svg(contentSVG_init+contentSVG_bigCircle+contentSVG_littleCircles+contentSVG_text);
}