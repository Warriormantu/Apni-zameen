import { useContext } from 'react';
import { useTheme as useThemeFromContext } from '../context/ThemeContext';

export const useTheme = () => {
  try {
    // Try to use context-based theme first
    return useThemeFromContext();
  } catch (error) {
    // Fallback to our standalone implementation if ThemeContext is not available
    return useFallbackTheme();
  }
};

// Standalone implementation that doesn't require context
const useFallbackTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
    window.location.reload(); // Reload to apply theme since we don't have reactive state here
  };

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return { 
    theme,
    isDarkMode: theme === 'dark',
    toggleTheme 
  };
};

export default useTheme; 