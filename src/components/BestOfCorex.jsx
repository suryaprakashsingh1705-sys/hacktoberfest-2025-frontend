import React, { useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductCarousel } from '../hooks/useProductCarousel';
import ProductSkeleton from './Products/ProductSkeleton';
import ProductCarousel from './Products/ProductCarousel';
import { useBestOfCoreX } from '../hooks/useBestOfCoreX';

const BestOfCoreX = () => {
  const {
    collections = [],
    activeTab,
    setActiveTab,
    products,
    loading,
    allCollectionsData,
  } = useBestOfCoreX();

  // Use the custom hook to manage all carousel state and logic
  const { scrollContainerRef, currentPage, productPages, scroll, showArrows } =
    useProductCarousel({ products, productsPerPage: 6 });

  // memoize tab names for stability
  const tabNames = useMemo(
    () => (collections || []).map(([name]) => name),
    [collections]
  );

  const handleSetActive = useCallback(
    (name) => {
      if (typeof setActiveTab === 'function') setActiveTab(name);
    },
    [setActiveTab]
  );

  return (
    <section
      className="px-4 sm:px-8 py-12 font-sans"
      aria-labelledby="best-of-corex-heading"
    >
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-4">
          <h2
            id="best-of-corex-heading"
            className="text-4xl lg:text-heading-xxl font-montserrat text-black leading-none uppercase py-16 section-title"
          >
            <span className="text-[#000]">BEST </span>
            <span>OF</span>
            <span className="capitalize text-[#000]"> Core</span>
            <span className="text-red-500">X</span>
            <span className="text-[#000]"> NUTRITION</span>
          </h2>
        </div>

        {/* Tab Navigation & Carousel Arrows */}
        <div
          className="flex justify-center items-center flex-wrap gap-4 mb-8"
          role="tablist"
          aria-label="Collections"
        >
          {/* Tab Buttons */}
          {tabNames.length > 0 ? (
            tabNames.map((name) => (
              <button
                key={name}
                role="tab"
                aria-selected={activeTab === name}
                aria-current={activeTab === name ? 'true' : undefined}
                onClick={() => handleSetActive(name)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  activeTab === name
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {name}
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              No collections available
            </div>
          )}

          {/* Carousel Arrows */}
          {showArrows && !loading && productPages.length > 0 && (
            <div className="flex items-center gap-2" aria-hidden={loading}>
              <button
                onClick={() => scroll(-1)}
                disabled={currentPage === 0}
                aria-label="Previous page"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={currentPage >= productPages.length - 1}
                aria-label="Next page"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:hover:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Product Carousel */}
        {!loading &&
        allCollectionsData &&
        productPages &&
        productPages.length > 0 ? (
          <ProductCarousel
            productPages={productPages}
            scrollContainerRef={scrollContainerRef}
          />
        ) : (
          !loading && (
            <div className="text-center py-8 text-gray-500">
              No products to display
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BestOfCoreX;
