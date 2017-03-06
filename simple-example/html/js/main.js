"use strict";

// really nice in theory, but not that useful in practice as browsers have strict restricted policies about cross domain requests
//d3.json( "http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json", function(error,data){
//     if(!error)
//     {
//        d3.select('body')
//          .append('ul')
//          .text('Liste des parkings de Nantes');
//        datanantes.opendata.answer.data.Groupes_Parking.Groupe_Parking.forEach( function(elem) {
//          d3.select('body')
//            .append('li')
//            .text(elem.Grp_nom)
//        })
//    }
//})

// Ask server to load data from Nantes opendata and send it to us
// then we add some of this data into our app
console.log( "loading data from server..." );
d3.json('data', function(error,data) { // D3 HTTP GET request + parse JSON to the server
    if(error)
    {
      // in case of error when retreiving the data, diplay a message
      d3.select('#ParkingsLibres')
        .append('p')
        .attr('class', 'text-center') // use external (bootstrap) css for styling
        .text('Impossible de récupérer les données du serveur :-(');
      d3.select('#PlaceDisponibles').append('p')
        .attr('class', 'text-center')
        .text('Impossible de récupérer les données du serveur :-(');
    }
    else {
      // this code will be executed only if the request is successful
      var myData = data.opendata.answer.data.Groupes_Parking.Groupe_Parking; // get only the part of the json object that we need

      // add textual information to the page
      d3.select('#ParkingsLibres')
          .append('ul') // use D3 to dynamicaly add a h3 and a list elements to the html page
          .attr('id','parkings')
      myData.forEach( function(elem) { // iterate all parkings
          // check is the parking is full
          if( parseInt(elem.Grp_disponible) <= parseInt(elem.Grp_complet)) {// we use parseInt because Grp_disponible and Grp_complet are stored as string in the json structure
            d3.select('#parkings')
              .append('li') // add our text as list item (with D3)
              .text(elem.Grp_nom+': ')
              .append('del') // del element for striking the parking name when it is full
              .text('Complet');
          }
          else {
            d3.select('#parkings')
              .append('li')
              .text(elem.Grp_nom+': Disponible'); // add our text as list item (with D3)
          }

      });

      // Create a simple bar graph with D3js
      buildGraph( '#PlaceDisponibles', myData);

      // register a function that will be called when the window is resized
      // it will rescale our graph
      d3.select(window).on('resize', resizeGraph);
      d3.select(window).on('orientationchange',resizeGraph);
    }
})

// Builds a simple bar chart using D3js
function buildGraph( myGraph, myData )
{
    // declare useful variables
    var margin = {top: 20, right: 20, bottom: 220, left: 30},
        width = d3.select(myGraph).node().getBoundingClientRect().width - margin.left - margin.right,
        height = d3.select(myGraph).node().getBoundingClientRect().height - margin.top - margin.bottom;      // the D3 way of getting width and height is a little bit complicated :-(

    // Generate useful data for our x and y axis
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

   // scale x and y to the range of our data
    x.domain(myData.map(function(d) { return d.Grp_nom; }));
    y.domain([0, d3.max(myData, function(d) { return parseInt(d.Grp_exploitation); })]);

    //build x and y axis with SVG
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // then add SVG container to the html page
    var svg = d3.select(myGraph).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("preserveAspectRatio", "xMidYMid meet")                                                                   //for 'simple' responsive graph
                .attr("viewBox", "0 0 " +  (width + margin.left + margin.right) + " " +  (height + margin.top + margin.bottom))  //for 'simple' responsive graph
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add x and y axis to the SVG container
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Places libres");

    // add tooltip for showing bar value
    var tooltip = d3.select("body")
    	.append("div")
    	.attr("class", "bartooltip") // still styling with external css
    	.style("position", "absolute")
    	.style("z-index", "10")
    	.style("visibility", "hidden")
    	.text("Will display # of available slot in the parking");

    // add bars to the chart for max capacity
    svg.selectAll(".backbar")
        .data(myData)
        .enter().append("rect")
        .attr("class", "backbar")
        .attr("x", function(d) { return x(d.Grp_nom); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(parseInt(d.Grp_exploitation)); })
        .attr("height", function(d) { return height - y(parseInt(d.Grp_exploitation)); });


    // add bars to the chart for available slots
    svg.selectAll(".bar")
        .data(myData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Grp_nom); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(parseInt(d.Grp_disponible)); })
        .attr("height", function(d) { return height - y(parseInt(d.Grp_disponible)); });

    // and add event listener for tooltips to both bars
    svg.selectAll('.bar, .backbar')
        .on("mouseover", function(d){return tooltip.style("visibility", "visible").text(d.Grp_disponible + " places disponibles sur " + d.Grp_exploitation);})
        .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
}

// This function will be called to resize the svg chart when the browser window is resized
// or mobile device orientation is changed
function resizeGraph() {
    // this is the simplest way of having a responsive graph
    // an alternative is to recalc the whole graph (whitout doing a new data request)
    // but we won't do this for that simple demo
    d3.select('#PlaceDisponibles > svg')
      .attr('width',d3.select('#PlaceDisponibles').node().getBoundingClientRect().width)
}
