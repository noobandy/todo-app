var path = require("path");
var express = require("express");
var router = express.Router();

router.get("/:page", function(req, res) {
	res.sendFile(path.join(__dirname, "../views/pages/"+req.params.page+".html"));
});

module.exports = router;