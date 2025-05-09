import React from 'react';
import { useAuthState } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import Header from './Header';
import Footer from './Footer';
import DebugCSS from '../common/DebugCSS';

/**
 * Unified page layout component that ensures consistent styling across all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.pageTitle - Title of the page (for SEO and browser tab)
 * @param {string} props.pageDescription - Meta description for SEO
 * @param {boolean} props.fullWidth - Whether the page should use full width (no max-width constraint)
 * @param {boolean} props.noPadding - Remove padding from the main content area
 */
const PageLayout = ({ 
  children, 
  pageTitle = 'Apni Zameen', 
  pageDescription = 'Find your perfect property on Apni Zameen - India\'s trusted real estate platform',
  fullWidth = false,
  noPadding = false
}) => {
  // Try to use auth state, but provide fallback if not available
  let authState = { 
    isAuthenticated: false, 
    user: undefined 
  };
  
  try {
    const auth = useAuthState();
    authState = {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user
    };
  } catch (error) {
    console.error('Error using auth state:', error);
  }

  // Get theme information
  const { isDarkMode } = useTheme();

  // Update document title and meta description
  React.useEffect(() => {
    // Update document title
    document.title = pageTitle ? `${pageTitle} | Apni Zameen` : 'Apni Zameen';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.setAttribute('name', 'description');
      newMetaDescription.setAttribute('content', pageDescription);
      document.head.appendChild(newMetaDescription);
    }
  }, [pageTitle, pageDescription]);

  // Check if we're in development mode for debug tools
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header isLoggedIn={authState.isAuthenticated} user={authState.user} />
      <main className={`flex-grow bg-gray-50 dark:bg-secondary-900 ${noPadding ? '' : 'py-6'}`}>
        <div className={`${fullWidth ? 'w-full' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
          {children}
        </div>
      </main>
      <Footer />
      {isDevelopment && <DebugCSS />}
    </div>
  );
};

export default PageLayout; 