var action = require("../action/user");
var bodyParser = require("body-parser");

var express = require("express");
var router = express.Router();
var jsonParser = bodyParser.json();
router.post("/", jsonParser,(req, res) => {

    res.set("Content-Type", "application/json");

    action.createUser(req.body, res)
});
router.get("/", (req, res) => {
    res.set("Content-Type", "application/json");
    action.getDataAll({}, res);
});
router.put("/", jsonParser,(req, res) => {
    var query = {}
    if (req.body.query)
        query = req.body.query;
    
    action.updateUser(query, req.body.newValue, res);
});
router.delete("/", jsonParser, (req, res) => {

    action.deleteUser(req.body, res);
});
module.exports = router;