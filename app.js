var path = require("path");
var express = require("express");
var index = require(path.join(__dirname, "./routes/index.js"));
var pages = require(path.join(__dirname, "./routes/pages.js"));

var app = new express();

//static files 

app.use("/public", express.static(path.join(__dirname,"public")));

app.use("/bower_components", express.static(path.join(__dirname,"bower_components")));

app.use("", index);

app.use("/pages", pages);

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});