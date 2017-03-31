//http://stackoverflow.com/questions/20966817/how-to-add-text-inside-the-doughnut-chart-using-chart-js
//http://jsbin.com/wapono/13/edit

//data variables defined
var credsAvail = 19.6 ;
var credsPartII = 28.88;
var credsPartIV = 25.8;
var credsEarned = credsPartII + credsPartIV + credsAvail;

var doughnutData = [
        {
          value: credsPartII,
          color:"#E85A71",
          highlight: "#E85A71",
          label: "Part II"
        },
        {
          value: credsPartIV,
          color:"#4EA1D3",
          highlight: 'green',
          label: "Part IV"
        },
        {
          value: credsAvail - credsEarned,
          color: "#000000",
          highlight: "#000000",
          label: "Credits Still Available"
        }
      ];

$(document).ready(function(){
  var ctx = $('#chart-area').get(0).getContext("2d");
  var myDoughnut = new Chart(ctx).Doughnut(doughnutData,{
      animation:true,
      animationEasing: 'easeOutQuart',
      responsive: true,
      showTooltips: false,
      percentageInnerCutout : 80,
      segmentShowStroke : true,
      //onAnimationProgress: function(){console.log('AnimationProgress')},
      onAnimationComplete: function() {

        //Globals for Chart Summary
        var alpha = 1; //opacity
        ctx.fillStyle = "rgba(94, 98, 101)" + alpha + ")";
        var canvasWidthvar = $('#chart-area').width();
        var canvasHeight = $('#chart-area').height();
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
        var statLabel = '2002';
        var textWidth = ctx.measureText(statLabel).width;
        var txtPosx = Math.round((canvasWidthvar - textWidth)/2);
        ctx.fillText(statLabel, txtPosx, canvasHeight/2.1);

        //decrease alpha opacity based on http://jsfiddle.net/dlinx/EhD7J/305/


      }
  });
});
