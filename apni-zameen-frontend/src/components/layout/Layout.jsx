import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useAuth } from '../../context/AuthContext';
import DebugCSS from '../common/DebugCSS';

/**
 * Main layout component for consistent page structure
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {boolean} props.hideNav - Option to hide navigation
 * @param {boolean} props.hideFooter - Option to hide footer
 */
const Layout = ({ 
  children, 
  hideNav = false,
  hideFooter = false
}) => {
  // Use auth context
  let authState = { isAuthenticated: false, user: null };
  
  try {
    const auth = useAuth();
    authState = {
      isAuthenticated: auth?.isAuthenticated || false,
      user: auth?.user || null
    };
  } catch (error) {
    console.error('Error using auth context:', error);
  }

  // Check if we're in development mode
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      {!hideNav && <Navbar />}
      
      <main className="flex-grow w-full">
        {children}
      </main>
      
      {!hideFooter && <Footer />}
      {isDevelopment && <DebugCSS />}
    </div>
  );
};

export default Layout; 