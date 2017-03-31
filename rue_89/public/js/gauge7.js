//http://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js
//http://jsbin.com/wapono/13/edit

//data variables defined
var credsAvail7 = 31.18 ;
var credsPartII7 = 25.87;
var credsPartIV7 = 18.57;
var credsEarned7 = credsPartII7 + credsPartIV7 + credsAvail7;
var credsPartV7 = 100 - credsEarned7 ;

var doughnutData7 = [
        {
          value: credsPartII7,
          color:"#4EA1D3",
          highlight: "#FFFFFF",
          label: "Nicolas Sarkozy"
        },
        {
          value: credsPartIV7,
          color:"#E85A71",
          highlight: "#FFFFFF",
          label: "Ségolène Royal"
        },
        {
          value: credsAvail7,
          color: "#CC6633",
          highlight: "#FFFFFF ",
          label: "François Bayrou"
        },
        {
          value: credsPartV7,
          color: "#696969",
          highlight: "#FFFFFF ",
          label: "Autres"
        }
      ];

$(document).ready(function donut7(){
  var ctx = $('#chart-area7').get(0).getContext("2d");
  setInterval(donut7, 13000); //permet de répéter l'animation
  var myDoughnut = new Chart(ctx).Doughnut(doughnutData7,{
      animation:true,
      responsive: true,
      showTooltips: true,
      percentageInnerCutout : 70,
      segmentShowStroke : false,
      //onAnimationProgress: function(){console.log('AnimationProgress')},
      onAnimationComplete: function() {

        //Globals for Chart Summary
        var alpha = 1; //opacity
        ctx.fillStyle = "rgba(94, 98, 101)" + alpha + ")";
        var canvasWidthvar = $('#chart-area7').width();
        var canvasHeight = $('#chart-area7').height();
        var constant = 40; //114 original

        //Total Percentage Font
        /*
        var fontsize = (canvasHeight/constant/1.6).toFixed(2);
        ctx.font=fontsize +"em HansKendrick";
        var statLabel ='2002';
        ctx.textBaseline="middle";
        var total = 0;

        $.each(doughnutData,function() {
            total += parseInt(this.value,10);
        });
        //var tpercentage = ((doughnutData[0].value/total)*100)+"%"; //to show percentage of progress
        //var tpercentage = ((doughnutData[0].value));

        //var tpercentage = credsEarned;
        var textWidth = ctx.measureText(tpercentage).width;

        var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
        ctx.fillText(tpercentage, txtPosx, canvasHeight/2.1); //2.0 perfectly centers height of label
        */

        //Label Font
        var fontsize = (canvasHeight/constant/3.14).toFixed(2);
        ctx.font=fontsize +"em HansKendrick";
        ctx.textBaseline="middle";
        var statLabel = '2007';
        var textWidth = ctx.measureText(statLabel).width;
        var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
        ctx.fillText(statLabel, txtPosx, canvasHeight/2.1);

        //decrease alpha opacity based on http://jsfiddle.net/dlinx/EhD7J/305/


      }
  });
});
