var express = require("express");
var app = express();
var bodyParser =  require("body-parser");



app.use("/",express.static(__dirname + '/static'));

app.use("/consumed",express.static(__dirname + '/static/consumed'));

app.use("/emissions",express.static(__dirname + '/static/emissions'));

app.use("/population",express.static(__dirname + '/static/population'));


var players = [{ name: "PauGasol"}];

app.get("/api/sandbox/nba/:name",(req,res) => {
	var name = req.params.name;
	res.send(players[0]);
});




app.get("/time",(req,res) => {
 
 var now = new Date()
 res.send("<html><body><h1>It is "+ now+"</h1></body></html>")
});

app.listen(process.env.PORT);
