var express = require("express");
var app = express();

app.get("/about",(req,res) => {
res.write("<html><body>________________________Miembros del Grupo________________________<ul>");
res.write("<li>"+"Alvaro Santos Munoz"+ " ("+"Oil consumed and electricity consumed"+")</li>");
res.write("<li>"+"Enrique Pardo Alvarez"+ " ("+"Methane emissions, CO2 emissions and nitrous oxide emissions"+")</li>");
res.write("<li>"+"Eugenio Rodriguez Molina"+ " ("+"Population and electricity access (% for population)"+")</li>");
res.write("</ul>___________________</body></html>");
res.end();
});


app.get("/about/methane-co2-nitrous-emissions",(req,res) => {
res.write("<li>"+"Enrique Pardo Alvarez"+ " ("+"Methane emissions, CO2 emissions and nitrous oxide emissions"+")</li>");

res.end();
});


app.get("/about/oil-electricity-consumed",(req,res) => {
res.write("<li>"+"Alvaro Santos Muñoz"+ " ("+"Oil and electricity consumed"+")</li>");

res.end();
});

app.listen(process.env.PORT);

app.get("/about/population-electricity-access",(req,res) => {
res.write("<li>"+"Eugenio Jesus Rodriguez Molina"+ " ("+"Population and electricity access"+")</li>");

res.end();
});

app.listen(process.env.PORT);