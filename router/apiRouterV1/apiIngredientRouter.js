var express = require("express")
var router = express.Router();
var ingredient = require("../../model/ingredient.js")
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;
}

router.get("/ListbyKeywords/:key", (req, res) => {
    var key = req.params.key;
    console.log(key)
    ingredient.find({ "name":{ $regex: '.*' + key + '.*' } } ,"name image",
     (err, docs) => {
        res.send(docs)
    }).limit(4)

    
})
module.exports = router;