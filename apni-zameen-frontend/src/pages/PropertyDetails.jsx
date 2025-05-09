import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import PageTitle from '../components/common/PageTitle';
import FallbackImage from '../components/common/FallbackImage';

const PropertyDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  // Sample property data (in a real app, this would come from an API)
  const property = {
    id: id,
    title: 'Luxurious Villa with Garden View',
    description: 'This stunning villa offers panoramic views of the surrounding landscape and features high-end finishes throughout. The property includes a spacious garden, multiple terraces, and a private swimming pool. Located in a prestigious neighborhood with easy access to schools, shopping centers, and entertainment venues.',
    location: 'Gurgaon, Haryana',
    price: '₹2,50,00,000',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,500 sq ft',
    yearBuilt: 2019,
    furnished: 'Fully Furnished',
    parking: 2,
    images: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=1506',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1575',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1470',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1470'
    ],
          features: [
      'Private Garden',
      'Swimming Pool',
      'Modular Kitchen',
      'Power Backup',
      'Security System',
      'Air Conditioning',
      'Gym',
      'Study Room',
      'Balcony',
      'Corner Property'
          ],
          agent: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@apnizameen.com',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1374'
    },
    nearbyLocations: [
      { name: 'Hospital', distance: '1.5 km' },
      { name: 'School', distance: '0.8 km' },
      { name: 'Shopping Mall', distance: '2 km' },
      { name: 'Airport', distance: '12 km' },
      { name: 'Metro Station', distance: '1.2 km' }
    ]
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleImageChange = (index) => {
    setActiveImage(index);
  };

    return (
    <Layout>
      <PageTitle title={property.title} />
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-emerald-600">Home</Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link to="/buy" className="text-gray-600 hover:text-emerald-600 ml-1 md:ml-2">Properties</Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="text-gray-500 ml-1 md:ml-2">{property.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Property title and type */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-gray-600">{property.location}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className="bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Property image gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="aspect-video overflow-hidden rounded-lg mb-2">
              <FallbackImage 
                src={property.images[activeImage]} 
                alt={`${property.title} - Image ${activeImage + 1}`} 
                className="w-full h-full object-cover"
                fallbackSrc="/assets/images/fallback-property.jpg"
              />
              </div>
            <div className="grid grid-cols-5 gap-2">
              {property.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-emerald-500' : 'border-transparent'}`}
                  onClick={() => handleImageChange(index)}
                >
                    <FallbackImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-16 object-cover"
                      fallbackSrc="/assets/images/fallback-property.jpg"
                    />
                  </div>
                ))}
              </div>
            </div>

        {/* Property price and details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <p className="text-3xl font-bold text-emerald-600">{property.price}</p>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bedrooms:</span>
              <span className="font-medium">{property.bedrooms}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bathrooms:</span>
              <span className="font-medium">{property.bathrooms}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Area:</span>
              <span className="font-medium">{property.area}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Furnished:</span>
              <span className="font-medium">{property.furnished}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Built:</span>
              <span className="font-medium">{property.yearBuilt}</span>
                    </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parking:</span>
              <span className="font-medium">{property.parking} {property.parking === 1 ? 'Space' : 'Spaces'}</span>
                    </div>
                  </div>

          {/* Agent information */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-3">Contact Agent</h3>
            <div className="flex items-center mb-3">
              <img 
                src={property.agent.image} 
                alt={property.agent.name} 
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <p className="font-medium">{property.agent.name}</p>
                <p className="text-gray-600 text-sm">Property Agent</p>
              </div>
                  </div>
            <div className="space-y-2">
              <a 
                href={`tel:${property.agent.phone}`} 
                className="flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Agent
              </a>
              <a 
                href={`mailto:${property.agent.email}`} 
                className="flex items-center justify-center w-full bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 rounded transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                Email Agent
              </a>
                  </div>
                </div>
              </div>
            </div>

      {/* Property description */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{property.description}</p>
                    </div>

          {/* Property features */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{feature}</span>
                    </div>
              ))}
                    </div>
                  </div>

          {/* Nearby locations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Nearby Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.nearbyLocations.map((location, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 py-2">
                  <span className="text-gray-700">{location.name}</span>
                  <span className="text-emerald-600 font-medium">{location.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Send a Message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Your phone number"
              />
      </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="I'm interested in this property and would like more information..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition duration-200"
            >
              Send Message
            </button>
          </form>
                  </div>
                </div>

      {/* Similar properties */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${1550330039369 + item * 100000}-54eda79f2414?q=80&w=1470`} 
                  alt={`Similar Property ${item}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Modern Villa in {['Mumbai', 'Delhi', 'Bangalore'][item - 1]}</h3>
                <p className="text-gray-600 mb-3">{['Mumbai', 'Delhi', 'Bangalore'][item - 1]}, India</p>
                <p className="text-xl font-bold text-emerald-600 mb-3">₹{(1 + item * 0.5).toFixed(1)}0,00,000</p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {item + 2} Beds
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {item + 1} Baths
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                    {(2000 + item * 300)} sq ft
                  </span>
                </div>
                
                <Link to={`/property/${item + 10}`} className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition duration-200">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);
};

export default PropertyDetails; 