// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
const sgMail = require('@sendgrid/mail');

// Create an instance of the express app.
var app = express();

// Specify the port.
var PORT = process.env.PORT || 8080;

//set sendgrid key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + '/'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/mail", function(req, res){
  
    const msg = {
        to: 'tonystorti@gmail.com',
        from: 'contact-form@chicagodancetherapy.com',
        subject: 'Website Contact Us Request',
        text: "From: "+req.body.name+" Email: "+req.body.email+" Phone "+ req.body.phone+" Message: "+req.body.message,
        html:   '<h4>From: '+req.body.name+'</h4>'+
                '<h4>Email: '+req.body.email+'</h4>'+
                '<h4>Phone: '+req.body.phone+'</h4>'+
                '<div>Message: '+req.body.message+'</h4>',
    };
    console.log(msg);
    sgMail.send(msg);
    res.send("mail sent");
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
