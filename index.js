var express = require("express");
var app = express();

app.use("/about",express.static(__dirname + '/static'));

app.use("/about/consumed",express.static(__dirname + '/static/consumed'));

app.use("/about/emissions",express.static(__dirname + '/static/emissions'));

app.use("/about/population",express.static(__dirname + '/static/population'));

app.get("/time",(req,res) => {
 
 var now = new Date()
 res.send("<html><body><h1> It is "+ now+"</h1></body></html>");

app.listen(process.env.PORT);
