var db=require("./connection");
var ingredientSchema=db.Schema({
	name:{
		type:String,
		required:[true,"Ingredient Name cannot be Empty"],
		trim:true,
		match:[/^[a-zA-Z]+$/,"'{VALUE}' is Not a Valid Value for Name"]
	},
	keywords:{
		type:[String],
		validate:[check,"'{VALUE}' Keywords Contain Invalid Value"]
	},
	price:{
		type:String,
		required:[true,"Ingredient price cannot be Empty"],
		validate:[checkPrice,"'{VALUE}' is not Valid Value for Price"]
	},
	weight:{
		type:String,
		required:[true,"Weight cannot be Empty"]
	},
	image:{
		type:String,
		default:"Default.png",
		set:setImage},
	priceLocation:{type:String},
	modifyDate:{type:Date,default:Date.now},
	userID:{type:db.Schema.Types.ObjectId},
});

function setImage(v){
			if(!v)
				return "Default.png";
			return v;	
		}
function check(arr){
	for(var i=0;i<arr.length;i++)
	{
		if(!(/^[a-zA-Z]+$/.test(arr[i])))
			return false;
	}
	return true;
	
}
function checkPrice(v)
{
	
	return /[0-9]{1,3}/.test(v);
}
module.exports=db.model("ingredient",ingredientSchema);