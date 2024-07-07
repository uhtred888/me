const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require('path');
require('dotenv').config({ path: '.env' })
const port = process.env.port || 3000

//using body-parser 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//dt require 
const conn = require("./db/dbconn")
const wbPage = require("./db/modal")


app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/temp"));

//for ejs

const ejs = require('ejs')

app.set('view engine','ejs')

app.listen(port,()=>
{
    console.log(`Server is listening to the port ${port} `)
})

app.get("/",(req,res)=>
{
   res.render("index")
})

app.post("/submit",(req,res)=>
{
    let fName     = req.body.fName;
    let lName     = req.body.lName;
    let phonNum   = req.body.phoNum;
    let mail      = req.body.mail;
    let add       = req.body.add;
    let msg       = req.body.msg;
    
    console.log(fName,lName,phonNum,mail,add,msg)
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

app.post("/check",async(req,res)=>{
    let mypass1 = process.env.mypass1
    let mypass2 = process.env.mypass2

    let pass1 = req.body.pass1;
    let pass2 = req.body.pass2;
    //console.log(mypass1,mypass2)

    const  result = await wbPage.find();

    let op = (mypass1==pass1 && mypass2 == pass2)?
        
        res.send({"data":result}):
    
        res.status(200).send("Why?")
})




app.all("*",(req,res)=>
{
    res.status(404).render("404")
})
 
