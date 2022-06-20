import { CheckCircleIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Head from "next/head";
import Header from '../components/Header';

const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Success page</title>
      </Head>
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed
            </h1>
          </div>
          <p>
            Thank you for shopping with us. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Sapiente nihil quis provident esse
            dolor tempore deserunt mollitia beatae possimus. Doloribus maiores
            dicta, quas quasi reprehenderit quia eos. Corporis iste saepe
            tempora deleniti, soluta quisquam quos. Pariatur reprehenderit,
            ipsum quasi et temporibus natus mollitia nisi exercitationem
            laboriosam dolorem praesentium ad iste.
          </p>
          <button
            className="button mt-10"
            onClick={() => router.push('/orders')}
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
