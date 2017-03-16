$(document).ready(function(){

/*********************************MAP******************************/


	var $latitude = 47.28328309531121,
		$longitude = -1.518387794494629,
		$map_zoom = 13;
    
    var $latitude_POI_N01 = 47.22290250434996,
		$longitude_POI_N01 = -1.5459651988931;
    
    var $latitude_POI_N02 = 47.220862254295845,
		$longitude_POI_N02 = -1.552831653971225;
	
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
    
/******************************POI01*******************************/
    
    var marker01 = new google.maps.Marker({
	  	position: new google.maps.LatLng($latitude_POI_N01, $longitude_POI_N01),
	    map: map,
	    visible: true,
	 	icon: $marker_url,
	});
    
    
   
marker01.addListener('click', function() {
    
    $(".POI01").css("display", "block");
    $(".POI01-F").css("display", "block");
    $("#google-container").css("width", "55%");
    $("#google-container").css("height", "90vh");
    $("#google-container").css("transition-delay", "1s");
    $(".POI02").css("display", "none");
    $(".POI03").css("display", "none");
    $(".POI04").css("display", "none");
    $(".POI05").css("display", "none");
    
    navigator.geolocation.getCurrentPosition(function(position) {
    
    var pos01 = {
              lat: position.coords.$latitude_POI_N01,
              lng: position.coords.$longitude_POI_N01
            };
    
    map.setCenter(pos01);
        
    });
});
    
    /******************************************************************/

    $(".fermer").click(function() {
    
    $(".POI01").css("display", "none");
    $(".POI01-F").css("display", "none");
    $("#google-container").css("width", "100%");
    $("#google-container").css("height", "100vh");
    $("#google-container").css("transition-delay", "0s");
    $(".POI02").css("display", "none");
    $(".POI03").css("display", "none");
    $(".POI04").css("display", "none");
    $(".POI05").css("display", "none");
});
    

/********************************************************/
    /******************************POI02*******************************/
    
    var marker02 = new google.maps.Marker({
	  	position: new google.maps.LatLng($latitude_POI_N02, $longitude_POI_N02),
	    map: map,
	    visible: true,
	 	icon: $marker_url,
	});
    
marker02.addListener('click', function() {
    
    $(".POI02").css("display", "block");
    $(".POI01-F").css("display", "block");
    $("#google-container").css("width", "55%");
    $("#google-container").css("height", "90vh");
    $("#google-container").css("transition-delay", "1s");
    $(".POI01").css("display", "none");
    $(".POI03").css("display", "none");
    $(".POI04").css("display", "none");
    $(".POI05").css("display", "none");
    
    navigator.geolocation.getCurrentPosition(function(position) {
    
    var pos01 = {
              lat: position.coords.$latitude_POI_N01,
              lng: position.coords.$longitude_POI_N01
            };
    
    map.setCenter(pos01);
        
    });
});
    
/******************************************************************/

    
/******************************************************************/    
    
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
    
});



   

