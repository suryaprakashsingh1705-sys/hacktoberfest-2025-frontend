import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import authSlice from './authSlice';
import collectionSlice from './CollectionSlice';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    auth: authSlice,
    collections: collectionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
