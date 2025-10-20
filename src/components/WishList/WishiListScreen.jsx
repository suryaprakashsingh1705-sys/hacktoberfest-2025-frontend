import React, { useEffect, useRef, useMemo } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromWishList } from '../../store/wishListSlice';
import { Heart } from 'lucide-react';

const WishListProductCard = ({ product, removeFromWishList }) => {
  if (!product) return null;
  const { name, price, imageUrl, salePercentage, flavor } = product;
  const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
  return (
    <div className="w-full max-w-lg p-4 flex ">
      {/* Left side container for image and product info */}
      <div className="flex ">
        {/* Product Image */}
        <img
          src={
            imageUrl ||
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgMTI1SDEzNVYxMzVIMTI1VjEyNVpNMTM1IDEyNUgxNDVWMTM1SDEzNVYxMjVaTTE0NSAxMjVIMTU1VjEzNUgxNDVWMTI1Wk0xNTUgMTI1SDE2NVYxMzVIMTU1VjEyNVpNMTY1IDEyNUgxNzVWMTM1SDE2NVYxMjVaIiBmaWxsPSIjOUI5QkEzIi8+CjxwYXRoIGQ9Ik0xMzUgMTQ1SDE0NVYxNTVIMTM1VjE0NVpNMTQ1IDE0NUgxNTVWMTU1SDE0NVYxNDVaTTE1NSAxNDVIMTY1VjE1NUgxNTVWMTQ1WiIgZmlsbD0iIzlCOUJBMyIvPgo8L3N2Zz4K'
          }
          alt={name}
          className={`w-24 h-24 object-contain mr-6 `}
          onLoad={() => {}}
          onError={() => {}}
          loading="lazy"
        />

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-800">{name}</h3>
          <div className="flex items-center space-x-2 my-1">
            <span className="text-gray-800 text-sm">${priceStr}</span>
            <span className="bg-blue-600 text-white text-xs font-semibold py-0.5 px-1.5 rounded">
              {salePercentage}% OFF
            </span>
          </div>
          <p className="text-gray-500 text-sm">{flavor}</p>
        </div>
        <div className="right-0 absolute pr-4">
          {/* Wishlist Icon on the far right */}
          <button
            onClick={removeFromWishList}
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
const WishListDrawerScreen = ({ wishListData, setWishListOpen }) => {
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  // 🔹 Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setWishListOpen(false);

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableEls = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableEls.length) return;

        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setWishListOpen]);

  useEffect(() => {
    if (drawerRef.current) {
      const firstEl = drawerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstEl?.focus();
    }
  }, [wishListData]);

  const wishListScreen = useMemo(() => {
    return (
      <div
        className="fixed inset-0 bg-black/40 z-[999]"
        role="presentation"
        onClick={() => setWishListOpen(false)}
      >
        {/* Drawer */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
          className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-lg z-[1000] flex flex-col transition-transform duration-300 focus:outline-none"
          ref={drawerRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b p-4">
            <h2
              id="wishlist-title"
              className="text-xl font-bold text-[#0b1a39] tracking-wide"
            >
              WISHLIST
            </h2>
            <button
              aria-label="Close wishlist"
              className="text-gray-600 hover:text-red-500 cursor-pointer"
              onClick={() => setWishListOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          {/* Wishlist Content */}
          {wishListData.items.length === 0 ? (
            <div className="flex flex-col flex-grow items-center justify-center text-center p-4">
              <p className="text-gray-500 mb-2">Your wishlist is empty.</p>
              <button
                className="text-sm text-[#0b1a39] underline hover:text-black"
                onClick={() => setWishListOpen(false)}
              >
                Start adding your favorite supplements!
              </button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto p-4">
                {wishListData.items.map((prod) => (
                  <WishListProductCard
                    key={prod.id}
                    product={prod}
                    removeFromWishList={() =>
                      dispatch(removeFromWishList(prod))
                    }
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 mt-auto border-t">
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => {
                    // Add all add to cart slicer here in future
                  }}
                >
                  Add All To Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }, [wishListData, dispatch, setWishListOpen]);

  return wishListScreen;
};

export default WishListDrawerScreen;
