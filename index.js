 
var express = require("express"); 
var app = express(); 
var bodyParser =  require("body-parser");
var request = require("request");
var cors = require("cors");
var governify = require("governify");

var functionCtl = require("./functions.js");
var emissionsCtl= require("./emissionsCtl.js");
var populationCtl= require("./populationCtl.js");
var consumedCtl= require("./consumedCtl.js");
var port = (process.env.PORT || 10000);

app.use("/",express.static(__dirname));

app.use("/",express.static(__dirname + '/static'));

app.use("/consumed",express.static(__dirname + '/static/consumed'));

app.use("/RestClient",express.static(__dirname + '/static/consumed/RestClient'));

app.use("/emissions",express.static(__dirname + '/static/emissions'));

app.use("/RestClient",express.static(__dirname + '/static/emissions/RestClient'));

app.use("/population",express.static(__dirname + '/static/population'));

app.use("/RestClient",express.static(__dirname + '/static/population/RestClient'));


 //--------------GOVERNIFY-----------

governify.control(app,{
	datastore : "http://datastore.governify.io/api/v6.1/",
	namespace : "sos-2016-13-asm",
	defaultPath : "/api/v1/consumed",
	apiKeyVariable : "api"
});

governify.control(app,{
	datastore : "http://datastore.governify.io/api/v6.1/",
	namespace : "sos-2016-13-ejrm",
	defaultPath : "/api/v1/population",
	apiKeyVariable : "api"
});   

governify.control(app,{
	datastore : "http://datastore.governify.io/api/v6.1/",
	namespace : "sos-2016-13-epa",
	defaultPath : "/api/v1/emissions",
	apiKeyVariable : "api"
});   

app.use(cors());

var pathsAlvaro='/api/v1/locations';
var apiServerHost = 'http://sos-2016-05.herokuapp.com';
app.use(pathsAlvaro, function(req,res){
	var url = apiServerHost + req.baseUrl + req.url;

	req.pipe(request(url,(error,response,body)=>{
		if(error){
			res.sendStatus(503);
		}
	})).pipe(res);
});

var pathsEnrique='/api/v1/gold-medals';

app.use(pathsEnrique, function(req,res){
	var url = apiServerHost + req.baseUrl + req.url;

	req.pipe(request(url,(error,response,body)=>{
		if(error){
			res.sendStatus(503);
		}
	})).pipe(res);
});

var pathsEugenio='/api/v1/participants-number';
var apiServerHost = 'http://sos-2016-05.herokuapp.com';
app.use(pathsEugenio, function(req,res){
	var url = apiServerHost + req.baseUrl + req.url;

	req.pipe(request(url,(error,response,body)=>{
		if(error){
			res.sendStatus(503);
		}
	})).pipe(res);
});




/*

app.use(function(req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
*/
//---------------------
app.use(bodyParser.json());
//---------------------
app.get("/time",(req,res) => {
 
 var now = new Date()
 res.send("<html><body><h1>It is "+ now+"</h1></body></html>")
});

//-----------------------GET-----------------------------//
app.get("/api/v1/emissions",emissionsCtl.getEmissionsPag);
app.get("/api/v1/emissions/:var",emissionsCtl.getEmissionsInit);
app.get("/api/v1/emissions/:var/:var2",emissionsCtl.getEmissionsCY);
app.get("/api/v1/population",populationCtl.getPopulationPag);
app.get("/api/v1/population/:var",populationCtl.getPopulationInit);
app.get("/api/v1/population/:var/:var2",populationCtl.getPopulationCY);
app.get("/api/v1/consumed",consumedCtl.getConsumedPag);
app.get("/api/v1/consumed/:var",consumedCtl.getConsumedInit);
app.get("/api/v1/consumed/:var/:var2",consumedCtl.getConsumedCY);


//--------------------POST------------------------------//

app.post("/api/v1/emissions",emissionsCtl.postEmissionsRB);
app.post("/api/v1/emissions/:country/:year",emissionsCtl.postEmissionsC);
app.post("/api/v1/population",populationCtl.postPopulationRB);
app.post("/api/v1/population/:country/:year",populationCtl.postPopulationC);
app.post("/api/v1/consumed",consumedCtl.postConsumedRB);
app.post("/api/v1/consumed/:country/:year",consumedCtl.postConsumedC);


//----------------------DELETE------------------------//
app.delete("/api/v1/emissions/:country/:year",emissionsCtl.deleteEmissionsCY);
app.delete("/api/v1/emissions",emissionsCtl.deleteEmissions);
app.delete("/api/v1/population/:country/:year",populationCtl.deletePopulationCY);
app.delete("/api/v1/population",populationCtl.deletePopulation);
app.delete("/api/v1/consumed/:country/:year",consumedCtl.deleteConsumedCY);
app.delete("/api/v1/consumed",consumedCtl.deleteConsumed);

//--------------------PUT---------------------------//
app.put("/api/v1/emissions",emissionsCtl.putEmissionsRB);
app.put("/api/v1/emissions/:country/:year",emissionsCtl.putEmissionsCY);
app.put("/api/v1/population",populationCtl.putPopulationRB);
app.put("/api/v1/population/:country/:year",populationCtl.putPopulationCY);
app.put("/api/v1/consumed",consumedCtl.putConsumedRB);
app.put("/api/v1/consumed/:country/:year",consumedCtl.putConsumedCY);

app.listen(port);

