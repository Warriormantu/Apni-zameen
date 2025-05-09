import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Rent page for properties available for rental
 */
const Rent = () => {
  return (
    <PageLayout
      pageTitle="Properties for Rent"
      pageDescription="Explore rental properties on Apni Zameen"
    >
      <PropertyListTemplate
        title="Properties for Rent"
        description="Find the perfect home or apartment to rent"
        type="rent"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </PageLayout>
  );
};

export default Rent; 