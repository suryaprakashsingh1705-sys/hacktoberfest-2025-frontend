import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import SEO from '../../components/SEO';
import { AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { ApiErrorDisplay } from '../../components/ApiErrorDisplay';
import { useFetchnCache } from '../../utils/useFetchnCache';
import { useProductCarousel } from '../../utils/useProductCarousel';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import ProductCarousel from '../../components/Products/ProductCarousel';

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS); //Invokes all the endpoints
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');

  // Fetch all collection URLs on page load using the hook
  const {
    data: allCollectionsData,
    loading,
    error,
    errors,
  } = useFetchnCache(Object.values(API_ENDPOINTS.COLLECTIONS));

  const activeEndpoint = activeTab
    ? API_ENDPOINTS.COLLECTIONS[activeTab]
    : null;
  // Select the data for the active tab from the pre-fetched data
  const productData = allCollectionsData
    ? allCollectionsData[activeEndpoint]
    : null;
  const products = productData?.products || [];

  // Use the custom hook to manage all carousel state and logic
  const { scrollContainerRef, currentPage, productPages, scroll, showArrows } =
    useProductCarousel({ products, productsPerPage: 6 });

  return (
    <>
      <SEO
        title="Best of CoreX | Featured Collections & Best Sellers"
        description="Explore the best of CoreX Nutrition. Shop our featured collections including best-sellers, protein powders, pre-workouts, and more to fuel your performance."
        keywords="best sellers, protein, pre-workout, supplements, featured products, CoreX Nutrition"
      />
      <main className="px-4 sm:px-8 pt-32 pb-12 font-sans">
        <div className="flex justify-center items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-montserrat text-black leading-none tracking-wide text-center  py-10 text-stroke-black">
            BEST
            <span className="text-[#f7faff] mx-2 md:mx-4">OF</span> Core
            <span className="text-red-600">X</span> NUTRITION
          </h1>
        </div>

        {/* Tab Navigation & Carousel Arrows */}
        <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
          {/* Tab Buttons */}
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

          {/* Carousel Arrows */}
          {showArrows && !loading && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll(-1)}
                disabled={currentPage === 0}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll(1)}
                disabled={currentPage >= productPages.length - 1}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

        {/* Handle complete failure */}
        {error && !allCollectionsData && (
          <ApiErrorDisplay developerError={error.message} />
        )}

        {/* Handle partial success with a non-blocking warning */}
        {errors.length > 0 && allCollectionsData && (
          <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <div>
              <h4 className="font-semibold text-yellow-800">
                Some collections failed to load.
              </h4>
              <p className="text-sm text-yellow-700">
                The displayed products might be incomplete. You can try
                refreshing.
              </p>
            </div>
          </div>
        )}

        {/* Product Carousel */}
        {!loading && allCollectionsData && (
          <ProductCarousel
            products={products}
            scrollContainerRef={scrollContainerRef}
            productsPerPage={6}
          />
        )}
      </main>
    </>
  );
};

export default BestOfCorex;
