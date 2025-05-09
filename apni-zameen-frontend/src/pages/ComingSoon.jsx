import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Coming Soon
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          We're working on something exciting!
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Stay tuned</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              We're putting the finishing touches on this feature. Check back soon!
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expected launch: Q2 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon; 