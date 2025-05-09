import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import ImageUpload from '../components/common/ImageUpload';
import { API_BASE_URL } from '../config/apiConfig';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/common/PageTitle';

const Sell = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // User info
    userType: '',
    name: '',
    phone: '',
    email: '',
    
    // Property details
    propertyType: '',
    propertySubType: '',
    listingType: 'Sell',
    
    // Location details
    city: '',
    locality: '',
    address: '',
    
    // Area and pricing
    areaUnit: 'sq ft',
    areaSize: '',
    price: '',
    priceUnit: '₹',
    
    // Features and amenities
    bedrooms: '',
    bathrooms: '',
    balconies: '',
    furnished: 'Unfurnished',
    facing: '',
    floorLevel: '',
    totalFloors: '',
    
    // Additional details
    age: '',
    possession: '',
    description: '',
    
    // Images
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - API call would go here
    console.log('Form submitted:', formData);
    alert('Property listing created successfully!');
    // Reset form or show success message
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Step 1: User Type Selection
  const renderStep1 = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">I am a*</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.userType === 'Owner' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, userType: 'Owner'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Owner</span>
            </button>
            
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.userType === 'Agent' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, userType: 'Agent'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Agent</span>
            </button>
            
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.userType === 'Builder' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, userType: 'Builder'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Builder</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Your Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-gray-700 mb-2">Your Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="ex. (999) 999-9999"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Your Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@apnizameen.com"
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        
        <button
          type="button"
          onClick={nextStep}
          disabled={!formData.userType || !formData.name || !formData.phone || !formData.email}
          className={`w-full mt-6 py-3 px-4 rounded-md transition duration-200 ${!formData.userType || !formData.name || !formData.phone || !formData.email ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'}`}
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 2: Property Type Selection
  const renderStep2 = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Property Type*</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.propertyType === 'Residential' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, propertyType: 'Residential'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Residential</span>
            </button>
            
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.propertyType === 'Commercial' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, propertyType: 'Commercial'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>Commercial</span>
            </button>
            
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${formData.propertyType === 'Land' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}`}
              onClick={() => setFormData({...formData, propertyType: 'Land'})}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Land/Plot</span>
            </button>
          </div>
        </div>
        
        {formData.propertyType === 'Residential' && (
          <div>
            <label className="block text-gray-700 mb-2">Residential Property Type*</label>
            <select
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
              <option value="Builder Floor">Builder Floor</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Studio Apartment">Studio Apartment</option>
              <option value="Service Apartment">Service Apartment</option>
            </select>
          </div>
        )}
        
        {formData.propertyType === 'Commercial' && (
          <div>
            <label className="block text-gray-700 mb-2">Commercial Property Type*</label>
            <select
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select type</option>
              <option value="Office Space">Office Space</option>
              <option value="Shop">Shop/Showroom</option>
              <option value="Commercial Land">Commercial Land</option>
              <option value="Warehouse">Warehouse/Godown</option>
              <option value="Industrial Land">Industrial Land</option>
              <option value="Industrial Building">Industrial Building</option>
              <option value="Restaurant/Cafe">Restaurant/Cafe</option>
            </select>
          </div>
        )}
        
        {formData.propertyType === 'Land' && (
          <div>
            <label className="block text-gray-700 mb-2">Land Type*</label>
            <select
              name="propertySubType"
              value={formData.propertySubType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select type</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Commercial Plot">Commercial Plot</option>
              <option value="Agricultural Land">Agricultural Land</option>
              <option value="Industrial Land">Industrial Land</option>
            </select>
          </div>
        )}
        
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 py-3 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-md transition duration-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.propertyType || !formData.propertySubType}
            className={`w-1/2 py-3 px-4 rounded-md transition duration-200 ${!formData.propertyType || !formData.propertySubType ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Location Details
  const renderStep3 = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Property Location</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-gray-700 mb-2">City*</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Noida">Noida</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="locality" className="block text-gray-700 mb-2">Locality/Area*</label>
          <input
            type="text"
            id="locality"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-gray-700 mb-2">Complete Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 py-3 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-md transition duration-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.city || !formData.locality}
            className={`w-1/2 py-3 px-4 rounded-md transition duration-200 ${!formData.city || !formData.locality ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  // Step 4: Area and Price
  const renderStep4 = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Area & Price Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Area*</label>
          <div className="flex">
            <input
              type="number"
              name="areaSize"
              value={formData.areaSize}
              onChange={handleChange}
              placeholder="Enter area"
              className="w-3/4 p-3 border border-gray-300 rounded-l-md"
              required
            />
            <select
              name="areaUnit"
              value={formData.areaUnit}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 border-l-0 rounded-r-md bg-gray-50"
            >
              <option value="sq ft">sq ft</option>
              <option value="sq m">sq m</option>
              <option value="acre">acre</option>
              <option value="gaj">gaj</option>
              <option value="bigha">bigha</option>
              <option value="marla">marla</option>
              <option value="kanal">kanal</option>
              <option value="hectare">hectare</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Expected Price*</label>
          <div className="flex">
            <select
              name="priceUnit"
              value={formData.priceUnit}
              onChange={handleChange}
              className="w-1/4 p-3 border border-gray-300 rounded-l-md bg-gray-50"
            >
              <option value="₹">₹</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </select>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-3/4 p-3 border border-gray-300 border-l-0 rounded-r-md"
              required
            />
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 py-3 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-md transition duration-200"
          >
            Back
          </button>
          <button
            type="button"
            onClick={nextStep}
            disabled={!formData.areaSize || !formData.price}
            className={`w-1/2 py-3 px-4 rounded-md transition duration-200 ${!formData.areaSize || !formData.price ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold'}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  // Step 5: Add property images
  const renderImageStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Property Images</h2>
      <p className="mb-4 text-gray-600">
        Good quality images can significantly increase interest in your property.
        Upload clear photos of different areas of your property.
      </p>
      
      <ImageUpload
        endpoint="/properties/temp-images"
        onSuccess={(response) => {
          if (response.images && response.images.length > 0) {
            setFormData({
              ...formData,
              images: [...formData.images, ...response.images]
            });
          }
        }}
        onError={(error) => console.error('Upload error:', error)}
        multiple={true}
        maxFiles={5}
      />
      
      {formData.images.length > 0 && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Uploaded Images:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url || image}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = [...formData.images];
                    newImages.splice(index, 1);
                    setFormData({...formData, images: newImages});
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Final Step: Review & Submit
  const renderFinalStep = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Review and Submit</h2>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Property Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Property Type</p>
              <p>{formData.propertyType} - {formData.propertySubType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p>{formData.locality}, {formData.city}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p>{formData.areaSize} {formData.areaUnit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p>{formData.priceUnit} {formData.price}</p>
            </div>
          </div>
        </div>
        
        <div className="border-b pb-4">
          <h3 className="font-medium text-gray-700 mb-2">Contact Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Listed By</p>
              <p>{formData.userType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p>{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{formData.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{formData.email}</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="w-1/2 py-3 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-md transition duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-md transition duration-200"
          >
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'User Info' },
      { number: 2, title: 'Property Details' },
      { number: 3, title: 'Location' },
      { number: 4, title: 'Features' },
      { number: 5, title: 'Images' },
      { number: 6, title: 'Review' }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.number ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-gray-300 text-gray-500'}`}
              >
                {currentStep > step.number ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= step.number ? 'text-emerald-600 font-medium' : 'text-gray-500'}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative flex justify-between mt-3">
          {steps.slice(0, -1).map((step, i) => (
            <div key={i} className="w-full h-1 bg-gray-200">
              <div 
                className={`h-full bg-emerald-500 ${currentStep > step.number + 1 ? 'w-full' : currentStep > step.number ? 'w-1/2' : 'w-0'}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <PageTitle title="Sell Property" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">List Your Property</h1>
        {renderStepIndicator()}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderImageStep()}
          {currentStep === 6 && renderFinalStep()}
        </div>
      </div>
    </Layout>
  );
};

export default Sell; 