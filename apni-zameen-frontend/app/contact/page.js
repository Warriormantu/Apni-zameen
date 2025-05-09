'use client';
import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real app, this would be an API call
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            We're here to help you with any questions or concerns about finding your perfect property.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Our Location</h3>
              <p className="text-gray-700">
                123 Main Street, <br />
                New Delhi, India
              </p>
            </div>
            
            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaPhone className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
              <p className="text-gray-700">
                +92 123 4567890 <br />
                +92 098 7654321
              </p>
            </div>
            
            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaEnvelope className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Address</h3>
              <p className="text-gray-700">
                info@apnizameen.com <br />
                support@apnizameen.com
              </p>
            </div>
            
            {/* Working Hours */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FaClock className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Working Hours</h3>
              <p className="text-gray-700">
                Mon - Fri: 9:00 AM - 6:00 PM <br />
                Sat: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
          
          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {submitSuccess ? (
                <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
                  Thank you for your message! We'll get back to you as soon as possible.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
            
            {/* Map */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Location</h2>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-gray-100 p-4 rounded-full hover:bg-green-100 transition-colors">
              <FaFacebook className="text-gray-700 hover:text-green-600 text-2xl" />
            </a>
            <a href="#" className="bg-gray-100 p-4 rounded-full hover:bg-green-100 transition-colors">
              <FaTwitter className="text-gray-700 hover:text-green-600 text-2xl" />
            </a>
            <a href="#" className="bg-gray-100 p-4 rounded-full hover:bg-green-100 transition-colors">
              <FaInstagram className="text-gray-700 hover:text-green-600 text-2xl" />
            </a>
            <a href="#" className="bg-gray-100 p-4 rounded-full hover:bg-green-100 transition-colors">
              <FaLinkedin className="text-gray-700 hover:text-green-600 text-2xl" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 