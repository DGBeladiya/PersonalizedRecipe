var db=require("./connection");
var videoSchema=db.Schema({
	title:{
		type:String,
		required:[true,"Video Title cannot be Empty"],
		trim:true,
		match:[/^[a-zA-Z _]+$/,"'{VALUE}' is Not a Valid Value for Title"]
	},
	category:{
		type:String,
		required:[true,"Category Name Cannot be Empty"]
	},
	
	link:{
		type:String,
		required:[true,"Link cannot be Empty"]
	},
	image:{
		type:String,
		default:"Default.png",
		set:setImage},
	
	userId:{type:db.Schema.Types.ObjectId},
}, { timestamps: true });

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

module.exports=db.model("video",videoSchema);