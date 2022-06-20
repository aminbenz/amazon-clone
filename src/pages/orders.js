import moment from 'moment';
import { getSession, useSession } from 'next-auth/client';
import Head from 'next/head';
import db from '../../firebase';
import Header from '../components/Header';
import { Order } from '../components/Order';

const Orders = ({ orders }) => {
  const [session] = useSession();

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Orders</title>
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-2 border-yellow-400">
          Your orders
        </h1>

        {!session && <h2>Please sign in to see your orders</h2>}

        {session && (
          <h2>
            {orders.length} order{orders.length > 1 && <span>s</span>}
          </h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  // Get the session on the server-side
  // by passing the context of the page request
  // to the getSession function
  const session = await getSession(context);

  if (!session) return { props: {} };

  const ordersInDb = await db
    .collection('users')
    .doc(session.user.email)
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    ordersInDb.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, { limit: 100 })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
}
