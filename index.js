const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const Razorpay = require("razorpay");
const ids = require('short-id');
const nodemailer = require("nodemailer");


app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();
app.use(express.static(__dirname +'/public'));
app.set('view engine','ejs');


app.get("/",function(req,res){
    
    res.sendFile(__dirname + '/index.html');
});

app.get("/donate",(req,res)=>{

    res.sendFile(__dirname + '/donation.html');
});

var name1;
var email1;
var amount1;

app.post("/payInfo",(req,res)=>{
    var amount = req.body.amount;
    amount1 = req.body.amount;
    var name = req.body.name;
    name1 = req.body.name;
    var email = req.body.email;
    email1 = req.body.email;
    var number = req.body.mobNum;
    var instance = new Razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret
    });
    var options = {
        amount: amount*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: ids.generate()
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.render("paymentPage",{name:name,email:email,orderid:order,amount:amount,number:number});
      });
    
});

app.post("/confirmation",(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userEmail,
            pass: process.env.userPass
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    

    var mailOptions = {
        from: process.env.userEmail,
        to: email1,
        subject: "Successful Payment",
        text: `Payment Successful : \nName : ${name1}\nEmail : ${email1}\nAmount : ${amount1}`,
        

    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent: " + info.response);
            console.log("mail sent");
        }
    });
    res.render("confirmationPage");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server started on port 3000");
});

