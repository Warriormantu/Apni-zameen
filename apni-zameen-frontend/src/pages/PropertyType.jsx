import React from 'react';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * PropertyType page for browsing properties by type
 */
const PropertyType = () => {
  return (
    <PropertyListTemplate
      title="Browse Properties by Type"
      description="Explore properties across different categories"
      type="property-type"
      useStaticPage={true} // Set to false to use dynamic React rendering instead of static HTML
    />
  );
};

export default PropertyType; 