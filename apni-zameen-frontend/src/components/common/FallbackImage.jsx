import React, { useState } from 'react';

/**
 * Component for rendering images with fallback
 * @param {Object} props
 * @param {string} props.src - Primary image source
 * @param {string} props.alt - Image alt text
 * @param {string} props.fallbackSrc - Fallback image source
 * @param {string} props.className - Additional classes
 */
const FallbackImage = ({ 
  src, 
  alt, 
  fallbackSrc = '/assets/images/fallback-property.jpg',
  className = '',
  ...rest
}) => {
  const [error, setError] = useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={handleError}
      className={className}
      {...rest}
    />
  );
};

export default FallbackImage; 