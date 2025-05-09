'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaBuilding, FaHeart, FaEnvelope, FaUser, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa';

// Mock user data
const userData = {
  name: 'Ahmed Khan',
  email: 'ahmed.khan@example.com',
  phone: '+92 300 1234567',
  avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop',
  accountType: 'agent'
};

// Mock listings data
const listingsData = [
  {
    id: 1,
    title: 'Modern Family Home',
    location: 'DHA Phase 5, Lahore',
    price: 25000000,
    purpose: 'Sale',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Luxury Apartment',
    location: 'Gulberg III, Lahore',
    price: 18500000,
    purpose: 'Sale',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Commercial Office Space',
    location: 'Blue Area, Islamabad',
    price: 120000,
    purpose: 'Rent',
    status: 'pending',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop'
  }
];

// Mock saved properties
const savedProperties = [
  {
    id: 4,
    title: 'Penthouse Apartment',
    location: 'Clifton, Karachi',
    price: 35000000,
    purpose: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Farmhouse with Pool',
    location: 'Bedian Road, Lahore',
    price: 45000000,
    purpose: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop'
  }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('listings');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <Link 
                href="/dashboard/add-property" 
                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-700"
              >
                <FaPlus />
                <span>Add New Property</span>
              </Link>
            </div>
            
            {listingsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listingsData.map(listing => (
                  <div key={listing.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={listing.imageUrl} 
                        alt={listing.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-md ${
                        listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {listing.status === 'active' ? 'Active' : 'Pending'}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800">{listing.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{listing.location}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-green-600 font-bold">
                          PKR {listing.price.toLocaleString()}
                          {listing.purpose === 'Rent' && <span className="text-gray-500 text-sm font-normal">/month</span>}
                        </p>
                        <span className="bg-green-600 text-white py-1 px-2 text-xs rounded-md">
                          {listing.purpose}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Link 
                          href={`/dashboard/edit-property/${listing.id}`} 
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Edit
                        </Link>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <p className="text-gray-500 mb-4">You haven't added any properties yet.</p>
                <Link 
                  href="/dashboard/add-property" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md inline-flex items-center space-x-2 hover:bg-green-700"
                >
                  <FaPlus />
                  <span>Add Your First Property</span>
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'saved':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Saved Properties</h2>
            
            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map(property => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={property.imageUrl} 
                        alt={property.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md">
                        <FaHeart className="text-red-500" size={18} />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800">{property.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-green-600 font-bold">
                          PKR {property.price.toLocaleString()}
                          {property.purpose === 'Rent' && <span className="text-gray-500 text-sm font-normal">/month</span>}
                        </p>
                        <span className="bg-green-600 text-white py-1 px-2 text-xs rounded-md">
                          {property.purpose}
                        </span>
                      </div>
                      <div className="mt-4">
                        <Link 
                          href={`/property-details/${property.id}`} 
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <p className="text-gray-500 mb-4">You haven't saved any properties yet.</p>
                <Link 
                  href="/properties" 
                  className="bg-green-600 text-white px-4 py-2 rounded-md inline-flex items-center space-x-2 hover:bg-green-700"
                >
                  Browse Properties
                </Link>
              </div>
            )}
          </div>
        );
      
      case 'messages':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Messages</h2>
            <div className="bg-gray-50 p-8 text-center rounded-lg">
              <p className="text-gray-500">You have no messages yet.</p>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6">
                  <Image 
                    src={userData.avatar} 
                    alt={userData.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{userData.name}</h3>
                  <p className="text-gray-600">{userData.email}</p>
                  <p className="text-gray-600">{userData.phone}</p>
                  <p className="text-green-600 mt-1 font-medium capitalize">{userData.accountType}</p>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      defaultValue={userData.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue={userData.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      defaultValue={userData.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Leave blank to keep current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={userData.avatar} 
                    alt={userData.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h2 className="font-semibold">{userData.name}</h2>
                  <p className="text-sm text-gray-600 capitalize">{userData.accountType}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === 'listings' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaBuilding />
                  <span>My Listings</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === 'saved' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaHeart />
                  <span>Saved Properties</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === 'messages' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaEnvelope />
                  <span>Messages</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
                    activeTab === 'profile' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </button>
                
                <Link
                  href="/settings"
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCog />
                  <span>Settings</span>
                </Link>
                
                <Link
                  href="/logout"
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </Link>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 