import api from './api';

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/user/password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
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
      console.error('Error uploading avatar:', error);
      throw error;
    }
  },

  getSavedProperties: async () => {
    try {
      const response = await api.get('/user/saved-properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved properties:', error);
      throw error;
    }
  },

  saveProperty: async (propertyId) => {
    try {
      const response = await api.post('/user/saved-properties', { propertyId });
      return response.data;
    } catch (error) {
      console.error('Error saving property:', error);
      throw error;
    }
  },

  unsaveProperty: async (propertyId) => {
    try {
      const response = await api.delete(`/user/saved-properties/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing saved property:', error);
      throw error;
    }
  },

  getUserProperties: async () => {
    try {
      const response = await api.get('/user/properties');
      return response.data;
    } catch (error) {
      console.error('Error fetching user properties:', error);
      throw error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await api.get('/user/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/user/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      const response = await api.put('/user/notifications/read-all');
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/user/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  clearAllNotifications: async () => {
    try {
      const response = await api.delete('/user/notifications');
      return response.data;
    } catch (error) {
      console.error('Error clearing notifications:', error);
      throw error;
    }
  }
};

export default userService; 