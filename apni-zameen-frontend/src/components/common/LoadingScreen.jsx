import React from 'react';

/**
 * Component to display a loading screen while content is loading
 * @param {Object} props
 * @param {boolean} props.visible - Whether the loading screen should be visible
 * @param {string} props.message - Optional message to display
 */
const LoadingScreen = ({ visible = false, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 