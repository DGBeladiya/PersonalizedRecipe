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

router.get("/ListbyKeywords", (req, res) => {
  
    ingredient.find({} ,"name image keywords",
     (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;