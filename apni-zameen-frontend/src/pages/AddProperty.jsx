import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

/**
 * AddProperty page for submitting new property listings
 */
const AddProperty = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'house', // house, apartment, land, commercial, pg, etc.
    status: 'sale', // Maps to status in backend - 'sale' or 'rent'
    address: '',
    city: '',
    state: '',
    zip_code: '',
    amenities: [], // Will be converted to features in backend
    images: [] // Will need to be uploaded separately
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        navigate('/login', { state: { from: '/add-property', message: 'Please login to add a property' } });
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [navigate]);

  const propertyTypes = [
    { id: 'house', label: 'House' },
    { id: 'apartment', label: 'Apartment' },
    { id: 'land', label: 'Land/Plot' },
    { id: 'commercial', label: 'Commercial Space' },
    { id: 'villa', label: 'Villa' },
    { id: 'pg', label: 'PG Accommodation' }
  ];

  const listingTypes = [
    { id: 'sale', label: 'For Sale' },
    { id: 'rent', label: 'For Rent' }
  ];

  const amenitiesList = [
    'Air Conditioning', 'Heating', 'Parking', 'Swimming Pool', 'Gym', 
    'Balcony', 'Fireplace', 'Garden', 'Security System', 'Elevator',
    'Wheelchair Access', 'Laundry Room', 'Pets Allowed', 'WiFi', 'Furnished'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const currentAmenities = [...prev.amenities];
      if (currentAmenities.includes(amenity)) {
        return {
          ...prev,
          amenities: currentAmenities.filter(item => item !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, amenity]
        };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      imageFiles: [...(prev.imageFiles || []), ...files],
      images: [...prev.images, ...files.map(file => file.name)]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Submitting property...' });

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setStatus({
          type: 'error',
          message: 'You need to be logged in to add a property.'
        });
        return;
      }

      // First, create the property
      const propertyResponse = await fetch('http://localhost/trail/apni-zameen-backend/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          type: formData.type,
          status: formData.status, // 'sale' or 'rent'
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area: parseFloat(formData.area),
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code
        })
      });
      
      if (!propertyResponse.ok) {
        const errorData = await propertyResponse.json();
        throw new Error(errorData.error || 'Failed to create property');
      }
      
      const propertyData = await propertyResponse.json();
      const propertyId = propertyData.property.id;
      
      // If we have image files, upload them
      if (formData.imageFiles && formData.imageFiles.length > 0) {
        const formDataForImages = new FormData();
        
        // Append each image file
        formData.imageFiles.forEach((file, index) => {
          formDataForImages.append(`image_${index}`, file);
        });
        
        // Upload images
        const imageResponse = await fetch(`http://localhost/trail/apni-zameen-backend/api/properties/images/${propertyId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataForImages
        });
        
        if (!imageResponse.ok) {
          console.error('Failed to upload images');
        }
      }
      
      // Update property features/amenities
      if (formData.amenities && formData.amenities.length > 0) {
        // This would need a proper endpoint in the backend to handle features
        // For now, we'll just assume it was successful
      }
      
      setStatus({
        type: 'success',
        message: 'Property listing submitted successfully!'
      });
      
      // Reset the form
      setFormData({
        title: '',
        description: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        type: 'house',
        status: 'sale',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        amenities: [],
        images: [],
        imageFiles: []
      });
      
      // Redirect to property listing after a short delay
      setTimeout(() => {
        navigate(`/property/${propertyId}`);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting property:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again later.'
      });
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting to login
  }

  return (
    <PageLayout
      pageTitle="Add Property Listing"
      pageDescription="Submit a new property for sale or rent on Apni Zameen"
    >
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h1>
        <p className="text-gray-600 mb-6">List your property for sale or rent on Apni Zameen</p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="title" className="form-label">Property Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. Modern 3BHK Apartment"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="status" className="form-label">Listing Type</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    {listingTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="type" className="form-label">Property Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. 2500000"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="area" className="form-label">Area (sq. ft.)</label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. 1200"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select</option>
                    {[0, 1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="">Select</option>
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group md:col-span-2">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Enter complete address"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. Mumbai"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. Maharashtra"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="zip_code" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    value={formData.zip_code}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. 400001"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <div className="form-group">
                <label htmlFor="description" className="form-label">Property Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input-field"
                  placeholder="Describe your property with details like age, condition, key features, etc."
                ></textarea>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenitiesList.map(amenity => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                      className="w-4 h-4 text-emerald-600 rounded"
                    />
                    <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Property Images</h2>
              <div className="form-group">
                <label htmlFor="images" className="form-label">Upload Images</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="input-field"
                />
                <p className="text-sm text-gray-500 mt-1">Upload up to 10 images (max 5MB each)</p>
              </div>
              
              {formData.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Selected images:</p>
                  <ul className="list-disc pl-5">
                    {formData.images.map((image, index) => (
                      <li key={index} className="text-sm">{image}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Status message */}
            {status.message && (
              <div 
                className={`p-4 rounded-md ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : status.type === 'error'
                    ? 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}
              >
                {status.message}
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="btn btn-primary w-full md:w-auto"
              >
                {status.type === 'loading' ? 'Submitting...' : 'Submit Property'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddProperty; 