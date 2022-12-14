import Stripe from 'stripe';

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

//copy/paste from stripe docs for next.js integration
export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        //create an array of shipping options where each shipping option is an object with its own shipping rate
        shipping_options: [
            //free shipping
          { shipping_rate: 'shr_1M2dsDFERnymeoADYz6N1iHX'},
          //expedited shipping
          { shipping_rate: 'shr_1M2dsoFERnymeoAD5ak3JGeZ'},
        ],
        //get list items from application - what products the user has added to the cart
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'usd',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: Math.round(item.price * 100),
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}