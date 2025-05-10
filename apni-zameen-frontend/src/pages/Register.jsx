import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuthTemplate from '../components/AuthTemplate';

/**
 * Register page component using the shared AuthTemplate
 */
const Register = () => {
  const navigate = useNavigate();
  
  // Form fields configuration
  const registerFields = [
    {
      name: 'name',
      label: 'Full name',
      type: 'text',
      autoComplete: 'name',
      required: true,
      placeholder: 'John Doe'
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      autoComplete: 'email',
      required: true,
      placeholder: 'you@example.com',
      validate: (value) => {
        if (!value.includes('@')) {
          return 'Please enter a valid email address';
        }
        return null;
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      placeholder: '••••••••',
      validate: (value) => {
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        return null;
      }
    },
    {
      name: 'confirmPassword',
      label: 'Confirm password',
      type: 'password',
      autoComplete: 'new-password',
      required: true,
      placeholder: '••••••••',
      validate: (value, formData) => {
        if (value !== formData.password) {
          return 'Passwords do not match';
        }
        return null;
      }
    }
  ];
  
  // Form submission handler
  const handleRegister = async (formData) => {
    console.log('Register form data:', formData);
    
    // Simulate registration process
    // In a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
      
    // For now, just simulate a successful registration
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <Layout>
      <AuthTemplate
        type="register"
        title="Create your account"
        subtitle="Join Apni Zameen to find your dream property"
        fields={registerFields}
        onSubmit={handleRegister}
        useStaticPage={false}
      />
    </Layout>
  );
};

export default Register; 