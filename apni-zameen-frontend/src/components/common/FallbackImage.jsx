import React, { useState, useEffect } from 'react';

/**
 * Component for rendering images with fallback and loading states
 * @param {Object} props
 * @param {string} props.src - Primary image source
 * @param {string} props.alt - Image alt text
 * @param {string} props.fallbackSrc - Fallback image source
 * @param {string} props.className - Additional classes
 * @param {boolean} props.lazy - Enable lazy loading
 */
const FallbackImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/assets/images/fallback-property.jpg',
  className = '',
  lazy = true,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);
  
  useEffect(() => {
    // Reset states when src changes
    setError(false);
    setLoading(true);
    setImageSrc(src);
  }, [src]);

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
    setError(true);
    setImageSrc(fallbackSrc);
    setLoading(false);
  };
  
  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        loading={lazy ? "lazy" : "eager"}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
        {...rest}
      />
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default FallbackImage; 