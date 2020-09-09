var mongoose = require("mongoose");
var mongooseConnection;
var SchemaTypes = mongoose.Schema.Types;

exports.initiate = function(connection) {
	var Schema = mongoose.Schema;
	var schema = new Schema({
        Name:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        FirendList:[String],
        ChatRecords:[String]
	});
	schema.set("autoIndex", false);

	mongooseConnection = connection;
	mongooseConnection.model("User", schema);
};

exports.getModel = function() {
	return mongooseConnection.model("User");
};