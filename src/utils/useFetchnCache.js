import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../api/axiosInstance';

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
 * @returns {{data: any, loading: boolean, error: Error | null, refetch: () => void}}
 */
export const useFetchnCache = (urlOrUrls) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let resultData;
        if (isArray) {
          // Handle multiple URLs
          const results = await Promise.all(
            urlOrUrls.map(async (u) => {
              if (cache.has(u)) return { [u]: cache.get(u) };
              const response = await axiosInstance.get(u, { signal: abortController.signal });
              cache.set(u, response.data);
              return { [u]: response.data };
            })
          );
          resultData = results.reduce((acc, current) => ({ ...acc, ...current }), {});
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
        if (err.name !== 'CanceledError' && JSON.stringify(urlOrUrls) === JSON.stringify(requestRef.current)) {
          setError(err);
        }
      } finally {
        if (JSON.stringify(urlOrUrls) === JSON.stringify(requestRef.current)) {
          setLoading(false);
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

  return { data, loading, error, refetch };
};

export default useFetchnCache;