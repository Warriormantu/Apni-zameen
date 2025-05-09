import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FallbackUI component for handling loading and error states
 * 
 * @param {Object} props Component properties
 * @param {boolean} props.loading - Whether content is loading
 * @param {string|null} props.error - Error message, if any
 * @param {React.ReactNode} props.children - Content to display when not loading or errored
 * @param {boolean} props.fullPage - Whether to display as a full page (default: false)
 * @param {string} props.loadingMessage - Custom loading message (default: "Loading content...")
 * @param {boolean} props.retry - Whether to show retry button (default: true)
 * @param {Function} props.onRetry - Function to call on retry button click
 */
const FallbackUI = ({
  loading = false,
  error = null,
  children,
  fullPage = false,
  loadingMessage = "Loading content...",
  retry = true,
  onRetry = () => window.location.reload()
}) => {
  // Loading state
  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center p-6 ${fullPage ? 'min-h-screen' : 'py-12'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-gray-600">{loadingMessage}</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`p-6 ${fullPage ? 'min-h-screen flex items-center justify-center' : ''}`}>
        <div className="bg-red-50 p-6 rounded-lg max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-red-700 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-4">{error}</p>
          {retry && (
            <div className="flex space-x-4">
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Go Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Normal content
  return children;
};

export default FallbackUI; 