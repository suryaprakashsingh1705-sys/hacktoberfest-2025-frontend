/**
 * @file Centralized API endpoint constants.
 * Using a centralized file for endpoints reduces typos and makes maintenance easier.
 */

export const API_ENDPOINTS = {
  // Product Endpoints
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id) => `/api/products/${id}`,

  // Collection Endpoints
  COLLECTIONS: {
    BEST_SELLERS: '/api/collections/best-sellers',
    PROTEIN_POWDER: '/api/collections/protein-powder',
    WEIGHT_MANAGEMENT: '/api/collections/weight-management',
    HEALTH_WELLNESS: '/api/collections/health-wellness-supplements',
  },

  // You can add other endpoints here as the app grows
  // e.g., AUTH: { LOGIN: '/api/auth/login', REGISTER: '/api/auth/register' }
};