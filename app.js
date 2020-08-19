var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/",function(req,res) {
	res.render("home");
})

app.post("/results",function(req,res) {
	var search = req.body.search;
	var url = "http://www.omdbapi.com/?s="+search+"&apikey=thewdb";
	request(url,function(error,response,body) {
		if(!error && response.statusCode==200) {
			var data = JSON.parse(body);
			res.render("results",{data:data});
		}
	})
})

app.get("/results/:id",function(req,res){
	var id = req.params.id;
	var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
	request(url,function(error,response,body) {
		if(!error && response.statusCode==200) {
			var data = JSON.parse(body);
			res.render("details",{data:data});
		}
	})
});

app.listen(process.env.PORT || 3000, process.env.IP);