import React, { useState } from 'react';

export default function SearchBox(){
    const [searchQuery, setSearchQuery] = useState('');

    // dummy product data
    const products = [
    {
      id: 1,
      brand: 'CoreX',
      name: '100% Whey Protein - Vanilla',
      price: 84.99,
      image: '/api/placeholder/60/60'
    },
    {
      id: 2,
      brand: 'CoreX',
      name: '100% Nova Whey - Vanilla Ice Cream',
      price: 74.99,
      image: '/api/placeholder/60/60'
    },
    {
      id: 3,
      brand: 'CoreX',
      name: '100% Nova Whey - Vanilla Ice Cream',
      price: 74.99,
      image: '/api/placeholder/60/60'
    },
    {
      id: 4,
      brand: 'CoreX',
      name: '100% Nova Whey - Vanilla Ice Cream',
      price: 78.99,
      image: '/api/placeholder/60/60'
    },
    {
      id: 5,
      brand: 'CoreX',
      name: '100% Nova Whey - Vanilla Ice Cream',
      price: 73.99,
      image: '/api/placeholder/60/60'
    }
  ];

    const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='md:max-w-100vh sm:w-full max-h-full flex-grid bg-gray-100 gap-4 p-4'>
            <hr className="border-t border-gray-300 mt-4" />
            <div className="relative w-full mt-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pr-20 bg-[#89949f] border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 text-xs font-medium text-[#042650] hover:text-gray-900 transition-colors"
                    >
                    clear
                </button>
            </div>
            <hr className="border-t border-gray-300 my-4" />
            <div className='font-bold text-lg mr-4 mt-4 mb-4'>
                <p>Products</p>
            </div>

            <div className='space-y-4'>
            {filteredProducts.map((product) => (
            <div className='flex items-center justify-start space-x-4 p-2 bg-white rounded-lg shadow hover:shadow-lg'>
                <div className="w-16 h-16 object-cover rounded">
                    <img src={product.image} alt="Product_Image" />
                </div>
                <div>
                    <h4 className='text-sm'>{product.brand}</h4>
                    <h2 className="text-sm font-medium text-gray-900">{product.name}</h2>
                    <p className="text-sm text-gray-500">{product.price}</p>
                </div>
            </div>
                ))}
            </div>
        </div>
    )
}