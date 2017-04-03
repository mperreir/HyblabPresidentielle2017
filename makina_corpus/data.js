module.exports = function(app, express) {
  /*
   *  @Desc: Module pour gérer les données
   */
   var module = {};
   var fs = require('fs');
   var path = require('path')

   module.listTweet = [
   'nb_tweets_fillon_per_day.json',
   'nb_tweets_hamon_per_day.json',
   'nb_tweets_le_pen_per_day.json',
   'nb_tweets_melenchon_per_day.json',
   'nb_tweets_macron_per_day.json'
   ]

   module.listRT = [
   'nb_retweets_fillon_per_day.json',
   'nb_retweets_hamon_per_day.json',
   'nb_retweets_le_pen_per_day.json',
   'nb_retweets_melenchon_per_day.json',
   'nb_retweets_macron_per_day.json'
   ]

   module.listWeb = [
   'website_visits_fillon_per_day.json',
   'website_visits_hamon_per_day.json',
   'website_visits_le_pen_per_day.json',
   'website_visits_melenchon_per_day.json',
   'website_visits_macron_per_day.json'
   ]

   module.listRegion = [
   'gtrends_alsace_per_day.json',
   'gtrends_aquitaine_per_day.json',
   'gtrends_auvergne_per_day.json',
   'gtrends_brittany_per_day.json',
   'gtrends_burgundy_per_day.json',
   'gtrends_centrevaldeloire_per_day.json',
   'gtrends_champagneardenne_per_day.json',
   'gtrends_corsica_per_day.json',
   'gtrends_franchecomte_per_day.json',
   'gtrends_iledefrance_per_day.json',
   'gtrends_languedocroussillon_per_day.json',
   'gtrends_limousin_per_day.json',
   'gtrends_lorraine_per_day.json',
   'gtrends_lowernormandy_per_day.json',
   'gtrends_midipyrenees_per_day.json',
   'gtrends_nordpasdecalais_per_day.json',
   'gtrends_paysdelaloire_per_day.json',
   'gtrends_picardy_per_day.json',
   'gtrends_poitoucharentes_per_day.json',
   'gtrends_provence_per_day.json',
   'gtrends_rhonealpes_per_day.json',
   'gtrends_uppernormandy_per_day.json'
   ]


   module.JsontoArray = function(file) {
      return JSON.parse(fs.readFileSync(path.join(__dirname,file), 'utf8'));
  };

  module.JsontoArr = function(file, listvar, nom, domaine, nomcherche) {
    var result = module.JsontoArray(file)
    var variable = result.map(function (value,index) { return result[index][nomcherche]; });
    listvar[0][domaine] = listvar[0][domaine] || {};
    listvar[0][domaine][nom] = variable;
  };

  module.JsontoArrRegion = function(file, listvar, nom, domaine, nomcherche) {
    var result = module.JsontoArray(file)
    var variable = result.map(function (value,index) { return result[index][nomcherche]; });
    listvar[domaine] = listvar[domaine] || {};
    listvar[domaine][nom] = variable;
  };


  // Data base for graphics
  module.data = {
    labels : [
    '1 Fév.',
    '2 Fév.',
    '3 Fév.',
    '4 Fév.',
    '5 Fév.',
    '6 Fév.',
    '7 Fév.',
    '8 Fév.',
    '9 Fév.',
    '10 Fév.',
    '11 Fév.',
    '12 Fév.',
    '13 Fév.',
    '14 Fév.',
    '15 Fév.',
    '16 Fév.',
    '17 Fév.',
    '18 Fév.',
    '19 Fév.',
    '20 Fév.',
    '21 Fév.',
    '22 Fév.',
    '23 Fév.',
    '24 Fév.',
    '25 Fév.',
    '26 Fév.',
    '27 Fév.',
    '28 Fév.'
    ],
    datasets: [
    {
      fillColor : 'rgba(242, 15, 5, 0.4)',
      strokeColor : "rgba(242, 15, 5, 0.8)",
      pointColor : "rgba(242, 15, 5, 1)",
      pointStrokeColor : "rgba(242, 25, 15, 0.8)",
      data : Array.apply(null, Array(28)).map(Number.prototype.valueOf,0),
      hidden: true
    },
    {
      fillColor : 'rgba(82, 55, 140, 0.4)',
      strokeColor : "rgba(82, 55, 140, 0.8)",
      pointColor : "rgba(82, 55, 140, 1)",
      pointStrokeColor : "rgba(117, 95, 163, 1)",
      data : Array.apply(null, Array(28)).map(Number.prototype.valueOf,0),
      hidden: true
    },
    {
      fillColor : 'rgba(242, 68, 114, 0.4)',
      strokeColor : "rgba(242, 68, 114, 0.8)",
      pointColor : "rgba(242, 68, 114, 1)",
      pointStrokeColor : "rgba(245, 105, 142, 1)",
      data : Array.apply(null, Array(28)).map(Number.prototype.valueOf,0),
      hidden: true
    },
    {
      hidden: true,
      fillColor : 'rgba(21, 191, 191, 0.4)',
      strokeColor : "rgba(21, 191, 191, 0.8)",
      pointColor : "rgba(21, 191, 191, 1)",
      pointStrokeColor : "rgba(68, 204, 204, 1)",
      data : Array.apply(null, Array(28)).map(Number.prototype.valueOf,0),
      hidden: true
    },
    {
      hidden: true,
      fillColor : 'rgba(8, 6, 255, 0.4)',
      strokeColor : "rgba(8, 6, 255, 0.8)",
      pointColor : "rgba(8, 6, 255, 1)",
      pointStrokeColor : "rgba(15, 12, 255, 1)",
      data : Array.apply(null, Array(28)).map(Number.prototype.valueOf,0),
      hidden: true
    }
    ]};

  // Options graphs Chart.js
  module.options = {
    responsive: true,
    maintainAspectRatio: false,
    scaleShowGridLines : false,
    datasetStrokeWidth : 1,
    pointDotStrokeWidth : 1,
    tooltipFontColor: "rgba(52,54,70,0.8)",
    tooltipFillColor: "rgba(255,255,255,1)",
    scaleFontColor : "rgba(224,224,224,0.6)",
  };

  return module;
};
