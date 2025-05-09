import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

/**
 * A template component for all property listing pages (Buy, Rent, Commercial, Plot, PG)
 * This consolidates similar functionality into a single component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.type - Property type (buy, rent, commercial, plot, pg)
 * @param {boolean} props.useStaticPage - Whether to use static HTML page
 */
const PropertyListTemplate = ({ 
  title, 
  description, 
  type, 
  useStaticPage = false 
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: type || 'all'
  });

  // If using static page, render with iframe approach
  if (useStaticPage) {
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        // Get the type in uppercase for StaticPageLoader
        const pageType = type.toUpperCase();
        
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

  // Otherwise use dynamic React rendering
  useEffect(() => {
    // Simulate fetching properties based on type and filters
    setIsLoading(true);
    
    // In a real implementation, this would be an API call
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockProperties = [
        { id: 1, title: 'Modern Apartment', price: 2500000, bedrooms: 3, bathrooms: 2, area: 1200, type: 'apartment', for: 'buy' },
        { id: 2, title: 'Luxury Villa', price: 9000000, bedrooms: 5, bathrooms: 4, area: 3500, type: 'villa', for: 'buy' },
        { id: 3, title: 'Studio Apartment', price: 15000, bedrooms: 1, bathrooms: 1, area: 500, type: 'apartment', for: 'rent' },
        { id: 4, title: 'Commercial Space', price: 7500000, bedrooms: 0, bathrooms: 2, area: 2000, type: 'commercial', for: 'commercial' },
        { id: 5, title: 'Plot in City Center', price: 5000000, bedrooms: 0, bathrooms: 0, area: 4000, type: 'plot', for: 'plot' },
        { id: 6, title: 'PG Accommodation', price: 8000, bedrooms: 1, bathrooms: 1, area: 300, type: 'pg', for: 'pg' },
      ];
      
      // Filter based on the page type
      const filteredProperties = mockProperties.filter(property => property.for === type);
      
      setProperties(filteredProperties);
      setIsLoading(false);
    }, 1000);
  }, [type, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <Link 
          to="/add-property" 
          className="btn btn-primary mt-4 md:mt-0"
        >
          Add Property
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Filter Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="priceMin"
                placeholder="Min"
                value={filters.priceMin}
                onChange={handleFilterChange}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm w-full"
              />
              <input
                type="number"
                name="priceMax"
                placeholder="Max"
                value={filters.priceMax}
                onChange={handleFilterChange}
                className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bedrooms</label>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm w-full"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bathrooms</label>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
              className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md shadow-sm w-full"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
          Apply Filters
        </button>
      </div>
      
      {/* Property listings */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map(property => (
              <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                <div className="h-48 bg-gray-300 dark:bg-gray-700">
                  {/* Property image would go here */}
                  <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Property Image
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{property.title}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">₹{property.price.toLocaleString()}</p>
                  <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                    {property.bedrooms > 0 && (
                      <span className="flex items-center mr-3">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M7 3a1 1 0 011-1h4a1 1 0 011 1v3h3a1 1 0 011 1v4a1 1 0 01-1 1h-1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3H3a1 1 0 01-1-1V7a1 1 0 011-1h3V3z"></path>
                        </svg>
                        {property.bedrooms} Beds
                      </span>
                    )}
                    {property.bathrooms > 0 && (
                      <span className="flex items-center mr-3">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-1 1v5a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1V8a1 1 0 00-1-1h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z"></path>
                        </svg>
                        {property.bathrooms} Baths
                      </span>
                    )}
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd"></path>
                      </svg>
                      {property.area} sq.ft.
                    </span>
                  </div>
                  <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded w-full">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 py-10 text-center text-gray-500 dark:text-gray-400">
              No properties found. Try adjusting your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyListTemplate; 