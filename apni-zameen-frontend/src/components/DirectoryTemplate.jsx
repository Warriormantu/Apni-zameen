import React, { useState, useEffect } from 'react';

/**
 * A template component for directory listing pages (Agents, Projects)
 * This consolidates similar functionality into a single component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.type - Directory type ('agents' or 'projects')
 * @param {boolean} props.useStaticPage - Whether to use static HTML page
 */
const DirectoryTemplate = ({
  title,
  description,
  type,
  useStaticPage = false
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // If using static page, render with iframe approach
  if (useStaticPage) {
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        // Create an iframe that loads the static HTML
        const iframe = document.createElement('iframe');
        iframe.src = `/static-pages/${type}.html`;
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        
        // Clear the container and add the iframe
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(iframe);
      }
    }, [type]);
    
    return <div ref={containerRef} className="w-full min-h-screen"></div>;
  }

  // For dynamic React rendering
  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    
    // In a real implementation, this would be an API call
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockAgents = [
        { id: 1, name: 'Ravi Kumar', specialization: 'Residential', properties: 45, rating: 4.8, image: null },
        { id: 2, name: 'Priya Singh', specialization: 'Commercial', properties: 32, rating: 4.9, image: null },
        { id: 3, name: 'Amit Patel', specialization: 'Luxury Homes', properties: 28, rating: 4.7, image: null },
      ];
      
      const mockProjects = [
        { id: 1, name: 'Green Valley Township', developer: 'Prime Developers', units: 150, completion: '2024', image: null },
        { id: 2, name: 'Riverside Apartments', developer: 'Urban Builders', units: 80, completion: '2023', image: null },
        { id: 3, name: 'Commercial Plaza', developer: 'Metro Constructions', units: 45, completion: '2025', image: null },
      ];
      
      // Set items based on type
      if (type === 'agents') {
        setItems(mockAgents);
      } else if (type === 'projects') {
        setItems(mockProjects);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [type, filters]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      
      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm pl-10 pr-4 py-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Directory listings */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700">
                  {/* Image would go here */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {type === 'agents' ? 'Agent Profile Photo' : 'Project Image'}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                  
                  {type === 'agents' && (
                    <>
                      <p className="text-emerald-600 dark:text-emerald-400">{item.specialization}</p>
                      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                        <span className="flex items-center mr-3">
                          <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {item.rating}
                        </span>
                        <span>{item.properties} Properties</span>
                      </div>
                    </>
                  )}
                  
                  {type === 'projects' && (
                    <>
                      <p className="text-emerald-600 dark:text-emerald-400">{item.developer}</p>
                      <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                        <span className="flex items-center mr-3">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                          </svg>
                          {item.units} Units
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {item.completion}
                        </span>
                      </div>
                    </>
                  )}
                  
                  <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded w-full">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center text-gray-500 dark:text-gray-400">
              No results found. Try a different search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DirectoryTemplate; 