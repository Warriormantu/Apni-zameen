import React from 'react';
import PropTypes from 'prop-types';

const PageHeroTemplate = ({ 
  title, 
  description, 
  primaryButtonText, 
  primaryButtonLink, 
  secondaryButtonText, 
  secondaryButtonLink 
}) => {
  return (
    <div className="relative">
      {/* Hero section with gradient background */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white opacity-90">
            {description}
          </p>
          
          {/* Action buttons */}
          {(primaryButtonText || secondaryButtonText) && (
            <div className="mt-10 flex justify-center gap-x-6">
              {primaryButtonText && primaryButtonLink && (
                <a
                  href={primaryButtonLink}
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-emerald-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {primaryButtonText}
                </a>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <a
                  href={secondaryButtonLink}
                  className="rounded-md bg-emerald-700 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {secondaryButtonText}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

PageHeroTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  primaryButtonText: PropTypes.string,
  primaryButtonLink: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonLink: PropTypes.string
};

export default PageHeroTemplate; 