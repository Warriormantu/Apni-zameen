import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => {
    // Successful response handling
    return response;
  },
  (error) => {
    // Error handling
    const { response } = error;
    
    // Log the error for debugging
    console.error('API Error:', error);
    
    if (response) {
      // The server responded with a status code outside of 2xx range
      if (response.status === 401) {
        // Handle unauthorized access (e.g., token expired)
        localStorage.removeItem('token');
        // Redirect to login if needed
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?session_expired=true';
        }
      }
      
      // Create a more useful error message
      const message = response.data?.message || response.data?.error || 'An unexpected error occurred';
      error.userMessage = message;
    } else if (error.request) {
      // The request was made but no response was received
      error.userMessage = 'Network error. Please check your connection and try again.';
    } else {
      // Something happened in setting up the request
      error.userMessage = 'Failed to make request. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Login failed. Please check your credentials and try again.';
    }
  },
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Registration failed. Please try again.';
    }
  },
};

// Property API
export const properties = {
  getAll: async (filters = {}) => {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return { properties: [] }; // Return empty array if API fails
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error.userMessage || `Failed to load property details (ID: ${id})`;
    }
  },
  search: async (query, filters = {}) => {
    try {
      const response = await api.get('/properties/search', { 
        params: { q: query, ...filters } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching properties:', error);
      return { properties: [] };
    }
  },
  getFeatured: async (limit = 6) => {
    try {
      const response = await api.get('/properties/featured', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      throw error.userMessage || 'Failed to load featured properties';
    }
  },
  getByCity: async (city, params = {}) => {
    try {
      const response = await api.get(`/properties/city/${city}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching properties by city ${city}:`, error);
      return { properties: [] };
    }
  },
  getTrendingCities: async (limit = 6) => {
    try {
      const response = await api.get('/properties/trending-cities', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending cities:', error);
      return [];
    }
  },
  getSimilar: async (propertyId, limit = 4) => {
    try {
      const response = await api.get(`/properties/${propertyId}/similar`, { params: { limit } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching similar properties for ${propertyId}:`, error);
      return [];
    }
  },
  create: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to create property. Please try again.';
    }
  },
  update: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to update property. Please try again.';
    }
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to delete property. Please try again.';
    }
  },
  getSavedProperties: async () => {
    try {
      const response = await api.get('/user/saved-properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved properties:', error);
      return [];
    }
  },
  saveProperty: async (propertyId) => {
    try {
      const response = await api.post('/user/saved-properties', { property_id: propertyId });
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to save property. Please try again.';
    }
  },
  unsaveProperty: async (propertyId) => {
    try {
      const response = await api.delete(`/user/saved-properties/${propertyId}`);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to remove property from saved list. Please try again.';
    }
  },
};

// User API
export const user = {
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to load user profile. Please try again.';
    }
  },
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/user/profile', profileData);
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to update profile. Please try again.';
    }
  },
  uploadAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to upload avatar. Please try again.';
    }
  },
  updatePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/user/password', { 
        current_password: currentPassword, 
        new_password: newPassword 
      });
      return response.data;
    } catch (error) {
      throw error.userMessage || 'Failed to update password. Please try again.';
    }
  },
};

// Export API base URL for other components
export { API_BASE_URL } from '../config/apiConfig';

export default api; 