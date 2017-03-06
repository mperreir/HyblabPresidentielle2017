'use strict';

// general routing framework
var express = require('express')
//var basicAuth = require('basic-auth-connect');
var app = express()

// password protection
//app.use(basicAuth('ddj2017', 'iloveddj'));

// declare the list of sub apps
var app_names = [];

var ddj2017_names = ['simple-example','citizen_press','france_3_pdl','la_frap',
'makina_corpus','ouest_france','ouest_medialab', 'rue_89' ];

app_names.push.apply(app_names, ddj2017_names);

var sub_apps = [];

// create sub apps
// and register sub-apps
app_names.forEach( function( element, index, array) {
  console.log('Registering: ' + element);
	sub_apps[element] = require('./' + element + '/server');
	app.use('/' + element, sub_apps[element]);
});

// redirect catch all url to hyblab website
app.use(/\/$/,function(req, res, next){
	res.redirect('http://www.hyblab.fr/evenements/hyblab-datajournalisme/');
});


// launch main server app
var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Hyblab routing app listening at http://%s:%s', host, port)

})
