import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Link } from 'react-router-dom';

/**
 * About page component
 */
const About = () => {
  return (
    <PageLayout
      pageTitle="About Us"
      pageDescription="Learn about Apni Zameen, our mission, vision and values"
    >
      <div className="page-container">
        <h1 className="text-3xl font-bold mb-6">About Apni Zameen</h1>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Apni Zameen is a modern real estate platform that connects homebuyers, sellers, and renters with their perfect properties. Our mission is to make the real estate experience seamless, transparent, and efficient for everyone involved.
          </p>
          <p className="mb-4">
            Founded in 2024, Apni Zameen was born from a vision to revolutionize the real estate industry. We saw an opportunity to create a platform that not only simplifies property search but also provides a comprehensive solution for all real estate needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-3">Our Mission</h3>
            <p>To transform the way people buy, sell, and rent properties by providing a transparent, efficient, and user-friendly platform.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-3">Our Vision</h3>
            <p>To become the most trusted real estate platform, helping millions of people find their dream properties with ease.</p>
          </div>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-3">Our Values</h3>
            <p>We believe in transparency, integrity, innovation, and putting our customers first in everything we do.</p>
          </div>
        </div>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Why Choose Apni Zameen?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Thousands of verified properties across India</li>
            <li>Direct connection with property owners and agents</li>
            <li>Advanced search filters to find exactly what you're looking for</li>
            <li>Detailed property listings with high-quality photos and virtual tours</li>
            <li>Neighborhood insights and market trends</li>
            <li>Dedicated support team to assist you throughout your journey</li>
          </ul>
        </div>
        
        <div className="bg-emerald-50 dark:bg-emerald-900 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
          <p className="mb-4">
            We'd love to hear from you! Reach out to our team with any questions, feedback, or partnership opportunities.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default About; 