import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import ProductCard from '../../components/Products/ProductCard';

// Create a mock product data array for layout purposes
const mockProducts = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Sample Product ${i + 1}`,
  price: (19.99 + i * 5).toFixed(2),
  images: ['https://via.placeholder.com/400'],
  rating: (3.5 + (i % 3) * 0.5).toFixed(1),
  numReviews: 15 + i * 7,
}));

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);
  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Render 10 sample product cards using mock data */}
        {mockProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main>
  );
};

export default BestOfCorex;
