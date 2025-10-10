import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  Heart,
  User,
  ShoppingCart,
} from "lucide-react";
import SearchBox from "../Search/SearchBox";
import TopHeader from "../TopHeader/TopHeader";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <TopHeader />

      {/* Main Header */}
      <header className="bg-white shadow-md w-full fixed top-10 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/images/official-logo-core-x.svg"
                  alt="CoreX Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <div className="relative">
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-black"
                >
                  Shop <ChevronDown className="h-4 w-4" />
                </button>

                {shopOpen && (
                  <div className="absolute left-0 top-full mt-2 w-screen max-w-4xl bg-white shadow-lg p-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-100 rounded">Category 1</div>
                      <div className="p-4 bg-gray-100 rounded">Category 2</div>
                      <div className="p-4 bg-gray-100 rounded">Category 3</div>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/garage-sale" className="text-gray-700 hover:text-black">
                Garage Sale
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-black">
                All Products
              </Link>
              <Link to="/about-corex" className="text-gray-700 hover:text-black">
                About CoreX
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              {/* Desktop Icons */}
              <div className="hidden md:flex items-center space-x-6 text-gray-700">
                <button
                  aria-label="Search"
                  onClick={() => setSearch(true)}
                  className="cursor-pointer flex items-center"
                >
                  <Search className="h-5 w-5 hover:text-black" />
                </button>

                <a href="#" aria-label="Wishlist">
                  <Heart className="h-5 w-5 hover:text-black" />
                </a>
                <a href="#" aria-label="User Account">
                  <User className="h-5 w-5 hover:text-black" />
                </a>
                <a href="#" aria-label="Shopping Cart">
                  <ShoppingCart className="h-5 w-5 hover:text-black" />
                </a>
              </div>

              {/* Mobile Icons */}
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
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
      </header>

      {/* Overlay for Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-[998]`}
      />

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 w-full sm:w-[280px] h-full bg-white shadow-2xl border-l border-gray-200 z-[999] transform transition-all duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0 scale-100" : "translate-x-full scale-95"
        } flex flex-col`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-[#023E8A] tracking-wide">MENU</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <nav className="flex-1 px-6 py-4 flex flex-col space-y-4">
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between w-full text-gray-700 hover:text-black font-medium"
            >
              Shop
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  shopOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {shopOpen && (
              <div className="mt-2 pl-4 space-y-2">
                <Link
                  to="/category1"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 1
                </Link>
                <Link
                  to="/category2"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 2
                </Link>
                <Link
                  to="/category3"
                  className="block text-gray-600 hover:text-black"
                  onClick={() => setMobileOpen(false)}
                >
                  Category 3
                </Link>
              </div>
            )}
          </div>
          <Link
            to="/garage-sale"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Garage Sale
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            All Products
          </Link>
          <Link
            to="/about-corex"
            className="text-gray-700 hover:text-black font-medium"
            onClick={() => setMobileOpen(false)}
          >
            About CoreX
          </Link>
        </nav>

        {/* Mobile Menu Icons */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </a>
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      {search && (
        <SearchBox
          isOpen={search}
          onClose={() => setSearch(false)}
        />
      )}
    </>
  );
}