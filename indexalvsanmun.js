var express = require("express");
var fs = require("fs");
var contacts = [];


var app = express();

app.get("/",(req,res) => {

fs.readFile('datos.json','utf8',(err,content)=>{
	console.log("Data read");
	contacts = JSON.parse(content);
	res.write("Hola mundo!!");
	contacts.forEach((contact) =>{
		res.write("  - " +contact.name+"("+contact.phone+")");
	});

	res.write("----------");
	res.end;
	});	
});

app.listen(10000);
