import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';

const BestOfCorex = () => {
  const collections = Object.entries(API_ENDPOINTS.COLLECTIONS);

  const [activeTab, setActiveTab] = useState(collections[0]?.[0] || '');

  return (
    <main className="px-8 py-5 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Best of CoreX</h1>

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

      {/* The content below will eventually show products for the active tab */}
    </main>
  );
};

export default BestOfCorex;
