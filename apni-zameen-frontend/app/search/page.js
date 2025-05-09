'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import SearchFilter from '../components/SearchFilter';
import { FaSort, FaFilter } from 'react-icons/fa';

// Mock data for search results
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
  }
];

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call with the search params
    // For this demo, we'll just filter the mock data
    
    setLoading(true);
    
    // Extract search parameters
    const keyword = searchParams.get('keyword') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const purpose = searchParams.get('purpose') || '';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')) : 0;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')) : Infinity;
    const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')) : 0;
    
    // Filter properties based on search parameters
    let filteredProperties = [...propertiesData];
    
    if (keyword) {
      const keywordLower = keyword.toLowerCase();
      filteredProperties = filteredProperties.filter(
        property => property.title.toLowerCase().includes(keywordLower) || 
                   property.location.toLowerCase().includes(keywordLower)
      );
    }
    
    if (propertyType) {
      // In a real app, we would have a property type field to filter on
      // For this demo, we'll just simulate it
    }
    
    if (purpose) {
      filteredProperties = filteredProperties.filter(
        property => property.purpose.toLowerCase() === purpose.toLowerCase()
      );
    }
    
    if (minPrice > 0) {
      filteredProperties = filteredProperties.filter(
        property => property.price >= minPrice
      );
    }
    
    if (maxPrice < Infinity) {
      filteredProperties = filteredProperties.filter(
        property => property.price <= maxPrice
      );
    }
    
    if (bedrooms > 0) {
      filteredProperties = filteredProperties.filter(
        property => property.bedrooms >= bedrooms
      );
    }
    
    // Simulate API delay
    setTimeout(() => {
      setProperties(filteredProperties);
      setLoading(false);
    }, 500);
    
  }, [searchParams]);

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
        break;
      case 'oldest':
        // In a real app, we would sort by date
        sortedProperties.reverse();
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };

  // Build search summary text
  const buildSearchSummary = () => {
    const keyword = searchParams.get('keyword');
    const propertyType = searchParams.get('propertyType');
    const purpose = searchParams.get('purpose');
    
    let summary = 'Properties';
    
    if (propertyType) {
      summary = propertyType.charAt(0).toUpperCase() + propertyType.slice(1) + ' ' + summary;
    }
    
    if (purpose) {
      summary += purpose.toLowerCase() === 'buy' ? ' for Sale' : ' for Rent';
    }
    
    if (keyword) {
      summary += ` matching "${keyword}"`;
    }
    
    return summary;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>
        
        {/* Search Filter */}
        <div className="mb-8">
          <SearchFilter />
        </div>
        
        {/* Search Summary and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">{buildSearchSummary()}</h2>
            <p className="text-gray-600">
              Showing <span className="font-semibold">{properties.length}</span> results
            </p>
          </div>
          
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
        
        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <>
            {/* No Results */}
            {properties.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">No properties found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <Link 
                  href="/properties" 
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Browse All Properties
                </Link>
              </div>
            ) : (
              <>
                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
                
                {/* Pagination */}
                {properties.length > 0 && (
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
                      <span className="px-2 text-gray-500">...</span>
                      <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50">
                        5
                      </button>
                      <button className="px-3 py-1 rounded-md bg-white shadow-sm text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 