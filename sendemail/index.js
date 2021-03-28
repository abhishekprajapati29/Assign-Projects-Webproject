const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const cors = require('cors');
require('dotenv').config();
const app = express()
const path = require('path');
var http = require('http').Server(app);
app.use(bodyParser.json());
var multer = require('multer');
var upload = multer();
app.use(cors());

app.use(upload.array()); 
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/form', (req,res)=>{
    const data = req.body;
    var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    
    var mailOptions = {
      from: req.body.email,
      to: process.env.EMAIL,
      subject: req.body.subject, // Subject line
      text: `Hello i am ${req.body.username}.\n ${req.body.message}`, 
    };
    
    smtpTransport.sendMail(mailOptions,
    (error, response) => {
      if(error) {
        res.send(error)
      }else {
        res.send('Success')
      }
      smtpTransport.close();
    });
})


const PORT = process.env.PORT || 3002;

http.listen(PORT, ()=>{
    console.log(`Server listening on Port ${PORT}`)
})