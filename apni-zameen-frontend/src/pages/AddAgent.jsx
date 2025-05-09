import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

/**
 * AddAgent page for registering new real estate agents
 */
const AddAgent = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    bio: '',
    specialization: 'residential',
    experience: '',
    licenseNumber: '',
  });

  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  // Check if user is authenticated and has admin privileges
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      
      if (!token) {
        navigate('/login', { state: { from: '/add-agent', message: 'Please login to add an agent' } });
        return;
      }
      
      if (userRole !== 'admin' && userRole !== 'agent') {
        navigate('/dashboard', { state: { message: 'You do not have permission to add agents' } });
        return;
      }
      
      setIsAdmin(true);
    };

    checkAuth();
  }, [navigate]);

  const specializationOptions = [
    { id: 'residential', label: 'Residential Properties' },
    { id: 'commercial', label: 'Commercial Properties' },
    { id: 'industrial', label: 'Industrial Properties' },
    { id: 'land', label: 'Land & Plots' },
    { id: 'luxury', label: 'Luxury Properties' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Creating agent account...' });

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setStatus({
        type: 'error',
        message: 'Passwords do not match.'
      });
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setStatus({
          type: 'error',
          message: 'Authentication required.'
        });
        return;
      }

      // In a real implementation, this would be an API call
      // For now, we'll simulate a successful registration
      
      // Example API call to create an agent
      /* 
      const response = await fetch('http://localhost/trail/apni-zameen-backend/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          bio: formData.bio,
          specialization: formData.specialization,
          experience: parseInt(formData.experience),
          license_number: formData.licenseNumber
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create agent account');
      }
      
      const data = await response.json();
      */
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus({
        type: 'success',
        message: 'Agent account created successfully!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        bio: '',
        specialization: 'residential',
        experience: '',
        licenseNumber: '',
      });
      
      // Redirect to agents page after a delay
      setTimeout(() => {
        navigate('/agents');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating agent:', error);
      setStatus({
        type: 'error',
        message: error.message || 'Failed to create agent account. Please try again.'
      });
    }
  };

  if (!isAdmin) {
    return null; // Don't render anything while checking permissions
  }

  return (
    <PageLayout
      pageTitle="Add Agent"
      pageDescription="Register a new real estate agent on Apni Zameen"
    >
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Add New Agent</h1>
        <p className="text-gray-600 mb-6">Register a new real estate professional on Apni Zameen</p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. agent@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="••••••••"
                    minLength="8"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="••••••••"
                    minLength="8"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g. +91 9876543210"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Business address"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="specialization" className="form-label">Specialization</label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="input-field"
                  >
                    {specializationOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="experience" className="form-label">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    className="input-field"
                    placeholder="e.g. 5"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="licenseNumber" className="form-label">License Number</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g. RERA-12345"
                  />
                </div>
                
                <div className="form-group md:col-span-2">
                  <label htmlFor="bio" className="form-label">Bio / About</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="input-field"
                    placeholder="Brief professional bio and areas of expertise"
                  ></textarea>
                </div>
              </div>
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
                {status.type === 'loading' ? 'Creating Account...' : 'Add Agent'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddAgent; 