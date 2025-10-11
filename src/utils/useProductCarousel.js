import { useState, useMemo, useRef, useEffect } from 'react';

/**
 * A custom hook to manage the state and logic for a paginated product carousel.
 * @param {{products: any[], productsPerPage: number}} config - The configuration object.
 * @param {any[]} config.products - The array of products to display.
 * @param {number} [config.productsPerPage=6] - The number of products per page on desktop.
 * @returns {{
 *   scrollContainerRef: React.RefObject<HTMLDivElement>,
 *   currentPage: number,
 *   productPages: any[][],
 *   scroll: (direction: number) => void,
 *   showArrows: boolean
 * }}
 */
export const useProductCarousel = ({ products, productsPerPage = 6 }) => {
  const scrollContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [responsiveProductsPerPage, setResponsiveProductsPerPage] = useState(productsPerPage);

  // Handle responsive products per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setResponsiveProductsPerPage(1);
      } else {
        setResponsiveProductsPerPage(productsPerPage);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [productsPerPage]);

  // Memoize the pages based on products and responsive page size
  const productPages = useMemo(() => {
    if (!products) return [];
    const pages = [];
    for (let i = 0; i < products.length; i += responsiveProductsPerPage) {
      pages.push(products.slice(i, i + responsiveProductsPerPage));
    }
    return pages;
  }, [products, responsiveProductsPerPage]);

  // Reset to the first page when the underlying products change
  useEffect(() => {
    setCurrentPage(0);
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, [products]);

  // Sync current page state with manual scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const pageIndex = Math.round(container.scrollLeft / container.clientWidth);
      if (pageIndex !== currentPage) setCurrentPage(pageIndex);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Scroll function for arrow navigation
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

  const showArrows = productPages.length > 1;

  return { scrollContainerRef, currentPage, productPages, scroll, showArrows };
};