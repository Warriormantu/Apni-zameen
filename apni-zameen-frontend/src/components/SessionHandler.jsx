import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Component to handle authentication errors and session status
 * Shows a toast notification when there are auth errors or query parameters
 * indicating session issues
 */
const SessionHandler = () => {
  const { authError, clearAuthError } = useAuth();
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for session_expired or similar URL parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('session_expired')) {
      setMessage('Your session has expired. Please log in again.');
      setVisible(true);
      
      // Clean up the URL by removing the query parameter
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // Handle auth errors from context
  useEffect(() => {
    if (authError) {
      setMessage(authError);
      setVisible(true);
    }
  }, [authError]);

  // Auto-hide the message after a delay
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        clearAuthError();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, clearAuthError]);

  const handleClose = () => {
    setVisible(false);
    clearAuthError();
  };

  if (!visible) return null;

  return (
    <div className="fixed z-50 top-5 right-5 max-w-sm">
      <div className="bg-red-50 p-4 rounded-lg shadow-lg border border-red-200 flex items-start">
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="text-red-500 hover:text-red-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SessionHandler; 