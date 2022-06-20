import Image from 'next/image';
import { useState } from 'react';
// import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../slices/basketSlice';
import PrimeLogo from '../common/PrimeLogo';
import ProductRating from '../common/ProductRating';

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, title, description, category, price, image }) => {
  const getRandomPrime = () => Math.random() < 0.5;
  const getRandomRating = () =>
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) * MIN_RATING;
  const [rating] = useState(getRandomRating());
  const dispatch = useDispatch();
  const [hasPrime] = useState(getRandomPrime());

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      description,
      category,
      price,
      image,
      rating,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <ProductRating rating={rating} MAX_RATING={MAX_RATING} />

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        {/* <Currency quantity={price} currency='EUR' /> */}
      </div>

      {hasPrime && <PrimeLogo />}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to basket
      </button>
    </div>
  );
};

export default Product;
