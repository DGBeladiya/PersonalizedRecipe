var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

var router = require("./router/ingredientRouter.js");
app.all("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.use("/ingredient", router);
app.listen(4444, () => {
    console.log("server started on port 4444");
});
