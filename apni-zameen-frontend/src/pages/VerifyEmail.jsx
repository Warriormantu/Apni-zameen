import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [status, setStatus] = useState({
    type: 'loading',
    message: 'Verifying your email...'
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setStatus({
          type: 'success',
          message: 'Email verified successfully!'
        });
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'Failed to verify email. Please try again or contact support.'
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Email Verification
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Please wait while we verify your email address.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {status.type === 'loading' && (
              <div className="flex justify-center">
                <svg
                  className="animate-spin h-10 w-10 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}

            {status.type === 'success' && (
              <div className="flex justify-center">
                <svg
                  className="h-10 w-10 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            {status.type === 'error' && (
              <div className="flex justify-center">
                <svg
                  className="h-10 w-10 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <div
              className={`mt-4 p-4 rounded-md ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : status.type === 'error'
                  ? 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
                  : 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}
            >
              {status.message}
            </div>

            {status.type === 'error' && (
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 