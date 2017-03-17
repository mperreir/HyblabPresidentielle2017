module.exports = function(app, express) {
  // Public directory
  console.log(__dirname);
  app.use(express.static(__dirname + '/public'));


var data = {
    labels : ["02:00","04:00","06:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","22:00","00:00"],
    datasets: [
    {
    fillColor : 'rgba(242, 68, 114, 0.4)',
    strokeColor : "rgba(242, 68, 114, 0.8)",
    pointColor : "rgba(242, 68, 114, 1)",
    pointStrokeColor : "rgba(245, 105, 142, 1)",
    data : [15.0,22.4,22.2,22.4,44.2,32.0,13.2,14.1,30.0,8.4,9.1,7.4]
    },
    {
    fillColor : 'rgba(82, 55, 140, 0.4)',
    strokeColor : "rgba(82, 55, 140, 0.8)",
    pointColor : "rgba(82, 55, 140, 1)",
    pointStrokeColor : "rgba(117, 95, 163, 1)",
    data : [25.0,32.4,22.2,89.4,34.2,22.0,23.2,24.1,20.0,18.4,19.1,17.4]
    },
    {
    fillColor : 'rgba(21, 191, 191, 0.4)',
    strokeColor : "rgba(21, 191, 191, 0.8)",
    pointColor : "rgba(21, 191, 191, 1)",
    pointStrokeColor : "rgba(68, 204, 204, 1)",
    data : [5.0,2.4,2.2,2.4,4.2,2.0,3.2,4.1,3.0,8.4,9.1,7.4]
    },
    {
    fillColor : 'rgba(242, 230, 53, 0.4)',
    strokeColor : "rgba(242, 230, 53, 0.8)",
    pointColor : "rgba(242, 230, 53, 1)",
    pointStrokeColor : "rgba(245, 235, 93, 1)",
    data : [20.0,30.4,20.2,20.4,30.2,20.0,20.2,20.1,10.0,10.4,10.1,10.4]
    },
    {
    fillColor : 'rgba(242, 129, 29, 0.4)',
    strokeColor : "rgba(242, 129, 29, 0.8)",
    pointColor : "rgba(242, 129, 29, 1)",
    pointStrokeColor : "rgba(245, 154, 74, 0.8)",
    data : [45.0,52.4,42.2,39.4,54.2,42.0,63.2,24.1,30.0,28.4,9.1,37.4]
    }
    ]
    };

    var options = {
      responsive: true,
      scaleShowGridLines : false,
      datasetStrokeWidth : 1,
      pointDotStrokeWidth : 1,
      tooltipFontColor: "rgba(52,54,70,0.8)",
      tooltipFillColor: "rgba(255,255,255,1)",
      scaleFontColor : "rgba(224,224,224,0.6)",
    };

  app.render('graph.ejs', { datain: JSON.stringify(data), optionin: JSON.stringify(options) }, (err, html) => {
      console.log(html)
  });

  app.get('/graph/', (req,res) => {
    res.render('graph.ejs', { datain: JSON.stringify(data), optionin: JSON.stringify(options) });
  });

  app.get('/', (req,res) => {
    app.render('graph.ejs', { datain: JSON.stringify(data), optionin: JSON.stringify(options) }, (err, html) => {
      res.render('index.ejs', {graph: html});
    });
  });

  app.get('*', (req, res) => {
    res.status(404).send('Ouch');
  });
}
