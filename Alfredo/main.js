var irc = require('irc');

//bot configuration
var botConfig = {
	server: "irc.freenode.net",
	channels: ["#Alfredo"],
	name: "AlfredoBot",
}

//bot creation
var bot = new irc.Client (botConfig.server, botConfig.name, {
	channels: botConfig.channels,
});

//!say command for the bot
bot.addListener('message', function (from, to, text, message) {

	var repeat = text.split(" ");

	if (repeat[0] === "!say") {
		repeat.shift();
		repeat.join(' ');
		bot.say(botConfig.channels, repeat);
	}
});