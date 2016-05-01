


module.exports.existe =function (array,country,year,res){
	var ok = 0;
	var array1 = [];
	if(array == null || array.length == 0){
		res.sendStatus(404);
	}
	for(i=0; i< array.length;i++) {
		if(country == array[i].country  && year == array[i].year){
			array1.push(array[i]);
			res.send(array1);
			ok = 1;
		}
	}if(ok == 0){
			res.sendStatus(404);
		}
}


module.exports.busca= function(array,country,year,res){
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

module.exports.borra=function(array,res){
	if(array == null || array.length == 0){
		res.sendStatus(200);
	}
	while(array.length > 0) {
			array.splice(0,1);
	}
		res.sendStatus(200);
}



module.exports.isNumeric=function(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj);
}



module.exports.login= function(res,req){
	var key = req.query.apikey;
		if (key != "eea"){
			res.send(401);
		}
}



