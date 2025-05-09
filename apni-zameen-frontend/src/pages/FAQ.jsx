import React, { useState } from 'react';

/**
 * FAQ page component
 */
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I search for properties on Apni Zameen?',
      answer: 'You can search for properties by using the search bar on our homepage. Filter results by location, property type, price range, number of bedrooms, and more to find your perfect property.'
    },
    {
      question: 'What are the fees for using Apni Zameen?',
      answer: 'Apni Zameen offers different pricing plans for property listings. Basic listings are free, while premium listings with additional features are available at competitive rates. You can view our complete pricing details on our Pricing page.'
    },
    {
      question: 'How do I contact a property owner or agent?',
      answer: 'Each property listing includes contact information or a contact form. Simply click on the "Contact" button on any listing to send a message directly to the owner or agent.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. Please refer to our Privacy Policy for more details.'
    },
    {
      question: 'Can I list my property for rent or sale?',
      answer: 'Yes, you can list your property by creating an account and clicking on "List Your Property" in your dashboard. Follow the steps to provide details about your property, upload photos, and set your price.'
    },
    {
      question: 'How do I schedule a property viewing?',
      answer: 'You can request a property viewing directly through the property listing page. Click on "Schedule Viewing" and choose your preferred date and time. The property owner or agent will confirm your appointment.'
    },
    {
      question: 'What should I look for during a property viewing?',
      answer: 'During a property viewing, check for structural issues, proper functioning of utilities, natural lighting, noise levels, and the overall condition of the property. Our blog has a comprehensive property viewing checklist you can reference.'
    },
    {
      question: 'How do I report an issue with a listing?',
      answer: 'If you notice any issues with a listing, such as inaccurate information or suspicious activity, please click on the "Report" button on the listing page or contact our support team directly.'
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="mb-6">
          Find answers to commonly asked questions about using Apni Zameen and our services. 
          If you can't find what you're looking for, please don't hesitate to <a href="/contact" className="text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300">contact us</a>.
        </p>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white py-2 focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`w-5 h-5 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className={`mt-2 ${activeIndex === index ? 'block' : 'hidden'}`}>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-emerald-50 dark:bg-emerald-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
        <p className="mb-4">
          Our customer support team is always ready to help you with any questions or concerns.
        </p>
        <a href="/contact" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ; 