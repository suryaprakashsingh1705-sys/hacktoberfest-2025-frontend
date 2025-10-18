// garageSale

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { getProducts } from '../../api/productService';
import GarageSaleBanner from '../../components/GarageSaleBanner';
import ProductCard from '../../components/Products/ProductCard';
import SEO from '../../components/SEO';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import RecentlyViewed from '../../components/RecentlyViewed';
import {
  toggleWishlist,
  isInWishlist,
} from '../../utils/wishlist';
import { toggleCart, isInCart } from '../../utils/cart';
import SortDropdown from '../../components/Products/SortDropdown';

export default function GarageSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(12);
  const [sortBy, setSortBy] = useState('best-selling');
  const [sortOrder, setSortOrder] = useState('desc');
  const observer = useRef();


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ limit: 1000 });
        if (response.success) {
          setProducts(response.data.products);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract sale products
  const saleProducts = useMemo(() => {
    return products.filter((p) => p.onSale || (p.sale && Number(p.sale) > 0));
  }, [products]);

  // Apply sorting logic (client-side)
  const sortedProducts = useMemo(() => {
  let sorted = [...saleProducts];

  // Defensive helper to safely get title string
  const getTitle = (p) => {
    // try common field names in order of likelihood
    const val = p?.title ?? p?.name ?? p?.productName ?? '';
    return String(val ?? '').toLowerCase();
  };

  switch (sortBy) {
    case 'title':
      sorted.sort((a, b) => {
        const titleA = getTitle(a);
        const titleB = getTitle(b);
        return sortOrder === 'asc'
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      });
      break;

    case 'price':
      sorted.sort((a, b) =>
        sortOrder === 'asc'
          ? (Number(a?.price) || 0) - (Number(b?.price) || 0)
          : (Number(b?.price) || 0) - (Number(a?.price) || 0)
      );
      break;

    case 'rating':
      sorted.sort((a, b) =>
        sortOrder === 'asc'
          ? (Number(a?.rating) || 0) - (Number(b?.rating) || 0)
          : (Number(b?.rating) || 0) - (Number(a?.rating) || 0)
      );
      break;

    default:
      // best-selling / featured: keep original order (as fetched)
      sorted = saleProducts;
      break;
  }

  return sorted;
}, [saleProducts, sortBy, sortOrder]);


  const displayedProducts = sortedProducts.slice(0, displayedCount);
  const hasMoreProducts = displayedCount < sortedProducts.length;

  // Infinite scroll logic
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreProducts) {
          setDisplayedCount((prevCount) =>
            Math.min(prevCount + 5, sortedProducts.length)
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMoreProducts, sortedProducts.length]
  );

  return (
    <>
      <SEO
        title="Garage Sale | CoreX Nutrition"
        description="Discover amazing deals on premium sports nutrition supplements. Find discounted protein powders, pre-workouts, and fitness products."
        keywords="garage sale, deals, supplements, CoreX, discount, sale, protein powder, pre-workout, fitness products"
      />

      <main className="min-h-screen bg-[#F7FAFF]">
        <GarageSaleBanner />

        {/* Toolbar Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button className="flex items-center gap-2 bg-transparent text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.863281 10.7949H3.13601M3.13601 10.7949C3.13601 12.3012 4.35705 13.5222 5.86328 13.5222C7.36951 13.5222 8.59055 12.3012 8.59055 10.7949C8.59055 9.28865 7.36951 8.06765 5.86328 8.06765C4.35705 8.06765 3.13601 9.28865 3.13601 10.7949ZM15.8633 3.52219H18.136M15.8633 3.52219C15.8633 5.02842 14.6423 6.24947 13.136 6.24947C11.6297 6.24947 10.4087 5.02842 10.4087 3.52219C10.4087 2.01597 11.6297 0.794922 13.136 0.794922C14.6423 0.794922 15.8633 2.01597 15.8633 3.52219ZM11.3178 10.7949H18.136M0.863281 3.52219H7.68146"
                  stroke="#0D1B2A"
                  strokeLinecap="round"
                />
              </svg>
              All Filters
            </button>

            {/* Sort Dropdown */}
            <SortDropdown
              defaultOption="best-selling"
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={(field, order) => {
                setSortBy(field);
                setSortOrder(order);
                setDisplayedCount(12);
              }}
            />
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col gap-8">
            <div className="w-full">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-red-800 mb-3">
                    Unable to Load Sale Products
                  </h3>
                  <p className="text-red-600 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {loading && <ProductSkeleton count={12} />}

              {!loading && !error && displayedProducts.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {displayedProducts.map((product, index) => {
                      const isLast = index === displayedProducts.length - 1;
                      return (
                        <ProductCard
                          key={product.id || product._id}
                          product={product}
                          ref={isLast ? lastProductElementRef : null}
                          onAddToWishlist={(prod) => toggleWishlist(prod)}
                          onAddToCart={(prod, flavor) =>
                            toggleCart(prod, flavor)
                          }
                          isWishlisted={isInWishlist(product.id || product._id)}
                          isInCart={(flavor) => isInCart(product, flavor)}
                        />
                      );
                    })}
                  </div>

                  {hasMoreProducts && (
                    <div className="flex justify-center mt-8">
                      <div className="text-gray-500">Loading more...</div>
                    </div>
                  )}
                </>
              )}

              {!loading && !error && sortedProducts.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    No Sale Products Available
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Check back soon for amazing deals on our premium sports
                    nutrition supplements!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {!loading && !error && <RecentlyViewed saleOnly={true} />}
      </main>
    </>
  );
}
