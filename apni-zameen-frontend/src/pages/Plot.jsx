import React from 'react';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Plot page for land and plots
 */
const Plot = () => {
  return (
    <PropertyListTemplate
      title="Plots & Land"
      description="Discover plots and land for your construction needs"
      type="plot"
      useStaticPage={true} // Set to false to use dynamic React rendering instead of static HTML
    />
  );
};

export default Plot; 