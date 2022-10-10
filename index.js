const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = require('stripe')('sk_test_UErVLRDhFKCtj3Zj5fU7DKT8008mCYPvRt');

app.get('/api/doPayment/', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
});

app.listen(PORT, function () {
    console.log('Service URL http://127.0.0.1:' + PORT + "/");
    console.log('Channel Key request, /access_token?uid=[user id]&channel=[channel name]');
    console.log('Channel Key with expiring time request, /access_token?uid=[user id]&channel=[channel name]&expiredTs=[expire ts]');
});