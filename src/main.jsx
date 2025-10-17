import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { loginSuccess, logout } from './store/authSlice';
import { axiosInstance } from './api';
import './index.css';

// Create a root container for React 18+
const root = createRoot(document.getElementById('root'));

// Validate session on startup by asking the backend for the current user.
// This relies on the backend setting an HttpOnly, Secure cookie on login.
(async function validateSession() {
  try {
    const resp = await axiosInstance.get('/auth/me');
    if (resp?.data?.user) {
      // Backend may not return a token (cookie-based). If it does, include it.
      const payload = { user: resp.data.user, token: resp.data.token || null };
      store.dispatch(loginSuccess(payload));
    } else {
      store.dispatch(logout());
    }
  } catch {
    // If 401 or network error occurs, ensure logged out state.
    try {
      store.dispatch(logout());
    } catch {
      // ignore
    }
  }
})();

// Render the app inside StrictMode with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
