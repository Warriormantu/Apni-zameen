'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-2xl text-green-600">
                Apni Zameen
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Properties
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </Link>
            <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700">
              Register
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/properties" className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium">
              Properties
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/contact" className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
            <Link href="/login" className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-base font-medium">
              Login
            </Link>
            <Link href="/register" className="block bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-green-700 mt-2">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 