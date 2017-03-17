'use strict'


var express = require('express');
var app = express();
var http = require('http');


var morgan = require('morgan');

var port = process.env.PORT || 9865;

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// Authentication
var auth = function(req, res, next) {
  if (req.session)
    return next();
  else
    return res.render('index.ejs');
};

// Authentication - login
var auth_login = function(req, res, next) {
  if (req.session && req.session.user) {
    // Quand on reaccède à l'auth mais qu'on est déjà authentification
    // console.log(req.session);
    // res.send("Login success!");
    res.redirect('/index');
  } else
    return next();
};

var need_login = function(req, res, next) {
  /*
   * Fonction de demande authentification
   * A ajouter avant chaque requete vers une page protégée.
   */
  if (req.session && req.session.user) {
    return next();
  } else
    res.redirect('/');
}; 


// --- Routes
require('./routes.js')(app, express);


// http://stackoverflow.com/questions/20210522/nodejs-mysql-error-connection-lost-the-server-closed-the-connection


var server = http.createServer(app);
server.listen(port, function() {
  console.log("Node server running on http://localhost:"+port);
  });

module.exports = app;


