import React from 'react';

/**
 * Skeleton loader for property cards when they're loading
 */
const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content placeholders */}
      <div className="p-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        
        {/* Location */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
        
        {/* Price */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        
        {/* Property features */}
        <div className="flex justify-between mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        
        {/* Button placeholder */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton; 