var request = require("request");
module.exports = {
    food2Fork: (data, req, res) => {
        request.post("http://food2fork.com/api/search",
            {
                form: {
                    key: '0d2fb1c3fde735bfd990f7c224455322'
                }
            },function(err,response,body){
                var data=JSON.parse(response.body)
                res.send(""+data.recipes[0].publisher)
            });
    }
}