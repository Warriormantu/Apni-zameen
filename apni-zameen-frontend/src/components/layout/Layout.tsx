import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useAuthState } from '../../hooks/useAuth';
import DebugCSS from '../common/DebugCSS';

interface LayoutProps {
  children: ReactNode;
}

interface User {
  name: string;
  avatar?: string;
}

const Layout = ({ children }: LayoutProps) => {
  // Try to use auth state, but provide fallback if not available
  let authState: { isAuthenticated: boolean; user: User | undefined } = { 
    isAuthenticated: false, 
    user: undefined 
  };
  
  try {
    const auth = useAuthState();
    authState = {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user as User
    };
  } catch (error) {
    console.error('Error using auth state:', error);
  }

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-secondary-900">
      <Header isLoggedIn={authState.isAuthenticated} user={authState.user} />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <Footer />
      {isDevelopment && <DebugCSS />}
    </div>
  );
};

export default Layout; 