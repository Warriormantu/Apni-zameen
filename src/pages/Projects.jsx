import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const sampleProjects = [
  {
    id: 1,
    title: 'Green Valley Residences',
    location: 'Gurgaon, Haryana',
    price: 'Starting from ₹85L',
    type: 'Residential',
    possession: 'Dec 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Green Builders',
    amenities: ['Swimming Pool', 'Gym', 'Park']
  },
  {
    id: 2,
    title: 'Tech Park Plaza',
    location: 'Bangalore, Karnataka',
    price: 'Starting from ₹1.2Cr',
    type: 'Commercial',
    possession: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Tech Developers',
    amenities: ['Food Court', 'Conference Rooms', 'Parking']
  },
  {
    id: 3,
    title: 'Luxury Heights',
    location: 'Mumbai, Maharashtra',
    price: 'Starting from ₹2.5Cr',
    type: 'Luxury',
    possession: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Luxury Homes',
    amenities: ['Private Pool', 'Spa', 'Concierge']
  },
  {
    id: 4,
    title: 'Smart City Hub',
    location: 'Hyderabad, Telangana',
    price: 'Starting from ₹95L',
    type: 'Residential',
    possession: 'Sep 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Smart Developers',
    amenities: ['Smart Homes', 'Gym', 'Park']
  },
  {
    id: 5,
    title: 'Business District',
    location: 'Chennai, Tamil Nadu',
    price: 'Starting from ₹1.5Cr',
    type: 'Commercial',
    possession: 'Dec 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Business Parks',
    amenities: ['Food Court', 'Conference Rooms', 'Parking']
  },
  {
    id: 6,
    title: 'Eco Living',
    location: 'Pune, Maharashtra',
    price: 'Starting from ₹75L',
    type: 'Residential',
    possession: 'Mar 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Eco Developers',
    amenities: ['Solar Power', 'Garden', 'Gym']
  },
  {
    id: 7,
    title: 'Mall of India',
    location: 'Delhi, NCR',
    price: 'Starting from ₹2.8Cr',
    type: 'Commercial',
    possession: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Retail Developers',
    amenities: ['Food Court', 'Parking', 'Entertainment']
  },
  {
    id: 8,
    title: 'Lake View Residences',
    location: 'Kolkata, West Bengal',
    price: 'Starting from ₹1.1Cr',
    type: 'Luxury',
    possession: 'Sep 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Lake Developers',
    amenities: ['Lake View', 'Pool', 'Gym']
  },
  {
    id: 9,
    title: 'IT Park Phase 2',
    location: 'Bangalore, Karnataka',
    price: 'Starting from ₹1.8Cr',
    type: 'Commercial',
    possession: 'Dec 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Tech Parks',
    amenities: ['Food Court', 'Conference Rooms', 'Parking']
  },
  {
    id: 10,
    title: 'Garden City',
    location: 'Ahmedabad, Gujarat',
    price: 'Starting from ₹65L',
    type: 'Residential',
    possession: 'Mar 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Garden Developers',
    amenities: ['Garden', 'Gym', 'Park']
  },
  {
    id: 11,
    title: 'Sports City',
    location: 'Mumbai, Maharashtra',
    price: 'Starting from ₹1.2Cr',
    type: 'Residential',
    possession: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Sports Developers',
    amenities: ['Sports Complex', 'Gym', 'Pool']
  },
  {
    id: 12,
    title: 'Medical Hub',
    location: 'Hyderabad, Telangana',
    price: 'Starting from ₹2.2Cr',
    type: 'Commercial',
    possession: 'Sep 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Medical Parks',
    amenities: ['Parking', 'Conference Rooms', 'Cafeteria']
  },
  {
    id: 13,
    title: 'Student Housing',
    location: 'Pune, Maharashtra',
    price: 'Starting from ₹45L',
    type: 'Residential',
    possession: 'Dec 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Education Developers',
    amenities: ['Study Rooms', 'Gym', 'Cafeteria']
  },
  {
    id: 14,
    title: 'Retail Plaza',
    location: 'Chennai, Tamil Nadu',
    price: 'Starting from ₹1.5Cr',
    type: 'Commercial',
    possession: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Retail Developers',
    amenities: ['Food Court', 'Parking', 'Entertainment']
  },
  {
    id: 15,
    title: 'Senior Living',
    location: 'Bangalore, Karnataka',
    price: 'Starting from ₹95L',
    type: 'Residential',
    possession: 'Jun 2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470',
    developer: 'Senior Living',
    amenities: ['Medical Center', 'Garden', 'Community Hall']
  }
];

const Projects = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(sampleProjects);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPossession, setSelectedPossession] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterProjects(value, selectedType, selectedPossession);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    filterProjects(search, type, selectedPossession);
  };

  const handlePossessionChange = (possession) => {
    setSelectedPossession(possession);
    filterProjects(search, selectedType, possession);
  };

  const filterProjects = (searchValue, type, possession) => {
    setFiltered(
      sampleProjects.filter((project) => {
        const matchesSearch =
          project.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          project.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          project.developer.toLowerCase().includes(searchValue.toLowerCase()) ||
          project.amenities.some(amenity => amenity.toLowerCase().includes(searchValue.toLowerCase()));
        
        const matchesType = type === 'all' || project.type.toLowerCase() === type.toLowerCase();
        const matchesPossession = possession === 'all' || project.possession.includes(possession);

        return matchesSearch && matchesType && matchesPossession;
      })
    );
  };

  return (
    <Layout>
      <HeroSection
        title="New Projects in India"
        subtitle="Discover upcoming residential and commercial projects from trusted developers."
        primaryText="Browse Projects"
        primaryLink="/projects"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="New Projects"
        description="Discover upcoming residential and commercial projects from trusted developers"
        primaryButtonText="Browse Projects"
        primaryButtonLink="#projects-list"
        secondaryButtonText="List Your Project"
        secondaryButtonLink="/list-project"
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
                placeholder="Search by name, location, or developer..."
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
                <option value="luxury">Luxury</option>
              </select>
            </div>

            {/* Possession Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedPossession}
                onChange={(e) => handlePossessionChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Possession Dates</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List Section */}
      <section id="projects-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Projects</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Upcoming residential and commercial projects from trusted developers
            </p>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filtered.length} of {sampleProjects.length} projects
          </div>

          {/* Projects Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg">No projects found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedType('all');
                    setSelectedPossession('all');
                    setFiltered(sampleProjects);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 sm:h-56 object-cover"
                      fallbackSrc="/assets/images/fallback-project.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {project.type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.title}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-1">{project.location}</p>
                    <p className="text-emerald-600 text-xl font-bold mt-4">{project.price}</p>
                    <div className="mt-4 flex justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Possession: {project.possession}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.amenities.map((amenity, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/project/${project.id}`}
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

export default Projects; 