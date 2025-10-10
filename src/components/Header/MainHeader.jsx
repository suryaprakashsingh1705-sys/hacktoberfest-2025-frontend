import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
} from 'lucide-react';
import SearchBox from '../Search/SearchBox';
import TopHeader from "../TopHeader/TopHeader";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <>
      <TopHeader />
      <header className="bg-white shadow-md w-full fixed top-10 left-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/images/official-logo-core-x.svg"
                  alt="CoreX Logo"
                  className="h-8 w-auto"
                />
              </Link>
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

              <Link
                to="/garage-sale"
                className="relative text-gray-700 hover:text-black transition group"
              >
                Garage Sale
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link
                to="/products"
                className="relative text-gray-700 hover:text-black transition group"
              >
                All Products
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link
                to="/about-corex"
                className="relative text-gray-700 hover:text-black transition group"
              >
                About CoreX
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Right: Icons (desktop) + Mobile Hamburger */}
            <div className="flex items-center space-x-6">
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-6 text-gray-700">
                <button
                  aria-label="Search"
                  onClick={() => setSearch(true)}
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black cursor-pointer"
                >
                  <Search className="h-5 w-5" />
                </button>

                <a
                  href="#"
                  aria-label="Wishlist"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black"
                >
                  <Heart className="h-5 w-5" />
                </a>
                
                <a
                  href="#"
                  aria-label="User Account"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black"
                >
                  <User className="h-5 w-5" />
                </a>
                
                <a
                  href="#"
                  aria-label="Shopping Cart"
                  className="transform transition-transform duration-200 hover:scale-110 hover:text-black"
                >
                  <ShoppingCart className="h-5 w-5" />
                </a>
              </div>

              {/* Mobile Hamburger */}
              <div className="md:hidden flex items-center space-x-4">
                <button
                  onClick={() => setSearch(true)}
                  className="text-gray-700 hover:text-black"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="text-gray-700 hover:text-black"
                  aria-label="Menu"
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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

              <Link
                to="/garage-sale"
                className="text-gray-700 hover:text-black transition"
              >
                Garage Sale
              </Link>
              
              <Link
                to="/products"
                className="text-gray-700 hover:text-black transition"
              >
                All Products
              </Link>
              
              <Link
                to="/about-corex"
                className="text-gray-700 hover:text-black transition"
              >
                About CoreX
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Right Slide Search Drawer */}
      {search && (
        <div className="fixed inset-0 z-[9999] flex justify-end bg-black/40">
          {/* Drawer */}
          <div className="relative w-full sm:w-[580px] bg-white h-full shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">SEARCH</h2>
              <button
                onClick={() => setSearch(false)}
                className="text-gray-600 hover:text-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
              <SearchBox />
            </div>
          </div>
        </div>
      )}
    </>
  );
}