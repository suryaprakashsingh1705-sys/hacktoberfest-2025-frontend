import React, { useState, useMemo } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import ProductCard from '../../components/Products/ProductCard';


const mockProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Sample Product ${i + 1}`,
  price: (19.99 + i * 5).toFixed(2),
  images: ['https://via.placeholder.com/400'],
  rating: (3.5 + (i % 3) * 0.5).toFixed(1),
  numReviews: 15 + i * 7,
}));

const PRODUCTS_PER_PAGE = 6;

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = useMemo(() => Math.ceil(mockProducts.length / PRODUCTS_PER_PAGE), []);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    return mockProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {currentProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default BestOfCorex;
