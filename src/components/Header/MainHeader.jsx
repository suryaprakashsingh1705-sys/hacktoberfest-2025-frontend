import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
} from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full fixed top-9 left-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <img
              src="/images/official-logo-core-x.svg"
              alt="CoreX Logo"
              className="h-10 w-auto"
            />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className="group flex items-center gap-1 text-gray-700 hover:text-black transition"
              >
                <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all group-hover:after:w-full">
                  Shop
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    shopOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
              {shopOpen && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-lg p-6 animate-fadeIn">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
                      Category 1
                    </div>
                    <div className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
                      Category 2
                    </div>
                    <div className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition">
                      Category 3
                    </div>
                  </div>
                </div>
              )}
            </div>

            {['Garage Sale', 'All Products', 'About CoreX'].map((link) => (
              <a
                key={link}
                href="#"
                className="relative text-gray-700 hover:text-black transition group"
              >
                {link}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right: Icons (desktop) + Mobile Hamburger */}
          <div className="flex items-center space-x-6">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-6 text-gray-700">
              {[
                { icon: Search, label: 'Search' },
                { icon: Heart, label: 'Wishlist' },
                { icon: User, label: 'User Account' },
                { icon: ShoppingCart, label: 'Shopping Cart' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-gray-700 hover:text-black"
              >
                {mobileOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md animate-fadeIn">
          <nav className="flex flex-col space-y-2 p-4">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between text-gray-700 hover:text-black transition"
            >
              <span>Shop</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  shopOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {shopOpen && (
              <div className="flex flex-col space-y-2 pl-4">
                {['Category 1', 'Category 2', 'Category 3'].map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="text-gray-600 hover:text-black transition"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            )}

            {['Garage Sale', 'All Products', 'About CoreX'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-black transition"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
