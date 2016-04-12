var express = require("express");
var app = express();
var bodyParser =  require("body-parser");

var port = (process.env.PORT || 10000);

app.use("/",express.static(__dirname + '/static'));
app.use("/RESTClient",express.static(__dirname + '/RESTClient'));

app.use("/consumed",express.static(__dirname + '/static/consumed'));

app.use("/emissions",express.static(__dirname + '/static/emissions'));

app.use("/population",express.static(__dirname + '/static/population'));

app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//---------------------
app.use(bodyParser.json());
//---------------------
app.get("/time",(req,res) => {
 
 var now = new Date()
 res.send("<html><body><h1>It is "+ now+"</h1></body></html>")
});


//-------------------FUNCIONES------------------

function existe(array,country,year,res){
	var ok = 0;
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(country == array[i].country  && year == array[i].year){
			res.send(array[i]);
			ok = 1;
		}
	}if(ok == 0){
			res.sendStatus(404);
		}
}


function busca(array,country,year,res){
	var res1 = 0;
	for(i=0; i< array.length;i++) {
		if(country == array[i].country && year == array[i].year ){
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



function login(res,req){
	var key = req.query.apikey;
		if (key != "eea"){
			res.send(401);
		}
}

//---------------------GET------------------

var emissions = [];



app.get("/api/v1/emissions",(req,res) => {
 
 login(res,req);

 //Búsquedas y Paginación

 var limit = req.query.limit;
 var noemin = req.query.from;
 var noemax = req.query.to;
 var offset = req.query.offset;
 var filtro = 0;
 var emissions2 = [];
 var emissions3 = [];
 var pag = 0;
 var count = 0 ;

 if(noemax != null && noemin != null){
  filtro = 1;
  for(i=0; i<= emissions.length-1; i++){
   if(emissions[i].nitrous_oxide_emissions > noemin && emissions[i].nitrous_oxide_emissions < noemax){
    emissions2.push(emissions[i]);
   }
  }
 }else if(noemax != null && noemin == null){
  filtro = 1;
  for(i=0; i<= emissions.length-1; i++){
   if(emissions[i].nitrous_oxide_emissions < noemax){
    emissions2.push(emissions[i]);
   }
  }
 }else if(noemin != null && noemax == null){
  filtro = 1;
  for(i=0; i<= emissions.length-1; i++){
   if(emissions[i].nitrous_oxide_emissions > noemin){
    emissions2.push(emissions[i]);
   }
  }
 }

if(filtro == 1 && limit != null && limit-1 < emissions.length-1 && offset != null){
 
 while(count != limit && offset <= emissions2.length-1){
  emissions3.push(emissions2[offset]);
  count++;
  offset++;
 }
 pag = 1;
}else if(limit != null && limit-1 < emissions.length-1 && offset != null ){
 
 while(count != limit){
  emissions3.push(emissions[offset]);
  count++;
  offset++;
 }
 pag = 1;
}
 
 if(filtro == 1 && pag == 1){
  res.send(emissions3);
 }else if(filtro == 1){
  res.send(emissions2);
 }else if(pag == 1){
  res.send(emissions3);
 }else{
  res.send(emissions);
 }
});

app.get("/api/v1/emissions/:var",(req,res) => {
	login(res,req);
	var country2 = [];
	var var1 = req.params.var;


	if(var1 == "loadInitialData"){
   var emissionstest =  [{ country: "Albania" , year: 2010 , nitrous_oxide_emissions: 1121, methane_emissions:2517 , co2_emissions: 1.6 },
       { country: "Alemania" , year: 2010 ,nitrous_oxide_emissions: 49966, methane_emissions:46329 , co2_emissions: 3.2 },
       { country: "Angola" , year: 2010 ,nitrous_oxide_emissions: 3307, methane_emissions:0 , co2_emissions: 6.3 },
       { country: "Arabia-Saudita" , year: 2010 ,nitrous_oxide_emissions: 6773, methane_emissions:0 , co2_emissions: 5.6 },
       { country: "Argelia" , year: 2010 ,nitrous_oxide_emissions: 5687, methane_emissions:97702 , co2_emissions: 4.7 }];
 if(emissions.length != 0){
  while(emissions.length > 0) {
  emissions.splice(0,1);
  }
 }
 for (i=0; i<= emissionstest.length-1; i++) {
  emissions.push(emissionstest[i]);
 }
 res.sendStatus(201);
 }

	if(isNumeric(var1)){
			for (i=0; i<= emissions.length-1; i++) {
				if(emissions[i].year == var1 ){
					country2.push(emissions[i]);
				}
			}
			if(country2.length==0){
				res.sendStatus(404);
			}else{
		res.send(country2);
	}
	}else{

		

			for (i=0; i<= emissions.length-1; i++) {
				if( emissions[i].country == var1){
					country2.push(emissions[i]);
				}
			}
			if(country2.length==0){

             res.sendStatus(404);
			}else{
			res.send(country2);
	}

}
});


app.get("/api/v1/emissions/:var/:var2",(req,res) => {
	login(res,req);
	var var1 = req.params.var; 
	var var2 = req.params.var2;
	existe(emissions,var1,var2,res);
});

var population = [];


app.get("/api/v1/population", (req,res) =>{
 login(res,req);
   
 var limit = req.query.limit;
 var noemin = req.query.from;
 var noemax = req.query.to;
 var offset = req.query.offset;
 var filtro = 0;
 var population2 = [];
 var population3 = [];
 var pag = 0;
 var count = 0;

 if(noemax != null && noemin != null){
  filtro = 1;
  for(i=0; i<= population.length-1; i++){
   if(population[i].access_to_electricity > noemin && population[i].access_to_electricity < noemax){
    population2.push(population[i]);
   }
  }
 }else if(noemax != null && noemin == null){
  filtro = 1;
  for(i=0; i<= population.length-1; i++){
   if(population[i].access_to_electricity < noemax){
    population2.push(population[i]);
   }
  }
 }else if(noemin != null && noemax == null){
  filtro = 1;
  for(i=0; i<= population.length-1; i++){
   if(population[i].access_to_electricity > noemin){
    population2.push(population[i]);
   }
  }
 }

if(filtro == 1 && limit != null && limit-1 < population.length-1 && offset != null ){
 
 while(count != limit && offset <= population2.length-1){
  population3.push(population2[offset]);
  count++;
  offset++;
 }
 pag = 1;
}else if(limit != null && limit-1 < population.length-1 && offset != null ){
 
 while(count != limit ){
  population3.push(population[offset]);
  count++;
  offset++;
 }
 pag = 1;
}
 
 if(filtro == 1 && pag == 1){
  res.send(population3);
 }else if(filtro == 1){
  res.send(population2);
 }else if(pag == 1){
  res.send(population3);
 }else{
  res.send(population);
 }
});


app.get("/api/v1/population/:var",(req,res) => {
	login(res,req);
	var country2 = [];
	var var1 = req.params.var;



	if(var1 == "loadInitialData"){
  var populationtest =  [{ country: "Afganistan" , year: 2010 , population: 31627506, access_to_electricity:43.0 },
       { country: "Albania" , year: 2010 , population: 2894475, access_to_electricity:100.0 },
       { country: "Alemania" , year: 2010 , population: 80889505, access_to_electricity:100.0 },
       { country: "Andorra" , year: 2010 , population: 72786, access_to_electricity:100.0 },
       { country: "Angola" , year: 2010 , population: 24227524, access_to_electricity:37.0 }];
 
 if(population.length != 0){
   while(population.length > 0) {
   population.splice(0,1);
   }
 }

 for (i=0; i<= populationtest.length-1; i++) {
  population.push(populationtest[i]);
 }
 res.sendStatus(201);
 }
	if(isNumeric(var1)){
			for (i=0; i<= population.length-1; i++) {
				if(population[i].year == var1 ){
					country2.push(population[i]);
				}
			}
			if(country2.length==0){
				res.sendStatus(404);
			}else{
		res.send(country2);
	}
	}else{

		

			for (i=0; i<= population.length-1; i++) {
				if( population[i].country == var1){
					country2.push(population[i]);
				}
			}
			if(country2.length==0){

             res.sendStatus(404);
			}else{
			res.send(country2);
	}

}
});

app.get("/api/v1/population/:var/:var2",(req,res) => {
	login(res,req);
	var var1 = req.params.var;
	var var2 = req.params.var2;
	existe(population,var1,var2,res);
});

var consumed = [];


app.get("/api/v1/consumed",(req,res) => {
 login(res,req);
 var limit = req.query.limit;
 var noemin = req.query.from;
 var noemax = req.query.to;
 var offset = req.query.offset;
 var filtro = 0;
 var consumed2 = [];
 var consumed3 = [];
 var pag = 0;
 var count =0;

 if(noemax != null && noemin != null){
  filtro = 1;
  for(i=0; i<= consumed.length-1; i++){
   if(consumed[i].petroleum_cost > noemin && consumed[i].petroleum_cost < noemax){
    consumed2.push(consumed[i]);
   }
  }
 }else if(noemax != null && noemin == null){
  filtro = 1;
  for(i=0; i<= consumed.length-1; i++){
   if(consumed[i].petroleum_cost < noemax){
    consumed2.push(consumed[i]);
   }
  }
 }else if(noemin != null && noemax == null){
  filtro = 1;
  for(i=0; i<= consumed.length-1; i++){
   if(consumed[i].petroleum_cost > noemin){
    consumed2.push(consumed[i]);
   }
  }
 }

if(filtro == 1 && limit != null && limit-1 < consumed.length-1 && offset != null){
 
 while(count != limit && offset <= consumed2.length-1){
  consumed3.push(consumed2[offset]);
  count++;
  offset++;
 }
 pag = 1;
}else if(limit != null && limit-1 < consumed.length-1 && offset != null ){
 
 while(count != limit){
  consumed3.push(consumed[offset]);
  count++;
  offset++;
 }
 pag = 1;
}
 
 if(filtro == 1 && pag == 1){
  res.send(consumed3);
 }else if(filtro == 1){
  res.send(consumed2);
 }else if(pag == 1){
  res.send(consumed3);
 }else{
  res.send(consumed);
 }
});

app.get("/api/v1/consumed/:var",(req,res) => {
	login(res,req);
	var country2 = [];
	var var1 = req.params.var;
	if(var1 == "loadInitialData"){
 var oneconsumedtest = [{ country: "Afganistan" , year: 2010 , petroleum_cost: 4800, electric_cost:801.4 },
       { country: "Albania" , year: 2010 , petroleum_cost: 33000, electric_cost:3323000 },
       { country: "Alemania" , year: 2010 , petroleum_cost: 2495000, electric_cost:545500000 },
       { country: "Angola" , year: 2010 , petroleum_cost: 74000, electric_cost:2201000 },
       { country: "Arabia Saudi" , year: 2010 , petroleum_cost: 5000, electric_cost:97.65 },
       { country: "Spain" , year: "2015" , petroleum_cost: 5000, electric_cost:97.65 }];
 //Si esta lleno, borra el array.
 if(consumed.length != 0){
   while(consumed.length > 0) {
   consumed.splice(0,1);
    }
  }

 for (i=0; i<= oneconsumedtest.length-1; i++) {
  consumed.push(oneconsumedtest[i]);
 }
 res.sendStatus(201);
 }


		if(isNumeric(var1)){
			for (i=0; i<= consumed.length-1; i++) {
				if(consumed[i].year == var1 ){
					country2.push(consumed[i]);
				}
			}
			if(country2.length==0){
				res.sendStatus(404);
			}else{
		res.send(country2);
	}
	}else{

		

			for (i=0; i<= consumed.length-1; i++) {
				if( consumed[i].country == var1){
					country2.push(consumed[i]);
				}
			}
			if(country2.length==0){

             res.sendStatus(404);
			}else{
			res.send(country2);
	}

}
});

app.get("/api/v1/consumed/:var/:var2",(req,res) => {
	login(res,req);
	var var1 = req.params.var;
	var var2 = req.params.var2;
	existe(consumed,var1,var2,res);
});






//-----------------------POST-----------------------


app.post("/api/v1/emissions",(req,res) => {
	login(res,req);
	var newemission = req.body;
 	var ok =1;

 for (i = 0; i<= emissions.length-1 ; i++){

			var campo1 = newemission.country;
			var campo2 = newemission.year;
			var campo3 = newemission.nitrous_oxide_emissions;
			var campo4 = newemission.methane_emissions;
			var campo5 = newemission.co2_emissions;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null || campo5 == null){
				res.sendStatus(400);
			}
 	if(newemission.country == emissions[i].country   &&  newemission.year == emissions[i].year){
         ok = 0; 		
 		}
 	}
 	if(ok==1){
 		 emissions.push(newemission);
 		 res.sendStatus(201);
 		}else{
 		 res.sendStatus(409);
 		}
});

app.post("/api/v1/consumed",(req,res) => {
	login(res,req);
 var newconsumed = req.body;
 var ok =1;
 
 for (i = 0; i<= consumed.length-1 ; i++){

			var campo1 = newconsumed.country;
			var campo2 = newconsumed.year;
			var campo3 = newconsumed.petroleum_cost;
			var campo4 = newconsumed.electric_cost;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null){
				res.sendStatus(400);
			}

 	if(newconsumed.country == consumed[i].country &&  newconsumed.year == consumed[i].year){
         ok = 0; 		
 		}
 	}
 	if(ok==1){
 		 consumed.push(newconsumed);
 		 res.sendStatus(201);
 	}else{
 		 res.sendStatus(409);
 	}
	
});

app.post("/api/v1/population",(req,res) => {
	login(res,req);
 var newpeople = req.body;
  var ok =1;

 for (i = 0; i<= population.length-1 ; i++){

 			var campo1 = newpeople.country;
			var campo2 = newpeople.year;
			var campo3 = newpeople.population;
			var campo4 = newpeople.access_to_electricity;

			if (campo1 == null || campo2 == null || campo3 == null || campo4 == null){
				res.sendStatus(400);
			}


 	if(newpeople.country == population[i].country && newpeople.year == population[i].year){
         ok = 0; 		
 		}
 	}
 	if(ok==1){
 		 population.push(newpeople);
 		 res.sendStatus(201);
 		}else{
 		 res.sendStatus(409);
 		}
});

app.post("/api/v1/emissions/:country",(req,res) => { 
 login(res,req);
  res. sendStatus(405);
});

app.post("/api/v1/emissions/:year",(req,res) => {
	login(res,req);
 res.sendStatus(405);
});
app.post("/api/v1/consumed/:country",(req,res) => {
	login(res,req);
 res.sendStatus(405);
});

app.post("/api/v1/consumed/:year",(req,res) => {
	login(res,req);
 res.sendStatus(405);
});

app.post("/api/v1/population/:country",(req,res) => {
	login(res,req);
 res.sendStatus(405);
});
app.post("/api/v1/population/:year",(req,res) => {
	login(res,req);
 res.sendStatus(405);
});
 

//--------------------DELETE-----------------


app.delete("/api/v1/consumed/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year = req.params.year;
busca(consumed,country,year,res);
});

app.delete("/api/v1/emissions/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year = req.params.year;
busca(emissions,country,year,res);
});

app.delete("/api/v1/population/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year= req.params.year;
busca(population,country,year,res);
});


app.delete("/api/v1/consumed",(req,res) => {
	login(res,req);
borra(consumed,res);
});

app.delete("/api/v1/emissions",(req,res) => {
	login(res,req);
borra(emissions,res);
});

app.delete("/api/v1/population",(req,res) => {
	login(res,req);
borra(population,res);
});

//------------------------PUT---------------------

app.put("/api/v1/population",(req,res) =>{
	login(res,req);
  res.sendStatus(405);
});

app.put("/api/v1/consumed",(req,res) =>{
	login(res,req);
  res.sendStatus(405);
});

app.put("/api/v1/emissions",(req,res) =>{
	login(res,req);
  res.sendStatus(405);
});



app.put("/api/v1/consumed/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year = req.params.year;
var nuevo = req.body;
var ok = 0;
var url = 0;
	for(i=0; i< consumed.length;i++){
		if(country != nuevo.country || year != nuevo.year){
			url = 1
		}
		if(country == consumed[i].country && nuevo.country == consumed[i].country &&  year == consumed[i].year && nuevo.year == consumed[i].year){
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
	if(url == 1){
		res.sendStatus(400);
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});

app.put("/api/v1/emissions/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year = req.params.year;
var nuevo = req.body;
var ok = 0;
var url = 0;
	for(i=0; i< emissions.length;i++){
		if(country != nuevo.country || year != nuevo.year){
			url = 1
		}
		if(country == emissions[i].country && nuevo.country == emissions[i].country && year == emissions[i].year && nuevo.year == emissions[i].year){
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
	if(url == 1){
		res.sendStatus(400);
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});


app.put("/api/v1/population/:country/:year",(req,res) => {
	login(res,req);
var country = req.params.country;
var year = req.params.year;
var nuevo = req.body;
var ok = 0;
var url = 0;
	for(i=0; i< population.length;i++){
		if(country != nuevo.country || year != nuevo.year){
			url = 1
		}
		if(country == population[i].country && nuevo.country == population[i].country && year == population[i].year && nuevo.year == population[i].year){
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
	if(url == 1){
		res.sendStatus(400);
	}
	if(ok != 1){
		res.sendStatus(404);
	}
});


app.listen(port);
