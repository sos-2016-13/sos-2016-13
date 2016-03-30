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

function existe(array,country,res){
	var ok = 0;
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(country == array[i].country){
			res.send(array[i]);
			ok = 1;
		}
	}if(ok == 0){
			res.sendStatus(404);
		}
}


function busca(array,country,res){
	var res1 = 0;
	for(i=0; i< array.length;i++) {
		if(country == array[i].country){
			array.splice(i,1);
			res.sendStatus(200);
			res1 = 1;
		}
	}
	if(res1 != 1){
			res.sendStatus(404);
	}
}

function borra(array,res){
	if(array == null || array.length == 0){
		res.sendStatus(200);
	}
	while(array.length > 0) {
			array.splice(0,1);
	}
		res.sendStatus(200);
}



function isNumeric(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}

//---------------------GET------------------

var emissions = [];

app.get("/api/v1/emissions",(req,res) => {
	//Búsquedas y Paginación

	//Fallo el from si pones un numero muy alto, muestra todos. Y el to si pones un numero muy bajo tambien los muestra todos.

	//Preguntar si el limit, es la paginacion

	//Limit y busqueda no se puede hacer a la vez.


	var limit = req.query.limit;
	var noemin = req.query.from;
	var noemax = req.query.to;
	var filtro = 0;
	var emissions2 = [];

	if(noemax != null && noemin != null){
		for(i=0; i<= emissions.length-1; i++){
			if(emissions[i].nitrous_oxide_emissions > noemin && emissions[i].nitrous_oxide_emissions < noemax){
				emissions2.push(emissions[i]);
				filtro = 1;
			}
		}
	}else if(noemax != null){
		for(i=0; i<= emissions.length-1; i++){
			if(emissions[i].nitrous_oxide_emissions < noemax){
				emissions2.push(emissions[i]);
				filtro = 1;
			}
		}
	}else if(noemin != null){
		for(i=0; i<= emissions.length-1; i++){
			if(emissions[i].nitrous_oxide_emissions > noemin){
				emissions2.push(emissions[i]);
				filtro = 1;
			}
		}
	}

	if(limit && limit-1 < emissions.length-1 ){
		for(i=0; i<= limit-1; i++){
			emissions2.push(emissions[i]);
			filtro = 1;
		}
	}

	if(filtro == 1){
		res.send(emissions2);
	}else{
		res.send(emissions);
	}
});

app.get("/api/v1/emissions/:var",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	if(isNumeric(var1)){
			for (i=0; i<= emissions.length-1; i++) {
				if(emissions[i].year == var1){
					country2.push(emissions[i]);
				}
			}
		res.send(country2);
	}else{
		existe(emissions,var1,res);
	}
});

app.get("/api/v1/emissions/:var/:var2",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	var var2 = req.params.var2;

			for (i=0; i<= emissions.length-1; i++) {
				if(emissions[i].year == var2 && emissions[i].country == var1){
					country2.push(emissions[i]);
				}
			}
		res.send(country2);
});

var population = [];

app.get("/api/v1/population", (req,res) =>{
   res.send(population);
 });


app.get("/api/v1/population/:var",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	if(isNumeric(var1)){
			for (i=0; i<= population.length-1; i++) {
				if(population[i].year == var1){
					country2.push(population[i]);
				}
			}
		res.send(country2);
	}else{
		existe(population,var1,res);
	}
});

app.get("/api/v1/population/:var/:var2",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	var var2 = req.params.var2;

			for (i=0; i<= population.length-1; i++) {
				if(population[i].year == var2 && population[i].country == var1){
					country2.push(population[i]);
				}
			}
		res.send(country2);
});

var consumed = [];

app.get("/api/v1/consumed",(req,res) => {
	res.send(consumed);
});


app.get("/api/v1/consumed/:var",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	if(isNumeric(var1)){
			for (i=0; i<= consumed.length-1; i++) {
				if(consumed[i].year == var1){
					country2.push(consumed[i]);
				}
			}
		res.send(country2);
	}else{
		existe(consumed,var1,res);
	}
});

app.get("/api/v1/consumed/:var/:var2",(req,res) => {
	var country2 = [];
	var var1 = req.params.var;
	var var2 = req.params.var2;

			for (i=0; i<= consumed.length-1; i++) {
				if(consumed[i].year == var2 && consumed[i].country == var1){
					country2.push(consumed[i]);
				}
			}
		res.send(country2);
});

//-------------------POST INICIALIZA-----------------------

app.post("/api/v1/consumed/loadInitialData", (req,res)=> {
	var oneconsumedtest = [{ country: "Afganistan" , year: 2010 , petroleum_cost: 4800, electric_cost:801.4 },
							{ country: "Albania" , year: 2010 , petroleum_cost: 33000, electric_cost:3323000 },
							{ country: "Alemania" , year: 2010 , petroleum_cost: 2495000, electric_cost:545500000 },
							{ country: "Angola" , year: 2010 , petroleum_cost: 74000, electric_cost:2201000 },
							{ country: "Arabia Saudi" , year: 2010 , petroleum_cost: 5000, electric_cost:97.65 },
							{ country: "Spain" , year: "2015" , petroleum_cost: 5000, electric_cost:97.65 }];
	for (i=0; i<= oneconsumedtest.length-1; i++) {
		consumed.push(oneconsumedtest[i]);
	}
	res.sendStatus(201);
});


app.post("/api/v1/population/loadInitialData", (req,res)=> {
	var populationtest =  [{ country: "Afganistan" , year: 2010 , population: 31627506, access_to_electricity:43.0 },
       { country: "Albania" , year: 2010 , population: 2894475, access_to_electricity:100.0 },
       { country: "Alemania" , year: 2010 , population: 80889505, access_to_electricity:100.0 },
       { country: "Andorra" , year: 2010 , population: 72786, access_to_electricity:100.0 },
       { country: "Angola" , year: 2010 , population: 24227524, access_to_electricity:37.0 }];
	for (i=0; i<= populationtest.length-1; i++) {
		population.push(populationtest[i]);
	}
	res.sendStatus(201);
});



app.post("/api/v1/emissions/loadInitialData", (req,res)=> {
	var emissionstest =  [{ country: "Albania" , year: 2010 , nitrous_oxide_emissions: 1121, methane_emissions:2517 , co2_emissions: 1.6 },
       { country: "Alemania" , year: 2010 ,nitrous_oxide_emissions: 49966, methane_emissions:46329 , co2_emissions: 3.2 },
       { country: "Angola" , year: 2010 ,nitrous_oxide_emissions: 3307, methane_emissions:0 , co2_emissions: 6.3 },
       { country: "Arabia-Saudita" , year: 2010 ,nitrous_oxide_emissions: 6773, methane_emissions:0 , co2_emissions: 5.6 },
       { country: "Argelia" , year: 2010 ,nitrous_oxide_emissions: 5687, methane_emissions:97702 , co2_emissions: 4.7 }];
	for (i=0; i<= emissionstest.length-1; i++) {
		emissions.push(emissionstest[i]);
	}
	res.sendStatus(201);
});


//-----------------------POST-----------------------


app.post("/api/v1/emissions",(req,res) => {
 var newemission = req.body;
 emissions.push(newemission);
 res.sendStatus(201);
});

app.post("/api/v1/consumed",(req,res) => {
 var newconsumed = req.body;
 consumed.push(newconsumed);
 res.sendStatus(201);
});

app.post("/api/v1/population",(req,res) => {
 var newpeople = req.body;
 population.push(newpeople);
 res.sendStatus(201);
});

app.post("/api/v1/emissions/:country",(req,res) => {
 res.sendStatus(405);
});

app.post("/api/v1/consumed/:country",(req,res) => {
 res.sendStatus(405);
});

app.post("/api/v1/population/:country",(req,res) => {
 res.sendStatus(405);
});
 

//--------------------DELETE-----------------


app.delete("/api/v1/consumed/:country",(req,res) => {
var country = req.params.country;
busca(consumed,country,res);
});

app.delete("/api/v1/emissions/:country",(req,res) => {
var country = req.params.country;
busca(emissions,country,res);
});

app.delete("/api/v1/population/:country",(req,res) => {
var country = req.params.country;
busca(population,country,res);
});


app.delete("/api/v1/consumed",(req,res) => {
borra(consumed,res);
});

app.delete("/api/v1/emissions",(req,res) => {
borra(emissions,res);
});

app.delete("/api/v1/population",(req,res) => {
borra(population,res);
});

//------------------------PUT---------------------

app.put("/api/v1/population",(req,res) =>{
  res.sendStatus(405);
});

app.put("/api/v1/consumed",(req,res) =>{
  res.sendStatus(405);
});

app.put("/api/v1/emissions",(req,res) =>{
  res.sendStatus(405);
});



app.put("/api/v1/consumed/:country",(req,res) => {
var country = req.params.country;
var nuevo = req.body;
var ok = 0;
	for(i=0; i< consumed.length;i++){
		if(country == consumed[i].country && nuevo.country == consumed[i].country){
			//cambia param
			var campo1 = nuevo.country;
			var campo2 = nuevo.year;
			var campo3 = nuevo.petroleum_cost;
			var campo4 = nuevo.electric_cost;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null){
				res.sendStatus(400);
			}else{
				consumed[i].country = campo1;
				consumed[i].year = campo2;
				consumed[i].petroleum_cost = campo3;
				consumed[i].electric_cost = campo4;
			}
			ok = 1;
			res.sendStatus(200);
			break;
		}
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});

app.put("/api/v1/emissions/:country",(req,res) => {
var country = req.params.country;
var nuevo = req.body;
var ok = 0;
	for(i=0; i< emissions.length;i++){
		if(country == emissions[i].country && nuevo.country == emissions[i].country){
			//cambia param
			var campo1 = nuevo.country;
			var campo2 = nuevo.year;
			var campo3 = nuevo.nitrous_oxide_emissions;
			var campo4 = nuevo.methane_emissions;
			var campo5 = nuevo.co2_emissions;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null || campo5 == null){
				res.sendStatus(400);
			}else{
				emissions[i].country = campo1;
				emissions[i].year = campo2;
				emissions[i].nitrous_oxide_emissions = campo3;
				emissions[i].methane_emissions = campo4;
				emissions[i].co2_emissions = campo5;
			}
			ok = 1;
			res.sendStatus(200);
			break;
		}
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});


app.put("/api/v1/population/:country",(req,res) => {
var country = req.params.country;
var nuevo = req.body;
var ok = 0;
	for(i=0; i< population.length;i++){
		if(country == population[i].country && nuevo.country == population[i].country){
			//cambia param
			var campo1 = nuevo.country;
			var campo2 = nuevo.year;
			var campo3 = nuevo.population;
			var campo4 = nuevo.access_to_electricity;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null){
				res.sendStatus(400);
			}else{
				population[i].country = campo1;
				population[i].year = campo2;
				population[i].population = campo3;
				population[i].access_to_electricity = campo4;
			}
			ok = 1;
			res.sendStatus(200);
			break;
		}
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});


app.listen(port);
