import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCartItemCount } from '../../utils/cart';

export default function CartIcon({ onOpen }) {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(getCartItemCount());
  };

  useEffect(() => {
    // Initial count on mount
    updateCount();

    // Listen for storage changes from other tabs
    const handleStorageChange = () => updateCount();
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom cart update events in the same tab
    const handleCartUpdate = () => updateCount();
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const displayCount = count > 99 ? '99+' : count;

  const handleClick = () => {
    updateCount(); // Refresh count when opening drawer
    onOpen();
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Shopping Cart"
      className="relative transform transition-transform duration-200 hover:scale-110 hover:text-blue-600 text-gray-700 cursor-pointer"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {displayCount}
        </span>
      )}
    </button>
  );
}
