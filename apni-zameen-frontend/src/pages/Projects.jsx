import React from 'react';
import DirectoryTemplate from '../components/DirectoryTemplate';

/**
 * Projects directory page
 */
const Projects = () => {
  return (
    <DirectoryTemplate
      title="Browse Real Estate Projects"
      description="Discover new and upcoming residential and commercial projects"
      type="projects"
      useStaticPage={true} // Set to false to use dynamic React rendering instead of static HTML
    />
  );
};

export default Projects;