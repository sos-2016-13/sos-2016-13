var express = require("express");

var app = express();

app.get("/",(req,res) => {
	res.write("Hello World");
	res.end();
});

app.listen(process.env.PORT);