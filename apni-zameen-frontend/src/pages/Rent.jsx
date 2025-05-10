import React from 'react';
import Layout from '../components/layout/Layout';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Rent page for properties available for rental
 */
const Rent = () => {
  return (
    <Layout>
      <PropertyListTemplate
        title="Properties for Rent"
        description="Find the perfect home or apartment to rent"
        type="rent"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </Layout>
  );
};

export default Rent; 