import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import PageHeroTemplate from '../components/common/PageHeroTemplate';
import FallbackImage from '../components/common/FallbackImage';
import HeroSection from '../components/common/HeroSection';

const sampleAgents = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'South Delhi',
    specialization: 'Residential',
    experience: '15+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '50+ Listed',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Priya Sharma',
    location: 'Bangalore Central',
    specialization: 'Commercial',
    experience: '12+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '45+ Listed',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    location: 'Mumbai Suburbs',
    specialization: 'Luxury Homes',
    experience: '18+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '75+ Listed',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Anjali Desai',
    location: 'Pune West',
    specialization: 'Investment Properties',
    experience: '10+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '30+ Listed',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Suresh Menon',
    location: 'Chennai Central',
    specialization: 'Residential & Commercial',
    experience: '20+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '100+ Listed',
    rating: 4.9
  },
  {
    id: 6,
    name: 'Neha Kapoor',
    location: 'Gurgaon',
    specialization: 'Luxury Apartments',
    experience: '8+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '25+ Listed',
    rating: 4.7
  },
  {
    id: 7,
    name: 'Vikram Singh',
    location: 'Hyderabad',
    specialization: 'Plot Sales',
    experience: '14+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '60+ Listed',
    rating: 4.8
  },
  {
    id: 8,
    name: 'Deepa Iyer',
    location: 'Kolkata',
    specialization: 'Residential Properties',
    experience: '11+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '40+ Listed',
    rating: 4.6
  },
  {
    id: 9,
    name: 'Arjun Reddy',
    location: 'Bangalore East',
    specialization: 'Commercial Spaces',
    experience: '16+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '70+ Listed',
    rating: 4.8
  },
  {
    id: 10,
    name: 'Sanjay Mehta',
    location: 'Mumbai Central',
    specialization: 'Premium Properties',
    experience: '22+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '120+ Listed',
    rating: 4.9
  },
  {
    id: 11,
    name: 'Rahul Verma',
    location: 'Noida',
    specialization: 'Residential & Commercial',
    experience: '16+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '85+ Listed',
    rating: 4.8,
    languages: ['Hindi', 'English', 'Punjabi']
  },
  {
    id: 12,
    name: 'Meera Patel',
    location: 'Ahmedabad',
    specialization: 'Luxury Properties',
    experience: '14+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '65+ Listed',
    rating: 4.9,
    languages: ['Gujarati', 'Hindi', 'English']
  },
  {
    id: 13,
    name: 'Karthik Reddy',
    location: 'Hyderabad',
    specialization: 'IT Park Properties',
    experience: '12+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '55+ Listed',
    rating: 4.7,
    languages: ['Telugu', 'Hindi', 'English']
  },
  {
    id: 14,
    name: 'Anita Desai',
    location: 'Mumbai',
    specialization: 'Luxury Apartments',
    experience: '19+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '90+ Listed',
    rating: 4.9,
    languages: ['Marathi', 'Hindi', 'English']
  },
  {
    id: 15,
    name: 'Rajiv Malhotra',
    location: 'Delhi',
    specialization: 'Commercial Spaces',
    experience: '21+ years',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
    properties: '110+ Listed',
    rating: 4.8,
    languages: ['Hindi', 'English', 'Punjabi']
  }
];

const Agents = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(sampleAgents);
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    filterAgents(value, selectedSpecialization, selectedExperience);
  };

  const handleSpecializationChange = (specialization) => {
    setSelectedSpecialization(specialization);
    filterAgents(search, specialization, selectedExperience);
  };

  const handleExperienceChange = (experience) => {
    setSelectedExperience(experience);
    filterAgents(search, selectedSpecialization, experience);
  };

  const filterAgents = (searchValue, specialization, experience) => {
    setFiltered(
      sampleAgents.filter((agent) => {
        const matchesSearch =
          agent.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          agent.location.toLowerCase().includes(searchValue.toLowerCase()) ||
          agent.languages.some(lang => lang.toLowerCase().includes(searchValue.toLowerCase()));
        
        const matchesSpecialization = specialization === 'all' || agent.specialization.toLowerCase().includes(specialization.toLowerCase());
        const matchesExperience = experience === 'all' || agent.experience.includes(experience);

        return matchesSearch && matchesSpecialization && matchesExperience;
      })
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Find Real Estate Agents"
        subtitle="Connect with experienced real estate agents to help you buy, sell, or rent property."
        primaryText="Browse Agents"
        primaryLink="/agents"
        secondaryText="Contact Us"
        secondaryLink="/contact"
      />
      {/* Hero Section */}
      <PageHeroTemplate
        title="Property Agents"
        description="Connect with experienced real estate agents to help you find or sell your property"
        primaryButtonText="Find an Agent"
        primaryButtonLink="#agents-list"
        secondaryButtonText="Become an Agent"
        secondaryButtonLink="/register-agent"
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
                placeholder="Search by name, location, or languages..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Specialization Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedSpecialization}
                onChange={(e) => handleSpecializationChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Specializations</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="luxury">Luxury Properties</option>
                <option value="investment">Investment Properties</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div className="md:col-span-1">
              <select
                value={selectedExperience}
                onChange={(e) => handleExperienceChange(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">All Experience</option>
                <option value="5+">5+ years</option>
                <option value="10+">10+ years</option>
                <option value="15+">15+ years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Agents List Section */}
      <section id="agents-list" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Agents</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Experienced professionals to guide you through your property journey
            </p>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-sm text-gray-500">
            Showing {filtered.length} of {sampleAgents.length} agents
          </div>

          {/* Agents Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4 text-lg">No agents found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedSpecialization('all');
                    setSelectedExperience('all');
                    setFiltered(sampleAgents);
                  }}
                  className="mt-4 text-emerald-600 hover:text-emerald-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((agent) => (
                <div key={agent.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative">
                    <FallbackImage
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-48 sm:h-56 object-cover"
                      fallbackSrc="/assets/images/fallback-agent.jpg"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {agent.rating} ★
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{agent.name}</h3>
                    <p className="text-gray-600 mt-1 line-clamp-1">{agent.location}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {agent.specialization}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {agent.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {agent.properties}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {agent.languages.map((language, index) => (
                          <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <a
                        href={`/agent/${agent.id}`}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                      >
                        Contact Agent
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

export default Agents; 