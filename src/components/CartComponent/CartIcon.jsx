import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartIcon({ onOpen }) {
  const { getItemCount } = useCart();
  const [count, setCount] = useState(() => getItemCount());

  useEffect(() => {
    setCount(getItemCount());
  }, [getItemCount]);

  useEffect(() => {
    // Keep cross-tab fallback to trigger a full sync in provider
    const handleStorageChange = () => setCount(getItemCount());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [getItemCount]);

  const displayCount = count > 99 ? '99+' : count;

  const handleClick = () => {
    setCount(getItemCount());
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
