var express = require("express")
var router = express.Router();
var category = require("../../model/category.js")
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;
}

router.get("/ListCategory", (req, res) => {
    
   
    category.find({} ,"image name",
     (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;