var express = require('express');
var app = express();
var sqlite3 = require("sqlite3").verbose();

var fs = require("fs");
var file = "base.db";
var exists = fs.existsSync(file);  
var db = new sqlite3.Database(file);
var recher_name = ""

function getparm1() 
{ 
var url=location.href; 
var tmp1=url.split("?")[1]; 
var tmp2=tmp1.split("&")[0]; 
var tmp3=tmp2.split("=")[1]; 
var parm1=tmp3; 
alert(parm1); 
} 
function getparm2() 
{ 
var url=location.href; 
var tmp1=url.split("?")[1]; 
var tmp2=tmp1.split("&")[1]; 
var tmp3=tmp2.split("=")[1]; 
var parm2=tmp3; 
alert(parm2); 
} 

app.use(express.static('public'));



app.get('/test', function (req, res, next) {
  db.all("SELECT * from table1", function(err, row) {
        res.json(row);
    });
    db.close;

})
app.get('/cummunejumelle', function(req, res, next){
	db.all(`select c2.commune,c2.region
			from communes c1, communes c2
			where c1.commune="Souclin" and c1.ANNEE="2002"
			and c1.annee= c2.annee 
			and c1.commune!=c2.commune 
			and ABS(c1.VOTE_1 - c2.VOTE_1) <= 2
			and ABS(c1.VOTE_2 - c2.VOTE_2) <= 2
			and ABS(c1.VOTE_3 = c2.VOTE_3) <= 2 ;`,function(err,row){
		res.json(row);
	});
	db.close;
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})