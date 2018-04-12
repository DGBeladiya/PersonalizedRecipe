var express = require("express")
var router = express.Router();
var recipe = require("../../model/recipe.js")
var bodyParser = require("body-parser")
var db = require("mongoose")
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
    /*for (var i = 0; i < data.length; i++) {
        data[i] = new RegExp("/^" + data[i] + "$/i");
    }
    */
    data = data.map(function (v, i) {
        return new RegExp(v, 'i');
    });
    recipe.aggregate([{ $match: { "ingredients.name": { $in: data } } },
    { $project: { name: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
    ], (err, docs) => {
        res.send(docs)
    });
})
router.post("/ListbyCategory", jsonParser, (req, res) => {
    var data = req.body.category

    recipe.aggregate([{ $match: { "category": data } },
    { $project: { name: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
    ], (err, docs) => {
        res.send(docs)
    });
})

router.get("/ListTopFive", jsonParser, (req, res) => {


    recipe.aggregate([ 
    { $project: { name: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
    ,{ $sort: { rating: -1 } },{ $limit: 5 }], (err, docs) => {
        res.send(docs)
    }).limit(5);
})


router.post("/GetRecipeInformation", jsonParser, (req, res) => {
    var _id = req.body._id;

    recipe.aggregate([{ $match: { "_id": db.Types.ObjectId(_id) } },
    { $project: { name: true, description: true, cost: true, noOfPerson: true, ingredients: true, image: true, category: true, time: true, rating: { $avg: "$review.rating" } } }
    ], (err, docs) => {
        res.send(docs)
    });
})
router.post("/GetRecipeSteps", jsonParser, (req, res) => {
    var _id = req.body._id;
    recipe.findById({ "_id": _id }, "steps", (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;
