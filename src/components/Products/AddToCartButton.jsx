import { useState, useRef, useEffect } from 'react';
import { getCartItemQuantity, updateCartItemQuantity, addToCart } from '../../utils/cart';

const CartIcon = ({ className = 'h-6 w-6' }) => (
  <img src="/images/cart-icon.svg" alt="Add to cart" className={className} />
);

const AddToCartButton = ({ product, selectedFlavor }) => {
  const [countAnimation, setCountAnimation] = useState('');
  const animationTimeoutRef = useRef(null);

  // Get current quantity in cart
  const cartQuantity = getCartItemQuantity(product, selectedFlavor);

  const triggerCountAnimation = (direction) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    setCountAnimation(direction === 'up' ? 'animate-count-up' : 'animate-count-down');
    animationTimeoutRef.current = setTimeout(() => {
      setCountAnimation('');
    }, 350);
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  const handleAddToCart = () => {
    // If not in cart, add first item
    if (cartQuantity === 0) {
      addToCart(product, selectedFlavor, 1);
      window.dispatchEvent(new Event('cartUpdated'));
      triggerCountAnimation('down'); // First addition animates from below
    }
  };

  const handleIncrement = () => {
    const newQuantity = cartQuantity + 1;
    updateCartItemQuantity(product, selectedFlavor, newQuantity);
    triggerCountAnimation('down'); // Animation comes from below for increment
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, cartQuantity - 1);
    updateCartItemQuantity(product, selectedFlavor, newQuantity);
    triggerCountAnimation('up'); // Animation goes up for decrement
  };

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* --- Add to Cart Button / Counter --- */}
      {cartQuantity === 0 ? (
        // Show "Add to Cart" button when quantity is 0
        <button
          onClick={(e) => handleActionClick(e, handleAddToCart)}
          className={`
            -ml-px flex-grow flex items-center justify-center gap-2 font-medium 
            py-3 px-4 rounded-r-xl transition-colors duration-150 hover:shadow-lg cursor-pointer
            focus:outline-none focus:z-10
            bg-[#023e8a] text-white hover:bg-[#1054ab]
          `}
          aria-label="Add to cart"
        >
          <CartIcon />
          <span className="ml-2">ADD TO CART</span>
        </button>
      ) : (
        // Show counter when quantity > 0
        <div className="-ml-px flex-grow flex items-stretch bg-[#023e8a] rounded-r-xl overflow-hidden">
          {/* Decrement Button */}
          <button
            onClick={(e) => handleActionClick(e, handleDecrement)}
            className="flex-1 flex items-center justify-center w-12 text-white cursor-pointer transition-colors duration-150 focus:outline-none"
            aria-label="Decrease quantity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          {/* Quantity Display with dashed border*/}
          <div className="flex-1 flex items-center justify-center relative bg-[#023e8a] py-3">
            <span className="absolute left-0 h-[60%] top-1/2 -translate-y-1/2 border-l border-dashed border-white/40"></span>
            <span className="absolute right-0 h-[60%] top-1/2 -translate-y-1/2 border-r border-dashed border-white/40"></span>
            <span className={`text-white font-medium text-md ${countAnimation}`}>
              {cartQuantity}
            </span>
          </div>
          
          {/* Increment Button */}
          <button
            onClick={(e) => handleActionClick(e, handleIncrement)}
            className="flex-1 flex items-center justify-center w-12 text-white cursor-pointer transition-colors duration-150 focus:outline-none"
            aria-label="Increase quantity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default AddToCartButton;
