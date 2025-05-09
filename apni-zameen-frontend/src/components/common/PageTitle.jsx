import React, { useEffect } from 'react';

/**
 * Component to dynamically set page title
 * @param {Object} props
 * @param {string} props.title - Title to set for the page
 * @param {string} props.suffix - Optional suffix to append to title
 */
const PageTitle = ({ title, suffix = "Apni Zameen" }) => {
  useEffect(() => {
    // Set the document title when the component mounts
    const formattedTitle = suffix ? `${title} | ${suffix}` : title;
    document.title = formattedTitle;
    
    // Restore the original title when component unmounts
    return () => {
      document.title = "Apni Zameen - Find Your Dream Property";
    };
  }, [title, suffix]);
  
  // This component doesn't render anything
  return null;
};

export default PageTitle; 