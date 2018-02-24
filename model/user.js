var db=require("./connection");
var userSchema=db.Schema({
	name:{
		type:String,
		required:[true,"Name cannot be Empty"],
		match:[/^[a-zA-Z]+$/,"'{VALUE}' is not valid value for Name"]
	},
	password:{
		type:String,
		required:[true,"Passowrd Cannot not be empty"],
		match:[/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
		"Password must be contain Minimum eight characters, at least one letter, one number and one special character"]
	},
	email:{type:String,
		required:[true,"Email cannot be empty"],
		unique:[true,"This Email already exist"],
		match:[/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,"'{VALUE}' is not valid Email Address"]
	},
	isActive:{type:Boolean,default:true},
	mobileNumber:{type:Number,required:[true,"Mobile number cannot be Empty"],min:[999999999+1,"Please Enter Valid Mobile Number"]},
	gender:{type:String,required:[true,"Gender cannot be empty"],enum:{values:["Male","Female"],message:"It's not Valid Gender"}},
	dateOfBirth:{type:Date},
	language:[{type:String}],
	role:{type:String,required:[true,"Role Cannot be empty"],enum:{values:["Admin","Normal"],message:"'{VALUE}' is not valid Value for User Role"}},
	address:{
			city:{type:String,required:[true,"City cannot be empty"],match:[/^[a-zA-Z]+$/,"Please Enter Valid City Name"]},
			state:{type:String,required:[true,"State cannot be empty"],match:[/^[a-zA-Z]+$/,"Please Enter Valid State Name"]}
	}

}, { timestamps: true });
module.exports=db.model("user",userSchema);