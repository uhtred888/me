const express = require("express");
const app = express();
const path = require("path");
const port = 8888;
const nodemailer = require("nodemailer")
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ejs = require("ejs");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// Static files
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/temp', express.static(path.join(__dirname, 'temp')));

const axios = require("axios");
const skey = process.env.skey;

const conn = require("./db/dbconn");  
const Email = require("./db/modal");   

app.listen(port, () => {
    console.log(`Server operating`);
});

app.get("/", (req, res) => {
    res.status(200).render("index");
});

app.get("/live", (req, res) => {
    res.status(200).render("live");
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('/bmi', (req, res) => {
    res.render('BMI');
});

app.get('/dictionary', (req, res) => {
    res.render('dictionary');
});

let mailling;
function mailer(mailling){
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port:  465, 
        secure: true, 
        auth: {
          user: "mr8maxi@zohomail.com", 
          pass: process.env.password,
        },
            connectionTimeout: 1 * 60 * 1000, // 1 minute
            socketTimeout: 1 * 60 * 1000, // 1 minute
      });
      
            
      transporter.sendMail({
        from: "mr8maxi@zohomail.com",
        to: mailling, 
        subject: "I got your mail", 
        text: `Thank you for visiting my web-page.I will be connected with you as faster as i can through my official email. `
      }).then(() => {
        console.log("Message sent");
      }).catch((error) => {
        console.log("Not working", error);
      });

}

app.post('/send', async (req, res) => {
    const { email, 'g-recaptcha-response': recaptchaResponse } = req.body;

    try {
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: skey,
                response: recaptchaResponse
            }
        });

        if (response.data.success) {
            const maill = email; 
            mailling = email;
            let eMail = new Email({
                mail: maill
                
            });
            mailer(mailling);
            eMail.save()
                .then(() => {
                    console.log('Email saved in DB');
                    res.render("index");
                })
                .catch((error) => {
                    console.error('Error saving email to DB:', error);
                    res.status(500).send('Error saving email to DB.');
                });
        } else {
            // reCAPTCHA validation failed
            res.status(400).send('reCAPTCHA verification failed.');
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA', error);
        res.status(500).send('Internal Server Error');
    }
});


app.all("*", (req, res) => {
    res.status(404).render("404");
});
