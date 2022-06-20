import moment from 'moment';
import Currency from 'react-currency-formatter';

export const Order = ({
  order: { id, amount, amountShipping, items, timestamp, images },
}) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="">
          <p className="font-bold text-sm">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format('YYYY-MM-DD')}</p>
        </div>

        <div className="">
          <p className="text-xs font-bold"></p>
          <p>
            <Currency quantity={amount} currency="EUR" /> - Next day shipping{' '}
            <Currency quantity={amountShipping} currency="EUR" />
          </p>
        </div>

        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right">
          {items.length} item{items.length > 1 && <span>s</span>}
        </p>

        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 flex-row overflow-x-auto">
          {images.map((image) => (
            <img src={image} alt="" className="h-20 sm:h-32 object-contain" />
          ))}
        </div>
      </div>
    </div>
  );
};
