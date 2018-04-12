var User = require("../model/user.js");
function Response() {
	this.status = "";
	this.errors = {};
	this.successMessage = "hello";
	this.data = {}
	this.statusCode = 400
}
var handler = require("./handler");
module.exports = {
	createUser: function (data, res,req) {
		var newUser = new User({
			name: data.name,
			password: data.password,
			email: data.email,
			isActive: data.isActive,
			mobileNumber: data.mobileNumber,
			gender: data.gender,
			dateOfBirth: data.dateOfBirth,
			language: data.language,
			role: data.role,
			address: JSON.parse(data.address),
			userId: req.session.userId
		});
		var obj = new Response();
		newUser.save(function (err) {
			if (err) {
				obj.status = "Invalid";
				obj.errors = setError(err);
			}
			else {
				obj.status = "Valid";
				obj.successMsg = "Data Saved!"
				obj.statusCode = 201
			}
			handler(obj, res);
		});

	},
	getDataAll: function (query, res,req) {
		var obj = new Response();
		User.find(query, function (err, data) {
			var obj = new Response();
			if (err) {
				obj.status = "Invalid";
			}
			else {
				obj.status = "Valid";
				obj.data = data;
				obj.statusCode = 200
			}
			handler(obj, res);
		});

	},
	deleteUser: function (query, res,req) {
		var obj = new Response();
		User.remove(query, function (err) {

			if (err) {
				obj.status = "Invalid";
			}
			else {
				obj.status = "Valid";
				obj.statusCode = 200
			}
			handler(obj, res);
		});

	},
	updateUser: function (query, newValue, res,req) {
		var obj = new Response();
		newValue.userId = req.session.userId
		User.findOneAndUpdate(query, data, { runValidators: true },
			function (err, doc) {
				obj.status = "Valid";
				if (err) {
					obj.status = "Invalid";
					obj.errors = setError(err)
				} else {
					//console.log();
					obj.successMessage = "Data Saved!";
					obj.statusCode = 200
				}
				handler(obj, res);
			});

	},
	checkLogin: (req, res) => {

		var email = req.body.email;
		var password = req.body.password;
		User.find({ "email": { '$regex': email + "" }, "password": password }, (err, data) => {
			console.log(data)
			if (err) {

				//	res.send({ status: "Invalid", message: err })

				handler({ status: "Invalid", message: "Sorry Internel Server Error Occur", "statusCode": 401 }, res)
			}
			else if (data.length == 0) {
				res.status(401)
				handler({ status: "Invalid", message: "Sorry Invalid email or password", "statusCode": 401 }, res)
			}
			else  {
				res.status(200)

				req.session.userId = data[0]._id
				req.session.role = data[0].role
				handler({ info:data,status: "Valid", message: "Login Successfully", "statusCode": 200 }, res)
			}	
		})
	},
	getLogedUser: (req, res) => {
		var _id = req.session.userId
		User.findById({ "_id": _id }, 'name email', function (err, user) {
			handler({ "status": "Valid", data: user, statusCode: 200 }, res)
		});
	},
	logout: (req, res) => {
		req.session.destroy((err) => {
			if (err) {
				res.status(400)
				res.end()
			}
			else {
				res.status(200)
				res.end()
			}
		})
	}
}
function setError(err) {
	var errors = new Object;
	if (err.errors["name"]) {
		errors.name = err.errors["name"].message;
	}
	if (err.errors["email"]) {
		errors.email = err.errors["email"].message;
	}
	if (err.errors["password"]) {
		errors.password = err.errors["password"].message;
	}
	if (err.errors["mobileNumber"]) {
		errors.mobileNumber = err.errors["mobileNumber"].message;
	}
	if (err.errors["gender"]) {
		errors.gender = err.errors["gender"].message;
	}
	if (err.errors["role"]) {
		errors.role = err.errors["role"].message;
	}
	if (err.errors["dateOfBirth"]) {
		errors.dateOfBirth = err.errors["dateOfBirth"].message;
	}
	if (err.errors["address.state"]) {
		errors.addressState = err.errors["address.state"].message;
	}
	if (err.errors["address.city"]) {
		errors.addressCity = err.errors["address.city"].message;
	}

	return errors;
}