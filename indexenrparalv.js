var express = require("express");
var app = express();

app.get("/",(req,res) => {
console.log("Hello World");
});

app.listen(process.env.PORT);