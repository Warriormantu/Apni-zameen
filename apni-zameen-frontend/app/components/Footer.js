import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Apni Zameen</h2>
            <p className="text-gray-300 mb-4">
              Your trusted partner in finding the perfect property in India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?type=residential" className="text-gray-300 hover:text-white">
                  Residential
                </Link>
              </li>
              <li>
                <Link href="/properties?type=commercial" className="text-gray-300 hover:text-white">
                  Commercial
                </Link>
              </li>
              <li>
                <Link href="/properties?type=plots" className="text-gray-300 hover:text-white">
                  Plots
                </Link>
              </li>
              <li>
                <Link href="/properties?type=farmhouses" className="text-gray-300 hover:text-white">
                  Farmhouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p>123 Main Street</p>
              <p>New Delhi, India</p>
              <p className="mt-3">Email: info@apnizameen.com</p>
              <p>Phone: +91 123 4567890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Apni Zameen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 