import React, { useState, useEffect } from 'react';
import { checkApiHealth, diagnoseApiConnection } from '../utils/apiHealthCheck';

/**
 * Component to check and display API connection status
 * @param {Object} props
 * @param {boolean} props.showDetails - Whether to show detailed status information
 * @param {number} props.checkInterval - Interval in milliseconds between connectivity checks
 */
const ConnectionStatus = ({ showDetails = false, checkInterval = 300000 }) => {
  const [status, setStatus] = useState({
    isConnected: true,
    message: 'Connected to server',
    details: null,
    lastChecked: new Date()
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownError, setHasShownError] = useState(false);
  const [consecutiveFailures, setConsecutiveFailures] = useState(0);
  
  // Check connection status periodically
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const health = await checkApiHealth();
        
        if (!health.isHealthy) {
          // Only show error popup after 3 consecutive failures
          // to avoid false positives from temporary network hiccups
          setConsecutiveFailures(prev => prev + 1);
          
          // Only show error popup if connection was previously good 
          // or if we have multiple consecutive failures and haven't shown an error yet
          const shouldShowError = (status.isConnected || 
            (consecutiveFailures >= 3 && !hasShownError));
          
          const details = await diagnoseApiConnection();
          setStatus({
            isConnected: false,
            message: 'Connection issues detected',
            details,
            lastChecked: new Date()
          });
          
          // Only auto-open the popup if conditions are met and it's the third or more consecutive failure
          if (shouldShowError && !hasShownError && consecutiveFailures >= 3) {
            setIsOpen(true);
            setHasShownError(true);
          }
        } else {
          // Reset error flag and counter when connection is restored
          if (!status.isConnected) {
            setHasShownError(false);
            setConsecutiveFailures(0);
          }
          
          setStatus({
            isConnected: true,
            message: 'Connected to server',
            details: null,
            lastChecked: new Date()
          });
          
          // Auto-close the popup when connection is restored
          setIsOpen(false);
        }
      } catch (error) {
        // Don't log connection errors to reduce console noise
        setStatus({
          isConnected: false,
          message: 'Failed to check connection',
          details: error.message,
          lastChecked: new Date()
        });
      }
    };
    
    // Check connection with a delay to not block initial page load
    const initialCheck = setTimeout(checkConnection, 10000);
    
    // Set up periodic checks
    const intervalId = setInterval(checkConnection, checkInterval);
    
    // Clean up on unmount
    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalId);
    };
  }, [checkInterval, status.isConnected, consecutiveFailures, hasShownError]);
  
  // Don't render anything if connected
  if (status.isConnected && !isOpen) {
    return null;
  }
  
  // Toggle status popup
  const toggleStatus = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {/* Status indicator button - only show when there's a problem */}
      {!status.isConnected && (
        <button
          onClick={toggleStatus}
          className="flex items-center justify-center w-8 h-8 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors bg-red-500 hover:bg-red-600"
          title={status.message}
        >
          <span className="sr-only">{status.message}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </button>
      )}
      
      {/* Status details popup */}
      {isOpen && (
        <div className="absolute bottom-10 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 w-64 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sm text-red-600 dark:text-red-400">
              {status.message}
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {status.details && (
            <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <p className="whitespace-pre-line">{status.details}</p>
            </div>
          )}
          
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={async () => {
                // Manually retry the connection
                const health = await checkApiHealth();
                if (health.isHealthy) {
                  setStatus({
                    isConnected: true,
                    message: 'Connected to server',
                    details: null,
                    lastChecked: new Date()
                  });
                  setConsecutiveFailures(0);
                  setIsOpen(false);
                } else {
                  const details = await diagnoseApiConnection();
                  setStatus({
                    ...status,
                    details,
                    lastChecked: new Date()
                  });
                }
              }}
              className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded hover:bg-gray-300"
            >
              Retry
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-2 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700"
            >
              Reload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus; 