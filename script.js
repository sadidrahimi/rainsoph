// Set your publishable key
const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');

document.getElementById('checkout-button').addEventListener('click', async () => {
    // Create a PaymentIntent with your server
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: [{id: 'digital-file'}]})
    });
    const {clientSecret} = await response.json();

    // Confirm the PaymentIntent with the user's card details
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement('card'),
            billing_details: {
                name: 'Jenny Rosen'
            }
        }
    });

    if (result.error) {
        console.error(result.error.message);
    } else {
        // Download the file after successful payment
        window.location.href = '/download-file';
    }
});
