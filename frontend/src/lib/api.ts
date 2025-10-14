import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Order API functions
export const orderAPI = {
  // Create order for course purchase
  createOrder: async (courseId: string, userId: string) => {
    try {
      const response = await api.post('/orders', {
        courseId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order details
  getOrder: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Verify payment
  verifyPayment: async (orderId: string, paymentData: any) => {
    try {
      const response = await api.post(`/transactions/verify`, {
        orderId,
        paymentData,
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
};

// Course API functions
export const courseAPI = {
  // Get course details
  getCourse: async (courseId: string) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },
};

export default api;

