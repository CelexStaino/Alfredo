var mongodb = require('mongodb'),
    MongoClient = mongodb.MongoClient,
    redis = require('redis'),
    redisClient = redis.createClient();


exports.mongoConnection = function(cb) {
	MongoClient.connect('mongodb://localhost/alfred', cb)
};

exports.redisConnection = function(cb) {
	cb(null, redisClient);
};