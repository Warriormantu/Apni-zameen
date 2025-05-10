import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const samplePGs = [
  {
    id: 1,
    title: 'Comfort PG for Girls',
    location: 'BTM Layout, Bangalore',
    price: '₹8,000/month',
    type: 'Girls',
    occupancy: 'Double Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['WiFi', 'Food Included', 'Laundry']
  },
  {
    id: 2,
    title: 'Premium Boys PG',
    location: 'Kothrud, Pune',
    price: '₹9,500/month',
    type: 'Boys',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['AC', 'Gym', 'Food']
  },
  {
    id: 3,
    title: 'Co-living Space',
    location: 'Powai, Mumbai',
    price: '₹12,000/month',
    type: 'Co-ed',
    occupancy: 'Triple Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Gaming Room', 'Study Area', 'Cafeteria']
  },
  {
    id: 4,
    title: 'Student Housing',
    location: 'Vijay Nagar, Delhi',
    price: '₹7,500/month',
    type: 'Boys',
    occupancy: 'Double Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Library', 'WiFi', 'Food']
  },
  {
    id: 5,
    title: 'Working Women\'s PG',
    location: 'Salt Lake, Kolkata',
    price: '₹10,000/month',
    type: 'Girls',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Security', 'AC', 'Food']
  },
  {
    id: 6,
    title: 'Modern Co-living',
    location: 'Madhapur, Hyderabad',
    price: '₹11,000/month',
    type: 'Co-ed',
    occupancy: 'Double Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Rooftop Garden', 'Gym', 'WiFi']
  },
  {
    id: 7,
    title: 'Student PG',
    location: 'Navrangpura, Ahmedabad',
    price: '₹8,500/month',
    type: 'Girls',
    occupancy: 'Triple Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Study Room', 'Food', 'Laundry']
  },
  {
    id: 8,
    title: 'Executive PG',
    location: 'Anna Nagar, Chennai',
    price: '₹13,000/month',
    type: 'Boys',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['AC', 'Food', 'Parking']
  },
  {
    id: 9,
    title: 'Budget Friendly PG',
    location: 'Laxmi Nagar, Delhi',
    price: '₹7,000/month',
    type: 'Girls',
    occupancy: 'Triple Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Food', 'WiFi', 'Power Backup']
  },
  {
    id: 10,
    title: 'Premium Co-living',
    location: 'HSR Layout, Bangalore',
    price: '₹14,000/month',
    type: 'Co-ed',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Swimming Pool', 'Gym', 'Food']
  },
  {
    id: 11,
    title: 'Luxury Co-living Space',
    location: 'Koramangala, Bangalore',
    price: '₹15,000/month',
    type: 'Co-ed',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Swimming Pool', 'Gym', 'Food', 'Housekeeping', 'Security']
  },
  {
    id: 12,
    title: 'Student PG for Girls',
    location: 'Indiranagar, Bangalore',
    price: '₹9,000/month',
    type: 'Girls',
    occupancy: 'Double Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Study Room', 'Library', 'Food', 'WiFi', 'Laundry']
  },
  {
    id: 13,
    title: 'Executive PG for Men',
    location: 'Whitefield, Bangalore',
    price: '₹12,000/month',
    type: 'Boys',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['AC', 'Food', 'Gym', 'Parking', 'Security']
  },
  {
    id: 14,
    title: 'Premium Girls PG',
    location: 'HSR Layout, Bangalore',
    price: '₹11,000/month',
    type: 'Girls',
    occupancy: 'Double Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['AC', 'Food', 'WiFi', 'Laundry', 'Security']
  },
  {
    id: 15,
    title: 'Modern Co-living Hub',
    location: 'Electronic City, Bangalore',
    price: '₹13,000/month',
    type: 'Co-ed',
    occupancy: 'Single Sharing',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1470',
    amenities: ['Gym', 'Food', 'WiFi', 'Housekeeping', 'Security']
  }
];

const PG = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(samplePGs);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedOccupancy, setSelectedOccupancy] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterPGs(value, selectedType, selectedOccupancy);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterPGs(search, type, selectedOccupancy);
  };

  const handleOccupancyChange = (occupancy) => {
    setSelectedOccupancy(occupancy);
    filterPGs(search, selectedType, occupancy);
  };

  const filterPGs = (searchValue, type, occupancy) => {
    setFiltered(
      samplePGs.filter((pg) => {
        const matchesSearch =
          pg.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          pg.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          pg.amenities.some(amenity => amenity.toLowerCase().includes(searchValue.toLowerCase()));
        
        const matchesType = type === 'all' || pg.type.toLowerCase() === type.toLowerCase();
        const matchesOccupancy = occupancy === 'all' || pg.occupancy.toLowerCase() === occupancy.toLowerCase();

        return matchesSearch && matchesType && matchesOccupancy;
      })
    );
  };

  return (
    <Layout>
      <HeroSection
        title="PG & Co-living Spaces"
        subtitle="Find comfortable and affordable PG accommodation and co-living spaces across India."
        primaryText="Browse PGs"
        primaryLink="/pg"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="PG & Co-living Spaces"
        description="Find comfortable and affordable PG accommodation and co-living spaces across India"
        primaryButtonText="Browse PGs"
        primaryButtonLink="#pg-list"
        secondaryButtonText="List Your PG"
        secondaryButtonLink="/list-pg"
      />

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10 relative">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="md:col-span-1">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by name, location, or amenities..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Types</option>
                <option value="girls">Girls</option>
                <option value="boys">Boys</option>
                <option value="co-ed">Co-ed</option>
              </select>
            </div>

            {/* Occupancy Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedOccupancy}
                onChange={(e) => handleOccupancyChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Occupancy</option>
                <option value="single sharing">Single Sharing</option>
                <option value="double sharing">Double Sharing</option>
                <option value="triple sharing">Triple Sharing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PG List Section */}
      <section id="pg-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured PG & Co-living Spaces</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Verified accommodations with modern amenities
            </p>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filtered.length} of {samplePGs.length} PGs
          </div>

          {/* PG Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg">No PGs found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedType('all');
                    setSelectedOccupancy('all');
                    setFiltered(samplePGs);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((pg) => (
                <div key={pg.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={pg.image}
                      alt={pg.title}
                      className="w-full h-48 sm:h-56 object-cover"
                      fallbackSrc="/assets/images/fallback-pg.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {pg.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{pg.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-1">{pg.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{pg.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {pg.occupancy}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {pg.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/pg/${pg.id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
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

export default PG; 