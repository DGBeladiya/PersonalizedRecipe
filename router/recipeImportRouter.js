var express=require("express")
var router=express.Router();
var action=require("../action/recipeImport.js")
router.get("/food2Fork",function(req,res){
action.food2Fork({},req,res);
})
module.exports=router;