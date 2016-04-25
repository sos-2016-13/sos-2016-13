var  functionsCtl = require("./functions.js");
 
var emissions = [];


  //---------------------GET-------------------------//
   module.exports.getEmissionsPag = function(req,res){
 
 functionsCtl.login(res,req);

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
  res.sendStatus(200);
 }else if(filtro == 1){
  res.send(emissions2);
  res.sendStatus(200);
 }else if(pag == 1){
  res.send(emissions3);
  res.sendStatus(200);
 }else{
  res.send(emissions);
  res.sendStatus(200);
 }
};








	module.exports.getEmissionsInit= function(req,res){
	functionsCtl.login(res,req);
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

	if(functionsCtl.isNumeric(var1)){
			for (i=0; i<= emissions.length-1; i++) {
				if(emissions[i].year == var1 ){
					country2.push(emissions[i]);
				}
			}
			if(country2.length==0){
				res.sendStatus(404);
			}else{
		res.send(country2);
		res.sendStatus(200);
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
			res.sendStatus(200);
	}

}
};




	module.exports.getEmissionsCY=function(req,res){
	functionsCtl.login(res,req);
	var var1 = req.params.var; 
	var var2 = req.params.var2;
	functionsCtl.existe(emissions,var1,var2,res);
};


//---------------------------POST-----------------------//


module.exports.postEmissionsRB = function(req,res){
	functionsCtl.login(res,req);
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
};





module.exports.postEmissionsC=	function(req,res){ 
 functionsCtl.login(res,req);
  res. sendStatus(405);
};



//-----------------------DELETE--------------------------//

	module.exports.deleteEmissionsCY= function(req,res) {
	functionsCtl.login(res,req);
var country = req.params.country;
var year = req.params.year;
functionsCtl.busca(emissions,country,year,res);
};



	module.exports.deleteEmissions=function(req,res){
	functionsCtl.login(res,req);
functionsCtl.borra(emissions,res);
};



//----------------------PUT--------------------------//


	module.exports.putEmissionsRB=function(req,res){
	functionsCtl.login(res,req);
  res.sendStatus(405);
};



 module.exports.putEmissionsCY=function(req,res){
	functionsCtl.login(res,req);
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
};