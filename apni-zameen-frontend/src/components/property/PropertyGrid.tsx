import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Property } from '../../types/property';
import propertyService from '../../services/propertyService';
import { useAuth } from '../../hooks/useAuth';

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  error?: string | null;
  columns?: number;
  showSaveButton?: boolean;
  savedProperties?: number[];
  onToggleSave?: (propertyId: number) => void;
  emptyMessage?: string;
}

const PropertyGrid = ({
  properties,
  loading = false,
  error = null,
  columns = 3,
  showSaveButton = true,
  savedProperties = [],
  onToggleSave,
  emptyMessage = 'No properties found',
}: PropertyGridProps) => {
  const { isAuthenticated } = useAuth();
  const [userSavedProperties, setUserSavedProperties] = useState<number[]>(savedProperties);
  
  // If savedProperties changes externally, update our state
  useEffect(() => {
    setUserSavedProperties(savedProperties);
  }, [savedProperties]);

  const handleToggleSave = async (propertyId: number) => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      window.location.href = `/login?redirect=/property/${propertyId}`;
      return;
    }

    try {
      if (userSavedProperties.includes(propertyId)) {
        await propertyService.unsaveProperty(propertyId);
        setUserSavedProperties(prev => prev.filter(id => id !== propertyId));
      } else {
        await propertyService.saveProperty(propertyId);
        setUserSavedProperties(prev => [...prev, propertyId]);
      }

      // Call parent callback if provided
      if (onToggleSave) {
        onToggleSave(propertyId);
      }
    } catch (error) {
      console.error('Error toggling save property:', error);
    }
  };

  // Determine grid columns class based on the columns prop
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  if (loading) {
    return (
      <div className={`grid ${gridColsClass} gap-6`}>
        {[...Array(columns * 2)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-secondary-700"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>;
  }

  if (properties.length === 0) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">{emptyMessage}</div>;
  }

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          isSaved={userSavedProperties.includes(property.id)}
          onToggleSave={showSaveButton ? handleToggleSave : undefined}
        />
      ))}
    </div>
  );
};

export default PropertyGrid; 