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

export function addRecentlyViewed(product) {
  if (!product) return;
  try {
    const current = getRecentlyViewed();
    // Remove any existing occurrence
    const deduped = current.filter((p) => p.id !== product.id);
    // Prepend the new product and cap at 10
    deduped.unshift(product);
    const trimmed = deduped.slice(0, 10);
    localStorage.setItem('recently_viewed', JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export default { getRecentlyViewed, addRecentlyViewed };
