var dbConnection = require('config.js');
var irc 		 = require('irc');
var sms 		 = require('sms.js');

var db = dbConnection.mongoConnection;
var operators = db.collection('operators');

var botConfig = {
	server: "irc.freenode.net",
	channels: ["#Alfredo"],
	name: "AlfredoBot",
};

var bot = new irc.Client (botConfig.server, botConfig.name, {
	channels: botConfig.channels,
});

function getNewSms() {
	var newSms[] = sms.getMessage();

	for(var i = 0; i < newSms.length; i++) {
		//the app search for an operator who has the sms number already in processing
		operators.findOne({from: newSms.from}, function(err, opr) {

			if(err)
				bot.say(botConfig.channels, "Db access error");

			if(!opr) {
				//if he doesn't find it then it searches for an available operator
				operators.findOne({status: false}, function(err, opr) {

					if(err)
						bot.say(botConfig.channels, "Db access error");

					if (!opr)
						bot.say(botConfig.channels, "No operators available");

					bot.say(opr, newSms[i].message);
					operators.update({_id: opr._id}, {$set: {from: newSms[i].from, message: newSms[i].messageReceived, status: true}}, function(err, opr) {

						if(err)
							bot.say(botConfig.channels, "Db access error");
					});
				});
			};

			bot.say(opr, newSms[i].message);
			operators.update({_id: opr._id}, {$set: {from: newSms[i].from, message: newSms[i].messageReceived, status: true}}, function(err, opr) {

				if(err)
					bot.say(botConfig.channels, "Db access error");
			});
		});
	};
};

setInterval(getNewSms, 10000);