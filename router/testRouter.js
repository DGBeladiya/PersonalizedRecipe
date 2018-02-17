var express=require("express");
var router=express.Router();
var action=require("../action/user");

router.get("/x",function(req,res){
		res.setHeader('Content-Type', 'application/json');

	var hello=action.updateUser({"_id":"5a47be334de50513346c0675"},{"name":"test"},res);
		
});
module.exports=router;