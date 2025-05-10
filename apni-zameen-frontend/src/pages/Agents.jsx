import React from 'react';
import Layout from '../components/layout/Layout';
import DirectoryTemplate from '../components/DirectoryTemplate';

/**
 * Agents directory page
 */
const Agents = () => {
  return (
    <Layout>
      <DirectoryTemplate
        title="Find Real Estate Agents"
        description="Connect with top real estate professionals across India"
        type="agents"
        useStaticPage={false} // Using dynamic React rendering instead of static HTML
      />
    </Layout>
  );
};

export default Agents; 