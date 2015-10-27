var path = require("path");
var CronJob = require("cron").CronJob;
var OnlineUser = require(path.join(__dirname, "./OnlineUser.js"));
var moment = require("moment");

var job = new CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    // Runs every minute

    var lastHeartBeatTime = moment().subtract(1, "minutes");

    OnlineUser.find({lastHeartBeatReceivedAt : {$lte : lastHeartBeatTime.toDate()}}).
    remove(function(error, data) {
    	if(error) {
    		console.log("error");
    	} else {
    		console.log(data);
    	}
    });
    
  },
  start: false,
});

job.start();

module.exports = {
	start : function() {
		job.start();
	}
}