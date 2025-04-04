const dotenv = require('dotenv');
const express = require('express');
const stripe = require('stripe');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/web'));
app.use(datasender);
const stripeclient = stripe(process.env.PRIV_KEY);
var ammount = 0;
app.post('/getlink', async (req, res) =>{
    amount = req.body.PAY;
    amountincents = amount *100;
    
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
        success_url: req.body.WEB_URL + `:${amount}`,
        cancel_url: 'http://localhost',
      });
      res.json({ url: session.url});
    
});
app.listen(3000);
