const express = require('express');
const app = express();
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, // Amount in cents
        currency: 'usd',
        description: 'Digital File Purchase',
        metadata: {integration_check: 'accept_a_payment'},
    });

    res.json({clientSecret: paymentIntent.client_secret});
});

app.get('/download-file', (req, res) => {
    // Here you would send the file to the user
    res.download(__dirname + '/path/to/your/file');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
