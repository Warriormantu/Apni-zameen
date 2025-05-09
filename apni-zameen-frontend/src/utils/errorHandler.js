/**
 * Utility functions for error handling
 */

/**
 * Handles network errors and redirects to error page for severe issues
 * @param {Error} error - The error object to handle
 * @param {Function} setError - State setter for error message
 * @param {boolean} redirect - Whether to redirect to error page for severe errors
 * @returns {string} The error message
 */
export const handleNetworkError = (error, setError = null, redirect = false) => {
  console.error('Network error:', error);
  
  // Default error message
  let errorMessage = 'An unexpected error occurred. Please try again.';
  
  // Check if this is an API error with a user message
  if (error.userMessage) {
    errorMessage = error.userMessage;
  } 
  // Check if this is an axios error with a response
  else if (error.response) {
    const { status, data } = error.response;
    
    // Handle different status codes
    if (status === 401) {
      errorMessage = 'You need to be logged in to access this resource.';
    } else if (status === 403) {
      errorMessage = 'You do not have permission to access this resource.';
    } else if (status === 404) {
      errorMessage = 'The requested resource was not found.';
    } else if (status === 500) {
      errorMessage = 'Internal server error. Please try again later.';
      // For server errors, we might want to redirect to an error page
      if (redirect) {
        window.location.href = '/error';
        return errorMessage;
      }
    }
    
    // Use the server-provided message if available
    if (data && (data.message || data.error)) {
      errorMessage = data.message || data.error;
    }
  } 
  // Handle network errors (no response)
  else if (error.request) {
    errorMessage = 'Network error. Please check your connection and try again.';
  } 
  // Handle other errors
  else if (typeof error === 'string') {
    errorMessage = error;
  }

  // Set error state if provided
  if (setError && typeof setError === 'function') {
    setError(errorMessage);
  }
  
  return errorMessage;
};

/**
 * Creates a safe fetcher for SWR that handles errors
 * @param {Function} fetcher - The original fetcher function
 * @param {Function} onError - Error handler function
 * @returns {Function} Safe fetcher function
 */
export const createSafeFetcher = (fetcher, onError) => {
  return async (...args) => {
    try {
      return await fetcher(...args);
    } catch (error) {
      const errorMessage = handleNetworkError(error);
      if (onError) {
        onError(errorMessage);
      }
      throw error;
    }
  };
};

export default { handleNetworkError, createSafeFetcher }; 