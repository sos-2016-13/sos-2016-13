var express = require("express");
var app = express();

app.get("/",(req,res) => {
console.log("Hello World");
res.end();
});

app.listen(process.env.PORT);