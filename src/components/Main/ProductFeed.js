import Product from './Product';

const ProductFeed = ({ products }) => {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {products.slice(0, 4).map((p) => (
        <Product key={p.id} {...p} />
      ))}

      <img
        className='md:col-span-full'
        src='https://links.papareact.com/dyz'
        alt='Ads ads ads'
      />

      <div className='md:col-span-2'>
        {products.slice(4, 5).map((p) => (
          <Product key={p.id} {...p} />
        ))}
      </div>

      <img
        className='md:col-span-full'
        src='https://links.papareact.com/dyz'
        alt='Ads ads ads'
      />

      {products.slice(5, products.length).map((p) => (
        <Product key={p.id} {...p} />
      ))}
    </div>
  );
};

export default ProductFeed;
