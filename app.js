var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}))

var ingredientRouter = require("./router/ingredientRouter.js");
var userRouter = require("./router/userRouter.js");
app.all("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
app.use("/ingredient", ingredientRouter);
app.use("/user", userRouter)

app.listen(process.env.PORT||3080,() => {
    console.log("server started ");
});
