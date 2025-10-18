import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProducts } from '../../api/productService';
import { getCart, removeFromCart, addToCart } from '../../utils/cart';

export default function CartDrawer({ isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // Load cart and refresh on storage changes + custom cart update event
  useEffect(() => {
    const loadCart = () => {
      const cart = getCart();
      setItems(cart);
    };

    loadCart();
    const handleStorageChange = () => loadCart();
    const handleCartUpdate = () => loadCart();
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  // Load random products for "You may also like" - ONLY when drawer opens
  useEffect(() => {
    if (!isOpen) return;

    // Refresh cart items when drawer opens
    const cart = getCart();
    setItems(cart);

    const loadSuggestions = async () => {
      try {
        const response = await getProducts();
        
        // Extract products from the nested response structure
        const all = response?.data?.products || [];
        
        if (!all || all.length === 0) {
          setSuggestions([]);
          return;
        }
        
        // Extract just the product IDs from current cart items
        const cartProductIds = cart.map((ci) => ci.id);
        
        const filtered = all.filter((p) => {
          const prodId = p.id || p._id;
          return !cartProductIds.includes(prodId);
        });
        
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 4);
        
        setSuggestions(selected);
      } catch (err) {
        setSuggestions([]);
      }
    };

    loadSuggestions();
  }, [isOpen]); // Only depend on isOpen, not on items

  const isEmpty = items.length === 0;

  // Calculate subtotal with sale prices
  const subtotal = items.reduce((sum, item) => {
    const basePrice = item.price || 0;
    const salePercent = item.salePercentage || 0;
    const finalPrice = salePercent > 0 ? basePrice * (1 - salePercent / 100) : basePrice;
    return sum + finalPrice * (item.quantity || 1);
  }, 0);

  // Calculate milestone progress
  const milestones = [
    { amount: 75, label: 'Free Shipping' },
    { amount: 115, label: 'Free Shaker' },
    { amount: 150, label: 'Free T-Shirt' },
  ];

  const progressPercent = Math.min((subtotal / 150) * 100, 100);
  const currentMilestone = milestones.find((m) => subtotal < m.amount);

  const handleRemove = (cartItemKey) => {
    removeFromCart(cartItemKey);
    setTimeout(() => {
      const cart = getCart();
      setItems(cart);
      window.dispatchEvent(new Event('cartUpdated'));
    }, 0);
  };

  const handleQuantityChange = (item, newQty) => {
    if (newQty <= 0) {
      handleRemove(item.cartItemKey);
      return;
    }
    // Update quantity by removing and re-adding with new quantity
    removeFromCart(item.cartItemKey);
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        sale: item.salePercentage,
      },
      item.selectedFlavor,
      newQty
    );
    setTimeout(() => {
      const cart = getCart();
      setItems(cart);
      window.dispatchEvent(new Event('cartUpdated'));
    }, 0);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[999]"
          aria-label="Close cart"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[40%] bg-white shadow-2xl z-[1000] transform transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isEmpty ? (
            // Empty State
            <>
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg font-medium mb-6">
                  Your cart is empty
                </p>
              </div>

              {/* Greyed Progress Bar */}
              <div className="space-y-2">
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400" style={{ width: '0%' }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  {milestones.map((m) => (
                    <span key={m.amount}>${m.amount}</span>
                  ))}
                </div>
              </div>

              {/* Suggestions for Empty Cart */}
              {suggestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    You may also like
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {suggestions.map((prod) => {
                      const prodId = prod.id || prod._id;
                      const img =
                        prod.imageUrl || prod.image || prod.img || '';
                      return (
                        <a
                          key={prodId}
                          href={`/products/${prodId}`}
                          className="border border-gray-200 rounded p-2 hover:shadow-md transition"
                        >
                          <img
                            src={img || '/assets/missing-picture-product.jpg'}
                            alt={prod.name || prod.title}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <p className="text-xs font-medium text-gray-900 line-clamp-2">
                            {prod.name || prod.title}
                          </p>
                          <p className="text-xs text-blue-600 font-semibold mt-1">
                            ${prod.price || 0}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Full Cart
            <>
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-900">
                    ${subtotal.toFixed(2)} spent
                  </span>
                  {currentMilestone && (
                    <span className="text-xs text-gray-600">
                      ${(currentMilestone.amount - subtotal).toFixed(2)} away
                      from {currentMilestone.label}
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  {milestones.map((m) => (
                    <div
                      key={m.amount}
                      className={`text-center ${
                        subtotal >= m.amount
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-500'
                      }`}
                    >
                      <div>${m.amount}</div>
                      <div className="text-xs">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => {
                  const basePrice = item.price || 0;
                  const salePercent = item.salePercentage || 0;
                  const finalPrice = salePercent > 0 ? basePrice * (1 - salePercent / 100) : basePrice;
                  const itemTotal = finalPrice * (item.quantity || 1);

                  return (
                    <div
                      key={item.cartItemKey}
                      className="flex gap-3 border-b border-gray-200 pb-4"
                    >
                      {/* Image */}
                      <img
                        src={
                          item.imageUrl || '/assets/missing-picture-product.jpg'
                        }
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded"
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                          {item.name}
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
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                (item.quantity || 1) - 1
                              )
                            }
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm"
                          >
                            –
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                (item.quantity || 1) + 1
                              )
                            }
                            className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Link */}
                        <button
                          onClick={() => handleRemove(item.cartItemKey)}
                          className="text-xs text-red-600 hover:text-red-800 mt-2 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-3 border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900">
                    You may also like
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {suggestions.map((prod) => {
                      const prodId = prod.id || prod._id;
                      const img =
                        prod.imageUrl || prod.image || prod.img || '';
                      return (
                        <a
                          key={prodId}
                          href={`/products/${prodId}`}
                          className="border border-gray-200 rounded p-2 hover:shadow-md transition"
                        >
                          <img
                            src={img || '/assets/missing-picture-product.jpg'}
                            alt={prod.name || prod.title}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <p className="text-xs font-medium text-gray-900 line-clamp-2">
                            {prod.name || prod.title}
                          </p>
                          <p className="text-xs text-blue-600 font-semibold mt-1">
                            ${prod.price || 0}
                          </p>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sticky Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 space-y-3 -mx-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Subtotal:
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <a
                  href="#"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-center transition"
                >
                  Proceed to Checkout
                </a>
                <button
                  onClick={onClose}
                  className="w-full border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
