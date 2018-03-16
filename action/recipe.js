var Recipe = require("../model/recipe")
var handler = require("./handler")
function Response() {
    this.status = "";
    this.errors = {};
    this.successMessage = "";
    this.data = {},
        this.statusCode = 0;

}
var base64Img = require("base64-img")
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "upload/recipe/")
    },
    filename: (req, file, callback) => {
        callback(null, "Recipe" + '_' + Date.now() + path.extname(file.originalname))
    }
});
//upload Functions
var upload = multer({
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);

        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback('Only images are allowed', false)
        }
        callback(null, true)
    }, storage: storage
}).single('image')
module.exports = {
    createRecipe: (res, req) => {
        new Promise((resolve, reject) => {

            upload(req, res, (err) => {

                if (err)
                    reject({ error: err, data: req.body });
                else
                    resolve({ error: err, data: req.body });
            })
        }).then((result) => {
            //getting Data of Request Body
            data = result.data

            //check is file is passed or not
            if (typeof req.file != "undefined")
                if (typeof req.file.filename != "undefined") {
                data.image = req.file.filename;

                }

            if (data.image == "undefined")
                data.image = "";
            //Prepare object for Document Creation
            var stepsImage = JSON.parse(data.step)
            for (var i = 0; i < stepsImage.length; i++) {
                var fileName = data.name + "_" + new Date().getTime() + "_" + i;
                base64Img.img(stepsImage[i].stepImage, 'upload/recipe/',
                    fileName, function (err, filepath) {

                    })

                stepsImage[i].image = fileName + "." + stepsImage[i].stepImage.substring("data:image/".length, stepsImage[i].stepImage.indexOf(";base64"))
                delete stepsImage[i].stepImage

            }

            var newRecipe = new Recipe({
                name: data.name,
                description: data.description,
                category: data.category,
                cost: data.cost,
                time: data.time,
                noOfPerson: data.noOfPerson,
                image: data.image,
                userId: req.session.userId,
                steps: stepsImage,
                ingredients: JSON.parse(data.ingredient)
            });
            //Check The docuement is Valid or not
            newRecipe.validate(function (err) {
                var obj = new Response();
                //  console.log(err);
                if (err) {
                    obj.status = "Invalid"
                    obj.statusCode = 400
                    console.log(err)
                    obj.errors = setError(err);
                }
                else {
                    newRecipe.save(function (err) { });
                    obj.successMessage = "Data Saved!";
                    obj.statusCode = 201;
                }
                handler(obj, res);
            });
        }, (err) => {
            data = err.data
            console.log(err)
            var newRecipe = new Recipe({
                name: data.name,
                description: data.description,
                category: data.category,
                cost: data.cost,
                time: data.time,
                noOfPerson: data.noOfPerson,
                image: data.image,
                userId: req.session.userId,
                steps: data.step,
                ingredients: data.ingredient
            });
            obj.status = "Invalid"
            obj.statusCode = 400
            newRecipe.validate(function (e) {
                if (e) {
                    obj.errors = setError(e);
                }
                obj.errors.image = err.error;
                handler(obj, res);
            });
        });

    },
    getDataAll: function (query, res) {
        var obj = new Response();
        Recipe.find(query, function (err, doc) {
            if (err) {
                obj.status = "Invalid";
                obj.statusCode = 400;
            }
            else {
                obj.status = "Valid";
                obj.data = doc;
                obj.statusCode = 200;
            }
            handler(obj, res);
        });
    },
    getUnApproveCount: (req, res) => {

        Recipe.count({ isApproved: false }, (err, count) => {
            var response = new Response()
            if (err) {
                response.statusCode = 400;
                reponse.status = "Invalid";
            } else {
                response.statusCode = 200;
                response.data.unApproveCount = count;
                response.status = "Valid";
            }
            handler(response, res);
        })
    }
}
function setError(err) {
    error = new Object()
    if (err.errors["name"]) {
        error.name = err.errors["name"].message
    }
    if (err.errors["description"]) {
        error.description = err.errors["description"].message;
    }
    if (err.errors["category"]) {
        error.category = err.errors["category"].message
    }
    if (err.errors["cost"]) {
        error.cost = err.errors["cost"].message
    }
    if (err.errors["noOfPerson"]) {
        error.noOfPerson = err.errors["noOfPerson"].message

    }
    return error
}