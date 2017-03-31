var express = require('express');
var app = express();
var sqlite3 = require("sqlite3").verbose();
var path = require('path');

var fs = require("fs");
var file = path.join(__dirname,"base.db");

var exists = fs.existsSync(file);  
var db = new sqlite3.Database(file);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function (req, res, next) {


  db.all("SELECT ID from communes where ID = 1", function(err, row) {
        res.json(row);
    });
    db.close;
})


app.get('/communejumelle/:annee/:commune', function(req, res, next){

	db.all(`select c2.commune,c2.region
			from communes c1, communes c2
			where c1.commune="${req.params.commune}" and c1.ANNEE="${req.params.annee}"
			and c1.annee= c2.annee
			and c1.commune!=c2.commune
			and ABS(c1.VOTE_1 - c2.VOTE_1) <= 2
			and ABS(c1.VOTE_2 - c2.VOTE_2) <= 2
			and ABS(c1.VOTE_3 = c2.VOTE_3) <= 2 ;`,function(err,row){
		res.json(row);
	});
	db.close;
})



/*var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("address: http://%s:%s", host, port)


})*/

module.exports = app;
