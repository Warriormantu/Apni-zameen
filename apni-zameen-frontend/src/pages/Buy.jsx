import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import FallbackImage from '../components/common/FallbackImage';

const sampleProperties = [
  {
    id: 1,
    title: 'Luxury Villa with Pool',
    location: 'Gurgaon, Haryana',
    price: '₹2,50,00,000',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,500 sq ft',
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1506',
    type: 'Villa'
  },
  {
    id: 2,
    title: 'Modern Apartment in City Center',
    location: 'Mumbai, Maharashtra',
    price: '₹1,20,00,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '1,300 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    type: 'Apartment'
  },
  {
    id: 3,
    title: 'Spacious Family Home',
    location: 'Bangalore, Karnataka',
    price: '₹1,80,00,000',
    bedrooms: 5,
    bathrooms: 4,
    area: '2,800 sq ft',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1470',
    type: 'House'
  },
  {
    id: 4,
    title: 'Affordable 2BHK Flat',
    location: 'Pune, Maharashtra',
    price: '₹65,00,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '950 sq ft',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1470',
    type: 'Apartment'
  },
  {
    id: 5,
    title: 'Premium Penthouse',
    location: 'Delhi, NCR',
    price: '₹3,20,00,000',
    bedrooms: 4,
    bathrooms: 5,
    area: '4,200 sq ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470',
    type: 'Penthouse'
  },
  {
    id: 6,
    title: 'Cozy Studio Apartment',
    location: 'Hyderabad, Telangana',
    price: '₹45,00,000',
    bedrooms: 1,
    bathrooms: 1,
    area: '500 sq ft',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1470',
    type: 'Studio'
  },
  {
    id: 7,
    title: 'Independent House with Garden',
    location: 'Chennai, Tamil Nadu',
    price: '₹1,60,00,000',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,200 sq ft',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1470',
    type: 'House'
  },
  {
    id: 8,
    title: 'Luxury Row Villa',
    location: 'Noida, Uttar Pradesh',
    price: '₹2,10,00,000',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,000 sq ft',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=1470',
    type: 'Villa'
  },
  {
    id: 9,
    title: 'Budget Apartment',
    location: 'Ahmedabad, Gujarat',
    price: '₹55,00,000',
    bedrooms: 2,
    bathrooms: 1,
    area: '800 sq ft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1470',
    type: 'Apartment'
  },
  {
    id: 10,
    title: 'Modern Duplex',
    location: 'Kolkata, West Bengal',
    price: '₹1,40,00,000',
    bedrooms: 3,
    bathrooms: 3,
    area: '1,900 sq ft',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470',
    type: 'Duplex'
  }
];

const Buy = () => {
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
          p.type.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <Layout>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4">Buy Properties</h1>
          <p className="mt-2 text-xl max-w-2xl mx-auto">
            Find your dream home or investment property to buy across India.
          </p>
        </div>
      </div>

      {/* Search/filter bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10 relative">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by title, location, or type..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Properties grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Available Properties</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Browse our curated list of properties for sale
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
                      fallbackSrc="/assets/images/fallback-property.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                    <p className="text-gray-600 mt-1">{property.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{property.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      {property.bedrooms > 0 && (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {property.bedrooms} Bed
                        </span>
                      )}
                      {property.bathrooms > 0 && (
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {property.bathrooms} Bath
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

export default Buy; 