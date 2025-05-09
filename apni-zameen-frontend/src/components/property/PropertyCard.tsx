import { Link } from 'react-router-dom';
import { HeartIcon, MapPinIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { Property, PropertyCategory } from '../../types/property';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onToggleSave?: (propertyId: number) => void;
  className?: string;
}

const PropertyCard = ({ property, isSaved = false, onToggleSave, className = '' }: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);

  const primaryImage = property.media.find(img => img.isPrimary) || property.media[0];
  
  // Fallback image paths for different property types
  const getFallbackImage = () => {
    if (property.category === PropertyCategory.COMMERCIAL) {
      return '/assets/images/fallback-commercial.jpg';
    }
    return '/assets/images/fallback-residential.jpg';
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSave) {
      onToggleSave(property.id);
    }
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`card group transition-all duration-300 hover:shadow-lg ${className}`}>
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={imageError ? getFallbackImage() : primaryImage?.url}
              alt={property.title}
              onError={handleImageError}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Category label */}
          <div className="absolute top-3 left-3 bg-white dark:bg-secondary-800 px-2 py-1 text-xs font-semibold rounded-full">
            {property.category === PropertyCategory.RESIDENTIAL ? 'Residential' : 'Commercial'}
          </div>
          
          {/* Features overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                {property.bedrooms !== undefined && (
                  <span className="mr-3">{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
                )}
                {property.bathrooms !== undefined && (
                  <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
                )}
              </div>
              <div>{property.area} {property.areaUnit}</div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button 
              onClick={handleSaveClick}
              className="p-2 bg-white dark:bg-secondary-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-secondary-700 transition-colors"
              aria-label={isSaved ? "Remove from saved" : "Save property"}
            >
              {isSaved ? (
                <HeartIconSolid className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
          
          {/* Verification badge */}
          {property.isVerified && (
            <div className="absolute top-3 left-24 bg-primary-500 text-white px-2 py-1 text-xs font-semibold rounded-full">
              Verified
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{property.title}</h3>
            <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{formattedPrice}</p>
          </div>
          
          <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location.address}, {property.location.city}</span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {property.description}
          </p>
          
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-secondary-700 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={property.agent.photo || "https://via.placeholder.com/32"}
                alt={property.agent.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{property.agent.name}</span>
            </div>
            
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(property.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard; 