$(document).ready(function(){

	// Coordonnées de départ pour la map
	var $latitude = 47.28328309531121,
	$longitude = -1.518387794494629,
	$map_zoom = 13;

	var latitudes_POI = new Array();
	var longitudes_POI = new Array();
	var infoWindows = new Array();

	var nbPOI = 0;

	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	
    
    var $marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';

    
/******************************************************************/    
 
	var map_options;
	var map;

	console.log("init map");
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
	map = new google.maps.Map(document.getElementById('google-container'), map_options);      
    
	console.log(map);


 /******************************LEGENDE*******************************/   
    
$("#open").click(function() {
    
    $(".legende").css("padding-bottom", "450px");
    $(".legende").css("padding-right", "250px");
    $(".legende h5").css("display", "block");
    $(".leg-block").css("display", "inline-block");
    $("#open").css("display", "none");
    $("#close").css("display", "block");

});
    
$("#close").click(function() {
    
    $(".legende").css("padding-bottom", "0px");
    $(".legende").css("padding-right", "0px");
    $(".legende h5").css("display", "none");
    $(".leg-block").css("display", "none");
    $("#open").css("display", "block");
    $("#close").css("display", "none");

});
    
    
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
			 	icon: $marker_url,
			});
           map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        
        } else {
            
          handleLocationError(false, infoWindow, map.getCenter());
        }


		var zoomControlDiv = document.createElement('div');
		var zoomControl = new CustomZoomControl(zoomControlDiv, map);

		map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
      


/*****************************PLACEMENT DES MARQUEURS*******************************/

	// Récuperation de tous les points d'intérêts et ajout dans la map
	$.ajax({
	    url: "/citizen_press/bureaux",
	    type: "GET",
	    dataType: "json",
	    contentType: "application/json",
	    cache: false,
	    timeout: 5000,

	    success: function(data) {
	    	console.log("success");
	    	var tabAdresseTaille = new Array(); 
	    	var tabAdresse = new Array(); 
	    	var numBureauPOI = 1;
	    	var contentString;
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
		    		contentString = '<div id="content">'+
					'<div id="siteNotice">'+
					'</div>'+
					'<h1 id="firstHeading">'+bureau.nom_lieu+'</h1>'+
					'<div id="bodyContent">'+
					'<p class="adress">'+bureau.adresse+'</p>'+'<p>'+bureau.code_postal+' '+bureau.ville+'</p>'+'<h1>BUREAU DE VOTE (3)</h1>'+'<form>'+'<select>'+'<option>N°602'+'<option>N°603'+'<option>N°604'+'</select>'+'</form>'+
					'</div>'+
					'</div>';
		    		tabAdresse.push(bureau.adresse);
					placerMarqueur(bureau.lat, bureau.long, contentString, numBureauPOI, nbPOI);
					numBureauPOI++;
		    	}
		    	// Le POI est déjà ajouté, donc on ajoute le bureau au POI
		    	else {
		    		ajoutBureauMarqueur(bureau, numBureauPOI);
		    	}
			});
	      	console.log("process sucess");
	   	},

	   	complete: function() {
	   		console.log(nbPOI);
	   		for (var i = 1; i <= nbPOI; i++) {
	   			console.log(".POI"+i);
	    		$(".POI"+i).css("display", "none");
		    }
		    addListenerClick(nbPOI)
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
	   			console.log(".POI"+i);
	    		$(".POI"+i).css("display", "none");
		    }
		    $("#google-container").css("width", "100%");
		    $("#google-container").css("height", "100vh");
		    $("#google-container").css("transition-delay", "0s");
			$(".other").css("display", "none");
			// TODO ajouter par rapport au tableau
	       // infowindow01.close(map, marker01);

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
	function placerMarqueur(latitude_POI, longitude_POI, contentString, numBureauPOI, nbPOI) {
		console.log(latitude_POI);
		console.log(longitude_POI);

		var marker = new google.maps.Marker({
		  	position: new google.maps.LatLng(latitude_POI, longitude_POI),
		    map: map,
		    visible: true,
		 	icon: $marker_url,
		});

		infoWindows.push(new google.maps.InfoWindow({content: contentString}));

		marker.addListener('click', function() {
	    	// Affiche la page du PI
		    $(".POI"+numBureauPOI).css("display", "block");
		    $("#google-container").css("width", "55%");
		    $("#google-container").css("height", "90vh");
		    $("#google-container").css("transition-delay", "1s");
    		$(".other").css("display", "block");   
       
		    // Pour ouvrir la bonne bulle d'informations
		    infoWindows[numBureauPOI-1].open(map, marker);

		    // Ferme les autres bulles et cache les autres
		    for (var i = 1; i <= nbPOI; i++) {
		    	if (i != numBureauPOI) {
		    		$(".POI"+i).css("display", "none");
		    		infoWindows[numBureauPOI-1].close(map, marker);
		    	}
		    }

		    // TODO à changer
		    navigator.geolocation.getCurrentPosition(function(position) {
		    
		    var pos = {
	              lat: position.coords.latitude_POI,
	              lng: position.coords.longitude_POI
	            };
		    
		    map.setCenter(pos);
		        
		    });
		});
	}

	function ajoutBureauMarqueur(bureau, numBureauPOI) {
		
	}


});




