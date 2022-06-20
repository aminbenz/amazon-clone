import Banner from './Banner';
import ProductFeed from './ProductFeed';

const Main = ({ products }) => {
  return (
    <main className='max-w-screen-2xl mx-auto'>
      <Banner />

      <ProductFeed products={products} />
    </main>
  );
};

export default Main;
