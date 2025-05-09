'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaHeart, FaShare } from 'react-icons/fa';

// Mock property data (in a real app, this would be fetched from an API)
const propertyData = {
  id: 1,
  title: "Modern Family Home in DHA Phase 5",
  description: "This beautiful modern family home is located in the prestigious DHA Phase 5 neighborhood of Lahore. The property features 4 spacious bedrooms, 3 bathrooms, a large living area, and a modern kitchen. The house also has a beautiful garden and a 2-car garage. Perfect for a growing family looking for comfort and luxury in a prime location.",
  location: "DHA Phase 5, Lahore",
  price: 25000000,
  purpose: "Sale",
  bedrooms: 4,
  bathrooms: 3,
  area: 2500,
  features: [
    "Central Air Conditioning",
    "Central Heating",
    "Fully Furnished",
    "Garden",
    "Garage",
    "Security System",
    "Swimming Pool",
    "Servant Quarters",
    "24/7 Security",
    "Backup Generator"
  ],
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  ],
  agent: {
    name: "Ahmed Khan",
    phone: "+92 300 1234567",
    email: "ahmed.khan@apnizameen.com",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop"
  },
  createdAt: "2023-05-15"
};

const PropertyDetailsPage = ({ params }) => {
  const { id } = params;
  const property = propertyData; // In a real app, fetch property by ID
  
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/properties" className="text-gray-500 hover:text-green-600">Properties</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{property.title}</span>
          </nav>
        </div>
        
        {/* Property Title and Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <p className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-green-600" />
              {property.location}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button 
              onClick={toggleFavorite}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-50"
            >
              <FaHeart className={isFavorite ? "text-red-500" : "text-gray-400"} />
              <span>Save</span>
            </button>
            
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-50">
              <FaShare className="text-gray-600" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image 
                src={property.images[activeImage]} 
                alt={property.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {property.images.map((image, index) => (
              <div 
                key={index}
                className={`relative h-44 rounded-lg overflow-hidden cursor-pointer ${index === activeImage ? 'ring-2 ring-green-600' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <Image 
                  src={image} 
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 16vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Details and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="md:col-span-2">
            {/* Price and Basic Details */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-green-600">
                  PKR {property.price.toLocaleString()}
                  {property.purpose === 'Rent' && <span className="text-gray-500 text-lg font-normal">/month</span>}
                </h2>
                <span className="bg-green-600 text-white py-1 px-3 rounded-md text-sm font-medium">
                  {property.purpose}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-6 text-gray-700">
                <div className="flex items-center">
                  <FaBed className="mr-2 text-green-600" size={20} />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-2 text-green-600" size={20} />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <FaRulerCombined className="mr-2 text-green-600" size={20} />
                  <span>{property.area} sq ft</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
            
            {/* Features */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Location Map */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map will be displayed here</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact Agent */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
              
              <div className="flex items-center mb-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={property.agent.image} 
                    alt={property.agent.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{property.agent.name}</h4>
                  <p className="text-gray-600 text-sm">{property.agent.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <a 
                  href={`tel:${property.agent.phone}`} 
                  className="flex items-center justify-center w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                >
                  <FaPhone className="mr-2" />
                  Call Agent
                </a>
                
                <a 
                  href={`https://wa.me/${property.agent.phone.replace(/\s+/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-100 text-green-800 py-3 rounded-md hover:bg-green-200"
                >
                  <FaWhatsapp className="mr-2" />
                  WhatsApp
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-4">Send a Message</h4>
                <form>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input 
                      type="tel" 
                      placeholder="Your Phone" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea 
                      placeholder="Your Message" 
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage; 