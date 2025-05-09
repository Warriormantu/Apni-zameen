import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Commercial page for commercial properties
 */
const Commercial = () => {
  return (
    <PageLayout
      pageTitle="Commercial Properties"
      pageDescription="Explore commercial properties for your business needs on Apni Zameen"
    >
      <PropertyListTemplate
        title="Commercial Properties"
        description="Explore commercial properties for your business needs"
        type="commercial"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </PageLayout>
  );
};

export default Commercial;