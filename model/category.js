var db = require("./connection");
var categorySchema = db.Schema({
	name: {
		type: String,
		required: [true, "Category Name cannot be Empty"],
		trim: true,
		match: [/^[a-zA-Z _]+$/, "'{VALUE}' is Not a Valid Value for Name"]
	},

	image: {
		type: String,
		default: "Default.png",
		set: setImage
	},
	userId: { type: db.Schema.Types.ObjectId },
}, { timestamps: true });

function setImage(v) {
	if (!v)
		return "Default.png";
	return v;
}
module.exports = db.model("category", categorySchema);