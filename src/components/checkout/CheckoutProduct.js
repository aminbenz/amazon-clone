import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../slices/basketSlice';
import PrimeLogo from '../common/PrimeLogo';
import ProductRating from '../common/ProductRating';

const CheckoutProduct = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(item));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id: item.id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={item.image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{item.title}</p>
        <div>
          <ProductRating rating={item.rating} MAX_RATING={5} />
        </div>
        <p className="text-xs my-2 line-clamp-3">{item.description}</p>

        <Currency quantity={item.price} currency="EUR" />

        {item.hasPrime && <PrimeLogo />}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
