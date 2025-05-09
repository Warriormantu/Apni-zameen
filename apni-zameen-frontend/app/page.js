'use client';
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaHome, FaBuilding, FaLandmark, FaHandshake } from "react-icons/fa";
import SearchFilter from "./components/SearchFilter";
import PropertyCard from "./components/PropertyCard";

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: "Modern Family Home",
    location: "DLF Phase 5, Gurgaon",
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
    location: "Bandra West, Mumbai",
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
    location: "Connaught Place, Delhi",
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
    location: "Electronic City, Bangalore",
    price: 9500000,
    purpose: "Sale",
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-cover bg-center flex items-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2796&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find Your Dream Property in India
          </h1>
          <p className="text-xl text-white mb-10 max-w-3xl mx-auto">
            Browse thousands of properties for sale and rent across India. Your perfect home is just a search away.
          </p>
          
          {/* Search Container */}
          <div className="max-w-5xl mx-auto">
            <SearchFilter />
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
            <Link href="/properties" className="text-green-600 hover:text-green-700 font-medium">
              View All Properties
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Browse by Property Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/properties?type=residential" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaHome className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Residential</h3>
              <p className="text-gray-600 text-center">Find houses, apartments and more for your family</p>
            </Link>
            
            <Link href="/properties?type=commercial" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaBuilding className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-gray-600 text-center">Office spaces, shops and other commercial properties</p>
            </Link>
            
            <Link href="/properties?type=plots" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaLandmark className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plots</h3>
              <p className="text-gray-600 text-center">Residential and commercial plots for investment</p>
            </Link>
            
            <Link href="/properties?purpose=rent" className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaHandshake className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rentals</h3>
              <p className="text-gray-600 text-center">Properties available for rent across India</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their dream properties through Apni Zameen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="bg-white text-green-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
              Browse Properties
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
