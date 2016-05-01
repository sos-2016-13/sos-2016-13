var  functionsCtl = require("./functions.js");





var consumed = [];

//-------------------------GET------------------------------//

	module.exports.getConsumedPag=function(req,res){
 functionsCtl.login(res,req);
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
};


	module.exports.getConsumedInit=function(req,res){
	functionsCtl.login(res,req);
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


	if(functionsCtl.isNumeric(var1)){
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
};

module.exports.getConsumedCY=function(req,res){
	functionsCtl.login(res,req);
	var var1 = req.params.var;
	var var2 = req.params.var2;
	var consumed5 = [];
	functionsCtl.existe(consumed,var1,var2,res);
};



//-------------------------POST-----------------------------//


	module.exports.postConsumedRB= function(req,res){
	functionsCtl.login(res,req);
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
	
};


module.exports.postConsumedC=function(req,res){
	functionsCtl.login(res,req);
 res.sendStatus(405);
};



//------------------------DELETE---------------------------//
module.exports.deleteConsumedCY=function(req,res){
	functionsCtl.login(res,req);
var country = req.params.country;
var year = req.params.year;
functionsCtl.busca(consumed,country,year,res);
};

	module.exports.deleteConsumed=function(req,res) {
	functionsCtl.login(res,req);
functionsCtl.borra(consumed,res);
};

//----------------------------PUT-------------------------//

module.exports.putConsumedRB=function(req,res){
	functionsCtl.login(res,req);
  res.sendStatus(405);
};

	module.exports.putConsumedCY=function(req,res){
	functionsCtl.login(res,req);
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
};