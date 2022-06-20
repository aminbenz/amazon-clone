import * as admin from 'firebase-admin';
import { buffer } from 'micro';

const serviceAccount = require('../../../permissions.json');

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log(`Fulfilling order : ${session}`);

  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(
        `Success! Order ${session.id} has been added to the database`
      );
    });
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: 'Only POST are allowed to this endpoint' });
  }

  const requestBuffer = await buffer(req);
  const payload = requestBuffer.toString();
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err) {
    console.error({ err });
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    return fulfillOrder(session)
      .then(() => res.status(200))
      .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
