const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function (req, res) {

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

var data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
}


const jsonData = JSON.stringify(data);
const url = "https://us18.api.mailchimp.com/3.0/lists/fce12c6a21";
const listID = "fce12c6a21";
const options = {
  method: "POST",
  auth: "pete1:02978f1e0e9cfa7139e715397eec1f5c-us18",

};

const request = https.request(url, options, function (response) {

  if (response.statusCode == 200) {
    res.sendFile(__dirname + "/success.html")
  } else {
    res.sendFile(__dirname + "/failure.html")
  }

  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
});

  //request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(3000, function(req, res) {
  console.log("Server is running on 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});









//API Key
//02978f1e0e9cfa7139e715397eec1f5c-us18

//List Key
//fce12c6a21
