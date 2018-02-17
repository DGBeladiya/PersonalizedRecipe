var mongo=require("mongoose");
var config=require("../config/config");
mongo.connect(config.dbURL);
module.exports=mongo;