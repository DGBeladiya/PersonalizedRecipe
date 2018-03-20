var express = require("express")
var router = express.Router();
var recipe = require("../../model/recipe.js")
var bodyParser=require("body-parser")
var jsonParser = bodyParser.json();
var urlEncoded=bodyParser.urlencoded({extended: false})
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;
}

router.post("/ListbyIngredient", jsonParser,(req, res) => {
  var data=req.body.ingrdeint

 
    
    recipe.find({"ingredients.name":{$in:data}} ,"name image category time",
     (err, docs) => {
        res.send(docs)
    })
})

router.post("/ListbyCategory", jsonParser,(req, res) => {
  var data=req.body.category

 
    
    recipe.find({category:data} ,"name image category time",
     (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;
