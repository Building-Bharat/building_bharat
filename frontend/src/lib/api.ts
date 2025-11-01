import axios from 'axios';

const detectApiBase = () => {
  if (typeof window === 'undefined') return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  const { protocol, hostname } = window.location;
  const port = '5000';
  return `${protocol}//${hostname}:${port}/api/v1`;
};

const API_BASE_URL = detectApiBase();

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
  createOrder: async (courseId: string, userId: string, couponData?: any) => {
    try {
      const requestBody: any = {
        courseId,
        userId,
      };

      // Add coupon data if provided
      if (couponData) {
        requestBody.originalPrice = couponData.originalPrice;
        requestBody.finalPrice = couponData.finalPrice;
        requestBody.coupon = {
          code: couponData.code,
          discountAmount: couponData.discountAmount,
          discountType: couponData.discountType
        };
      }

      const response = await api.post('/orders', requestBody);
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
  verifyPayment: async (paymentData: any) => {
    try {
      const response = await api.post(`/orders/verify-payment`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  },
  
  // Get user's purchased courses
  getPurchasedCourses: async (userId: string) => {
    try {
      const response = await api.get(`/user/${userId}/purchased-courses`);
      return response.data;
    } catch (error) {
      console.error('Error fetching purchased courses:', error);
      throw error;
    }
  },
};

// Course API functions
export const courseAPI = {
  // Get course details
  getCourse: async (courseId: string) => {
    try {
      // align to singular route if backend expects /course/:id
      const response = await api.get(`/course/${courseId}`);
      // normalize envelope or plain object
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Get all courses
  getCourses: async () => {
    try {
      const response = await api.get(`/course`);
      const payload = response.data?.data || response.data;
      return Array.isArray(payload) ? payload : payload?.courses || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  // Try to get course by slug (backend should provide this; otherwise fallback client-side)
  getCourseBySlug: async (slug: string) => {
    // No slug endpoint in backend: list all and match locally
    const list = await api.get(`/course`); // backend routes expose GET /api/v1/course
    const courses = list.data?.data || list.data || [];
    const normalizeSlug = (s: string) =>
      String(s || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    const target = normalizeSlug(slug);
    const match = courses.find((c: any) => {
      const s1 = normalizeSlug(c?.slug || '');
      const s2 = normalizeSlug(c?.name || c?.title || '');
      return s1 === target || s2 === target;
    });
    if (!match) throw new Error('Course not found by slug');
    return match;
  },
};

// User API
export const userAPI = {
  updateProfile: async (userId: string, profileData: {
    username?: string;
    whatsappNumber?: string;
    state?: string;
    collegeName?: string;
    department?: string;
    collegePassout?: string;
    description?: string;
  }) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await api.put(`/user/${userId}/createprofile`, profileData, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  },

  getProfile: async (userId: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await api.get(`/user/${userId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return response.data;
  },

  checkProfileCompletion: async (userId: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const response = await api.get(`/user/${userId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      const user = response.data?.data || response.data;
      
      // Check if essential profile fields are completed
      const requiredFields = ['username', 'whatsappNumber', 'state', 'collegeName', 'department', 'collegePassout'];
      const isCompleted = requiredFields.every(field => user[field] && user[field].toString().trim() !== '');
      
      return {
        isCompleted,
        user
      };
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return { isCompleted: false, user: null };
    }
  },
};

export default api;

