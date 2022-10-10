const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = require('stripe')('sk_test_UErVLRDhFKCtj3Zj5fU7DKT8008mCYPvRt');

app.post('/api/doPayment/', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
      });
      return paymentIntent.client_secret
});

app.listen(5000);