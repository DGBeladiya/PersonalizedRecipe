var express = require("express")
var router = express.Router();
var recipe = require("../../model/recipe.js")
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: false })
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;
}
router.post("/ListbyIngredient", jsonParser, (req, res) => {
    var data = req.body.ingrdeint
   
        recipe.aggregate([{$match:{"ingredients.name":{$in:data}}},
            { $project: { name: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
        ], (err, docs) => {
            res.send(docs)
        });
})
router.post("/ListbyCategory", jsonParser, (req, res) => {
    var data = req.body.category

    recipe.aggregate([{$match:{"category":data}},
        { $project: { name: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
    ], (err, docs) => {
        res.send(docs)
    });
})
router.post("/GetRecipeInformation", jsonParser, (req, res) => {
    var _id = req.body._id;
    recipe.findById({ "_id": _id }, (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;
