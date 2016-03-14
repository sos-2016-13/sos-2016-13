var express = require("express");
var app = express();
var bodyParser =  require("body-parser");

var port = (process.env.PORT || 10000);

app.use("/",express.static(__dirname + '/static'));

app.use("/consumed",express.static(__dirname + '/static/consumed'));

app.use("/emissions",express.static(__dirname + '/static/emissions'));

app.use("/population",express.static(__dirname + '/static/population'));

//---------------------
app.use(bodyParser.json());
//---------------------
app.get("/time",(req,res) => {
 
 var now = new Date()
 res.send("<html><body><h1>It is "+ now+"</h1></body></html>")
});


//-------------------FUNCIONES------------------

function existe(array,name,res){
	var ok = 0;
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(name == array[i].name){
			res.send(array[i]);
			ok = 1;
		}
	}if(ok == 0){
			res.sendStatus(404);
		}
}


function busca(array,name,res){
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(name == array[i].name){
			array.splice(i,1);
			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}
	}
}

function borra(array,res){
	if(array == null || array.length == 0){
		res.sendStatus(200);
	}
	while(array.length > 0 ) {
			array.splice(0,1);
	}
		res.sendStatus(200);
}


function cambia(array,name,res,player){
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(name == array[i].name){
			array.splice(i,1,player);
			res.sendStatus(200);
		}else{
			res.sendStatus(404);
		}
	}
}

//---------------------GET------------------

var games = [];

app.get("/api/sandbox/games",(req,res) => {
 res.send(games);
});

app.get("/api/sandbox/games/:name",(req,res) => {
 var name = req.params.name;
 existe(games,name,res);
});

var books = [];

app.get("/api/sandbox/books", (req,res) =>{
   res.send(books);
 });

app.get("/api/sandbox/books/:name", (req,res) =>{
  var  book = req.params.name;
  existe(books,name,res);
 });


var players = [];

app.get("/api/sandbox/nba",(req,res) => {
	res.send(players);
});


app.get("/api/sandbox/nba/:name",(req,res) => {
	var name = req.params.name;
	existe(players,name,res);
	
});


//-------------------POST INICIALIZA-----------------------

app.post("/api-test/nba/loadInitialData", (req,res)=> {
	var playertest = { name: "Pau-Gasol"};
	var playertest2 = { name: "Marc-Gasol"};
	players.push(playertest);
	players.push(playertest2);
	res.sendStatus(200);
});


app.post("/api-test/books/loadInitialData", (req,res)=> {
	var bookstest =  {name: "La-cena-secreta"};
	var bookstest2 =  {name: "Angels-and-Demons"};
	books.push(bookstest);
	books.push(bookstest2);
	res.sendStatus(200);
});



app.post("/api-test/games/loadInitialData", (req,res)=> {
	var gamestest = { name: "WoW"};
	var gamestest2 = { name: "LoL"};
	games.push(gamestest);
	games.push(gamestest2);
	res.sendStatus(200);
});


//-----------------------POST-----------------------


app.post("/api/sandbox/games",(req,res) => {
 var newgame = req.body;
 games.push(newgame);
 res.sendStatus(200);
});

app.post("/api/sandbox/nba",(req,res) => {
 var newnba = req.body;
 players.push(newnba);
 res.sendStatus(200);
});

app.post("/api/sandbox/books",(req,res) => {
 var newbook = req.body;
 books.push(newbook);
 res.sendStatus(200);
});

app.post("/api/sandbox/games/:name",(req,res) => {
 res.sendStatus(405);
});

app.post("/api/sandbox/nba/:name",(req,res) => {
 res.sendStatus(405);
});

app.post("/api/sandbox/books/:name",(req,res) => {
 res.sendStatus(405);
});


//--------------------DELETE-----------------


app.delete("/api/sandbox/nba/:name",(req,res) => {
var name = req.params.name;
busca(players,name,res);
});

app.delete("/api/sandbox/games/:name",(req,res) => {
var name = req.params.name;
busca(games,name,res);
});

app.delete("/api/sandbox/books/:name",(req,res) => {
var name = req.params.name;
busca(books,name,res);
});


app.delete("/api/sandbox/nba",(req,res) => {
var name = req.params.name;
borra(players,res);
});

app.delete("/api/sandbox/games",(req,res) => {
var name = req.params.name;
borra(games,res);
});

app.delete("/api/sandbox/books",(req,res) => {
var name = req.params.name;
borra(books,res);
});

//------------------------PUT---------------------

app.put("/api/sandbox/books",(req,res) =>{
  res.sendStatus(405);
});

app.put("/api/sandbox/nba",(req,res) =>{
  res.sendStatus(405);
});

app.put("/api/sandbox/games",(req,res) =>{
  res.sendStatus(405);
});



app.put("/api/sandbox/nba/:name",(req,res) => {
var name = req.params.name;
var player = req.body;
cambia(players,name,res,player);
});

app.put("/api/sandbox/games/:name",(req,res) => {
var name = req.params.name;
var game = req.body;
cambia(games,name,res,game);
});

//players[0].name.set(name);

app.put("/api/sandbox/books/:name",(req,res) => {
var name = req.params.name;
var book = req.body;
cambia(books,name,res,book);
});


app.listen(port);
