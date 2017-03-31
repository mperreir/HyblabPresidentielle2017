
var dates = [1988,1993,1997,2002,2007,2012];
var departement = [44,49,53,72,85];
var nbcirc = [10,7,3,5,5];
var colPartis = []

$.getJSON("data/couleursPartis.json", function(data){
	$.each(data, function(key, value){
		colPartis[key]=value;
	})
})




for( var ind_D=0; ind_D<departement.length ; ind_D++){

	(function(ind_D){
		var depart = departement[ind_D];
		var datafileT1 = "data/"+depart+".json";
		var datafileT2 = "data/"+depart+".json";
		

		$.getJSON(datafileT1, function(data){

			for (var ind_A=0; ind_A<dates.length; ind_A++){ //Pour tout les annee

				var annee = dates[ind_A];
				var Circ= nbcirc[ind_D];
				
				for(var ind_C=1; ind_C<Circ+1; ind_C++){ //Pour chaque circonscription
					
					

					var datacol = [];
					var chartdatalabels = [];
					var chartdata = [];
					var colors = [];
					var nbelemt = 0;
					

					for (item in data) {

						if (data[item].circonscription === ind_C && data[item].Annee === annee){
						
							if (data[item].Blancs_et_nuls != ""){
								datacol[nbelemt] = [];
								datacol[nbelemt][0]= parseFloat(data[item].Blancs_et_nuls).toFixed(2)
								datacol[nbelemt][1] = "BLANCS ET NULS"
								datacol[nbelemt][2] = "#cccccc"
								nbelemt+=1;
							}
						
							for (item2 in data[item]){
								var splititem = item2.split(" ");
								if (splititem[1] === "Etiquette"){

									if (data[item][item2] != ""){
										
										var voixP = splititem[0] + " voix"
										var voix = parseFloat(data[item][voixP]).toFixed(2)
										var label = data[item][item2];
										var couleur;
										if (label === "SANS ETIQUETTE" || label === "UNION DU RASSEMBLEMENT ET DU CENTRE"){
											var nuance = splititem[0] + " nuance";
											var labnuance = data[item][nuance];
											couleur = colPartis[labnuance];
										}else{couleur = colPartis[label];}
										
										datacol[nbelemt] = [];
										datacol[nbelemt][0]=voix;
										datacol[nbelemt][1]=label;
										datacol[nbelemt][2]=couleur
										nbelemt+=1;
										//if(voix>=50){console.log(depart, annee, ind_C, label, couleur)}
									}
									else{
										var nuance = splititem[0] + " nuance";
										if (data[item][nuance] != ""){
											var voixP = splititem[0] + " voix"
											var voix = parseFloat(data[item][voixP]).toFixed(2)
											var label = data[item][nuance]
											var couleur = colPartis[label];
											datacol[nbelemt] = [];
											datacol[nbelemt][0]=voix;
											datacol[nbelemt][1]=label;
											datacol[nbelemt][2]=couleur
											nbelemt+=1;
											//if(voix>=50){console.log(depart, annee, ind_C, label, couleur)}
										}
									}
								}
							}	
						}
					}

					datacol.sort(function(a,b) {
			        	return b[0]-a[0]
			    	});

					for (var i=0; i< nbelemt; i++){

						chartdata.push(datacol[i][0])
						chartdatalabels.push(datacol[i][1])
						colors.push(datacol[i][2])
						}

					var chart = {
						type: "bar",
						data :{
							labels: chartdatalabels,
							datasets : [{
								label: 'Pourcentage',
								data: chartdata,
								backgroundColor: colors,
								borderColor: colors,
				            	borderWidth: 1
								}]
							},

					    options: {
							scales: {
							            xAxes: [{
							               	display: false,
							                categoryPercentage: 0.95,
				            				barPercentage: 1.0
							            }]
							        },
					    	responsive:false,
					    	maintainAspectRatio: false,
					    	animation: false,

					    	legend: {
					    		display: false
					    	},
					    	hover: {
					    		intersect: false,
					    	}
					    }

					};
				
					var id = "Chart_"+depart+"_"+ind_C+"_"+annee;
					
					
					var ctx = document.getElementById(id).getContext('2d');
					var myChart = new Chart(ctx, chart);
					myChart.resize()
				}

			}
		})

	$.getJSON(datafileT2, function(data){
		for (item in data){
			var cand1 = data[item]["1 Etiquette Liste"]
			var voix1 = data[item]["1 voix"]
			var cand2 = data[item]["1 Etiquette Liste"]
			var voix2 = data[item]["2 voix"]
			var win;
			if (voix1>voix2){win = cand1}
			else {win = cand2}
		}
	})

	})(ind_D);

	
}






