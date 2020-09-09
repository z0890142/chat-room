var mongoose = require('mongoose');


var Config = require('../../config/mongo.json');


var DB = mongoose.createConnection(Config.mongourl, Config.mongooption);

// Collections in database 1
require('../../Schema/User.js').initiate(DB);

exports.findModel = findModel = function(name)
{
	var model;
		if (DB.modelNames().indexOf(name) != -1) {
			model = DB.model(name);
		}	
	return model;
}

var Query = function(modelName) {

	return findModel(modelName);
};


var Model = function(modelName, data) {
	var model = findModel(modelName);

	if (model != undefined)
	{
		var obj = new model(data);
		return obj;
	}
}

exports.Query = Query;
exports.Model = Model;