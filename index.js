var express = require('express');
var {AccessToken} = require('agora-access-token');
var {Token, Priviledges} = AccessToken;

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

var PORT = process.env.PORT || 8080;


var APP_ID = '4e0370075e574ef0952c98118c284498';
var APP_CERTIFICATE = 'bb9663d662554cd5950f7587fae91a3e';

var app = express();

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}
app.get('/acess_token/', async (req, res) => {
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
