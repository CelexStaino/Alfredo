var request = require('request'),
    sms     = request;

exports.getMessage = function(cb) { 
	request('http://www.alfredo.com/index', function getSms(err, req, res) {
		cb(err, res.body)
});
};