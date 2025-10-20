import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onQuantityChange, onRemove, onClose }) {
  const basePrice = item.price || 0;
  const salePercent = item.salePercentage || 0;
  const finalPrice =
    salePercent > 0 ? basePrice * (1 - salePercent / 100) : basePrice;
  const itemTotal = finalPrice * (item.quantity || 1);
  const [imageError, setImageError] = useState(false);

  const handleTitleClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="flex gap-3 border-b border-gray-200 pb-4 group">
      {/* Image with SVG fallback (same as ProductCard) */}
      <div className="relative h-20 w-20 flex-shrink-0">
        {!imageError && (item.imageUrl || item.image) ? (
          <img
            src={item.imageUrl || item.image || ''}
            alt={item.name}
            className="h-20 w-20 object-cover rounded"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center rounded">
            <svg
              class="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
          <Link to={`/products/${item.id}`} onClick={handleTitleClick} tabIndex={0} className="hover:underline">
            {item.name}
          </Link>
        </h4>
        {item.selectedFlavor && (
          <p className="text-xs text-gray-600 mt-1">
            Flavor: {item.selectedFlavor}
          </p>
        )}
        <p className="text-sm font-semibold text-blue-600 mt-1">
          ${itemTotal.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuantityChange(item, (item.quantity || 1) - 1);
            }}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm"
          >
            –
          </button>
          <span className="text-sm font-medium w-6 text-center">
            {item.quantity || 1}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuantityChange(item, (item.quantity || 1) + 1);
            }}
            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm"
          >
            +
          </button>
        </div>

        {/* Remove Link */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onRemove(item.cartItemKey);
          }}
          className="text-xs text-red-600 hover:text-red-800 mt-2 font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
