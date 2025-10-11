import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';
import { mockCollectionsData, getMockProductById } from '../api/mockData';

// In-memory cache stored outside the component lifecycle
const cache = new Map();

/**
 * Invalidates the cache. Can clear the entire cache or a specific entry.
 * @param {string | string[]} [urlOrUrls] - The specific URL or URLs to remove from the cache. If not provided, the entire cache is cleared.
 */
export const invalidateCache = (url) => {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
};

/**
 * A custom hook to fetch data from a single URL or multiple URLs with in-memory caching.
 * It manages loading, error, and data states.
 * @param {string | string[] | null} urlOrUrls The URL or array of URLs to fetch data from.
 * @returns {{data: any, loading: boolean, error: Error | null, errors: Error[], refetch: () => void}}
 */
export const useFetchnCache = (urlOrUrls) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const [forceRefetch, setForceRefetch] = useState(0);
  // Use a ref to track the current URL to prevent race conditions
  const requestRef = useRef(urlOrUrls);
  requestRef.current = urlOrUrls;

  useEffect(() => {
    const isArray = Array.isArray(urlOrUrls);
    if (!urlOrUrls || (isArray && urlOrUrls.length === 0)) {
      setData(null);
      setLoading(false);
      return;
    }

    // --- MOCK DATA HANDLING ---
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.warn('Using mock data. Set VITE_USE_MOCK_DATA=false in .env to use live data.');
      setLoading(true);
      setTimeout(() => { // Simulate network delay
        if (isArray) {
          // For multiple URLs, return the entire mock collection
          setData(mockCollectionsData);
        } else {
          // For a single URL (like a product page), find the ID and return a mock product
          const id = urlOrUrls.split('/').pop();
          setData(getMockProductById(id));
        }
        setLoading(false);
      }, 500);
      return; // Skip real data fetching
    }
    // --- END MOCK DATA HANDLING ---

    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setErrors([]);

      try {
        let resultData;
        if (isArray) {
          // Use Promise.allSettled to handle partial failures
          const settledResults = await Promise.allSettled(
            urlOrUrls.map(async (u) => {
              if (cache.has(u)) return { url: u, data: cache.get(u) };
              const response = await axiosInstance.get(u, { signal: abortController.signal });
              cache.set(u, response.data);
              return { url: u, data: response.data };
            })
          );

          const successfulData = {};
          const failedRequests = [];
          settledResults.forEach(result => {
            if (result.status === 'fulfilled') {
              successfulData[result.value.url] = result.value.data;
            } else {
              failedRequests.push(result.reason);
            }
          });
          resultData = successfulData;
          if (failedRequests.length > 0) setErrors(failedRequests);
        } else {
          // Handle single URL
          const singleUrl = urlOrUrls;
          if (cache.has(singleUrl)) {
            resultData = cache.get(singleUrl);
          } else {
            const response = await axiosInstance.get(singleUrl, { signal: abortController.signal });
            cache.set(singleUrl, response.data);
            resultData = response.data;
          }
        }

        if (JSON.stringify(urlOrUrls) === JSON.stringify(requestRef.current)) {
          setData(resultData);
        }
      } catch (err) {
        // This will now primarily catch errors from the single-URL path
        if (err.name !== 'CanceledError' && JSON.stringify(urlOrUrls) === JSON.stringify(requestRef.current)) {
          setError(err);
          setErrors([err]);
        }
      } finally {
        if (JSON.stringify(urlOrUrls) === JSON.stringify(requestRef.current)) {
          setLoading(false);
          if (errors.length > 0) setError(errors[0]);
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [JSON.stringify(urlOrUrls), forceRefetch]);

  const refetch = () => {
    if (Array.isArray(urlOrUrls)) {
      urlOrUrls.forEach(u => invalidateCache(u));
    } else if (urlOrUrls) {
      invalidateCache(urlOrUrls);
    }
    setForceRefetch(Date.now()); // Trigger a re-run of the effect
  };

  return { data, loading, error, errors, refetch };
};

export default useFetchnCache;