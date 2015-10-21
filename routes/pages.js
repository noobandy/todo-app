var path = require("path");
var express = require("express");
var router = express.Router();

router.get("/agenda", function(req, res) {
	res.sendFile(path.join(__dirname, "../views/pages/agenda.html"));
});

router.get("/clock", function(req, res) {
	res.sendFile(path.join(__dirname, "../views/pages/clock.html"));
});

router.get("/hospital", function(req, res) {
	res.sendFile(path.join(__dirname, "../views/pages/hospital.html"));
});

router.get("/scratchpad", function(req, res) {
	res.sendFile(path.join(__dirname, "../views/pages/scratchpad.html"));
});


module.exports = router;