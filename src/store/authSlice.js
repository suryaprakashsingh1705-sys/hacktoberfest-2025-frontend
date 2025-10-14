import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// helper to persist
const persistAuth = (state) => {
  try {
    const payload = {
      user: state.user,
      token: state.token,
    };
    localStorage.setItem('auth', JSON.stringify(payload));
  } catch  {
    // ignore storage errors
  }
};

const clearPersist = () => {
  try {
    localStorage.removeItem('auth');
  } catch {
    // ignore
  }
};

// Auth slice implementation with persistence helpers
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      persistAuth(state);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      clearPersist();
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      persistAuth(state);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Rehydrate auth state from storage
    setUserFromStorage: (state, action) => {
      const payload = action.payload;
      if (payload && payload.token) {
        state.user = payload.user || null;
        state.token = payload.token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
  setLoading,
  setUserFromStorage,
} = authSlice.actions;

export default authSlice.reducer;