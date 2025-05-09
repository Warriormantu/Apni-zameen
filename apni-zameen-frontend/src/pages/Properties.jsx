import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock properties data - in a real app, this would come from an API
  const properties = [
    {
      id: 1,
      title: 'Modern Apartment in Downtown',
      price: '$450,000',
      location: '123 Main St, Downtown, City',
      status: 'Active',
      views: 234,
      inquiries: 12,
      listedDate: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
    },
    {
      id: 2,
      title: 'Luxury Villa with Pool',
      price: '$1,200,000',
      location: '456 Park Ave, Uptown, City',
      status: 'Pending',
      views: 567,
      inquiries: 8,
      listedDate: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
    },
    {
      id: 3,
      title: 'Cozy Studio Apartment',
      price: '$250,000',
      location: '789 Oak St, Midtown, City',
      status: 'Active',
      views: 123,
      inquiries: 5,
      listedDate: '2024-03-05',
      image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9'
    }
  ];

  const filteredProperties = properties
    .filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.listedDate) - new Date(a.listedDate);
        case 'oldest':
          return new Date(a.listedDate) - new Date(b.listedDate);
        case 'price-asc':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'price-desc':
          return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Properties
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Manage your property listings
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/properties/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Add Property
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label
                      htmlFor="search"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Search
                    </label>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Search properties..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="all">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="sort"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Sort By
                    </label>
                    <select
                      id="sort"
                      name="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {property.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {property.location}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          property.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : property.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}
                      >
                        {property.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-primary-600">
                      {property.price}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Views
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                          {property.views}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Inquiries
                        </p>
                        <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                          {property.inquiries}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link
                        to={`/properties/${property.id}`}
                        className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No properties found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties; 