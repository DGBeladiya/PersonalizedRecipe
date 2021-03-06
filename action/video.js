var video = require("../model/video.js");
//Resposne Model
function Response() {
	this.status = "";
	this.errors = {};
	this.successMessage = "";
	this.data = {},
		this.statusCode = 0;

}

var handler = require("./handler");
var multer = require("multer");
var path = require("path");
//setting up the storage option
var storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "upload/video/")
	},
	filename: (req, file, callback) => {
		callback(null, "video" + '_' + Date.now() + path.extname(file.originalname))
	}
});
//upload Functions
var upload = multer({
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);

		if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.ico') {
			return callback('Only images are allowed', false)
		}
		callback(null, true)
	}, storage: storage
}).single('image')

module.exports = {
	createDocument: function (res, req) {
		new Promise((resolve, reject) => {
			//Upload the file
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
				if (typeof req.file.filename != "undefined")
					data.image = req.file.filename;
			if (data.image == "undefined")
				data.image = "";
			//Prepare object for Document Creation
			var newvideo = new video({
				title: data.title,
				link: data.link,
				category:data.category,
				image: data.image,
				userId: req.session.userId
			});
			//Check The docuement is Valid or not
			newvideo.validate(function (err) {
				var obj = new Response();
				if (err) {
					obj.status = "Invalid"
					obj.statusCode = 400

					obj.errors = setError(err);
				}
				else {
					newvideo.save(function (err) { });
					obj.successMessage = "Data Saved!";
					obj.statusCode = 201;
				}
				handler(obj, res);
			});
		}, (err) => {
			data = err.data
			console.log(data);
			var newvideo = new video({
				title: data.title,
				link: data.link,
				category:data.category,
				image: data.image,
				userId: req.session.userId
			});
			var obj = new Response();
			obj.status = "Invalid"
			obj.statusCode = 400
			newvideo.validate(function (e) {
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
		video.find(query, function (err, doc) {
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
	deleteDocument: function (query, res) {
		var obj = new Response();
		video.remove(query, function (err) {

			if (err) {
				obj.status = "Invalid";
				obj.statusCode = 400;
			}
			else {
				obj.status = "Valid";
				obj.statusCode = 200;
			}
			handler(obj, res);
		});

	},
	updateDocument: function (query, newValue, res,req) {
		var obj = new Response();
		newValue.userId = req.session.userId
		video.findOneAndUpdate(query, newValue, { runValidators: true },
			function (err, doc) {
				obj.status = "valid";

				if (err) {
					obj.status = "Invalid";
					obj.errors = setError(err)
					obj.statusCode = 400;
				} else {
					//console.log();
					obj.successMessage = "Data Saved!";
					obj.statusCode = 200;
				}
				handler(obj, res);
			});

	}
}

function setError(err) {
	errors = new Object;


	if (err.errors["title"]) {
		errors.title = err.errors["title"].message;
	}
	if (err.errors["link"]) {
		errors.link = err.errors["link"].message;
	}
	if (err.errors["image"]) {
		errors.image = err.errors["image"].message;
	}
	if (err.errors["category"]) {
		errors.category = err.errors["category"].message;
	}
	return errors;
}