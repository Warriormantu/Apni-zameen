import React, { useState } from 'react';

/**
 * A debugging component that can be used to quickly identify CSS issues
 * This adds a button to toggle outlines on all elements to see their boundaries
 */
const DebugCSS = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleDebug = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      // Add debug styles
      const style = document.createElement('style');
      style.id = 'debug-css';
      style.innerHTML = `
        * {
          outline: 1px solid rgba(255, 0, 0, 0.2) !important;
          background-color: rgba(255, 0, 0, 0.02) !important;
        }
        
        *:hover {
          outline: 1px solid rgba(255, 0, 0, 0.6) !important;
          background-color: rgba(255, 0, 0, 0.1) !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      // Remove debug styles
      const debugStyle = document.getElementById('debug-css');
      if (debugStyle) {
        debugStyle.remove();
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleDebug}
        className={`p-2 text-xs font-bold rounded-full shadow-lg ${
          isActive 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        }`}
        title="Toggle CSS debug mode"
      >
        {isActive ? 'Debug: ON' : 'Debug CSS'}
      </button>
    </div>
  );
};

export default DebugCSS; 