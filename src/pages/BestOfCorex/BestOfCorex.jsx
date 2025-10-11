import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import SEO from '../../components/SEO';
import { RefreshCw } from 'lucide-react';
import { ApiErrorDisplay } from '../../components/ApiErrorDIsplay';
import { useFetchnCache } from '../../utils/useFetchnCache';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import ProductCarousel from '../../components/Products/ProductCarousel';

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS); //Invokes all the endpoints
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');

  const PRODUCTS_PER_PAGE = import.meta.env.VITE_PRODUCTS_PER_PAGE || 6;

  // Fetch all collection URLs on page load using the refactored hook
  const { data: allCollectionsData, loading, error, refetch } = useFetchnCache(Object.values(API_ENDPOINTS.COLLECTIONS));

  const activeEndpoint = activeTab ? API_ENDPOINTS.COLLECTIONS[activeTab] : null;
  // Select the data for the active tab from the pre-fetched data
  const productData = allCollectionsData ? allCollectionsData[activeEndpoint] : null;
  const products = productData?.products || [];

  return (
    <>
      <SEO
        title="Best of CoreX | Featured Collections & Best Sellers"
        description="Explore the best of CoreX Nutrition. Shop our featured collections including best-sellers, protein powders, pre-workouts, and more to fuel your performance."
        keywords="best sellers, protein, pre-workout, supplements, featured products, CoreX Nutrition"
      />
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

      {/* Product Carousel */}
      {!loading && !error && (
        <ProductCarousel
          products={products}
          productsPerPage={PRODUCTS_PER_PAGE}
        />
      )}
      </main>
    </>
  );
};

export default BestOfCorex;
