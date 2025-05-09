import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import DirectoryTemplate from '../components/DirectoryTemplate';

/**
 * Agents directory page
 */
const Agents = () => {
  return (
    <PageLayout
      pageTitle="Find Real Estate Agents"
      pageDescription="Connect with top real estate professionals across India on Apni Zameen"
    >
      <DirectoryTemplate
        title="Find Real Estate Agents"
        description="Connect with top real estate professionals across India"
        type="agents"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </PageLayout>
  );
};

export default Agents; 