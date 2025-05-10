import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const sampleProperties = [
  {
    id: 1,
    title: 'Modern 3BHK Apartment',
    location: 'HSR Layout, Bangalore',
    price: '₹45,000/month',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,500 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  },
  {
    id: 2,
    title: 'Spacious 2BHK Flat',
    location: 'Andheri West, Mumbai',
    price: '₹35,000/month',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,000 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Semi Furnished'
  },
  {
    id: 3,
    title: 'Luxury 4BHK Villa',
    location: 'DLF Phase 1, Gurgaon',
    price: '₹85,000/month',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,200 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  },
  {
    id: 4,
    title: 'Cozy 1BHK Apartment',
    location: 'Koramangala, Bangalore',
    price: '₹22,000/month',
    bedrooms: 1,
    bathrooms: 1,
    area: '650 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Semi Furnished'
  },
  {
    id: 5,
    title: 'Premium 3BHK Flat',
    location: 'Bandra West, Mumbai',
    price: '₹75,000/month',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,800 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  },
  {
    id: 6,
    title: 'Modern 2BHK Apartment',
    location: 'Indiranagar, Bangalore',
    price: '₹38,000/month',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,200 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Semi Furnished'
  },
  {
    id: 7,
    title: 'Spacious 3BHK Villa',
    location: 'Vasant Kunj, Delhi',
    price: '₹65,000/month',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,500 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  },
  {
    id: 8,
    title: 'Elegant 4BHK Penthouse',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹95,000/month',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,500 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  },
  {
    id: 9,
    title: 'Cozy 2BHK Flat',
    location: 'Salt Lake, Kolkata',
    price: '₹28,000/month',
    bedrooms: 2,
    bathrooms: 2,
    area: '1,100 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Semi Furnished'
  },
  {
    id: 10,
    title: 'Premium 3BHK Apartment',
    location: 'Aundh, Pune',
    price: '₹42,000/month',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,600 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    furnishing: 'Fully Furnished'
  }
];

const Rent = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(sampleProperties);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFiltered(
      sampleProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(value.toLowerCase()) ||
          p.location.toLowerCase().includes(value.toLowerCase()) ||
          p.furnishing.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Rent a Home in India"
        subtitle="Browse the best rental properties in top locations."
        primaryText="View Rentals"
        primaryLink="/rent"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="Rental Properties"
        description="Find your perfect rental home - apartments, houses, and villas across India"
        primaryButtonText="Browse Properties"
        primaryButtonLink="#properties-list"
        secondaryButtonText="List for Rent"
        secondaryButtonLink="/list-rental"
      />

      {/* Search/filter bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10 relative">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by property name, location, or furnishing..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Properties grid */}
      <section id="properties-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Rental Properties</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Handpicked selection of quality rental properties
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-12">No properties found.</div>
            ) : (
              filtered.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                      fallbackSrc="/assets/images/fallback-rental.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.furnishing}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <p className="text-gray-600 mt-1">{property.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{property.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.bedrooms} Bed
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        {property.bathrooms} Bath
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                        {property.area}
                      </span>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/property/${property.id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Rent; 