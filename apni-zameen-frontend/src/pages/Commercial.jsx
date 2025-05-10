import React from 'react';
import Layout from '../components/layout/Layout';
import PropertyListTemplate from '../components/PropertyListTemplate';

/**
 * Commercial page for commercial properties
 */
const Commercial = () => {
  return (
    <Layout>
      <PropertyListTemplate
        title="Commercial Properties"
        description="Explore commercial properties for your business needs"
        type="commercial"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </Layout>
  );
};

export default Commercial;