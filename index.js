var express = require('express');

var PORT = process.env.PORT || 8080;
const stripe = require('stripe')('sk_test_UErVLRDhFKCtj3Zj5fU7DKT8008mCYPvRt');



var app = express();

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

var generateAccessToken = async function (req, resp) {
    resp.header('Access-Control-Allow-Origin', "*")

    var amount = req.query.amount;
    if (!amount) {
        return resp.status(500).json({ 'error': 'amount is required' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
      });
      resp.send({
        clientSecret: paymentIntent.client_secret,
      });
};


var generatePayout = async function (req, resp) {
    resp.header('Access-Control-Allow-Origin', "*")

    var amount = req.query.amount;
    if (!amount) {
        return resp.status(500).json({ 'error': 'amount is required' });
    }

    const payout = await stripe.payouts.create({
        amount: amount,
        currency: 'usd',
      });
      resp.send({
        payout
      });
};





app.get('/access_token', nocache, generateAccessToken);
app.get('/access_token', nocache, generatePayout);

app.listen(PORT, function () {
    console.log('Service URL http://127.0.0.1:' + PORT + "/");
    console.log('Channel Key request, /access_token?uid=[user id]&channel=[channel name]');
    console.log('Channel Key with expiring time request, /access_token?uid=[user id]&channel=[channel name]&expiredTs=[expire ts]');
});
