import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

/**
 * Checks the health of the API and reports connectivity issues
 * @returns {Promise<{isHealthy: boolean, message: string}>} Status of the API
 */
export const checkApiHealth = async () => {
  try {
    // Try to ping the API using the properties endpoint instead of a dedicated health endpoint
    const response = await axios.get(`${API_BASE_URL}/properties/featured`, { 
      timeout: 5000, // Increased timeout to reduce connection aborts
      headers: { 'Accept': 'application/json' },
      params: { limit: 1 } // Request just one property to minimize data transfer
    });
    
    if (response.status === 200) {
      return {
        isHealthy: true,
        message: 'API is connected and healthy'
      };
    } else {
      return {
        isHealthy: false,
        message: `API returned unexpected status: ${response.status}`
      };
    }
  } catch (error) {
    // Don't log errors for connection aborts to reduce console noise
    if (error.code !== 'ECONNABORTED') {
      console.error('API health check failed:', error);
    }
    
    let message = 'Unable to connect to the API. Please check your connection.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      message = `API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      if (error.code === 'ECONNABORTED') {
        message = 'API request timed out. The server may be under heavy load.';
      } else {
        message = 'API is not responding. The server may be down.';
      }
    }
    
    return {
      isHealthy: false,
      message
    };
  }
};

/**
 * Diagnoses API connection issues and provides helpful suggestions
 * @returns {Promise<string|null>} Diagnostic message or null if no issues
 */
export const diagnoseApiConnection = async () => {
  try {
    const health = await checkApiHealth();
    
    if (!health.isHealthy) {
      // Check if it's a CORS issue
      try {
        // Try a simple HEAD request to see if the domain is reachable
        await axios.head(API_BASE_URL.split('/api')[0] || window.location.origin, { 
          timeout: 3000 
        });
        
        // If we reach here, the domain is reachable but API is not
        return `We're having trouble connecting to our servers. This might be due to:
          1. The API server might be down
          2. Your internet connection is working but cannot reach our API
          3. There might be a configuration issue with the API path`;
      } catch (error) {
        // Domain is not reachable
        return `We can't reach our servers. This might be due to:
          1. Your internet connection may be down
          2. The server domain is not accessible from your network
          3. There might be a DNS issue`;
      }
    }
    
    return null; // No issues
  } catch (error) {
    return 'Unable to diagnose connection issues. Please check your network settings.';
  }
};

export default { checkApiHealth, diagnoseApiConnection }; 