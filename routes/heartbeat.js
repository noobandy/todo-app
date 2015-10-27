var path = require("path");
var express = require("express");
var OnlineUser = require(path.join(__dirname, "../models/OnlineUser.js"));

var router = express.Router();

router.get("", function(req, res, next) {
	console.log("heartbeat received from "+req.query.user);
	var username = req.query.user;
	OnlineUser.find({username : username}, function(error, documents) {
		if(error) {
			next(error);
		}

		var onlineUser = null;
		if(documents.length === 0) {
			onlineUser = new OnlineUser({username : username, lastHeartBeatReceivedAt : new Date()});
		} else {
			onlineUser = documents[0];
			onlineUser.lastHeartBeatReceivedAt = new Date();
		}

		onlineUser.save(function(error, onlineUser) {
			if(error) {
				next(error);
			}
			res.send();
		});

	});
	
});

module.exports = router;