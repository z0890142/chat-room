var logger = require('../config/logconfig.js').logger('default', 'info');
const path=require('path');
var dirRoot = path.dirname(__dirname);
var DBM = require(path.join(dirRoot,'Services','DB','db-manager.js'));
var Query = DBM.Query;
var Model = DBM.Model;

exports.Register= function(req, res) {
    var user = new Model("User", req.body);	
    user.save(function(error,result) {
        if (error)
            res.send({result:"ERROR", message: error});
        else {
            res.send({result:"OK", message: 'User registered'});
        }
    })
}