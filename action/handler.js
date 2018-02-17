module.exports=(obj,res)=>{
	res.status(obj.statusCode)
	delete obj.statusCode;
	console.log(obj)
	res.send(obj)
	
	res.end()
	
}