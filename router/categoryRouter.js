var action = require("../action/category");
var bodyParser = require("body-parser");

var express = require("express");
var router = express.Router();
var jsonParser = bodyParser.json();
router.post("/", (req, res) => {

    res.set("Content-Type", "application/json");

    action.createDocument(res, req)
});
router.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    action.getDataAll({}, res);
});
router.put("/", (req, res) => {
    var query = {}
    if (req.body.query)
        query = req.body.query;
    
    action.updateDocument(query, req.body.newValue, res,req);
});
router.delete("/", jsonParser, (req, res) => {

    action.deleteDocument(req.body, res);
});
module.exports = router;