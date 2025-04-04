const dotenv = require('dotenv');
const express = require('express');
const stripe = require('stripe');
const fs = require('fs');
const data = require(__dirname + '/data.js');
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/web'));
const stripeclient = stripe(process.env.PRIV_KEY);
var lastID = null;
app.post('/getlink', async (req, res) =>{
    amount = req.body.PAY;
    amountincents = amount * 100;
    const session = await stripeclient.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Debt Payment',
              },
              unit_amount: amountincents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: req.body.WEB_URL + "paied",
        cancel_url: req.body.WEB_URL,
      });
      lastID = session.id;
      res.json({ url: session.url});
    
});


app.get('/paied', async (req, res) =>{
    const check = await stripeclient.checkout.sessions.retrieve(lastID);
    if(check.payment_status == "unpaied"){
        return;
    }
    var amountPaied = check.amount_total;
    var paiedindollars = amountPaied / 100;
    var rightnow = new Date();
    var data = JSON.parse(fs.readFileSync(__dirname + "/data.json"));
    var oldPayHx = [];
    for(i = 0; i < data.PAYMENT_HX.length; i++){
        oldPayHx.push(data.PAYMENT_HX[i]);
    }
    oldPayHx.push({
        DATE: rightnow,
        AMOUNT: paiedindollars
    });
    var newData = {
        AMOUNT_OWED: (data.AMOUNT_OWED - paiedindollars),
        PAYMENT_HX: oldPayHx
    }
    fs.writeFileSync(__dirname + "/data.json", JSON.stringify(newData, null, 2));
    res.redirect(check.cancel_url);
});





app.use('/data', data);
app.listen(3000);
module.exports = app;
