import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const samplePlots = [
  {
    id: 1,
    title: 'Residential Plot',
    location: 'Whitefield, Bangalore',
    price: '₹1.2Cr',
    area: '2400 sq ft',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['24/7 Security', 'Gated Community', 'Water Supply']
  },
  {
    id: 2,
    title: 'Commercial Plot',
    location: 'Gurgaon, Haryana',
    price: '₹2.5Cr',
    area: '3000 sq ft',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Main Road Facing', 'Power Backup', 'Parking']
  },
  {
    id: 3,
    title: 'Farm Land',
    location: 'Pune, Maharashtra',
    price: '₹85L',
    area: '2 Acres',
    type: 'Agricultural',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Water Source', 'Fertile Soil', 'Road Access']
  },
  {
    id: 4,
    title: 'Industrial Plot',
    location: 'Chennai, Tamil Nadu',
    price: '₹3.2Cr',
    area: '5000 sq ft',
    type: 'Industrial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Heavy Vehicle Access', 'Power Supply', 'Security']
  },
  {
    id: 5,
    title: 'Residential Plot',
    location: 'Hyderabad, Telangana',
    price: '₹95L',
    area: '2000 sq ft',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Gated Community', 'Park', 'Water Supply']
  },
  {
    id: 6,
    title: 'Commercial Plot',
    location: 'Mumbai, Maharashtra',
    price: '₹4.5Cr',
    area: '2500 sq ft',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['High Street Location', 'Parking', 'Security']
  },
  {
    id: 7,
    title: 'Farm Land',
    location: 'Jaipur, Rajasthan',
    price: '₹1.5Cr',
    area: '3 Acres',
    type: 'Agricultural',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Water Source', 'Fertile Soil', 'Road Access']
  },
  {
    id: 8,
    title: 'Industrial Plot',
    location: 'Ahmedabad, Gujarat',
    price: '₹2.8Cr',
    area: '4000 sq ft',
    type: 'Industrial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Heavy Vehicle Access', 'Power Supply', 'Security']
  },
  {
    id: 9,
    title: 'Residential Plot',
    location: 'Kolkata, West Bengal',
    price: '₹75L',
    area: '1800 sq ft',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Gated Community', 'Park', 'Water Supply']
  },
  {
    id: 10,
    title: 'Commercial Plot',
    location: 'Delhi, NCR',
    price: '₹3.5Cr',
    area: '2800 sq ft',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Main Road Facing', 'Parking', 'Security']
  },
  {
    id: 11,
    title: 'Farm Land',
    location: 'Coimbatore, Tamil Nadu',
    price: '₹1.8Cr',
    area: '4 Acres',
    type: 'Agricultural',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Water Source', 'Fertile Soil', 'Road Access']
  },
  {
    id: 12,
    title: 'Industrial Plot',
    location: 'Vadodara, Gujarat',
    price: '₹2.2Cr',
    area: '3500 sq ft',
    type: 'Industrial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Heavy Vehicle Access', 'Power Supply', 'Security']
  },
  {
    id: 13,
    title: 'Residential Plot',
    location: 'Lucknow, Uttar Pradesh',
    price: '₹65L',
    area: '1600 sq ft',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Gated Community', 'Park', 'Water Supply']
  },
  {
    id: 14,
    title: 'Commercial Plot',
    location: 'Chandigarh, Punjab',
    price: '₹2.8Cr',
    area: '2200 sq ft',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['High Street Location', 'Parking', 'Security']
  },
  {
    id: 15,
    title: 'Farm Land',
    location: 'Bhopal, Madhya Pradesh',
    price: '₹1.2Cr',
    area: '2.5 Acres',
    type: 'Agricultural',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1632',
    features: ['Water Source', 'Fertile Soil', 'Road Access']
  }
];

const Plots = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(samplePlots);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterPlots(value, selectedType, selectedArea);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterPlots(search, type, selectedArea);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    filterPlots(search, selectedType, area);
  };

  const filterPlots = (searchValue, type, area) => {
    setFiltered(
      samplePlots.filter((plot) => {
        const matchesSearch =
          plot.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          plot.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          plot.features.some(feature => feature.toLowerCase().includes(searchValue.toLowerCase()));
        
        const matchesType = type === 'all' || plot.type.toLowerCase() === type.toLowerCase();
        const matchesArea = area === 'all' || plot.area.includes(area);

        return matchesSearch && matchesType && matchesArea;
      })
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Plots & Land in India"
        subtitle="Find the perfect plot or land for your residential, commercial, or agricultural needs."
        primaryText="Browse Plots"
        primaryLink="/plots"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="Plots & Land"
        description="Find the perfect plot or land for your residential, commercial, or agricultural needs"
        primaryButtonText="Browse Plots"
        primaryButtonLink="#plots-list"
        secondaryButtonText="List Your Plot"
        secondaryButtonLink="/list-plot"
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
                placeholder="Search by name, location, or features..."
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
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="agricultural">Agricultural</option>
              </select>
            </div>

            {/* Area Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedArea}
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Areas</option>
                <option value="1000">1000+ sq ft</option>
                <option value="2000">2000+ sq ft</option>
                <option value="3000">3000+ sq ft</option>
                <option value="1 Acre">1+ Acre</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Plots List Section */}
      <section id="plots-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Plots & Land</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Verified plots and land parcels with clear titles
            </p>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filtered.length} of {samplePlots.length} plots
          </div>

          {/* Plots Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg">No plots found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedType('all');
                    setSelectedArea('all');
                    setFiltered(samplePlots);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((plot) => (
                <div key={plot.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={plot.image}
                      alt={plot.title}
                      className="w-full h-48 sm:h-56 object-cover"
                      fallbackSrc="/assets/images/fallback-plot.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {plot.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{plot.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-1">{plot.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{plot.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {plot.area}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {plot.features.map((feature, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/plot/${plot.id}`}
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

export default Plots; 