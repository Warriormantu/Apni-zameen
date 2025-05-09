import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Buy page for properties available for purchase
 */
const Buy = () => {
  return (
    <PageLayout
      pageTitle="Properties for Sale"
      pageDescription="Explore properties available for purchase on Apni Zameen"
    >
      <PropertyListTemplate
        title="Properties for Sale"
        description="Find your dream home or investment property to buy"
        type="buy"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </PageLayout>
  );
};

export default Buy; 