

var db = require("./connection");
var recipeSchema = db.Schema({
    name: {
        type: "String",
        required: [true, "Recipe name can't be Empty"],
        match: [/^[a-zA-Z _]+$/, "'{VALUE}' is not valid Value for Recipe Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description can't be empty"]
    },
    category: {
        type: String,
        required: [true, "Category cannot be empty"]
    },
    cost: {
        type: Number,
        required: [true, "Cost can't be empty"],
        match: [/^[0-9]+$/, "'{VALUE}' is not valid value for cost"]
    },
    time: {
        type: Number
    },
    noOfPerson: {
        type: Number,
        required: [true, "No of Person can't be empty"],
        match: [/^[0-9]+$/, "'{VALUE}' is not valid value"],
        min:[1,"No of Person should be greater then 0"]
    },
    isApproved: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "Default.png",
        set: setRecipeImage
    },
    userId: { type: db.Schema.Types.ObjectId },
    ageCategory: {
        min: { type: Number },
        max: { type: Number }
    },
    ingredients: [
        {
            name: { type: String },
            weight: { type: String },
            unit:{type:String},
            required: { type: Boolean }
        }
    ],
    steps: [{
        description: { type: String },
        time: { type: Number },
        isAlarm: { type: Boolean },
        image: { type: String ,default:"Default.png"}
    }],
    review: [{
        rating: { type: Number, default: 0.0 },
        like: { type: Boolean, default: false },
        userId: { type: db.Schema.Types.ObjectId },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }]


}, { timestamps: true });
function setRecipeImage(v) {
    if (!v)
        return "Default.png"
    return v;
}
module.exports = db.model("recipe", recipeSchema);