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
  const itemRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(true);

  // Reset scroll position and state when products change (e.g., switching tabs)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Instantly reset scroll to the beginning
      container.scrollTo({ left: 0, behavior: 'auto' });
    }
    // Immediately reset arrow states for the new tab
    setCanScrollLeft(false);
    // The other useEffect will correctly set this, but resetting provides a clean start
    setCanScrollRight(false); // Will be re-evaluated by the checkScroll effect
  }, [products]);

  // Check scroll capabilities whenever products or the container size changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      // Use a small tolerance for floating point inaccuracies
      const hasOverflow = scrollWidth > clientWidth + 1;
      setCanScrollRight(hasOverflow && scrollLeft < scrollWidth - clientWidth - 1);
      setIsOverflowing(hasOverflow);
    };

    // Initial check
    checkScroll();

    // Check on scroll and resize
    container.addEventListener('scroll', checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      resizeObserver.unobserve(container);
    };
  }, [products]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const item = itemRef.current;
    if (container && item) {
      // Calculate the width of one item including its gap
      const itemWidth = item.offsetWidth;
      const style = window.getComputedStyle(item.parentElement);
      const gap = parseFloat(style.gap) || 24; // Default to 24px if gap is not found
      const scrollAmount = (itemWidth + gap) * direction;

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-center text-gray-500">
        No products found in this collection.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Arrows are only visible if the content is overflowing */}
      {isOverflowing && (
        <>
          {/* Left Arrow */}
          <button
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            aria-label="Scroll to previous page"
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-30 hover:disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className={`flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide ${!isOverflowing ? 'justify-center' : ''}`}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id || product._id}
            ref={index === 0 ? itemRef : null} // Attach ref to the first item
            className="w-1/2 flex-shrink-0 sm:w-1/3 lg:w-1/6"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {isOverflowing && (
        <>
          {/* Right Arrow */}
          <button
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            aria-label="Scroll to next page"
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-gray-100 transition disabled:opacity-30 hover:disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;