import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { properties } from '../services/api';
import FallbackUI from '../components/common/FallbackUI';
import Layout from '../components/layout/Layout';
import FallbackImage from '../components/common/FallbackImage';
import PropertyCardSkeleton from '../components/common/PropertyCardSkeleton';
import PageTitle from '../components/common/PageTitle';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiAttempted, setApiAttempted] = useState(false);

  // Fetch featured properties from API
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setApiAttempted(true);
        const data = await properties.getFeatured(3);
        setFeaturedProperties(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Failed to load featured properties. Please try again.');
        // Use hardcoded data as fallback
        setFeaturedProperties([
          {
            id: 1,
            title: 'Luxury Villa with Pool',
            location: 'Gurgaon, Haryana',
            price: '₹2,50,00,000',
            bedrooms: 4,
            bathrooms: 4,
            area: '3,500 sq ft',
            image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1506',
            type: 'Buy'
          },
          {
            id: 2,
            title: 'Modern Apartment in City Center',
            location: 'Mumbai, Maharashtra',
            price: '₹45,000 /month',
            bedrooms: 3,
            bathrooms: 2,
            area: '1,300 sq ft',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
            type: 'Rent'
          },
          {
            id: 3,
            title: 'Commercial Office Space',
            location: 'Bangalore, Karnataka',
            price: '₹1,20,00,000',
            bedrooms: 0,
            bathrooms: 2,
            area: '2,000 sq ft',
            image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1469',
            type: 'Commercial'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  // Property categories
  const categories = [
    {
      name: 'Buy',
      description: 'Find your dream home',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1470',
      link: '/buy'
    },
    {
      name: 'Rent',
      description: 'Rental properties for all budgets',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
      link: '/rent'
    },
    {
      name: 'Commercial',
      description: 'Office spaces and retail outlets',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470',
      link: '/commercial'
    },
    {
      name: 'PG/Co-living',
      description: 'Shared accommodations',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
      link: '/pg'
    },
    {
      name: 'Plots',
      description: 'Land for your future home',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
      link: '/plot'
    },
    {
      name: 'Sell',
      description: 'List your property with us',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1573',
      link: '/sell'
    }
  ];

  // Render property cards with skeleton loading state
  const renderPropertyCards = () => {
    if (loading) {
      return (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((skeleton) => (
            <PropertyCardSkeleton key={skeleton} />
          ))}
        </div>
      );
    }

    if (error && featuredProperties.length === 0) {
      return (
        <div className="mt-12 bg-red-50 p-6 rounded-lg text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (featuredProperties.length === 0) {
      return (
        <div className="mt-12 text-center text-gray-500">No featured properties available.</div>
      );
    }

    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featuredProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative">
              <FallbackImage
                src={property.image || property.main_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                alt={property.title}
                className="w-full h-64 object-cover"
                fallbackSrc="/assets/images/fallback-property.jpg"
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {property.type || property.status}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
              <p className="text-gray-600 mt-1">{property.location || `${property.city || ''}, ${property.state || ''}`}</p>
              <p className="text-emerald-600 text-xl font-bold mt-4">
                {property.price && property.price.toString().includes('₹') ? property.price : `₹${property.price || ''}`}
              </p>
              
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                {property.bedrooms > 0 && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                  </span>
                )}
                
                {property.bathrooms > 0 && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                  </span>
                )}
                
                {property.area && (
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    {property.area}
                  </span>
                )}
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/property/${property.id}`}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <PageTitle title="Home - Apni Zameen | Find Your Dream Property" />

      {/* Hero section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Find Your Perfect Property
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Browse thousands of properties across India. Buy, sell, or rent with confidence on Apni Zameen.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                to="/properties"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-8"
              >
                Browse Properties
              </Link>
              <Link
                to="/contact"
                className="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-800 hover:bg-emerald-900 md:py-4 md:text-lg md:px-8"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured properties section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Discover our handpicked selection of premium properties
            </p>
          </div>

          {/* Render property cards with skeleton loading state */}
          {renderPropertyCards()}

          <div className="mt-12 text-center">
            <Link
              to="/properties"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
            >
              View All Properties
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Property categories section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Explore by Category
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Find the perfect property that fits your needs
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <FallbackImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-sm text-white/90 mt-1">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home; 