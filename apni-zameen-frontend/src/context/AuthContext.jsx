import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as authApi, user as userApi } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial check
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
        
        if (isOffline) {
          // If offline, allow cached authentication to persist
          // but mark it as potentially stale
          const cachedUser = JSON.parse(localStorage.getItem('user_cache') || 'null');
          if (cachedUser) {
            setUser(cachedUser);
            setIsAuthenticated(true);
            setAuthError('Working offline with cached data');
          } else {
            // No cached user data
            localStorage.removeItem('token');
            setAuthError('No network connection. Please connect to the internet and try again.');
          }
        } else {
          // Online but authentication failed
          localStorage.removeItem('token');
          localStorage.removeItem('user_cache');
          setAuthError('Your session has expired. Please log in again.');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isOffline]);

  const fetchUserProfile = async () => {
    try {
      const profile = await userApi.getProfile();
      // Cache user data for offline access
      localStorage.setItem('user_cache', JSON.stringify(profile));
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    if (isOffline) {
      setAuthError('Cannot log in while offline. Please check your internet connection.');
      throw new Error('Cannot log in while offline');
    }

    try {
      setLoading(true);
      setAuthError(null);
      
      const response = await authApi.login(email, password);
      
      if (!response || !response.token) {
        throw new Error('Invalid response from server');
      }
      
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      
      // Cache user data
      localStorage.setItem('user_cache', JSON.stringify(response.user));
      
      // Set user data
      setUser(response.user);
      setIsAuthenticated(true);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || 'Invalid credentials';
        setAuthError(message);
      } else if (error.request) {
        // No response received
        setAuthError('Server is not responding. Please try again later.');
      } else {
        // Request setup error
        setAuthError(typeof error === 'string' ? error : 'Failed to log in. Please check your credentials.');
      }
      
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
      
      // Cache user data
      localStorage.setItem('user_cache', JSON.stringify(response.user));
      
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
    // Remove token and cache from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_cache');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const updateUser = async (userData) => {
    try {
      if (isOffline) {
        setAuthError('Cannot update profile while offline');
        throw new Error('Cannot update profile while offline');
      }
      
      // Update user profile in the backend
      const updatedData = await userApi.updateProfile(userData);
      
      // Update cached user data
      const cachedUser = JSON.parse(localStorage.getItem('user_cache') || '{}');
      localStorage.setItem('user_cache', JSON.stringify({...cachedUser, ...updatedData}));
      
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
        isOffline,
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