'use client';
import { useState } from 'react';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import { FaSort, FaFilter } from 'react-icons/fa';

// Mock data for properties
const propertiesData = [
  {
    id: 1,
    title: "Modern Family Home",
    location: "DHA Phase 5, Lahore",
    price: 25000000,
    purpose: "Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Luxury Apartment",
    location: "Gulberg III, Lahore",
    price: 18500000,
    purpose: "Sale",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Commercial Office Space",
    location: "Blue Area, Islamabad",
    price: 120000,
    purpose: "Rent",
    bedrooms: 0,
    bathrooms: 2,
    area: 1200,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Residential Plot",
    location: "Bahria Town, Karachi",
    price: 9500000,
    purpose: "Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Penthouse Apartment",
    location: "Clifton, Karachi",
    price: 35000000,
    purpose: "Sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Farmhouse with Pool",
    location: "Bedian Road, Lahore",
    price: 45000000,
    purpose: "Sale",
    bedrooms: 6,
    bathrooms: 5,
    area: 4000,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Office Space",
    location: "I.I. Chundrigar Road, Karachi",
    price: 180000,
    purpose: "Rent",
    bedrooms: 0,
    bathrooms: 2,
    area: 1500,
    imageUrl: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Studio Apartment",
    location: "F-7, Islamabad",
    price: 45000,
    purpose: "Rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop"
  }
];

const PropertiesPage = () => {
  const [properties, setProperties] = useState(propertiesData);
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedProperties = [...properties];
    
    switch(value) {
      case 'price_low_high':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, we would sort by date
        // Here we're just using the mock data order
        sortedProperties = [...propertiesData];
        break;
      case 'oldest':
        // In a real app, we would sort by date
        sortedProperties = [...propertiesData].reverse();
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Properties</h1>
        
        {/* Search Filter */}
        <div className="mb-8">
          <SearchFilter />
        </div>
        
        {/* Results Count and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            Showing <span className="font-semibold">{properties.length}</span> properties
          </p>
          
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
            >
              <FaFilter className="text-gray-600" />
              <span>Filter</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-600" />
              <select 
                value={sortBy}
                onChange={handleSort}
                className="bg-white border-none focus:ring-0 text-gray-700 py-2 pl-2 pr-8 rounded-md shadow-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price_low_high">Price: Low to High</option>
                <option value="price_high_low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-green-600 text-white shadow-sm">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50">
              10
            </button>
            <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage; 