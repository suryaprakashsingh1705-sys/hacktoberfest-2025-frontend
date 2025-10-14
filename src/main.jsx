import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import { setUserFromStorage } from './store/authSlice';
import './index.css';

// Create a root container for React 18+
const root = createRoot(document.getElementById('root'));

// Rehydrate auth state from localStorage (if present)
try {
  const raw = localStorage.getItem('auth');
  if (raw) {
    const parsed = JSON.parse(raw);
    if (parsed && parsed.token) {
      store.dispatch(setUserFromStorage(parsed));
    }
  }
} catch {
  // ignore
}

// Render the app inside StrictMode with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
