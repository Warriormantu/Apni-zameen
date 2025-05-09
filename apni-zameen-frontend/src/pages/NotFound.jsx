import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';

const NotFound = () => {
  return (
    <Layout>
      <PageTitle title="Page Not Found" />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-800 dark:text-white">Page Not Found</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/properties"
              className="px-6 py-3 border border-primary-600 text-primary-600 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-secondary-800 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound; 