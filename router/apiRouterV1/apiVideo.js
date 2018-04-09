var express = require("express")
var router = express.Router();
var video = require("../../model/video.js")
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;
}

router.get("/ListVideo", (req, res) => {
  
    video.find({},
     (err, docs) => {
        res.send(docs)
    })
})
module.exports = router;