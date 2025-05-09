import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Export a hook to get the authentication state
export const useAuthState = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    return {
      isAuthenticated: false,
      user: null,
      loading: false
    };
  }
  
  return {
    isAuthenticated: context.isAuthenticated,
    user: context.user,
    loading: context.loading
  };
};

// Export a hook to get authentication actions
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth; 