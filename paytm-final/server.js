const axios = require('axios');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const FormData = require('form-data')
const app = express();
require('dotenv').config() 

const PORT = process.env.PORT || 4000;

var username = '';
var check = false;
var data1 = {}
var amount = 0;
var token = '';

const {initPayment, responsePayment} = require("./paytm/services/index");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/views"))
app.set("view engine", "ejs");

app.get("/paywithpaytm", (req, res) => {
    username = req.query.name;
    amount = req.query.amount;
    token = req.query.token;
    initPayment(req.query.amount).then(
        success => {
            res.render("paytmRedirect.ejs", {
                resultData: success,
                paytmFinalUrl: process.env.PAYTM_FINAL_URL
            });
        },
        error => {
            res.send(error);
        }
    );
});


async function makePatchRequest(data, data1, req1,res1) {
    params = {
        username: username,
        status: data['STATUS'],
        order_id: data['ORDERID'],  
        amount: data['TXNAMOUNT'],
        bank_name: data['BANKNAME'],
        transaction_id : data['TXNID'],
        txn_date: data['TXNDATE']
      }

    await axios.put(`https://abhishekpraja.pythonanywhere.com/Subs/${data1.id}/`, params).then(res=>{
        responsePayment(req1.body).then(
            success => {
                res1.render("response.ejs", {resultData: "true", responseData: success});
            },
            error => {
                res1.send(error);
            }
        );
    })

}

async function makeGetRequest(data, req, res) {
    let res1 = await axios.get(`https://abhishekpraja.pythonanywhere.com/Subs/?username=${username}`);
    check = (res1.data.length > 0)? true: false;
    data1 = res1.data[0];
    if(data['STATUS'] === 'TXN_SUCCESS' && check === true)
    {
        
        makePatchRequest(data, data1, req, res);
    }
}

function makeSelecterBuy(req,res){
    let data1= JSON.stringify({
        selected: true
    })
    axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: "Token " + token,
      };
    axios.get(`https://abhishekpraja.pythonanywhere.com/api/auth/user`).then(re=>{
      axios.get(`https://abhishekpraja.pythonanywhere.com/userprofile/?user=${re.data.id}`).then(re1=>{
        const data = re1.data[0];
        const id = data.id
        axios.patch(`https://abhishekpraja.pythonanywhere.com/userprofile/${id}/`,data1).then(res1=>{
        console.log(res1.data)
        responsePayment(req.body).then(
            success => {
                res.render("response.ejs", {resultData: "true", responseData: success});
            },
            error => {
                res.send(error);
            }
        );
    }).catch((error) => {
        console.log(error)
    });
})

})

}

app.post("/paywithpaytmresponse",async (req, res) => {
    if(parseInt(amount) === parseInt(30)){
        makeSelecterBuy(req,res);
    }
    else{
        makeGetRequest(req.body, req, res);
    }
});

app.listen(PORT, () => {
    console.log("Running on " + PORT);
});
