import axios from 'axios';
import store from '../store';
import { logout, setToken } from '../store/authSlice';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  // ensure browser sends cookies (HttpOnly) to the API origin
  withCredentials: true,
});

// Response interceptor: keep existing debug behavior and add 401 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isCanceled =
      error?.code === 'ERR_CANCELED' ||
      error?.name === 'CanceledError' ||
      error?.name === 'AbortError' ||
      error?.message === 'canceled';

    if (isCanceled) {
      if (import.meta.env.DEV) {
        console.debug('Request was canceled/aborted:', error?.message || error);
      }
      return Promise.reject(error);
    }

    if (import.meta.env.DEV) {
      if (error.response) {
        console.error('API Error:', {
          status: error.response.status,
          url: error.config?.url,
          message: error.response.data?.message || error.message,
        });
      } else if (error.request) {
        console.error('Network Error: No response received from server');
      } else {
        console.error('Request Setup Error:', error.message);
      }
    }

    // If we get a 401 from the API, attempt a refresh once. If refresh fails, log the user out.
    try {
      const status = error?.response?.status;
      const originalConfig = error?.config;
      if (status === 401 && originalConfig && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          // Use plain axios to avoid interceptor loops. Rely on cookies (withCredentials).
          const refreshResp = await axios.post(`${API_BASE}/auth/refresh`, null, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          });

          const newToken = refreshResp?.data?.token;
          if (newToken) {
            // update in-memory token in redux (not persisted to localStorage)
            try {
              store.dispatch(setToken(newToken));
            } catch {
              // ignore dispatch errors
            }

            // attach new token to the failed request and retry
            originalConfig.headers = originalConfig.headers || {};
            originalConfig.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalConfig);
          }
          } catch {
            // refresh failed -> dispatch logout so app can clear user state
            try {
              store.dispatch(logout());
            } catch {
              // ignore
            }
            return Promise.reject(error);
          }
      }
    } catch {
      // swallow and continue to reject original error
    }

    return Promise.reject(error);
  }
);

// Request interceptor: attach Authorization header only for requests to our API origin
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = store?.getState?.().auth?.token;
    if (token) {
      // Resolve the request URL relative to API_BASE so absolute and relative urls are handled
      const resolved = new URL(config.url, API_BASE);
      const apiOrigin = new URL(API_BASE).origin;
      if (resolved.origin === apiOrigin) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore any URL parsing / store access errors
  }
  return config;
});

export default axiosInstance;
export { axiosInstance };

