import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi, user as userApi } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Fetch user profile if token exists
        const userData = await fetchUserProfile();
        setUser(userData);
        setIsAuthenticated(true);
        setAuthError(null);
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        setAuthError('Your session has expired. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchUserProfile = async () => {
    try {
      return await userApi.getProfile();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const response = await authApi.login(email, password);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(typeof error === 'string' ? error : 'Failed to log in. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);
      
      const response = await authApi.register(userData);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(typeof error === 'string' ? error : 'Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const updateUser = async (userData) => {
    try {
      // Update user profile in the backend
      const updatedData = await userApi.updateProfile(userData);
      
      // Update local state with the response
      setUser(prevUser => prevUser ? { ...prevUser, ...updatedData } : null);
      return updatedData;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  // Check for token expiration or removal
  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (isAuthenticated && !token) {
        // Token was removed externally
        setUser(null);
        setIsAuthenticated(false);
        setAuthError('Your session has ended. Please log in again.');
      }
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(checkTokenInterval);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        loading, 
        authError,
        login, 
        register, 
        logout, 
        updateUser,
        clearAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 