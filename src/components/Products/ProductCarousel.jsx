import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductCarousel = ({ products, productsPerPage = 6 }) => {
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const productPages = useMemo(() => {
    const pages = [];
    for (let i = 0; i < products.length; i += productsPerPage) {
      pages.push(products.slice(i, i + productsPerPage));
    }
    return pages;
  }, [products, productsPerPage]);

  // Reset scroll position when products change (e.g., switching tabs)
  useEffect(() => {
    setCurrentPage(0);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [products]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const newPage = currentPage + direction;
      if (newPage >= 0 && newPage < productPages.length) {
        container.scrollTo({ left: newPage * container.clientWidth, behavior: 'smooth' });
        setCurrentPage(newPage);
      }
    }
  };

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 h-64 flex items-center justify-center">
        No products found in this collection.
      </p>
    );
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => scroll(-1)}
        disabled={currentPage === 0}
        aria-label="Scroll to previous page"
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-6 w-6 text-gray-700" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {productPages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className="flex-shrink-0 w-full snap-start grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 p-1 md:p-2"
          >
            {page.map((product) => (
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
        disabled={currentPage >= productPages.length - 1}
        aria-label="Scroll to next page"
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  );
};

export default ProductCarousel;