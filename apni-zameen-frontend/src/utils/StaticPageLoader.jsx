/**
 * StaticPageLoader - A utility to load static HTML pages directly
 * This improves performance by bypassing React rendering for simple static content
 */
import React from 'react';

// List of available static pages
const STATIC_PAGES = {
  AGENTS: 'agents.html',
  BUY: 'buy.html',
  COMMERCIAL: 'commercial.html',
  CONTACT: 'contact.html',
  LOGIN: 'login.html',
  MORTGAGE_CALCULATOR: 'mortgage-calculator.html',
  PG: 'pg.html',
  PLOT: 'plot.html',
  PROJECTS: 'projects.html',
  PROPERTY_TYPE: 'property-type.html',
  REGISTER: 'register.html',
  RENT: 'rent.html'
};

/**
 * Load a static HTML page in an iframe
 * @param {string} pageName - The name of the static page to load
 * @param {HTMLElement} container - The container element to load the page into
 * @returns {boolean} - True if page loaded successfully, false otherwise
 */
export const loadStaticPage = (pageName, container) => {
  if (!STATIC_PAGES[pageName]) {
    console.error(`Static page ${pageName} not found`);
    return false;
  }

  const iframe = document.createElement('iframe');
  iframe.src = `/static-pages/${STATIC_PAGES[pageName]}`;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  
  // Clear the container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  // Add the iframe to the container
  container.appendChild(iframe);
  return true;
};

/**
 * Create a React component to wrap a static page
 * @param {string} pageName - The name of the static page to load
 * @returns {function} - A React component function
 */
export const createStaticPageComponent = (pageName) => {
  return function StaticPageComponent() {
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        loadStaticPage(pageName, containerRef.current);
      }
    }, []);
    
    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }}></div>;
  };
};

export default {
  STATIC_PAGES,
  loadStaticPage,
  createStaticPageComponent
}; 