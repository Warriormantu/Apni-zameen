import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  AdjustmentsHorizontalIcon, 
  MagnifyingGlassIcon, 
  XMarkIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { PropertyCategory, PropertyType, PropertySearchParams } from '../../types/property';

interface PropertySearchProps {
  onSearch: (params: PropertySearchParams) => void;
  initialParams?: PropertySearchParams;
  loading?: boolean;
}

const PropertySearch = ({ onSearch, initialParams = {}, loading = false }: PropertySearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialParams.query || '');
  const [category, setCategory] = useState<PropertyCategory | undefined>(
    initialParams.category || 
    (searchParams.get('category') as PropertyCategory | undefined)
  );
  
  const [minPrice, setMinPrice] = useState<number | undefined>(
    initialParams.minPrice || 
    (searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined)
  );
  
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    initialParams.maxPrice || 
    (searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined)
  );
  
  const [propertyTypes, setPropertyTypes] = useState<PropertyType[]>(
    initialParams.types || []
  );
  
  const [minBedrooms, setMinBedrooms] = useState<number | undefined>(
    initialParams.minBedrooms || 
    (searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : undefined)
  );
  
  const [city, setCity] = useState<string | undefined>(
    initialParams.city || 
    searchParams.get('city') || 
    undefined
  );
  
  // Apply initial search params from URL on component mount
  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      handleSearch();
    }
  }, []);

  const handleSearch = () => {
    const params: PropertySearchParams = {
      query: searchQuery,
      category,
      minPrice,
      maxPrice,
      types: propertyTypes.length > 0 ? propertyTypes : undefined,
      minBedrooms,
      city,
    };
    
    // Remove undefined values
    Object.keys(params).forEach(key => {
      if (params[key as keyof PropertySearchParams] === undefined) {
        delete params[key as keyof PropertySearchParams];
      }
    });
    
    onSearch(params);
    
    // Update URL search params
    const newSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => newSearchParams.append(key, v));
        } else {
          newSearchParams.set(key, String(value));
        }
      }
    });
    
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategory(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setPropertyTypes([]);
    setMinBedrooms(undefined);
    setCity(undefined);
    
    // Clear URL search params
    setSearchParams({});
    
    // Trigger search with empty params
    onSearch({});
  };

  const togglePropertyType = (type: PropertyType) => {
    setPropertyTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const commonCities = [
    'New York', 
    'Los Angeles', 
    'Chicago', 
    'Miami', 
    'San Francisco', 
    'Seattle',
    'Austin',
    'Denver'
  ];

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-4">
      {/* Main search bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by keywords, address, or ZIP code..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={handleSearch}
            disabled={loading}
            className="btn btn-primary flex items-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              <>
                <MagnifyingGlassIcon className="h-5 w-5 mr-1" />
                Search
              </>
            )}
          </button>
          
          <button 
            type="button"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="btn btn-secondary flex items-center"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 mr-1" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Category selection */}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => setCategory(PropertyCategory.RESIDENTIAL)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            category === PropertyCategory.RESIDENTIAL
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
              : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-secondary-600 hover:bg-gray-200 dark:hover:bg-secondary-600'
          }`}
        >
          Residential
        </button>
        
        <button
          type="button"
          onClick={() => setCategory(PropertyCategory.COMMERCIAL)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            category === PropertyCategory.COMMERCIAL
              ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
              : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-secondary-600 hover:bg-gray-200 dark:hover:bg-secondary-600'
          }`}
        >
          Commercial
        </button>
        
        {category && (
          <button
            type="button"
            onClick={() => setCategory(undefined)}
            className="px-3 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {/* City selection shortcuts */}
      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <MapPinIcon className="h-4 w-4 mr-1" />
          <span>Popular Cities:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {commonCities.map(cityName => (
            <button
              key={cityName}
              type="button"
              onClick={() => setCity(city === cityName ? undefined : cityName)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                city === cityName
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
                  : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-secondary-600 hover:bg-gray-200 dark:hover:bg-secondary-600'
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
      
      {/* Advanced filters */}
      {isFiltersOpen && (
        <div className="mt-6 border-t border-gray-200 dark:border-secondary-700 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice || ''}
                  onChange={e => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field"
                />
                <span className="text-gray-500 dark:text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ''}
                  onChange={e => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field"
                />
              </div>
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(PropertyType).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => togglePropertyType(type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      propertyTypes.includes(type)
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
                        : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-secondary-600 hover:bg-gray-200 dark:hover:bg-secondary-600'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Bedrooms (only for residential) */}
            {(category === PropertyCategory.RESIDENTIAL || !category) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, '5+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        if (typeof num === 'number') {
                          setMinBedrooms(minBedrooms === num ? undefined : num);
                        } else {
                          setMinBedrooms(minBedrooms === 5 ? undefined : 5);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (typeof num === 'number' && minBedrooms === num) || (num === '5+' && minBedrooms === 5)
                          ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 border border-primary-300 dark:border-primary-700'
                          : 'bg-gray-100 dark:bg-secondary-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-secondary-600 hover:bg-gray-200 dark:hover:bg-secondary-600'
                      }`}
                    >
                      {num} {typeof num === 'number' ? (num === 1 ? 'Bed' : 'Beds') : 'Beds'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Filter actions */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleClearFilters}
              className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Clear all filters
            </button>
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertySearch; 