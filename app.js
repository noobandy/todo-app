var path = require("path");
var express = require("express");
var jade = require("jade");

var index = require(path.join(__dirname, "./routes/index.js"));
var pages = require(path.join(__dirname, "./routes/pages.js"));
var ais = require(path.join(__dirname, "./routes/ais.js"));

var app = new express();

app.engine("jade", function(filePath, options, callback) {
	return callback(null,jade.renderFile(filePath, options));
});

app.set("views", path.join(__dirname, "./views"));

app.set("view engine", "jade");

//static files 
//public
app.use("/public", express.static(path.join(__dirname,"public")));
//bower components
app.use("/bower_components", express.static(path.join(__dirname,"bower_components")));


app.use("", index);

app.use("/pages", pages);

app.use("/ais", ais);



var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('ToDo app listening at http://%s:%s', host, port);
});