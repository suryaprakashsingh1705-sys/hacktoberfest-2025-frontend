import React, { useState, useMemo, useRef } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import ProductCard from '../../components/Products/ProductCard';
import { motion } from 'framer-motion';


const mockProducts = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: `Sample Product ${i + 1}`,
  price: (19.99 + i * 3.5).toFixed(2),
  images: ['https://via.placeholder.com/400'],
  rating: (3.5 + (i % 3) * 0.5).toFixed(1),
  numReviews: 15 + i * 7,
}));

const PRODUCTS_PER_PAGE = 6;

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');
  const scrollContainerRef = useRef(null);

  // Chunks product into pages of 6
  const productPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < mockProducts.length; i += PRODUCTS_PER_PAGE) {
      pages.push(mockProducts.slice(i, i + PRODUCTS_PER_PAGE));
    }
    return pages;
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * direction;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="px-8 py-5 font-sans">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-center">Best of CoreX</h1>
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

      {/* Horizontal Scroll Product Grid */}
      <div className="relative">
        {/* Left Arrow */}
        <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {productPages.map((page, pageIndex) => (
            <div
              key={`${activeTab}-${pageIndex}`} // Re-render when tab changes
              className="flex-shrink-0 w-full snap-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-2"
            >
              {page.map(product => (
                <motion.div
                  key={product.id}
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
        <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </main>
  );
};

export default BestOfCorex;
