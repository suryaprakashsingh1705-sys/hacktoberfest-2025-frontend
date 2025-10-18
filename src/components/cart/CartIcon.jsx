import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCartItemCount } from '../../utils/cart';

/**
 * CartIcon component - displays a shopping cart icon with item count badge
 * 
 * Features:
 * - Shows the total number of items in the cart as a badge
 * - Updates count from localStorage changes (cross-tab sync)
 * - Listens for custom 'cartUpdated' events (same-tab updates)
 * - Refreshes count when drawer is opened
 * - Displays "99+" for counts over 99
 * 
 * @component
 * @param {Function} onOpen - Callback function to open the cart drawer
 * @returns {JSX.Element} Cart icon button with count badge
 */
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
