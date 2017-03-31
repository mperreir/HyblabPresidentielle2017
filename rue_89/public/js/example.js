//Affichage des informations pour les cercles
$(function() {
	$('.circle div').hide();
	$('.circle').hover(
		function ( e ) {
			$(this).children('div').fadeIn();
		}, function ( e ) {
			$(this).children('div').fadeOut();
		}, 100);
});