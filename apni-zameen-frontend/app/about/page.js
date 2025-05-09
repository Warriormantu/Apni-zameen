import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaUsers, FaBuilding, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Apni Zameen</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property in India. We connect buyers, sellers, and renters to make property transactions simple and transparent.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2020, Apni Zameen was born out of a vision to transform the real estate landscape in India. We recognized the challenges faced by property buyers and sellers in navigating the complex real estate market, and set out to create a platform that would make the process simpler, more transparent, and more efficient.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                What started as a small team with big dreams has now grown into one of India's leading property portals, connecting thousands of buyers, sellers, and real estate agents across the country. Our commitment to innovation, integrity, and customer satisfaction has been the cornerstone of our success.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue to evolve and expand our services, leveraging the latest technology to provide an unmatched property search experience. Our mission remains unchanged: to help every Indian find their perfect property with ease and confidence.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop" 
                alt="Apni Zameen Office"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                <FaCheckCircle className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-gray-700">
                We believe in complete transparency in all our dealings. We provide accurate property information and ensure fair transactions for all parties involved.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                <FaUsers className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer First</h3>
              <p className="text-gray-700">
                Our customers are at the heart of everything we do. We strive to understand their needs and provide solutions that exceed their expectations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
                <FaHandshake className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-700">
                We uphold the highest standards of integrity in our business practices. Trust is the foundation of our relationships with clients and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop" 
                  alt="CEO"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Ahmed Khan</h3>
                <p className="text-green-600 mb-4">CEO & Founder</p>
                <p className="text-gray-700">
                  With over 15 years of experience in real estate, Ahmed leads our vision and strategy.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop" 
                  alt="COO"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Fatima Ali</h3>
                <p className="text-green-600 mb-4">Chief Operations Officer</p>
                <p className="text-gray-700">
                  Fatima ensures our day-to-day operations run smoothly and efficiently.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2187&auto=format&fit=crop" 
                  alt="CTO"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Usman Malik</h3>
                <p className="text-green-600 mb-4">Chief Technology Officer</p>
                <p className="text-gray-700">
                  Usman leads our tech team, developing innovative solutions for our platform.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-64">
                <Image 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2061&auto=format&fit=crop" 
                  alt="Marketing Director"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">Ayesha Mahmood</h3>
                <p className="text-green-600 mb-4">Marketing Director</p>
                <p className="text-gray-700">
                  Ayesha drives our brand strategy and marketing initiatives across all channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p className="text-xl">Properties Listed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-xl">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-xl">Expert Agents</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <p className="text-xl">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through Apni Zameen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700">
              Browse Properties
            </Link>
            <Link href="/contact" className="bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-md font-medium hover:bg-green-50">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 