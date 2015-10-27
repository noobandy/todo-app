var express = require("express");

var router = express.Router();

router.get("", function(req, res) {
	console.log("heartbeat received from "+req.query.user);
	res.send();
});

module.exports = router;