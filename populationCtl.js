var  functionsCtl = require("./functions.js");





var population = [];


//----------------------GET-----------------------//
module.exports.getPopulationPag=function (req,res){
 functionsCtl.login(res,req);
   
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
};


	module.exports.getPopulationInit=function(req,res){
	functionsCtl.login(res,req);
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
		if(functionsCtl.isNumeric(var1)){
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
};



	module.exports.getPopulationCY= function(req,res){
	functionsCtl.login(res,req);
	var var1 = req.params.var;
	var var2 = req.params.var2;
	functionsCtl.existe(population,var1,var2,res);
};


//-------------------------------------POST--------------------//


	module.exports.postPopulationRB=function(req,res){
	functionsCtl.login(res,req);
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
};



	module.exports.postPopulationC=function(req,res){
	functionsCtl.login(res,req);
 res.sendStatus(405);
};


//----------------------------------DELETE----------------------//


	module.exports.deletePopulationCY=function(req,res){
	functionsCtl.login(res,req);
var country = req.params.country;
var year= req.params.year;
functionsCtl.busca(population,country,year,res);
};



	module.exports.deletePopulation=function(req,res){
	functionsCtl.login(res,req);
functionsCtl.borra(population,res);
};

//-------------------------PUT-------------------------------//

	module.exports.putPopulationRB=function(req,res){
	functionsCtl.login(res,req);
  res.sendStatus(405);
};




	module.exports.putPopulationCY=function(req,res){
	functionsCtl.login(res,req);
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
};