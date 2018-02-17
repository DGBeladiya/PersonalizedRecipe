var User=require("../model/user.js");
function Response(){
	this.status="";
	this.errors={};
	this.successMessage="hello";
	this.data={}
	this.statusCode=501
}
var handler = require("./handler");
module.exports={
	createUser:function (data,res) {
		var newUser=new User({
			name:data.name,
			password:data.password,
			email:data.email,
			isActive:data.isActive,
			mobileNumber:data.mobileNumber,
			gender:data.gender,
			dateOfBirth:data.dateOfBirth,
			language:data.language,
			role:data.role,
			address:data.address,
		});
		var obj=new Response();
		newUser.save(function(err){
			if(err)
			{
				obj.status="Invalid";
				obj.error=setError(err);	
			}
			else
			{
				obj.status="Valid";
				obj.successMsg="Data Saved!"
				obj.statusCode=201
			}
			handler(obj,res);
		});
		
	},
	getDataAll:function(query,res){
		var obj=new Response();
		User.find(query,function(err,data){
			var obj=new Response();
			if(err)
			{
				obj.status="Invalid";
			}
			else
			{
				obj.status="Valid";
				obj.data=data;
				obj.statusCode=200
			}
			handler(obj,res);
		});
	
	},
	deleteUser:function(query,res)
	{
		var obj=new Response();
		User.remove(query,function(err){
			
			if(err)
			{
				obj.status="Invalid";
			}
			else
			{
				obj.status="Valid";
				obj.statusCode=200
			}
			handler(obj,res);
		});
		
	},
	updateUser:function(query,data,res){
			var obj=new Response();
			User.findOneAndUpdate(query,data,{runValidators:true},
				function(err,doc){
					obj.status="Valid";
					if(err){
						obj.status="Invalid";
						obj.errors=setError(err)
					}else{
						//console.log();
						obj.successMessage="Data Saved!";
						obj.statusCode=200
					}
					handler(obj,res);
				});
			
	}

}
function setError(err){
	var errors=new Object;
	if(err.errors["name"]){
			errors.name=err.errors["name"].message;
			}
			if(err.errors["email"]){
				errors.email=err.errors["email"].message;
			}
			if(err.errors["password"]){
				errors.password=err.errors["password"].message;
			}
			if(err.errors["mobileNumber"])
			{
				errors.mobileNumber=err.errors["mobileNumber"].message;
			}
			if(err.errors["gender"])
			{
				errors.gender=err.errors["gender"].message;
			}
			if(err.errors["role"])
			{
				errors.role=err.errors["role"].message;
			}
			if(err.errors["dateOfBirth"])
			{
				errors.dateOfBirth=err.errors["dateOfBirth"].message;
			}
			if(err.errors["address.state"])
			{
				errors.addressState=err.errors["address.state"].message;
			}
			if(err.errors["address.city"])
			{
				errors.addressCity=err.errors["address.city"].message;
			}
			
			return errors;
}