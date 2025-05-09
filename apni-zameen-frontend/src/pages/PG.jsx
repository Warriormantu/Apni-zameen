import React from 'react';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * PG (Paying Guest) accommodations page
 */
const PG = () => {
  return (
    <PropertyListTemplate
      title="PG Accommodations"
      description="Find affordable and comfortable paying guest accommodations"
      type="pg"
      useStaticPage={true} // Set to false to use dynamic React rendering instead of static HTML
    />
  );
};

export default PG; 