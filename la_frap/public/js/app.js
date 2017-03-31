'use strict';

var colPartis = []

$.getJSON("data/couleursPartis.json", function(data){
    $.each(data, function(key, value){
        colPartis[key]=value;
    })
})

var map_la = document.querySelector("#map_la");
var map_mayenne = document.querySelector("#map_mayenne");
var map_sarthe = document.querySelector("#map_sarthe");
var map_mel = document.querySelector("#map_mel");
var map_vendee = document.querySelector("#map_vendee");


var paths_la = map_la.querySelectorAll('.land');
var paths_mayenne = map_mayenne.querySelectorAll('.land');
var paths_sarthe = map_sarthe.querySelectorAll('.land');
var paths_mel = map_mel.querySelectorAll('.land');
var paths_vendee = map_vendee.querySelectorAll('.land');
var paths_vendee1 = map_vendee.querySelectorAll('.land1');

var list_ville = document.querySelectorAll(".liste_ville");

//polyfill du foreach
if(NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function(callback){
        [].forEach.call(this, callback);
    }
}

var activeArea =function(id){
    map_la.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active');
    })
    map_mayenne.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active');
    })
    map_sarthe.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active');
    })
    map_mel.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active');
    })
    map_vendee.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active');
    })
    list_ville.forEach(function(liste){
        liste.style.display="none";
    })
    if(id !== undefined){
        document.querySelector('#map_'+ id).classList.add('is-active');
        document.querySelector('#lville_'+id).style.display="block";
    }
}

paths_mayenne.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id = this.id.replace("map_", '');
        activeArea(id);
    });
})
paths_sarthe.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id = this.id.replace("map_", '');
        activeArea(id);
    });
})
paths_la.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id = this.id.replace("map_", '');
        activeArea(id);
    });
})
paths_mel.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id = this.id.replace("map_", '');
        activeArea(id);
    });
})
paths_vendee.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id = this.id.replace("map_", '');
        activeArea(id);
    })
})
paths_vendee1.forEach(function(path){
    path.addEventListener('mouseenter', function(e){
        var id1 = document.getElementById("map_8531").id.replace("map_", '');
        var id2 = document.getElementById("map_8532").id.replace("map_", '');
        var id3 = document.getElementById("map_8533").id.replace("map_", '');
        document.querySelector('#map_'+ id1).classList.add('is-active');
        document.querySelector('#map_'+ id2).classList.add('is-active');
        document.querySelector('#map_'+ id3).classList.add('is-active');
        document.querySelector('#lville_853').style.display="block";
    })
})


map_la.addEventListener('mouseover', function(){
    activeArea();
})
map_mayenne.addEventListener('mouseover', function(){
    activeArea();
})
map_sarthe.addEventListener('mouseover', function(){
    activeArea();
})
map_mel.addEventListener('mouseover', function(){
    activeArea();
})
map_vendee.addEventListener('mouseover', function(){
    activeArea();
})

/*Generation des candidats*/


/*Papaparse*/
function doStuff(table){
    //Data is usable here
    var dep = [53,72,44,49,85];
    var circ= ["C1", "C2","C3","C4","C5","C6","C7","C8","C9","C10"];
    var annee =["1988", "1993", "1997", "2002", "2007", "2012", "2017"];
    for(var i=1; i<211; i++){

        var datacol = [];
        var chartdatalabels = [];
        var chartdata = [];
        var colors = [];
        var nbelemt = 0;

        if (i%7 === 0){
            var curseur_annee = 6
        }else{
            var curseur_annee = i%7-1
        }
        if(i<22){
            if(i<8){



                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[0]+"_"+dep[0];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }

                if (chartdata.length != 0 && chartdata[0] != ""){
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

                    
                    
                    var idChart = "Chart_"+dep[0]+"_"+circ[0][1]+"_"+annee[curseur_annee];
                    
                    var ctx = document.getElementById(idChart).getContext('2d');
                    var myChart = new Chart(ctx, chart);
                    myChart.resize()

                }
                    
                


            }
            if(7<i && i<15){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[1]+"_"+dep[0];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }

                if (chartdata.length != 0 && chartdata[0] != ""){
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

                    
                    
                    var idChart = "Chart_"+dep[0]+"_"+circ[1][1]+"_"+annee[curseur_annee];

                    if (annee[curseur_annee]==2017){console.log(chart)}
                    
                    var ctx = document.getElementById(idChart).getContext('2d');
                    var myChart = new Chart(ctx, chart);
                    myChart.resize()

                }
                

            }
            if(14<i && i<22){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[2]+"_"+dep[0];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[0]+"_"+circ[2][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
        }
        if(21<i && i<56){
            if(i<29){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[0]+"_"+dep[1];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[1]+"_"+circ[0][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(28<i && i<36){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[1]+"_"+dep[1];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[1]+"_"+circ[1][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(35<i && i<43){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[2]+"_"+dep[1];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[1]+"_"+circ[2][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(42<i && i<50){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[3]+"_"+dep[1];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[1]+"_"+circ[3][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(49<i && i<57){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[4]+"_"+dep[1];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[1]+"_"+circ[4][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
        }
        if(56<i && i<127){
            if(i<64){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[0]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[0][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(63<i && i<71){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[1]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[1][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(70<i && i<78){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[2]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[2][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(77<i && i<85){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[3]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[3][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(84<i && i<92){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[4]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[4][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(91<i && i<99){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[5]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[5][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(98<i && i<106){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[6]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[6][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(105<i && i<113){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[7]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[7][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(112<i && i<120){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[8]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[8][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(119<i && i<127){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[9]+"_"+dep[2];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[2]+"_"+circ[9][1]+circ[9][2]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
        }
        if(126<i && i<176){
            if(i<134){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[0]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[0][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(133<i && i<141){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[1]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[1][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
            if(140<i && i<148){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[2]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[2][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(147<i && i<155){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[3]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[3][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(154<i && i<162){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[4]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[4][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(161<i && i<169){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[5]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[5][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(168<i && i<176){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[6]+"_"+dep[3];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })

                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[3]+"_"+circ[6][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }
            }
        }
        if(175<i && i<211){
            if(i<183){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[0]+"_"+dep[4];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[4]+"_"+circ[0][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(182<i && i<190){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[1]+"_"+dep[4];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[4]+"_"+circ[1][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(189<i && i<197){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[2]+"_"+dep[4];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[4]+"_"+circ[2][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(196<i && i<204){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[3]+"_"+dep[4];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[4]+"_"+circ[3][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
            if(203<i && i<211){
                var elem = document.querySelector('#sect_cand_'+i);
                elem.setAttribute("style","display: flex ; flex-direction: row; flex-wrap: wrap;position: absolute;top: 40vw;align-items: center;align-content:center; justify-content: center;width: 100%")
                table.data.forEach(function(item){
                    var cirdep = circ[4]+"_"+dep[4];
                    if(cirdep === item[annee[curseur_annee]]){


                        datacol[nbelemt] = [];
                        var res = annee[curseur_annee] + "_RES";
                        datacol[nbelemt][0]=item[res];
                        datacol[nbelemt][1]=item["Nom"]+" "+item["Prenom"];
                        datacol[nbelemt][2]=colPartis[item["Etiquette"]];
                        nbelemt+=1;


                        var newElemP = document.createElement('p');
                        newElemP.id="cand_"+item["id"];
                        newElemP.innerText=item["Nom"]+" "+item["Prenom"];
                        newElemP.innerText = newElemP.innerText.toLowerCase();
                        newElemP.className='cand';
                        var newElemR = document.createElement('section');
                        newElemR.className="rond";
                        var etiq = item["Etiquette"];
                        var color = colPartis[etiq];
                        newElemR.style.backgroundColor= color;
                        elem.appendChild(newElemR);
                        elem.appendChild(newElemP);
                        var newElemS =  document.createElement('img');
                        newElemS.className="son_cand";
                        newElemS.src="img/poadcast.png"
                        newElemS.style.visibility ='hidden';
                        elem.appendChild(newElemS);
                        if(item["PodCast"] !=="" ){
                            newElemS.style.visibility="visible"
                        }
                    }  
                })


                datacol.sort(function(a,b) {
                        return b[0]-a[0]
                    });

                for (var ind=0; ind< nbelemt; ind++){

                    chartdata.push(datacol[ind][0])
                    chartdatalabels.push(datacol[ind][1])
                    colors.push(datacol[ind][2])
                    }
if (chartdata.length != 0 && chartdata[0] != ""){
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

                
                
                var idChart = "Chart_"+dep[4]+"_"+circ[4][1]+"_"+annee[curseur_annee];
                
                var ctx = document.getElementById(idChart).getContext('2d');
                var myChart = new Chart(ctx, chart);
                myChart.resize()

            }

            }
        }
    }




    var totcand = document.querySelectorAll(".cand");

    totcand.forEach(function(cand){
        cand.addEventListener('click',function(e){
            var id = this.id.replace("cand_",""); 
            var parent = this.parentNode;
            var idparent = parent.id.replace("sect_cand_","");
            var sectvisi = document.querySelector("#sect_visi_"+idparent);
            var sectinvi = document.querySelector("#sect_invi_"+idparent);
            sectinvi.style.display = "block";
            sectvisi.style.display="none";
            var decor = document.createElement('section');
            decor.id = "carre_gris";
            sectinvi.appendChild(decor);
            var donneeCand = table.data[id];
            console.log(donneeCand);
            var newimgc = document.createElement('img');
            newimgc.id="imgC";
            //newimgc.style.borderColor = colPartis[donneeCand["Etiquette"]];
            if(donneeCand["Img_cand"]!=""){
                newimgc.src="img/photos-candidats/"+donneeCand["Img_cand"];
            }else{
                var sexe = donneeCand["Sexe"];
                newimgc.src="img/Avatar"+sexe+".png";

            }
            sectinvi.appendChild(newimgc);
            var newnomc = document.createElement('p');
            newnomc.id="NomC";
            newnomc.innerText=donneeCand["Nom"];
            newnomc.innerText = newnomc.innerText.toLowerCase();
            sectinvi.appendChild(newnomc);
            var newprenomc = document.createElement('p');
            newprenomc.id="prenomC";
            newprenomc.innerText=donneeCand["Prenom"];
            newprenomc.innerText = newprenomc.innerText.toLowerCase();
            sectinvi.appendChild(newprenomc);
            var newetiquettec = document.createElement('p');
            newetiquettec.id="EtiquetteC";
            newetiquettec.innerText=donneeCand["Etiquette"];
            newetiquettec.innerText=newetiquettec.innerText.toLowerCase();
            newetiquettec.style.color=colPartis[donneeCand["Etiquette"]]
            sectinvi.appendChild(newetiquettec);
            var newagec = document.createElement('p');
            newagec.id="AgeC";
            newagec.innerText=donneeCand["Age"];
            sectinvi.appendChild(newagec);
            
            var newnbpresc = document.createElement('p');
            newnbpresc.id="nbrPrestCr";
            var calcpres = donneeCand["Nombre_presentation_1988"]+donneeCand["Nombre_presentation_1993"]+donneeCand["Nombre_presentation_1997"]+donneeCand["Nombre_presentation_2002"]+donneeCand["Nombre_presentation_2007"]+donneeCand["Nombre_presentation_2012"]+donneeCand["Nombre_presentation_2017"];
            newnbpresc.innerText=calcpres +" Candidatures présentées";
            sectinvi.appendChild(newnbpresc);
            var newsep = document.createElement("section");
            newsep.id ="newsepC";
            sectinvi.appendChild(newsep);
            var newnbelec = document.createElement('p');
            newnbelec.id="nrbEluC";
            var calcElu = donneeCand["Nombre_Elu_1988"]+donneeCand["Nombre_Elu_1993"]+donneeCand["Nombre_Elu_1997"]+donneeCand["Nombre_Elu_2002"]+donneeCand["Nombre_Elu_2007"]+donneeCand["Nombre_Elu_2012"]+donneeCand["Nombre_Elu_2017"];
            newnbelec.innerText=calcElu + " Mandats effectués";
            sectinvi.appendChild(newnbelec);

            var list_pres = document.createElement('ul');
            list_pres.id = "list_presC";
            if(donneeCand["Nombre_presentation_1988"] === 1){
                var li1 = document.createElement("li");
                var datamand = donneeCand["1988"].split("_")[1]+ ", Circonscription " + donneeCand["1988"].split("_")[0][1]
                li1.innerText = "1988: "+datamand;
                li1.id = "li1";
                list_pres.appendChild(li1);
            }
            if(donneeCand["Nombre_presentation_1993"] === 1){
                var li2 = document.createElement("li");
                var datamand = donneeCand["1993"].split("_")[1]+ ", Circonscription " + donneeCand["1993"].split("_")[0][1]
                li2.innerText = "1993: "+datamand;
                li2.id = "li2";
                list_pres.appendChild(li2);
            }
            if(donneeCand["Nombre_presentation_1997"] === 1){
                var li3 = document.createElement("li");
                var datamand = donneeCand["1997"].split("_")[1]+ ", Circonscription " + donneeCand["1997"].split("_")[0][1]
                li3.innerText = "1997: "+datamand;
                li3.id = "li3";
                list_pres.appendChild(li3);
            }
            if(donneeCand["Nombre_presentation_2002"] === 1){
                var li4 = document.createElement("li");
                var datamand = donneeCand["2002"].split("_")[1]+ ", Circonscription " + donneeCand["2002"].split("_")[0][1]
                li4.innerText = "2002: "+datamand;
                li4.id = "li4";
                list_pres.appendChild(li4);
            }
            if(donneeCand["Nombre_presentation_2007"] === 1){
                var li5 = document.createElement("li");
                var datamand = donneeCand["2007"].split("_")[1]+ ", Circonscription " + donneeCand["2007"].split("_")[0][1]
                li5.innerText = "2007: "+datamand;
                li5.id = "li5";
                list_pres.appendChild(li5);
            }
            if(donneeCand["Nombre_presentation_2012"] === 1){
                var li6 = document.createElement("li");
                var datamand = donneeCand["2012"].split("_")[1]+ ", Circonscription " + donneeCand["2012"].split("_")[0][1]
                li6.innerText = "2012: "+datamand;
                li6.id = "li6";
                list_pres.appendChild(li6);
            }
            if(donneeCand["Nombre_presentation_2017"] === 1){
                var li7 = document.createElement("li");
                var datamand = donneeCand["2017"].split("_")[1]+ ", Circonscription " + donneeCand["2017"].split("_")[0][1]
                li7.innerText = "2017: "+datamand;
                li7.id = "li7";
                list_pres.appendChild(li7);
            }
            sectinvi.appendChild(list_pres);

            var list_elu = document.createElement('ul');
            list_elu.id = "list_eluC";
            if(donneeCand["Nombre_Elu_1988"] === 1){
                var li1e = document.createElement("li");
                li1e.innerText = "En 1988";
                li1e.id = "li1e";
                list_elu.appendChild(li1e);
            }
            if(donneeCand["Nombre_Elu_1993"] === 1){
                var li2e = document.createElement("li");
                li2e.innerText = "En 1993";
                li2e.id = "li2e";
                list_elu.appendChild(li2e);
            }
            if(donneeCand["Nombre_Elu_1997"] === 1){
                var li3e = document.createElement("li");
                li3e.innerText = "En 1997";
                li3e.id = "li3e";
                list_elu.appendChild(li3e);
            }
            if(donneeCand["Nombre_Elu_2002"] === 1){
                var li4e = document.createElement("li");
                li4e.innerText = "En 2002";
                li4e.id = "li4e";
                list_elu.appendChild(li4e);
            }
            if(donneeCand["Nombre_Elu_2007"] === 1){
                var li5e = document.createElement("li");
                li5e.innerText = "En 2007";
                li5e.id = "li5e";
                list_elu.appendChild(li5e);
            }
            if(donneeCand["Nombre_Elu_2012"] === 1){
                var li6e = document.createElement("li");
                li6e.innerText = "En 2012";
                li6e.id = "li6e";
                list_elu.appendChild(li6e);
            }
            if(donneeCand["Nombre_Elu_2017"] === 1){
                var li7e = document.createElement("li");
                li7e.innerText = "En 2017";
                li7e.id = "li7e";
                list_elu.appendChild(li7e);
            }
            sectinvi.appendChild(list_elu);

            var newpresc = document.createElement('p');
            newpresc.id="presentationC";
            newpresc.innerText=donneeCand["Phrase_pres_cand"];
            sectinvi.appendChild(newpresc);
            var newpresepartc = document.createElement('p');
            newpresepartc.id="presentationParti";
            newpresepartc.innerText=donneeCand["Phrase_pres_parti"];
            sectinvi.appendChild(newpresepartc);

            if(donneeCand["Twitter"] != ""){
                var newtwitterc = document.createElement('a');
                newtwitterc.id="twitterC";
                newtwitterc.href=donneeCand["Twitter"];
                newtwitterc.innerHTML="<img src='img/twitter.png'>";
                newtwitterc.target ="_blank";
                sectinvi.appendChild(newtwitterc);
            }
            if(donneeCand["Facebook"] != ""){
                var newfacebookc = document.createElement('a');
                newfacebookc.id="facebookC";
                newfacebookc.href=donneeCand["Facebook"];
                newfacebookc.innerHTML="<img src='img/facebook.png'>";
                newfacebookc.target ="_blank";
                sectinvi.appendChild(newfacebookc);
            }

            if(donneeCand["Site_perso"] != ""){
                var newurlc = document.createElement('a');
                newurlc.id="urlC";
                newurlc.href=donneeCand["Site_perso"];
                newurlc.innerText=donneeCand["Site_perso"];
                newurlc.target ="_blank";
                sectinvi.appendChild(newurlc);
            }
            

            if(donneeCand["PodCast"] != ""){
                var newleg = document.createElement('p');
                newleg.id="legC";
                newleg.innerText="Interview de "+donneeCand["Prenom"]+" "+donneeCand["Nom"]+" : ";
                sectinvi.appendChild(newleg);
                var newaud = document.createElement('audio');
                newaud.id="podC";
                newaud.src="Son/"+donneeCand["PodCast"];
                newaud.controls="controls";
                sectinvi.appendChild(newaud);
            }

        })
    })
    var fermes = document.querySelectorAll(".close");
    fermes.forEach(function(ferme){
        ferme.addEventListener('click', function(e){
            var parentclose = this.parentNode;
            var idinvi = parentclose.id.replace("sect_invi_","");
            var sectvisi = document.querySelector("#sect_visi_"+idinvi);
            sectvisi.style.display="block";
            parentclose.style.display="none";
            parentclose.removeChild(document.querySelector("#carre_gris"));
            parentclose.removeChild(document.querySelector("#imgC"));
            parentclose.removeChild(document.querySelector("#prenomC"));
            parentclose.removeChild(document.querySelector("#NomC"));
            parentclose.removeChild(document.querySelector("#AgeC"));
            parentclose.removeChild(document.querySelector("#EtiquetteC"));
            parentclose.removeChild(document.querySelector("#nbrPrestCr"));
            parentclose.removeChild(document.querySelector("#newsepC"));
            parentclose.removeChild(document.querySelector("#nrbEluC"));
            if(document.querySelector("#urlC")!=null){
                parentclose.removeChild(document.querySelector("#urlC"));
            }
            if(document.querySelector("#twitterC")!=null){
                parentclose.removeChild(document.querySelector("#twitterC"));
            }
            if(document.querySelector("#facebookC")!=null){
                parentclose.removeChild(document.querySelector("#facebookC"));
            }
            if(document.querySelector("#podC")!=null){
                parentclose.removeChild(document.querySelector("#podC"));
                parentclose.removeChild(document.querySelector("#legC"));
            }
            parentclose.removeChild(document.querySelector("#presentationC"));
            parentclose.removeChild(document.querySelector("#presentationParti"));

            var list_pres = document.querySelector("#list_presC");
           if(document.querySelector("#li1") !== null){
                list_pres.removeChild(document.querySelector("#li1"));
           }
           if(document.querySelector("#li2") !== null){
                list_pres.removeChild(document.querySelector("#li2"));
           }
           if(document.querySelector("#li3") !== null){
                list_pres.removeChild(document.querySelector("#li3"));
           }
           if(document.querySelector("#li4") !== null){
                list_pres.removeChild(document.querySelector("#li4"));
           }
           if(document.querySelector("#li5") !== null){
                list_pres.removeChild(document.querySelector("#li5"));
           }
           if(document.querySelector("#li6") !== null){
                list_pres.removeChild(document.querySelector("#li6"));
           }
           if(document.querySelector("#li7") !== null){
                list_pres.removeChild(document.querySelector("#li7"));
           }
           parentclose.removeChild(list_pres);

           var list_elu = document.querySelector("#list_eluC");
           if(document.querySelector("#li1e") !== null){
                list_elu.removeChild(document.querySelector("#li1e"));
           }
           if(document.querySelector("#li2e") !== null){
                list_elu.removeChild(document.querySelector("#li2e"));
           }
           if(document.querySelector("#li3e") !== null){
                list_elu.removeChild(document.querySelector("#li3e"));
           }
           if(document.querySelector("#li4e") !== null){
                list_elu.removeChild(document.querySelector("#li4e"));
           }
           if(document.querySelector("#li5e") !== null){
                list_elu.removeChild(document.querySelector("#li5e"));
           }
           if(document.querySelector("#li6e") !== null){
                list_elu.removeChild(document.querySelector("#li6e"));
           }
           if(document.querySelector("#li7e") !== null){
                list_elu.removeChild(document.querySelector("#li7e"));
           }
           parentclose.removeChild(list_elu);

        })
    })
    
}

function parseData(file, callBack) {
    Papa.parse(file, {
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        download: true,
        encoding: "utf-8",
        complete: function(results) {
            doStuff(results);
        },
        error: function( error, file){
        }
    });
}

parseData("data/basefinale.csv", doStuff);
