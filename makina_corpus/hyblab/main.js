$(document).ready(function() {
	console.log('hi');

	getRandom();
	getRandomOpacity();
	regOpacityChange();

	var slider = document.getElementById('timeline');
	var time = slider.value+'%';


	$('#timeline').change(function() {
		$('#velo').css('left', time);
		time = slider.value+'%';
		console.log(time);
	});

	$('#timeline').click(function() {
		$('#velo').css('left', time);
		time = slider.value+'%';
		console.log(time);
	});

	function getRandom() {
  		return Math.random();
	}

	function getRandomOpacity()  {
		oplesHautsDeFrance = getRandom();
		opnouvelleAquitaine = getRandom();
		opoccitanie = getRandom();
		opauvergneRhoneAlpes = getRandom();
		opgrandEst = getRandom();
		opbourgogneFrancheComte = getRandom();
		opcentreValDeLoire = getRandom();
		oppaysDeLaLoire = getRandom();
		opprovenceAlpesCotesDAzur = getRandom();
		opnormandie = getRandom();
		opbretagne = getRandom();
		opileDeFrance = getRandom();
		opcorse = getRandom();
	}

	function regOpacityChange() {
		$('#carte').find('#lesHautsDeFrance').css('opacity', oplesHautsDeFrance);
		$('#carte').find('#nouvelleAquitaine').css('opacity', opnouvelleAquitaine);
		$('#carte').find('#occitanie').css('opacity', opoccitanie);
		$('#carte').find('#auvergneRhoneAlpes').css('opacity', opauvergneRhoneAlpes);
		$('#carte').find('#grandEst').css('opacity', opgrandEst);
		$('#carte').find('#bourgogneFrancheComte').css('opacity', opbourgogneFrancheComte);
		$('#carte').find('#centreValDeLoire').css('opacity', opcentreValDeLoire);
		$('#carte').find('#paysDeLaLoire').css('opacity', oppaysDeLaLoire);
		$('#carte').find('#provenceAlpesCotesDAzur').css('opacity', opprovenceAlpesCotesDAzur);
		$('#carte').find('#normandie').css('opacity', opnormandie);
		$('#carte').find('#bretagne').css('opacity', opbretagne);
		$('#carte').find('#ileDeFrance').css('opacity', opileDeFrance);
		$('#carte').find('#corse').css('opacity', opcorse);
	}
		

	$('#carte').find('.region').addClass('macron');

	$('nav').find('.candidat').click(function() {
		var candidatClass = this.id;
		$('#carte').find('.region').removeClass('macron');
		$('#carte').find('.region').removeClass('lepen');
		$('#carte').find('.region').removeClass('fillon');
		$('#carte').find('.region').removeClass('hamon');
		$('#carte').find('.region').removeClass('melanchon');
		
			if($(this).hasClass('selected')) {	
				$(this).removeClass('selected');
			} else {
				$(this).addClass('selected');
				$(".candidat").not($(this)).removeClass('selected');
				$('#carte').find('.region').addClass(candidatClass);
				getRandom();
				getRandomOpacity();
				regOpacityChange();				
			}
	});
});