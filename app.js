const express = require('express');
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){
    const firstName=  req.body.fName;
    const secondNam = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                     LNAME: secondNam,
                }
            }
        ]
    };
    const jsonData =JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/e719ec2bd6";

    const options = {
        method: "POST",
        auth: "satish1:b11f394581b4a9fbd55f26e09249c846-us10"
    }

    const request = https.request(url,options,function(respose){
        if (respose.statusCode == 200){
            res.sendFile(__dirname+"/sucess.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
        respose.on("data", function(data){
            console.log(JSON.parse(data
                ));
        });
    });
    request.write(jsonData);
    request.end();


});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Server Up and Running");
});

 