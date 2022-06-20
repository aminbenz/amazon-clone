import Head from 'next/head';
import { getSession } from 'next-auth/client';
import Header from '../components/Header';
import Main from '../components/Main';

export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone By aminbenz</title>
      </Head>

      <Header />

      <Main products={products} />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();

  return {
    props: {
      products,
      session,
    },
  };
};
