import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';
import CheckoutProduct from '../components/checkout/CheckoutProduct';
import Header from '../components/Header';
import { selectItems, selectTotal } from '../slices/basketSlice';
const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const basketItems = useSelector(selectItems);
  const [session] = useSession();
  const subTotal = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    console.log('stripePromise', stripePromise);
    const stripe = await stripePromise;

    // create checkout session from my own backend
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: basketItems,
      email: session.user.email,
    });

    // redirect to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            height={250}
            width={1020}
            objectFit="contain"
            alt="Advert"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b shadow-lg pb-4">
              {basketItems.length === 0
                ? 'Your Amazon basket is empy'
                : 'Shopping basket'}
            </h1>
            {basketItems.map((item, i) => (
              <CheckoutProduct key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {basketItems.length > 0 && (
            <div>
              <h2 className="whitespace-nowrap">
                Subtotal ({basketItems.length} items) :{' '}
                <span className="font-bold">
                  <Currency quantity={subTotal} currency="EUR" />
                </span>
              </h2>

              <button
                onClick={createCheckoutSession}
                role="link"
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
