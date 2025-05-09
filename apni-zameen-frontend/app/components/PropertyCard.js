'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative">
        <Link href={`/property-details/${property.id}`}>
          <div className="h-48 relative">
            <Image 
              src={property.imageUrl} 
              alt={property.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md"
        >
          <FaHeart 
            className={`${isFavorite ? 'text-red-500' : 'text-gray-400'} transition-colors duration-300`}
            size={18}
          />
        </button>
        <div className="absolute bottom-0 left-0 bg-green-600 text-white py-1 px-3 text-sm font-medium">
          {property.purpose}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-1 text-gray-800">
              <Link href={`/property-details/${property.id}`} className="hover:text-green-600">
                {property.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-2">{property.location}</p>
          </div>
          <p className="text-green-600 font-bold">
            PKR {property.price.toLocaleString()}
            {property.purpose === 'Rent' && <span className="text-gray-500 text-sm font-normal">/month</span>}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 text-gray-600 text-sm">
          <div className="flex items-center">
            <FaBed className="mr-1" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <FaBath className="mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <FaRulerCombined className="mr-1" />
            <span>{property.area} sq ft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 