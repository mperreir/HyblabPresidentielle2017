// @Desc: GlobalVariables ----------

// Day of each maps
var mapdayi = 1;
var mapdayj = 1;

// Selection memory
var listSelected = [0,0,0,0,0];

// Dataview list available
var dataviewList = [
['tweet', 'RT'],
['fb', 'fan'],
['web', 'web']
];

// Actual dataview
var dataview = dataviewList[0];

// To convert candidats
var candidatToInt = {
	lepen: 4,
	macron: 1,
	fillon: 3,
	hamon: 2,
	melenchon: 0
}

var intToCandidat = {
	0: 'melenchon',
	1: 'macron',
	2: 'hamon',
	3: 'fillon',
	4: 'lepen'
}

var candidatToAbrv = {
	0: 'JLM',
	1: 'MAC',
	2: 'BNH',
	3: 'FIL',
	4: 'MLP'
}

// Candidates' destinations
var villeCandidat = [[], [], [], [], []];
var trajetCandidat = [[], [], [], [], []];
var trajetSVGCandidat = [[], [], [], [], []];

villeCandidat[candidatToInt['hamon']] = ["Blois", "Arras", "Brest", "Reims", "Marseille", "Le-Havre", "Nice", "Paris"];
trajetCandidat[candidatToInt['hamon']] = [21, 23, 29, 32, 36, 38, 43, 47];
trajetSVGCandidat[candidatToInt['hamon']] = ['bnh1','bnh2','bnh3','bnh4','bnh5','bnh6','bnh7','bnh8']

villeCandidat[candidatToInt['fillon']] = ["Paris", "Nimes", "Paris", "Paris", "Orleans", "Besancon", "Caen"];
trajetCandidat[candidatToInt['fillon']] = [24, 30, 32, 33, 35, 37, 44];
trajetSVGCandidat[candidatToInt['fillon']] = ['fillon1','fillon2','fillon3','fillon4','fillon5', 'fillon6', 'fillon7'];

villeCandidat[candidatToInt['lepen']] = ["Lyon", "Nantes", "Châteauroux", "Metz"];
trajetCandidat[candidatToInt['lepen']] = [5, 26, 39, 46];
trajetSVGCandidat[candidatToInt['lepen']] = ['lepen1','lepen2','lepen3','lepen4']

villeCandidat[candidatToInt['macron']] = ["Lyon", "Toulon", "Londres", "Rocamadour", "Angers", "Paris", "Caen", "Bordeaux"];//, "Dijon"]
trajetCandidat[candidatToInt['macron']] = [5, 18, 21, 24, 28, 30, 32, 37];//51];
trajetSVGCandidat[candidatToInt['macron']] = ['macron1', 'macron1b','macron2','macron3','macron4','macron5','macron6','macron7','macron8']

villeCandidat[candidatToInt['melenchon']] = ["Lyon", "Strasbourg"];//, "Paris", "Rennes", "Le Havre"];
trajetCandidat[candidatToInt['melenchon']] = [5, 15]; //46, ]
trajetSVGCandidat[candidatToInt['melenchon']] = ['melenchon1','melenchon2','melenchon3']

function CleanMap(toclean) {
	/*
	 * @Desc: To clean the map after 10 ms
	 */
	 toclean = false;
	 setTimeout(() => {

	 	function a(carte) {
	 		$(carte).find('#Alsace').css('opacity', 1);
	 		$(carte).find('#Loraine').css('opacity', 1);
	 		$(carte).find('#Nord').css('opacity', 1);
	 		$(carte).find('#Champagne').css('opacity', 1);
	 		$(carte).find('#Picardie').css('opacity', 1);
	 		$(carte).find('#Bourgogne').css('opacity', 1);
	 		$(carte).find('#Franche').css('opacity', 1);
	 		$(carte).find('#RhoneAlpes').css('opacity', 1);
	 		$(carte).find('#Auvergne').css('opacity', 1);
	 		$(carte).find('#Languedoc').css('opacity', 1);
	 		$(carte).find('#PACA').css('opacity', 1);
	 		$(carte).find('#Haute_Normandie').css('opacity', 1);
	 		$(carte).find('#Basse_Normandie').css('opacity', 1);
	 		$(carte).find('#Centre').css('opacity', 1);
	 		$(carte).find('#PDL').css('opacity', 1);
	 		$(carte).find('#IDF').css('opacity', 1);
	 		$(carte).find('#Bretagne').css('opacity', 1);
	 		$(carte).find('#Limousin').css('opacity', 1);
	 		$(carte).find('#Corse').css('opacity', 1);
	 		$(carte).find('#Poitou').css('opacity', 1);
	 		$(carte).find('#Aquitaine').css('opacity', 1);
	 		$(carte).find('#Midi').css('opacity', 1);
	 	};
	 	['#carteToday', '#carteWeek'].map(e => a(e));	
	 }, 10);
	};

	function CleanDataAll() {
	/*
	 * @Desc: To clean graphs
	 */
	 cleanDataGraph(0, activeChart);
	 cleanDataGraph(1, activeChart);
	 cleanDataGraph(2, activeChart);
	 cleanDataGraph(3, activeChart);
	 cleanDataGraph(4, activeChart);
	 cleanDataGraph(0, activeChart2);
	 cleanDataGraph(1, activeChart2);
	 cleanDataGraph(2, activeChart2);
	 cleanDataGraph(3, activeChart2);
	 cleanDataGraph(4, activeChart2);
	}

	$(document).ready(function() {
	/*
	 * @Desc: When document is ready.
	 */

	var pos = 0; // Position in the page

	/*
	 * @Title: BUTTONS
	 */

	$('#graphTwit').click(function() { // Twitter
		dataview = dataviewList[0];
		// Clean graphic
		CleanDataAll();
		// View new line
		$('.graphselected').removeClass('graphselected');
		$('#graphTwit').addClass('graphselected');
		$('.selecttwo').removeClass('selecttwo');
		$('#inside2').show();
		changeDataGraph(data2[0][dataview[0]][candidatToAbrv[candidatToInt[$('.selected')[0].id]]], candidatToInt[$('.selected')[0].id], activeChart)
		changeDataGraph(data2[0][dataview[1]][candidatToAbrv[candidatToInt[$('.selected')[0].id]]], candidatToInt[$('.selected')[0].id], activeChart2)
		listSelected = [0,0,0,0,0];
		$('#titreGraph')[0].innerHTML = "Nombre de tweets liés aux candidats. / Nombre de retweets";
	});

	$('#graphSites').click(function() { // Websites
		dataview = dataviewList[2];
		// Clean graphic
		CleanDataAll();
		// View new line
		$('.graphselected').removeClass('graphselected');
		$('#graphSites').addClass('graphselected');
		$('.selecttwo').removeClass('selecttwo');
		changeDataGraph(data2[0][dataview[0]][candidatToAbrv[candidatToInt[$('.selected')[0].id]]], candidatToInt[$('.selected')[0].id], activeChart)
		$('#inside2').hide();
		listSelected = [0,0,0,0,0];
		$('#titreGraph')[0].innerHTML = "Audience des sites webs des candidats.";
	});

	$('#graphFace').click(function() { // Facebook
		dataview = dataviewList[1];
		// Clean graphic
		CleanDataAll();
		// View new line
		$('.graphselected').removeClass('graphselected');
		$('#graphFace').addClass('graphselected');
		$('.selecttwo').removeClass('selecttwo');
		$('#inside2').show();
		changeDataGraph(data2[0][dataview[0]][candidatToAbrv[candidatToInt[$('.selected')[0].id]]], candidatToInt[$('.selected')[0].id], activeChart)
		changeDataGraph(data2[0][dataview[1]][candidatToAbrv[candidatToInt[$('.selected')[0].id]]], candidatToInt[$('.selected')[0].id], activeChart2)
		listSelected = [0,0,0,0,0];
		$('#titreGraph')[0].innerHTML = "Augmentation en % du nombre de fan Facebook. / Nombre de fans des candidats";
	});

	function cleanVille() {
		// Clean cities & target on the map
		$('body').find('.city').hide();
		trajetSVGCandidat.map(e => e.map(s => $('body').find('#'+s).hide()));
	}

	function afficherTrajet(candidat, date) {
		// To view a ride
		cleanVille();
		var j = 0;
		for (var i = 0; i < date - 1; i++) {
			$('body').find('#Paris').css('fill', 'red')
			if (trajetCandidat[candidatToInt[candidat]][i] < date) {
				$('body').find('#'+villeCandidat[candidatToInt[candidat]][i]).show();
				$('body').find('#'+villeCandidat[candidatToInt[candidat]][i]).css('fill', 'red');
				(j!=0 || villeCandidat[candidatToInt[candidat]][i] != "Paris") ? j = j+1 : NaN;
			}
			if (trajetCandidat[candidatToInt[candidat]][i] == date) {
				$('body').find('#'+villeCandidat[candidatToInt[candidat]][i]).show();
				$('body').find('#'+villeCandidat[candidatToInt[candidat]][i]).css('fill', 'orange');
				(j!=0 || villeCandidat[candidatToInt[candidat]][i] != "Paris") ? j = j+1 : NaN;
			}
		}
		for (var k = 0; k < j; k++) {
			$('body').find('#'+trajetSVGCandidat[candidatToInt[candidat]][k]).show();
		}
	};

	function updateMap() {
		var toclean = false;
		var candidat = $('nav').find('.selected')[0];
		if (candidat == undefined) {
			CleanMap(toclean);
		}
		else {
			candidat = candidat.id;
			if (candidat == 'lepen') {
				updateOpacityToday('MLP', mapdayi);
				updateOpacity('MLP', mapdayj);
			}
			if (candidat == 'macron') {
				updateOpacityToday('MAC', mapdayi);
				updateOpacity('MAC', mapdayj);
			}
			if (candidat == 'melenchon') {
				updateOpacityToday('JLM', mapdayi);
				updateOpacity('JLM', mapdayj);
			}
			if (candidat == 'fillon') {
				updateOpacityToday('FIL', mapdayi);
				updateOpacity('FIL', mapdayj);
			}
			if (candidat == 'hamon') {
				updateOpacityToday('BHM', mapdayi);
				updateOpacity('BHM', mapdayj);
			}
		}	
	};

	var listCandidat = {
		melenchon: [
		'Jean-Luc Mélenchon',
		'France Insoumise',
		"Sous les couleurs de la coalition du Front de gauche, dont le PG fait partie, il est élu député européen dans la circonscription Sud-Ouest en 2009 et réélu en 2014. Il est candidat de cette coalition à l'élection présidentielle de 2012, où il arrive en quatrième position au premier tour, avec 11,1 % des voix. Il est candidat à l'élection présidentielle de 2017, « hors cadre de partis » et sans le Front de gauche, mais au nom du mouvement La France Insoumise (FI), qu'il fonde en février 2016."
		],
		lepen: [
		'Marine Le Pen',
		'Front National',
		"Elle est élue présidente du Front national au congrès de Tours de janvier 2011, succédant ainsi à son père, Jean-Marie Le Pen, qui dirigeait le parti depuis sa fondation. Candidate à l'élection présidentielle de 2012, elle arrive en troisième position au premier tour en obtenant 17,90 % des suffrages exprimés, soit un meilleur résultat que tous ceux obtenus par son père au premier tour d'une élection présidentielle française."
		],
		macron: [
		'Emmanuel Macron',
		'En marche !',
		"Membre du Parti socialiste entre 2006 et 2009, il est nommé secrétaire général adjoint de la présidence de la République auprès de François Hollande en 2012 puis ministre de l'Économie, de l'Industrie et du Numérique en 2014 dans le gouvernement Manuel Valls II. \nEn avril 2016, il fonde le mouvement politique « En marche ! » puis démissionne de ses fonctions de ministre en août de la même année. Trois mois plus tard, le 16 novembre, il annonce sa candidature à l'élection présidentielle de 2017."
		],
		fillon: [
		'François Fillon',
		'Les républicains',
		"Le 17 mai 2007, à la suite de la victoire de Nicolas Sarkozy à l'élection présidentielle, il est nommé Premier ministre, conduisant trois gouvernements et étant l'unique chef de gouvernement de la législature. Il quitte ses fonctions le 10 mai 2012, après la défaite de Nicolas Sarkozy à l'élection présidentielle.\n Candidat à la primaire de la droite et du centre de 2016, il défend un programme libéral-conservateur. Il l’emporte au second tour face à Alain Juppé et devient le candidat de son camp pour l'élection présidentielle de 2017."
		],
		hamon: [
		'Benoit Hamon',
		'Parti Socialiste',
		"Élu député de la onzième circonscription des Yvelines en 2012, il est membre du gouvernement du 16 mai 2012 au 25 août 2014, en tant que ministre délégué à l'Économie sociale et solidaire et à la consommation puis ministre de l'Éducation nationale, de l'Enseignement supérieur et de la Recherche.\n Benoît Hamon remporte la primaire citoyenne de 2017 devant Manuel Valls, et devient ainsi le candidat du Parti socialiste à l'élection présidentielle de 2017."
		]
	}

	function setCandidate(candidate) {
		$('body').find('.identity').find('h2')[0].innerHTML = listCandidat[candidate][0];
		$('body').find('.identity').find('h3')[0].innerHTML = listCandidat[candidate][1];
		$('body').find('.identity').find('p')[0].innerHTML = listCandidat[candidate][2];
	}

	$('nav').find('.candidat').click(function() {
		var candidatClass = this.id;
		var toclean = false;
		if(pos == 0) {
			// Si on est à l'état des cartes
			$('#carteToday').find('.region').removeClass('macron');
			$('#carteToday').find('.region').removeClass('lepen');
			$('#carteToday').find('.region').removeClass('fillon');
			$('#carteToday').find('.region').removeClass('hamon');
			$('#carteToday').find('.region').removeClass('melenchon');
			$('#carteWeek').find('.region').removeClass('macron');
			$('#carteWeek').find('.region').removeClass('lepen');
			$('#carteWeek').find('.region').removeClass('fillon');
			$('#carteWeek').find('.region').removeClass('hamon');
			$('#carteWeek').find('.region').removeClass('melenchon');		
			$('.color').removeClass('macron');
			$('.color').removeClass('lepen');
			$('.color').removeClass('fillon');
			$('.color').removeClass('hamon');
			$('.color').removeClass('melenchon');
			CleanDataAll();
			listSelected = [0,0,0,0,0];
			if($(this).hasClass('selected')) {	
				$(this).removeClass('selected');
				toclean = true;
			} else {
				$(this).addClass('selected');
				$(".candidat").not($(this)).removeClass('selected');
				$('#carteToday').find('.region').addClass(candidatClass);
				$('#carteWeek').find('.region').addClass(candidatClass);
				$('.color').addClass(candidatClass);
			}
			if(candidatClass === 'lepen') {
				// $('footer').find('.tete').css('background-image', 'url(PNG/lepenphoto.png)');
				$.find('#bigphoto')[0].setAttribute('src', 'img/lepen.png')
				updateOpacityToday('MLP', mapdayi);
				updateOpacity('MLP', mapdayj);
				setCandidate('lepen');
				((toclean) ? CleanMap(toclean) : NaN);
				changeDataGraph(data2[0][dataview[0]]['MLP'], 4, activeChart);
				changeDataGraph(data2[0][dataview[1]]['MLP'], 4, activeChart2);
				((toclean) ? cleanDataGraph(4, activeChart) : NaN);
				((toclean) ? cleanDataGraph(4, activeChart2) : NaN);
				afficherTrajet('lepen', mapdayi);
				$.find('.color')[0].style.background = "#0806ff";
				$.find('.color')[1].style.background = "#0806ff";
				$.find('.color')[2].style.background = "#0806ff";
				$.find('.color')[3].style.background = "#0806ff";
				$.find('.color')[4].style.background = "#0806ff";

			}

			if(candidatClass === 'macron') {
				// $('footer').find('.tete').css('background-image', 'url(PNG/macronphoto.png)');
				$.find('#bigphoto')[0].setAttribute('src', 'img/macron.png')
				updateOpacityToday('MAC', mapdayi);
				updateOpacity('MAC', mapdayj);
				setCandidate('macron');
				((toclean) ? CleanMap(toclean) : NaN);
				changeDataGraph(data2[0][dataview[0]]['MAC'], 1, activeChart);
				changeDataGraph(data2[0][dataview[1]]['MAC'], 1, activeChart2);
				((toclean) ? cleanDataGraph(1, activeChart) : NaN);
				((toclean) ? cleanDataGraph(1, activeChart2) : NaN);
				afficherTrajet('macron', mapdayi);
				$.find('.color')[0].style.background = "#52378C";
				$.find('.color')[1].style.background = "#52378C";
				$.find('.color')[2].style.background = "#52378C";
				$.find('.color')[3].style.background = "#52378C";
				$.find('.color')[4].style.background = "#52378C";
			}

			if(candidatClass === 'fillon') {
				// $('footer').find('.tete').css('background-image', 'url(PNG/fillonphoto.png)');
				$.find('#bigphoto')[0].setAttribute('src', 'img/fillon.png')
				updateOpacityToday('FIL', mapdayi);
				updateOpacity('FIL', mapdayj);
				setCandidate('fillon');
				((toclean) ? CleanMap(toclean) : NaN);
				changeDataGraph(data2[0][dataview[0]]['FIL'], 3, activeChart);
				changeDataGraph(data2[0][dataview[1]]['FIL'], 3, activeChart2);
				((toclean) ? cleanDataGraph(3, activeChart) : NaN);
				((toclean) ? cleanDataGraph(3, activeChart2) : NaN);
				afficherTrajet('fillon', mapdayi);
				$.find('.color')[0].style.background = "#15BFBF";
				$.find('.color')[1].style.background = "#15BFBF";
				$.find('.color')[2].style.background = "#15BFBF";
				$.find('.color')[3].style.background = "#15BFBF";
				$.find('.color')[4].style.background = "#15BFBF";
			}

			if(candidatClass === 'hamon') {
				// $('footer').find('.tete').css('background-image', 'url(PNG/hamonphoto.png)');
				$.find('#bigphoto')[0].setAttribute('src', 'img/hamon.png')	
				updateOpacityToday('BHM', mapdayi);
				updateOpacity('BHM', mapdayj);
				setCandidate('hamon');
				((toclean) ? CleanMap(toclean) : NaN);
				changeDataGraph(data2[0][dataview[0]]['BNH'], 2, activeChart);
				changeDataGraph(data2[0][dataview[1]]['BNH'], 2, activeChart2);
				((toclean) ? cleanDataGraph(2, activeChart) : NaN);
				((toclean) ? cleanDataGraph(2, activeChart2) : NaN);
				afficherTrajet('hamon', mapdayi);
				$.find('.color')[0].style.background = "#F24472";
				$.find('.color')[1].style.background = "#F24472";
				$.find('.color')[2].style.background = "#F24472";
				$.find('.color')[3].style.background = "#F24472";
				$.find('.color')[4].style.background = "#F24472";
			}

			if(candidatClass === 'melenchon') {
				// $('footer').find('.tete').css('background-image', 'url(PNG/melanchonphoto.png)');
				$.find('#bigphoto')[0].setAttribute('src', 'img/melanchon.png')
				updateOpacityToday('JLM', mapdayi);
				updateOpacity('JLM', mapdayj);
				setCandidate('melenchon');
				((toclean) ? CleanMap(toclean) : NaN);
				changeDataGraph(data2[0][dataview[0]]['JLM'], 0, activeChart);
				changeDataGraph(data2[0][dataview[1]]['JLM'], 0, activeChart2);
				((toclean) ? cleanDataGraph(0, activeChart) : NaN);
				((toclean) ? cleanDataGraph(0, activeChart2) : NaN);
				afficherTrajet('melenchon', mapdayi);
				$.find('.color')[0].style.background = "#f20f05";
				$.find('.color')[1].style.background = "#f20f05";
				$.find('.color')[2].style.background = "#f20f05";
				$.find('.color')[3].style.background = "#f20f05";
				$.find('.color')[4].style.background = "#f20f05";
			}
		}
		if (pos == 1) {
			if($(this).hasClass('selected')) {	
				NaN;
			} else {
				if ($(this).hasClass('selecttwo')) {
					$(this).removeClass('selecttwo');
					if(candidatClass === 'lepen') {
						listSelected[4] = 0;
						cleanDataGraph(4, activeChart);
						cleanDataGraph(4, activeChart2);
					}
					if(candidatClass === 'macron') {
						listSelected[1] = 0;
						cleanDataGraph(1, activeChart);
						cleanDataGraph(1, activeChart2);
					}

					if(candidatClass === 'fillon') {
						listSelected[3] = 0;
						cleanDataGraph(3, activeChart);
						cleanDataGraph(3, activeChart2);
					}

					if(candidatClass === 'hamon') {
						listSelected[2] = 0;
						cleanDataGraph(2, activeChart);
						cleanDataGraph(2, activeChart2);
					}

					if(candidatClass === 'melenchon') {
						listSelected[0] = 0;
						cleanDataGraph(0, activeChart);
						cleanDataGraph(0, activeChart2);
					}
				}
				else {
					$(this).addClass('selecttwo');
					if(candidatClass === 'lepen') {
						listSelected[4] = 1;
						changeDataGraph(data2[0][dataview[0]]['MLP'], 4, activeChart)
						changeDataGraph(data2[0][dataview[1]]['MLP'], 4, activeChart2)
					}
					if(candidatClass === 'macron') {
						listSelected[1] = 1;
						changeDataGraph(data2[0][dataview[0]]['MAC'], 1, activeChart)
						changeDataGraph(data2[0][dataview[1]]['MAC'], 1, activeChart2)
					}

					if(candidatClass === 'fillon') {
						listSelected[3] = 1;
						changeDataGraph(data2[0][dataview[0]]['FIL'], 3, activeChart)
						changeDataGraph(data2[0][dataview[1]]['FIL'], 3, activeChart2)
					}

					if(candidatClass === 'hamon') {
						listSelected[2] = 1;
						changeDataGraph(data2[0][dataview[0]]['BNH'], 2, activeChart)
						changeDataGraph(data2[0][dataview[1]]['BNH'], 2, activeChart2)
					}

					if(candidatClass === 'melenchon') {
						listSelected[0] = 1;
						changeDataGraph(data2[0][dataview[0]]['JLM'], 0, activeChart)
						changeDataGraph(data2[0][dataview[1]]['JLM'], 0, activeChart2)
					}
				}
			};
		}
	});

$('body').find('#mapday1')[0].innerHTML = getDate(mapdayi);
$('body').find('#mapday2')[0].innerHTML = getDate(mapdayj);

function getDate(jour) {
	var listJour = ['Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.', 'Lun.', 'Mar.'];
	return (listJour[(jour-1) % 7]).toString() + ' ' + (((jour-1)%28)+1).toString() + ' ' + ((jour < 29) ? 'février.' : 'mars').toString();

}

$('body').find('#mapday1+').click(() => {
	((mapdayi <= 48) ? mapdayi++ : NaN);
	$('body').find('#mapday1')[0].innerHTML = getDate(mapdayi);
	updateMap();
	afficherTrajet($('nav').find('.selected')[0].id, mapdayi);

});

$('body').find('#mapday1-').click(() => {
	((mapdayi > 1) ? mapdayi-- : NaN);
	$('body').find('#mapday1')[0].innerHTML = getDate(mapdayi);
	updateMap();
	afficherTrajet($('nav').find('.selected')[0].id, mapdayi);

});

$('body').find('#mapday2+').click(() => {
	((mapdayj <= 48) ? mapdayj++ : NaN);
	$('body').find('#mapday2')[0].innerHTML = getDate(mapdayj);
	updateMap();

});

$('body').find('#mapday2-').click(() => {
	((mapdayj > 1) ? mapdayj-- : NaN);
	$('body').find('#mapday2')[0].innerHTML = getDate(mapdayj);
	updateMap();

});

document.addEventListener('scroll', function (event) {

	if ($('body').scrollTop() >= 1400) {
		pos = 1;
		$('#conseil').show()
		if (listSelected[4] === 1) {
			$('#lepen').addClass('selecttwo');
		}
		if (listSelected[1] === 1) {
			$('#macron').addClass('selecttwo');
		}
		if (listSelected[3] === 1) {
			$('#fillon').addClass('selecttwo');
		}
		if (listSelected[2] === 1) {
			$('#hamon').addClass('selecttwo');
		}
		if (listSelected[0] === 1) {
			$('#melenchon').addClass('selecttwo');
		}

	}
	else {
		pos = 0;
		$('#conseil').hide()
		$('.selecttwo').removeClass('selecttwo');
	}
}, true /* Event capture */);


	// Initialization

	$('#carteToday').find('.region').addClass('melenchon');
	$('#carteWeek').find('.region').addClass('melenchon');
	$('.color').addClass('melenchon');

	updateMap();
	setCandidate('melenchon');
	CleanDataAll();

	changeDataGraph(data2[0][dataview[0]]['JLM'], 0, activeChart);
	changeDataGraph(data2[0][dataview[1]]['JLM'], 0, activeChart2);
	cleanVille(); 
	$('#titreGraph')[0].innerHTML = "Nombre de tweets liés au candidat / Nombre de retweets.";


});
