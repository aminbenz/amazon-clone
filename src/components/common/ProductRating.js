import { StarIcon as StarIconOutline } from '@heroicons/react/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';

const MAX_RATING = 5;
const MIN_RATING = 1;

const ProductRating = ({ rating, MAX_RATING }) => {
  return (
    <div className='flex'>
      {Array(rating)
        .fill()
        .map((_, i) => (
          <StarIconSolid key={i} className='h-5 text-yellow-500' />
        ))}
      {rating < 5 &&
        Array(MAX_RATING - rating)
          .fill()
          .map((_, i) => <StarIconOutline key={i} className='h-5' />)}
    </div>
  );
};

export default ProductRating;
