import React, { useState, useMemo, useRef } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import ProductCard from '../../components/Products/ProductCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import{ApiErrorDisplay} from '../../components/ApiErrorDisplay';

import { useFetchnCache } from '../../utils/useFetchnCache';
import ProductSkeleton from '../../components/Products/ProductSkeleton';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS); //Invokes all the endpoints
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');
  const scrollContainerRef = useRef(null);

  const PRODUCTS_PER_PAGE = import.meta.env.VITE_PRODUCTS_PER_PAGE || 6;

  // Fetch all collection URLs on page load using the refactored hook
  const { data: allCollectionsData, loading, error, refetch } = useFetchnCache(Object.values(API_ENDPOINTS.COLLECTIONS));
  const activeEndpoint = activeTab ? API_ENDPOINTS.COLLECTIONS[activeTab] : null;
    // Select the data for the active tab from the pre-fetched data
  const productData = allCollectionsData ? allCollectionsData[activeEndpoint] : null;
  const products = productData?.products || [];
  // Chunks product into  6 /page

  const productPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < products.length; i += PRODUCTS_PER_PAGE) {
      pages.push(products.slice(i, i + PRODUCTS_PER_PAGE));
    }
    return pages;
  }, [products, PRODUCTS_PER_PAGE]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * direction;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main className="px-4 sm:px-8 py-5 font-sans">
      <div className="flex justify-center items-center gap-4">
        <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Best of CoreX</h1>
        <button
          onClick={refetch}
          disabled={loading}
          className="mt-6 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Refresh all collections"
          title="Refresh collections"
        >
          <RefreshCw className={`h-5 w-5 text-gray-700 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {collections.map(([name]) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
              activeTab === name
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 p-1 md:p-2">
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {error && (
        <ApiErrorDisplay developerError={error.message} />
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 h-64 flex items-center justify-center">No products found in this collection.</p>
      )}

      {/* Horizontal Scroll Product Grid */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll to previous page"
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide md:scrollbar-default"
        >
          {/* Only render grid if not loading, no error, and products exist */}
          {!loading && !error && products.length > 0 && productPages.map((page, pageIndex) => (
            <div
              key={`${activeTab}-${pageIndex}`} // Re-render when tab changes
              className="flex-shrink-0 w-full snap-start grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 p-1 md:p-2"
            >
              {page.map(product => (
                <motion.div
                  key={product.id || product._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll to next page"
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </main>
  );
};

export default BestOfCorex;
