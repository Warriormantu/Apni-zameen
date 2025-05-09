import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { properties } from '../services/api';
import FallbackUI from '../components/common/FallbackUI';
import { handleNetworkError } from '../utils/errorHandler';

const PropertyList = () => {
  const [searchParams] = useSearchParams();
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    bedrooms: searchParams.get('bedrooms') || 'all',
    bathrooms: searchParams.get('bathrooms') || 'all',
    sortBy: searchParams.get('sortBy') || 'newest'
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // Convert filters to API parameters
        const params = {
          type: filters.type !== 'all' ? filters.type : undefined,
          price_min: filters.priceMin || undefined,
          price_max: filters.priceMax || undefined,
          bedrooms: filters.bedrooms !== 'all' ? filters.bedrooms : undefined,
          bathrooms: filters.bathrooms !== 'all' ? filters.bathrooms : undefined,
          sort: filters.sortBy || undefined
        };
        
        const data = await properties.getAll(params);
        
        if (data && Array.isArray(data.properties)) {
          setPropertyList(data.properties);
        } else {
          setPropertyList([]);
        }
        
        setError(null);
      } catch (err) {
        handleNetworkError(err, setError);
        setPropertyList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Fallback data for the UI when API fails but we still want to show something
  const fallbackProperties = [
    {
      id: 1,
      title: 'Luxury Apartment',
      location: 'Gurgaon, Haryana',
      price: 5000000,
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470'
    },
    {
      id: 2,
      title: 'Modern Office Space',
      location: 'Mumbai, Maharashtra',
      price: 12000000,
      area: 5000,
      type: 'commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469'
    },
    {
      id: 3,
      title: 'Family Home',
      location: 'Bangalore, Karnataka',
      price: 8500000,
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470'
    },
    {
      id: 4,
      title: 'Penthouse with View',
      location: 'Delhi, Delhi',
      price: 15000000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4000,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1470'
    }
  ];

  // Use the API data or fallback to hardcoded data if there's an error
  const displayProperties = propertyList.length > 0 ? propertyList : (error ? fallbackProperties : []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Browse Properties
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Find your perfect property from our extensive listings
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filters</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="plot">Plot</option>
                    <option value="pg">PG/Co-living</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price Range
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="priceMin"
                      placeholder="Min ₹"
                      value={filters.priceMin}
                      onChange={handleFilterChange}
                      className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <input
                      type="number"
                      name="priceMax"
                      placeholder="Max ₹"
                      value={filters.priceMax}
                      onChange={handleFilterChange}
                      className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bedrooms
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="all">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bathrooms
                  </label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={filters.bathrooms}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="all">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={filters.sortBy}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  >
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="area_large">Area: Largest first</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Property listings */}
          <div className="lg:col-span-3">
            <FallbackUI 
              loading={loading}
              error={error && displayProperties.length === 0 ? error : null}
              loadingMessage="Loading properties..."
            >
              <div className="space-y-6">
                {/* Results count and sort */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex justify-between items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {displayProperties.length} properties found
                  </span>
                </div>

                {/* Property grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayProperties.length > 0 ? (
                    displayProperties.map((property) => (
                      <div
                        key={property.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
                      >
                        <Link to={`/property/${property.id}`}>
                          <img
                            src={property.image || property.main_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                        <div className="p-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">
                            {property.location || `${property.city || ''}, ${property.state || ''}`}
                          </p>
                          <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
                            {typeof property.price === 'number' 
                              ? `₹${property.price.toLocaleString()}` 
                              : property.price}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            {property.bedrooms > 0 && (
                              <span className="flex items-center">
                                <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}
                              </span>
                            )}
                            {property.bathrooms > 0 && (
                              <span className="flex items-center">
                                <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
                              </span>
                            )}
                            {property.area && (
                              <span className="flex items-center">
                                <svg className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                </svg>
                                {property.area} {property.area_unit || 'sq ft'}
                              </span>
                            )}
                          </div>
                          <div className="mt-4">
                            <Link
                              to={`/property/${property.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 py-10 text-center text-gray-500 dark:text-gray-400">
                      No properties found. Try adjusting your filters.
                    </div>
                  )}
                </div>
              </div>
            </FallbackUI>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyList; 