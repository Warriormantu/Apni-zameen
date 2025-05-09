import api from './api';

export const propertyService = {
  getAllProperties: async (filters = {}) => {
    try {
      const response = await api.get('/properties', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },

  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with id ${id}:`, error);
      throw error;
    }
  },

  searchProperties: async (searchParams) => {
    try {
      const response = await api.get('/properties/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  },

  createProperty: async (propertyData) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property with id ${id}:`, error);
      throw error;
    }
  },

  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property with id ${id}:`, error);
      throw error;
    }
  },

  uploadPropertyImages: async (id, images) => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      const response = await api.post(`/properties/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error uploading images for property ${id}:`, error);
      throw error;
    }
  }
};

export default propertyService; 