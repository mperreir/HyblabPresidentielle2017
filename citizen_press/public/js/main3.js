$(document).ready(function(){

	// Coordonnées de départ pour la map
	var $latitude = 47.28328309531121,
	$longitude = -1.518387794494629,
	$map_zoom = 13;

	var infoWindows = new Map();
	var markers = new Map();

	var NB_ASSESSEURS_MAX = 8;
	var NB_SCRUTATEURS_MAX = 25;

	var ORANGE = "#f1a72e";
	var JAUNE = "#f4d05d";
	var ROUGE = "#ee5a58";
	var VERT = "#aed17c";
	var BLEU = "#5D91EE";

	var msgNeedYou = "CE BUREAU A BESOIN DE VOUS !";
	var msgNotNeedYou = "CE BUREAU EST PLEIN!"

	var nbPOI = 0;

	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	
    var $marker_me = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';
    

    // Déclaration du marker
   /* var $marker_POI = {
        url: "./img/map_icon.svg",
        size: new google.maps.Size(31, 32)
        //anchor: new google.maps.Point(25,50),
        //scaledSize: new google.maps.Size(50,50)
    }
    //var marker_POI = './img/map_icon.svg';
*/
    
/******************************************************************/    
 
	var map_options;
	var map;

	var	$main_color = '#000',
	$saturation= -20,
	$brightness= 5;

	var style= [ 
    	{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}
	];
		
	map_options = {
      	center: new google.maps.LatLng($latitude, $longitude),
      	zoom: $map_zoom,
      	panControl: true,
      	zoomControl: true,
      	mapTypeControl: false,
      	streetViewControl: true,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: true,
      	styles: style,
	}
	// Déclaration de la map
	map = new google.maps.Map(document.getElementById('google-container'), map_options);      
  

	// Une fois que la map est créée on peut charger les éléments pour la recherche d'adresse
	initAutocomplete();
	 

 /******************************LEGENDE*******************************/   
 
 openLegend();
 // Ouverture de la légende
$("#open").click(function() {
    openLegend();
});
  
// Fermeture de la légende  
$("#close").click(function() {
    closeLegend();
});
    
function openLegend() {
 	$(".legende").css("padding-bottom", "450px");
    $(".legende").css("padding-right", "250px");
    $(".legende h5").css("display", "block");
    $(".leg-block").css("display", "inline-block");
    $("#open").css("display", "none");
    $("#close").css("display", "block");
 }
    

function closeLegend() {
	$(".legende").css("padding-bottom", "0px");
    $(".legende").css("padding-right", "0px");
    $(".legende h5").css("display", "none");
    $(".leg-block").css("display", "none");
    $("#open").css("display", "block");
    $("#close").css("display", "none");
}
/*****************************GEOLOC*******************************/
    
var infoWindow = new google.maps.InfoWindow({map: map});
    
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Votre position');
            
            var marker = new google.maps.Marker({
			  	position: new google.maps.LatLng(pos),
			    map: map,
			    visible: true,
			 	icon: $marker_me,
			});
           map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());

			var zoomControlDiv = document.createElement('div');
			var zoomControl = new CustomZoomControl(zoomControlDiv, map);

			map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
          });
        
        } else {
            
         // handleLocationError(false, infoWindow, map.getCenter());
        }


      


/*****************************PLACEMENT DES MARQUEURS*******************************/
	var bureaux = new Map();
	
	// Récuperation de tous les points d'intérêts et ajout dans la map
	$.ajax({
	    url: "/citizen_press/bureaux",
	    type: "GET",
	    dataType: "json",
	    contentType: "application/json",
	    //async: false, // Mode synchrone
	    cache: false,
	    timeout: 5000,

	    success: function(data) {
	    	//console.log("success");
	    	var tabAdresseTaille = new Array(); 
	    	var tabAdresse = new Array(); 
	    	var numBureauPOI = 0;
	    	var contentString;
	    	var url_marker;
	    	var cptSpe = 0;
	    	// Pour avoir le nombre de POI à placer
	    	data.forEach(function(bureau) {
		    	// Si le POI n'est pas encore placé, on le place
		    	if (tabAdresseTaille.indexOf(bureau.adresse) == -1) {
		    		tabAdresseTaille.push(bureau.adresse);
		    		nbPOI++;
		    	}
			});
	    	// Place les marqueur sur la carte
		    data.forEach(function(bureau) {
		    	// Si le POI n'est pas encore placé, on le place
		    	if (tabAdresse.indexOf(bureau.adresse) == -1) {
		    		// Contenu HTML de la bubulle
					numBureauPOI++;
		    		contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading'+numBureauPOI+'">'+bureau.nom_lieu+'</h1>'+
					'<div id="bodyContent">'+
					'<p id="p1'+numBureauPOI+'" class="adress" >'+bureau.adresse+'</p>'+'<p id="p2'+numBureauPOI+'">'+bureau.code_postal+' '+bureau.ville+'</p>'+'<h1>BUREAU DE VOTE</h1>'+'<form>'+'<select id="bureauxPOI'+numBureauPOI+'" class="listePOI">'+'<option selected id="bureau'+bureau.id+'">'+bureau.id+'</option></select></form>'+
					'</div>'+
					'</div>';
		    		tabAdresse.push(bureau.adresse);
		    		createSVG(bureau.adresse, numBureauPOI);
		    		url_marker = "./img/svg"+numBureauPOI+".svg";
		    		//console.log(url_marker);
					placerMarqueur(bureau.lat, bureau.long, contentString, numBureauPOI, nbPOI, bureau.id, url_marker);
		    	}
		    	// Le POI est déjà ajouté, donc on ajoute le bureau au POI
		    	else {
			    	addBureauxPOI(bureau.id, numBureauPOI);
		    	}
			});

	      	//console.log("process sucess");
	   	},

	   	complete: function() {
	   		// Hidden all pages
	   		for (var i = 1; i <= nbPOI; i++) {
	    		$(".POI"+i).css("display", "none");
		    }
		    // Ajout de la fermeture des pages à toutes les images
		    addListenerClick(nbPOI);
	   	},

		error: function(xhr, status, error) {
			console.log(error);
		},
	});



	function addListenerClick(nbPOI) {
		// Pour fermer la page du côté lors du clique sur la fleche
		$(".fermer").click(function() {
			// TODO adapter au dynamisme
			for (var i = 1; i <= nbPOI; i++) {
	   			//console.log(".POI"+i);
	    		$(".POI"+i).css("display", "none");
		    }
		    $("#google-container").css("width", "100%");
		    $("#google-container").css("height", "100vh");
		    $("#google-container").css("transition-delay", "0s");
			$(".other").css("display", "none");
			// TODO ajouter par rapport au tableau

	        infoWindows.forEach(function(element, key) {
				element.close(map, markers.get(key));
			});

		});
	}

	
	
	function addListenerChange(numBureauPOI) {
		// Affichage des bonnes données selon le bureau choisi
		var newBureauPOI;
		var nbAssesseurValide = 0;
		var nbScrutateurValide = 0;

		// Retrait des affectation de l'evenement change
		$('#bureauxPOI'+numBureauPOI).off("change");

		// Ajout de l'affectation de l'evenement change
		$('#bureauxPOI'+numBureauPOI).change(function(){
		
			// Récupération de la valeur de la liste
			newBureauPOI = $( this ).val();

			// Récupération des informations sur le bureau
			$.ajax({
			    url: '/citizen_press/bureaux/'+newBureauPOI,
			    type: "GET",
			    dataType: "text",
			    contentType: "application/json",
			    //async: false, // Mode synchrone
			    cache: false,
			    timeout: 5000,

			    success: function(data) {
			    	// Parsage du JSON pour connaitre le nombre d'assesseurs et scrutateurs validés
			    	var obj = JSON.parse(data);
			    	obj.assesseurs.forEach(function(assesseur){
			    		if(assesseur.valide_assesseur==true){
			    			nbAssesseurValide++;
			    		}
			    		if(assesseur.valide_scrutateur==true){
			    			nbScrutateurValide++;
			    		}
			    	});

			    },
			   	complete: function() {
			   		// Ecriture des résultats --> Vers des graphiques

			   		// Reinit de la partie des graphiques (évite le doubelement de taille)
			   		var percentAss = nbAssesseurValide/NB_ASSESSEURS_MAX;
			   		var percentScrut = nbScrutateurValide/NB_SCRUTATEURS_MAX;

			   		percentAss = adjust(percentAss);
			   		percentScrut= adjust(percentScrut);

			   		var ctxAss = document.getElementById("graphContenuAssesseur"+numBureauPOI);
			   		var ctxScrut = document.getElementById("graphContenuScrutateur"+numBureauPOI);
					
					var myDoughnutAss;
					var myDoughnutScrut;

					var colorAss;
					var colorScrut;

					var resteAss = getReste(NB_ASSESSEURS_MAX, nbAssesseurValide);
					var resteScrut = getReste(NB_SCRUTATEURS_MAX, nbScrutateurValide);

					$(".percentAss").text(auMillieme((percentAss*100))+"%");
			   		$(".percentScrut").text(auMillieme((percentScrut*100))+"%");

			   		$(".nbAssesseurs").text(nbAssesseurValide);
			   		$(".nbScrutateurs").text(nbScrutateurValide);


					colorAss = getColor(percentAss);
					colorScrut = getColor(percentScrut);

					// La construction des graphiques
			   		myDoughnutAss = new Chart(ctxAss, {
					    type: 'doughnut',
					    data: {
						    labels: [
						        "Inscrits",
						        "Places restantes"
						    ],
						    datasets: [
						        {
						            data: [nbAssesseurValide, resteAss],
						            backgroundColor: [
						                colorAss,
						                "#F2F2F2"
						            ]
						        }]
						}
					});

					myDoughnutScrut = new Chart(ctxScrut, {
					    type: 'doughnut',
					    data: {
						    labels: [
						        "Inscrits",
						        "Places restantes"
						    ],
						    datasets: [
						        {
						            data: [nbScrutateurValide, resteScrut],
						            backgroundColor: [
						                colorScrut,
						                "#F2F2F2"
						            ]
						        }]
						}
					});

					nbAssesseurValide = 0;
					nbScrutateurValide = 0;

					if ((percentAss==1)&&(percentScrut==1)) {
						$("#msgNeed").text(msgNotNeedYou);
					}
					else {
						$("#msgNeed").text(msgNeedYou);
					}

					$(".idBureau").attr("value", newBureauPOI);
			   		
			   	},
				error: function(xhr, status, error) {
					console.log(error);
				},
			});	
		});		
	}

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    	infoWindow.setPosition(pos);
    }

	function CustomZoomControl(controlDiv, map) {
	    
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

	    
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	   
	// Ajoute un marqueur à la carte à la latitdue_POI et à la longitude_POI
	// numBureauPOI : le numéro du POI à ajouter
	// nbBureau : Le nombre de bureau
	function placerMarqueur(latitude_POI, longitude_POI, contentString, numBureauPOI, nbPOI, bureauId, url_marker) {

		var valPlus = 0.8;
		if (window.devicePixelRatio > 1.5) {
			valPlus = 1.25;
		}
		var width = window.screen.width*valPlus;
		var height = window.screen.height*valPlus;

		var nbAssesseurValide = 0;
		var nbScrutateurValide = 0;

		var $marker_POI = {
	        url: url_marker,
	        //size: new google.maps.Size(45,60)
	     	size: new google.maps.Size((width/23),(height/10)),
	     	//anchor: new google.maps.Point(0,20)
	     	//scaledSize: new google.maps.Size(180,180)
    	}

		markers.set(numBureauPOI, new google.maps.Marker({
		  	position: new google.maps.LatLng(latitude_POI, longitude_POI),
		    map: map,
		    visible: true,
		 	icon: $marker_POI,

		}));

		// Definition de la fenetre
		infoWindows.set(numBureauPOI, new google.maps.InfoWindow({content: contentString}));

		markers.get(numBureauPOI).addListener('click', function() {
			for (var i = 1; i <= nbPOI; i++) {
	   			//console.log(".POI"+i);
	    		$(".POI"+i).css("display", "none");
		    }
	    	// Affiche la page du PI
		    $(".POI"+numBureauPOI).css("display", "block");
		    $("#google-container").css("width", "62%");
		    $("#google-container").css("height", "90vh");
		    $("#google-container").css("transition-delay", "1s");
    		$(".other").css("display", "block");    
       
       		// Affichage de la bonne bubulles
    		infoWindows.forEach(function(element, key) {
		    	//$(".POI"+key).css("display", "none");
    			element.close(map, markers.get(key));
    		});

    		// Ouverture de la bubulle
    		infoWindows.get(numBureauPOI).open(map, markers.get(numBureauPOI));

    		$.ajax({
			    url: '/citizen_press/bureaux/'+bureauId,
			    type: "GET",
			    dataType: "text",
			    contentType: "application/json",
				async: false, // Mode synchrone
			    cache: false,
			    timeout: 5000,

			    success: function(data) {
			    	var obj = JSON.parse(data);
			    	obj.assesseurs.forEach(function(assesseur){
			    		if(assesseur.valide_assesseur==true){
			    			nbAssesseurValide++;
			    		}
			    		if(assesseur.valide_scrutateur==true){
			    			nbScrutateurValide++;
			    		}
			    	});
			    },

			   	complete: function() {
			   		// Toujours l'affichage des infos --> Vers des graphes
			    	//$('.POI'+numBureauPOI+' #graphContenuAssesseur').html("<p> Nombre d'assesseur validés : "+nbAssesseurValide+" </p>");
			   		//$('.POI'+numBureauPOI+' #graphContenuScrutateur').html("<p> Nombre de scrutateurs validés : "+nbScrutateurValide+" </p>");

			   		var percentAss = nbAssesseurValide/NB_ASSESSEURS_MAX;
			   		var percentScrut = nbScrutateurValide/NB_SCRUTATEURS_MAX;

			   		percentAss = adjust(percentAss);
			   		percentScrut= adjust(percentScrut);

			   		var ctxAss = document.getElementById("graphContenuAssesseur"+numBureauPOI);
			   		var ctxScrut = document.getElementById("graphContenuScrutateur"+numBureauPOI);
					
					var myDoughnutAss;
					var myDoughnutScrut;

					var colorAss;
					var colorScrut;

					var resteAss = getReste(NB_ASSESSEURS_MAX, nbAssesseurValide);
					var resteScrut = getReste(NB_SCRUTATEURS_MAX, nbScrutateurValide);

					$(".percentAss").text(auMillieme((percentAss*100))+"%");
			   		$(".percentScrut").text(auMillieme((percentScrut*100))+"%");

			   		$(".nbAssesseurs").text(nbAssesseurValide);
			   		$(".nbScrutateurs").text(nbScrutateurValide);


					colorAss = getColor(percentAss);
					colorScrut = getColor(percentScrut);

					// La construction des graphiques
			   		myDoughnutAss = new Chart(ctxAss, {
					    type: 'doughnut',
					    data: {
						    labels: [
						        "Inscrits",
						        "Places restantes"
						    ],
						    datasets: [
						        {
						            data: [nbAssesseurValide, resteAss],
						            backgroundColor: [

						                colorAss,
						                "#F2F2F2"
						            ]
						        }]
						}
					});

					myDoughnutScrut = new Chart(ctxScrut, {
					    type: 'doughnut',
					    data: {
						    labels: [
						        "Inscrits",
						        "Places restantes"
						    ],
						    datasets: [
						        {
						            data: [nbScrutateurValide, resteScrut],
						            backgroundColor: [

						                colorScrut,
						                "#F2F2F2"

						            ]
						        }]
						}
					});

					if ((percentAss==1)&&(percentScrut==1)) {
						$("#msgNeed").text(msgNotNeedYou);
					}
					else {
						$("#msgNeed").text(msgNeedYou);
					}

					nbAssesseurValide = 0;
					nbScrutateurValide = 0;
			   		
					$(".idBureau").attr("value", bureauId);
			   		
			   		
			   		// Ajout de l'evenement du click sur la fenetre
			   		markers.get(numBureauPOI).addListener('click', function() {

						for (var i = 1; i <= nbPOI; i++) {
				   			//console.log(".POI"+i);
				    		$(".POI"+i).css("display", "none");
					    }
				    	// Affiche la page du PI
					    $(".POI"+numBureauPOI).css("display", "block");
					    $("#google-container").css("width", "65%");
					    $("#google-container").css("height", "90vh");
					    $("#google-container").css("transition-delay", "1s");
			    		$(".other").css("display", "block");    
			       
			       		// Affichage de la bonne bubulle
			    		infoWindows.forEach(function(element, key) {
					    	//$(".POI"+key).css("display", "none");
			    			element.close(map, markers.get(key));
			    		});

				    	// Ouverture de la bubulle
			    		infoWindows.get(numBureauPOI).open(map, markers.get(numBureauPOI));
					});
				},
				error: function(xhr, status, error) {
					//console.log("ça a bien bugé");
					console.log(error);
				},
			});

    		// Récuperation des données sur la fenêtre de droite;
    		//getDataBureau();
		    // TODO à changer
		  /* navigator.geolocation.getCurrentPosition(function(position) {
		    
		    var pos = {
	              lat: position.coords.latitude_POI,
	              lng: position.coords.longitude_POI
	            };
		    
		    map.setCenter(pos);
		        
		    });*/
		});
		// Recherche des informations du premier bureau
		
	}

	function createSVG(adresse, numPOI) {
		var valPlus = 0.75;
		if (window.devicePixelRatio > 1.5) {
			valPlus = 1.25;
		}
		var width = window.screen.width*valPlus;
		var height = window.screen.height*valPlus;
		$.ajax({
			url:"bureaux/"+adresse+"/"+numPOI+"/"+width+"/"+height,
			type: "GET",
		    dataType: "text",
		    cache: false,
		    async: false,
		    timeout: 5000,

		    success: function(data) {
		   	},

		   	complete: function() {
		   	},

			error: function(xhr, status, error) {
				console.log(error);
			},
		});
	}

	function addBureauxPOI(id, numBureauPOI) {
		// Ouverture de la fenêtre pour l'ajout
		infoWindows.get(numBureauPOI).open(map, markers.get(numBureauPOI));
		$("#bureauxPOI"+numBureauPOI).append('<option id="bureau'+id+'">'+id+'</option>');
			addListenerChange(numBureauPOI);
		// On la referme
		infoWindows.get(numBureauPOI).close(map, markers.get(numBureauPOI));
	}

	function getColor(percent) {
		if (percent< 0.4) {
			return ROUGE;
		}
		else if ((percent >= 0.4)&&(percent < 0.7)) {
			return ORANGE;
		}
		else if ((percent >= 0.7)&&(percent < 1)) {
			return JAUNE;
		}
		else {
			return VERT;
		}
	}

	function adjust(percent) {
		if (percent > 1) {
			return 1;
		}
		else {
			return percent;
		}
	}

	function getReste(max, nb) {
		if (nb > max) {
			return 0;
		}
		else {
			return max-nb;
		}
	}

	// Autocompletion du champs de recherche et pointage de l'adresse sur la map
	function initAutocomplete() {

	  // Récupération de la search box et lien vers l'UI element.
	  var input = document.getElementById('pac-input');
	  var searchBox = new google.maps.places.SearchBox(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	  // Bias the SearchBox results towards current map's viewport.
	  map.addListener('bounds_changed', function() {
	    searchBox.setBounds(map.getBounds());
	  });

	  var markers = [];
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects a prediction and retrieve
	  // more details for that place.
	  searchBox.addListener('places_changed', function() {
	    var places = searchBox.getPlaces();

	    if (places.length == 0) {
	      return;
	    }

	    // Clear out the old markers.
	    markers.forEach(function(marker) {
	      marker.setMap(null);
	    });
	    markers = [];

	    // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function(place) {
	      var icon = {
	        url: place.icon,
	        size: new google.maps.Size(71, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(17, 34),
	        scaledSize: new google.maps.Size(25, 25)
	      };

	      // Create a marker for each place.
	      markers.push(new google.maps.Marker({
	        map: map,
	        icon: icon,
	        title: place.name,
	        position: place.geometry.location
	      }));

	      if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	      } else {
	        bounds.extend(place.geometry.location);
	      }
	    });
	    map.fitBounds(bounds);
	  });
	  // [END region_getplaces]
  	}

  	function auMillieme(nombre){
  		return Math.round(1000*nombre)/1000;
	}
});