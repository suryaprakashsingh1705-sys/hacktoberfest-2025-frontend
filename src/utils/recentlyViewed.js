// Simple utility to manage recently viewed products.
// Stores/retrieves an array of product objects in localStorage under the key `recently_viewed`.

export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem('recently_viewed');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

export function getRecentlyViewedOnSale(){
  try {
    const raw = localStorage.getItem('recently_viewed_on_sale');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // If localStorage access fails (SSR or permission), return empty array
    return [];
  }
}

export function addRecentlyViewed(product) {
  if (!product) return;
  try {
    const pid = product.id || product._id;

    // update general recently_viewed list
    try {
      const current = getRecentlyViewed();
      const deduped = current.filter((p) => (p?.id || p?._id) !== pid);
      deduped.unshift(product);
      const trimmed = deduped.slice(0, 10);
      localStorage.setItem('recently_viewed', JSON.stringify(trimmed));
    } catch {
      // ignore per-list failures
    }

    // if product is on sale, also update the sale-specific list
    const isSale = product.onSale;
    if (isSale) {
      try {
        const currentSale = getRecentlyViewedOnSale();
        const dedupedSale = currentSale.filter((p) => (p?.id || p?._id) !== pid);
        dedupedSale.unshift(product);
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
