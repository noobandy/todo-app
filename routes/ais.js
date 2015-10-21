var path = require("path");
var express = require("express");
var router = express.Router();
var classifier = require(path.join(__dirname, "../classifier.js"));

router.get("/classify", function(req, res, next) {
	res.send(classifier.classify(req.query.input));
});
module.exports = router;