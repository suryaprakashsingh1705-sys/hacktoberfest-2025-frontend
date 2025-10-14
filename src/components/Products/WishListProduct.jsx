import { Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';

const WishListProductCard = ({ product, RemoveFromWishList }) => {
  const { name, price, imageUrl, salePercentage, flavor } = product;

  const dispatch = useDispatch();

  const handleWishlistClick = () => {
    dispatch(RemoveFromWishList(product));
  };

  return (
    <div className="w-full max-w-lg p-4 flex ">
      {/* Left side container for image and product info */}
      <div className="flex ">
        {/* Product Image */}
        <img
          src={imageUrl}
          alt={name}
          className="w-24 h-24 object-contain mr-6" // This margin creates space between image and text
        />

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-800">{name}</h3>
          <div className="flex items-center space-x-2 my-1">
            <span className="text-gray-800 text-sm">${price.toFixed(2)}</span>
            <span className="bg-blue-600 text-white text-xs font-semibold py-0.5 px-1.5 rounded">
              {salePercentage}% OFF
            </span>
          </div>
          <p className="text-gray-500 text-sm">{flavor}</p>
        </div>
        <div className="right-0 absolute pr-4">
          {/* Wishlist Icon on the far right */}
          <button
            onClick={handleWishlistClick}
            className="text-gray-800 hover:text-red-500"
            aria-label="Toggle wishlist"
          >
            <Heart className="h-6 w-6" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishListProductCard;
