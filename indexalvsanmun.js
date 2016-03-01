var express = require("express");
var app = express();


app.get("/",(req,res) => {
	console.log("Hola");
	res.write("Hola mundo!!");
	res.write("----------");
	res.end;

});

app.listen(12345);
