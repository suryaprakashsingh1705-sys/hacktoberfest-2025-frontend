import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
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

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance };

