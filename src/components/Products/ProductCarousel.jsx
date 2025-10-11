import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductCarousel = ({ products, productsPerPage = 6, scrollContainerRef }) => {
  // Note: currentPage state and scroll logic are now managed by the parent component.
  const [responsiveProductsPerPage, setResponsiveProductsPerPage] = useState(productsPerPage);

  // Simplified responsive logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // For the 3x2 grid, we need 6 items, but for mobile we only want 1.
      // The grid classes will handle the visual layout.
      if (width < 640) { // Screens smaller than the 'sm' breakpoint
        setResponsiveProductsPerPage(1);
      } else {
        setResponsiveProductsPerPage(productsPerPage);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [productsPerPage]);


  // Chunk products into pages
  const productPages = useMemo(() => {
    if (!products) return [];
    const pages = [];
    for (let i = 0; i < products.length; i += responsiveProductsPerPage) {
      pages.push(products.slice(i, i + responsiveProductsPerPage));
    }
    return pages;
  }, [products, responsiveProductsPerPage]);

  if (!products || products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-center text-gray-500">
        No products found in this collection.
      </div>
    );
  }

  // Determine if the arrows should be visible. Only show them if there's more than one page.
  const showAsGrid = productPages.length > 1;

  return (
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {productPages.map((page, pageIndex) => (
          <div
            key={pageIndex}
            className={`w-full flex-shrink-0 snap-start p-1 md:p-2 ${
              showAsGrid
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6' // sm-lg: 3x2 grid, lg+: 1x6 grid
                : 'flex justify-center gap-6'
            }`}
          >
            {page.map((product, index) => (
              <motion.div
                key={product.id || product._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.05 }}
                // When not a grid (fewer than a page), we need to define the width of each item
                className={!showAsGrid ? 'w-1/2 sm:w-1/3 lg:w-1/6' : ''}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
  );
};

export default ProductCarousel;