var express = require("express");
var app = express();

app.use("/about",express.static(__dirname + '/public'));

//app.use("/about/consumed",express.static(__dirname + '/public/consumed'));

//app.use("/about/emissions",express.static(__dirname + '/public/emissions'));

//app.use("/about/population",express.static(__dirname + '/public/population'));

app.listen(process.env.PORT);
