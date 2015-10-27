var mongoose = require("mongoose");

var OnlineUserSchema = mongoose.Schema({
	username : String,
	lastHeartBeatReceivedAt : Date
});

module.exports = mongoose.model("OnlineUser", OnlineUserSchema);