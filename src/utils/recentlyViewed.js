// Simple utility to manage recently viewed products.
// Stores/retrieves an array of product objects in localStorage under the key `recently_viewed`.

export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem('recently_viewed');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Normalize any older stored object shapes to the shape ProductCard expects
    return parsed.map(normalizeStoredProduct);
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

export function getRecentlyViewedOnSale() {
  try {
    const raw = localStorage.getItem('recently_viewed_on_sale');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeStoredProduct);
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

function normalizeStoredProduct(p) {
  if (!p || typeof p !== 'object') return {};
  const pid = p.id || p._id || p.productId || null;
  return {
    id: pid,
    _id: pid,
    name: p.name || p.title || '',
    imageUrl: p.imageUrl || p.image || p.imageUrlLarge || '',
    price: p.price ?? p.currentPrice ?? 0,
    originalPrice: p.originalPrice ?? p.listPrice ?? null,
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? p.reviews ?? 0,
    flavors: Array.isArray(p.flavors) ? p.flavors : [],
    isNew: !!p.isNew,
    onSale: !!p.onSale || Number(p.sale || p.salePercentage || 0) > 0,
    salePercentage: p.salePercentage ?? p.sale ?? 0,
    category: p.category || null,
    goals: Array.isArray(p.goals) ? p.goals : [],
  };
}

export function addRecentlyViewed(product) {
  if (!product) return;
  try {
    const pid = product.id || product._id;

    // Create a sanitized product object to store. Store keys expected by ProductCard.
    const sanitizedProduct = {
      id: pid,
      _id: pid,
      name: product.name || product.title || '',
      imageUrl: product.imageUrl || product.image || product.imageUrlLarge || '',
      price: product.price ?? product.currentPrice ?? 0,
      originalPrice: product.originalPrice ?? product.listPrice ?? null,
      rating: product.rating ?? 0,
      reviewCount: product.reviewCount ?? product.reviews ?? 0,
      flavors: Array.isArray(product.flavors) ? product.flavors : product.options?.flavors || [],
      isNew: !!product.isNew,
      onSale: !!product.onSale || Number(product.sale || 0) > 0,
      salePercentage: product.salePercentage ?? product.sale ?? 0,
      category: product.category || null,
      goals: Array.isArray(product.goals) ? product.goals : [],
    };

    // Update general recently_viewed list
    try {
      const current = getRecentlyViewed();
      const deduped = current.filter((p) => (p?.id || p?._id) !== pid);
      deduped.unshift(sanitizedProduct);
      const trimmed = deduped.slice(0, 10);
      localStorage.setItem('recently_viewed', JSON.stringify(trimmed));
    } catch {
      // ignore per-list failures
    }

    // If product is on sale, also update the sale-specific list
  const isSale = !!product.onSale || Number(product.sale || product.salePercentage || 0) > 0;
    if (isSale) {
      try {
        const currentSale = getRecentlyViewedOnSale();
        const dedupedSale = currentSale.filter((p) => (p?.id || p?._id) !== pid);
        dedupedSale.unshift(sanitizedProduct);
        const trimmedSale = dedupedSale.slice(0, 10);
        localStorage.setItem('recently_viewed_on_sale', JSON.stringify(trimmedSale));
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore overall
  }
}

export default { getRecentlyViewed, addRecentlyViewed, getRecentlyViewedOnSale };
