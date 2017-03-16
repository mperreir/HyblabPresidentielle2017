$(document).ready(function(){

	// Coordonnées de départ pour la map
	var $latitude = 47.28328309531121,
	$longitude = -1.518387794494629,
	$map_zoom = 13;

	var latitudes_POI = new Array();
	var longitudes_POI = new Array();


		var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	
    
    var $marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg';

    
/******************************************************************/    
    
	var	$main_color = '#000',
		$saturation= -20,
		$brightness= 5;

	var style= [ 

        {"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}
	];
		
	var map_options = {
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
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    
    
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
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
      }

	// Récuperation de tous les points d'intérêts
	$.ajax({
	    url: "/citizen_press/bureaux",
	    type: "GET",
	    dataType: "json",
	    contentType: "application/json",
	    cache: false,
	    timeout: 5000,

	    success: function(data) {
	    	console.log("success");
	    	var numBureau = 1;
		    data.forEach(function(bureau) {
		    	// TODO CHANGE ADRESSE PAR COORDONNÉES
				placerMarqueur(bureau.latitude, bureau.longitude, numBureau);
				numBureau++;
			});
	      	console.log("process sucess");
	   	},

	     error: function(xhr, status, error) {
	     	console.log(error);
		 },
	});


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

	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);

	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
   

	function placerMarqueur(latitude_POI, longitude_POI, numBureau) {
		var marker = new google.maps.Marker({
		  	position: new google.maps.LatLng(latitude_POI, longitude_POI),
		    map: map,
		    visible: true,
		 	icon: $marker_url,
		});
    
		marker.addListener('click', function() {
	    
		    $(".POI0"+numBureau).css("display", "block");
		    $(".POI01-F").css("display", "block");
		    $("#google-container").css("width", "55%");
		    $("#google-container").css("height", "90vh");
		    $("#google-container").css("transition-delay", "1s");
		    // TODO à changer
		    $(".POI01").css("display", "none");
		    $(".POI03").css("display", "none");
		    $(".POI04").css("display", "none");
		    $(".POI05").css("display", "none");
		    
		    navigator.geolocation.getCurrentPosition(function(position) {
		    
		    var pos = {
	              lat: position.coords.latitude_POI,
	              lng: position.coords.longitude_POI
	            };
		    
		    map.setCenter(pos);
		        
		    });
		});
	}
});




