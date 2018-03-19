var express=require("express")
var router=express.Router();
var ingredientRouter=require("./apiRouterV1/apiIngredient.js")
var categoryRouter=require("./apiRouterV1/apiCategory.js")
var recipeRouter=require("./apiRouterV1/apiRecipe.js")
router.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next()
})
router.use("/ingredient",ingredientRouter)
router.use("/category",categoryRouter)
router.use("/recipe",recipeRouter)
module.exports=router;