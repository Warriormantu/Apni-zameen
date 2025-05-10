import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const sampleProperties = [
  {
    id: 1,
    title: 'Premium Office Space',
    location: 'Cyber City, Gurgaon',
    price: '₹1.5Cr',
    area: '2,500 sq ft',
    type: 'Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['24/7 Security', 'Power Backup', 'Parking']
  },
  {
    id: 2,
    title: 'Retail Space in Mall',
    location: 'Lower Parel, Mumbai',
    price: '₹2.8Cr',
    area: '1,800 sq ft',
    type: 'Retail',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['High Footfall', 'Parking', 'Security']
  },
  {
    id: 3,
    title: 'Warehouse Space',
    location: 'Bhiwandi, Mumbai',
    price: '₹95L',
    area: '5,000 sq ft',
    type: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Loading Dock', '24/7 Access', 'Security']
  },
  {
    id: 4,
    title: 'Co-working Space',
    location: 'Koramangala, Bangalore',
    price: '₹45L',
    area: '3,000 sq ft',
    type: 'Co-working',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['High-speed Internet', 'Meeting Rooms', 'Cafeteria']
  },
  {
    id: 5,
    title: 'Showroom Space',
    location: 'Connaught Place, Delhi',
    price: '₹3.2Cr',
    area: '2,000 sq ft',
    type: 'Retail',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['High Street Location', 'Parking', 'Security']
  },
  {
    id: 6,
    title: 'Industrial Space',
    location: 'Manesar, Gurgaon',
    price: '₹1.8Cr',
    area: '4,000 sq ft',
    type: 'Industrial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Heavy Power', 'Loading Area', 'Security']
  },
  {
    id: 7,
    title: 'Medical Center Space',
    location: 'Indiranagar, Bangalore',
    price: '₹2.5Cr',
    area: '2,200 sq ft',
    type: 'Medical',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', '24/7 Security', 'Power Backup']
  },
  {
    id: 8,
    title: 'Restaurant Space',
    location: 'Bandra West, Mumbai',
    price: '₹1.2Cr',
    area: '1,500 sq ft',
    type: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Kitchen Setup', 'Parking', 'High Footfall']
  },
  {
    id: 9,
    title: 'Hotel Space',
    location: 'City Center, Hyderabad',
    price: '₹4.5Cr',
    area: '3,500 sq ft',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', 'Security', 'Power Backup']
  },
  {
    id: 10,
    title: 'Educational Space',
    location: 'Sector 62, Noida',
    price: '₹1.6Cr',
    area: '2,800 sq ft',
    type: 'Educational',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Classrooms', 'Parking', 'Security']
  },
  {
    id: 11,
    title: 'Gym Space',
    location: 'Koramangala, Bangalore',
    price: '₹85L',
    area: '2,000 sq ft',
    type: 'Fitness',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', '24/7 Access', 'Power Backup']
  },
  {
    id: 12,
    title: 'Bank Space',
    location: 'MG Road, Pune',
    price: '₹2.2Cr',
    area: '1,800 sq ft',
    type: 'Bank',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Security', 'Parking', 'Power Backup']
  },
  {
    id: 13,
    title: 'Salon Space',
    location: 'Jubilee Hills, Hyderabad',
    price: '₹65L',
    area: '1,200 sq ft',
    type: 'Retail',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', 'High Footfall', 'Security']
  },
  {
    id: 14,
    title: 'Spa Space',
    location: 'Vasant Kunj, Delhi',
    price: '₹95L',
    area: '1,500 sq ft',
    type: 'Wellness',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', 'Security', 'Power Backup']
  },
  {
    id: 15,
    title: 'Event Space',
    location: 'Powai, Mumbai',
    price: '₹1.5Cr',
    area: '3,000 sq ft',
    type: 'Events',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469',
    amenities: ['Parking', 'Catering Kitchen', 'Security']
  }
];

const Commercial = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(sampleProperties);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterProperties(value, selectedType, selectedArea);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterProperties(search, type, selectedArea);
  };

  const handleAreaChange = (area) => {
    setSelectedArea(area);
    filterProperties(search, selectedType, area);
  };

  const filterProperties = (searchValue, type, area) => {
    setFiltered(
      sampleProperties.filter((property) => {
        const matchesSearch =
          property.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          property.amenities.some(amenity => amenity.toLowerCase().includes(searchValue.toLowerCase()));
        
        const matchesType = type === 'all' || property.type.toLowerCase() === type.toLowerCase();
        const matchesArea = area === 'all' || property.area.includes(area);

        return matchesSearch && matchesType && matchesArea;
      })
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Commercial Properties"
        subtitle="Find the perfect commercial space for your business needs."
        primaryText="Browse Commercial"
        primaryLink="/commercial"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="Commercial Properties"
        description="Find the perfect commercial space for your business needs"
        primaryButtonText="Browse Properties"
        primaryButtonLink="#properties-list"
        secondaryButtonText="List Your Property"
        secondaryButtonLink="/list-commercial"
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
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="warehouse">Warehouse</option>
                <option value="co-working">Co-working</option>
                <option value="industrial">Industrial</option>
                <option value="medical">Medical</option>
                <option value="restaurant">Restaurant</option>
                <option value="hotel">Hotel</option>
                <option value="educational">Educational</option>
                <option value="fitness">Fitness</option>
                <option value="bank">Bank</option>
                <option value="wellness">Wellness</option>
                <option value="events">Events</option>
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
                <option value="4000">4000+ sq ft</option>
                <option value="5000">5000+ sq ft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties List Section */}
      <section id="properties-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Commercial Properties</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Verified commercial spaces for your business needs
            </p>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filtered.length} of {sampleProperties.length} properties
          </div>

          {/* Properties Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg">No properties found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedType('all');
                    setSelectedArea('all');
                    setFiltered(sampleProperties);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((property) => (
                <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 sm:h-56 object-cover"
                      fallbackSrc="/assets/images/fallback-commercial.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {property.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-1">{property.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{property.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {property.area}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/commercial/${property.id}`}
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

export default Commercial; 