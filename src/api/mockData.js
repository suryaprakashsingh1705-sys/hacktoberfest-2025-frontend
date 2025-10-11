import { API_ENDPOINTS } from '../routes/apiEndpoints';

// A helper function to create a sample product structure
const createMockProduct = (id, name, category, price) => ({
  _id: `mock_${id}`,
  name: `${name} (Mock)`,
  category: category,
  price: price,
  images: ['https://via.placeholder.com/400?text=Mock+Product'],
  rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
  reviewsCount: Math.floor(Math.random() * 100),
  description: 'This is a mock product description. It provides details about the mock item, its features, and benefits.',
});
// Mock data for each collection, using the URLs from API_ENDPOINTS as keys
export const mockCollectionsData = {
  [API_ENDPOINTS.COLLECTIONS['BEST SELLERS']]: {
    products: [
      createMockProduct(1, 'Whey Protein', 'PROTEIN', 49.99),
      createMockProduct(2, 'Ignition Pre-Workout', 'PRE-WORKOUT', 39.99),
      createMockProduct(3, 'Micronized Creatine', 'PERFORMANCE', 29.99),
      createMockProduct(4, 'Vegan Protein Blend', 'PROTEIN', 54.99),
      createMockProduct(5, 'Zero-Sugar Energy Drink', 'ENERGY', 24.99),
      createMockProduct(6, 'Daily Multivitamin', 'WELLNESS', 19.99),
      createMockProduct(7, 'Daily Multivitamin', 'WELLNESS', 19.99),

    ],
  },
  [API_ENDPOINTS.COLLECTIONS['PROTEIN POWDER']]: {
    products: [
      createMockProduct(1, 'Whey Protein', 'PROTEIN', 49.99),
    ],
  },
  [API_ENDPOINTS.COLLECTIONS['WEIGHT MANAGEMENT']]: {
    // This collection is intentionally left empty to test the "No products found" state
    products: [],
  },
  [API_ENDPOINTS.COLLECTIONS['HEALTH WELLNESS']]: {
    products: [
      createMockProduct(6, 'Daily Multivitamin', 'WELLNESS', 19.99),
      createMockProduct(9, 'Omega-3 Fish Oil', 'WELLNESS', 22.99),
      createMockProduct(10, 'Joint Support Complex', 'WELLNESS', 34.99),
    ],
  },
};

// Mock data for a single product fetch
export const getMockProductById = (id) => ({
  product: createMockProduct(id, 'Single Product', 'GENERAL', 44.99),
});