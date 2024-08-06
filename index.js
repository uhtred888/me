const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: '.env' })
const nodemailer = require("nodemailer")
const port = process.env.port || 3000

//using body-parser 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//dt require 
const conn = require("./db/dbconn")
const wbPage = require("./db/modal")


app.use(express.static(path.join(__dirname, './temp')));

//for ejs ---connecting other pages 

const ejs = require('ejs');
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/temp"));
const { randomInt } = require("crypto");


app.listen(port,()=>
{
    console.log(`Server is listening to the port ${port} `)
})

app.get("/",(req,res)=>
{
   res.status(200).render("index")
})

app.get("/facilities",(req,res)=>{
    res.status(200).render("facilities")
})

app.get('/weather', (req, res) => {
    res.render('weather');
  });
  
  app.get('/bmi', (req, res) => {
    res.render('BMI');
  });
  
  app.get('/dictionary', (req, res) => {
    res.render('dictionary');
  });
  


app.post("/submit",(req,res)=>
{
    let fName     = req.body.fName;
    let lName     = req.body.lName;
    let phonNum   = req.body.phoNum;
    let mail      = req.body.mail;
    let add       = req.body.add;
    let msg       = req.body.msg;
    
    //console.log(fName,lName,phonNum,mail,add,msg)
    res.redirect("/")

    let user = new wbPage({
        fName    : fName,
        lName    : lName,
        phoNum   : phonNum,
        mail     : mail, 
        add      : add, 
        msg      : msg 

    })

    user.save()
    .then(()=>{
      console.log("Save in db.")
    })
    .catch((err)=>{
      console.log("Error while saving the data."+err)
    })
})


app.get("/ALI",(req,res)=>{
    res.status(200).render("login")
})

//nodemailer code
const mailing = ()=>{

    
}

app.post("/check",async(req,res)=>{
    let mypass1 = process.env.mypass1
    let mypass2 = process.env.mypass2

    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;
    //console.log(mypass1,mypass2)

    
    const  result = await wbPage.find();

    if (mypass1 === pass1 && mypass2 === pass2) {
      //mailing();

        const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port:  465, // Use 465 for secure connection
        secure: true, // Use `true` for port 465, `false` for port 587
        auth: {
          user: "mr8maxi@zohomail.com", // Ensure your .env file has EMAIL and PASSWORD
          pass: "Rashi@1234la",
        },
      });
      
        num = Math.floor(Math.random() * 9000 + 1000);
        console.log(num)
        
      transporter.sendMail({
        from: "mr8maxi@zohomail.com",
        to: "chauraj345r@gmail.com", // list of receivers
        subject: "OTP", // Subject line
        text: `Here is your numerical data: ${num}`
      }).then(() => {
        console.log("Message sent");
      }).catch((error) => {
        console.log("Not working", error);
      });

        
      res.status(200).render("otp");
  } else {
      res.status(200).send("Why?");
  }
})

let otp;
let num 



app.post("/authentication",async(req,res)=>{
  let getOTP = req.body.otp
  if(num==getOTP)
  {
    const  result = await wbPage.find();
    res.send({"data":result})
  }
  else
  {
      // res.sendFile(__dirname+"/index.html")
      res.send("incorrect")
  }
})



app.all("*",(req,res)=>
{
    res.status(404).render("404")
})
 
