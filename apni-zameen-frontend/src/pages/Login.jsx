import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import AuthTemplate from '../components/AuthTemplate';

/**
 * Login page component using the shared AuthTemplate
 */
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';
  const message = location.state?.message;
  
  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  // Form fields configuration
  const loginFields = [
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
      autoComplete: 'current-password',
      required: true,
      placeholder: '••••••••'
    }
  ];
  
  // Form submission handler
  const handleLogin = async (formData) => {
    console.log('Login form data:', formData);
    
    // Simulate authentication
    // In a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo, set roles based on email
    let userRole = 'user';
    if (formData.email.includes('admin')) {
      userRole = 'admin';
    } else if (formData.email.includes('agent')) {
      userRole = 'agent';
    }
    
    // Set authentication data in localStorage
    localStorage.setItem('token', 'demo-token-' + Date.now()); // Simulated token
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userName', formData.email.split('@')[0]);
    
    // Navigate to the requested page or dashboard
    navigate(from);
  };
  
  return (
    <PageLayout
      pageTitle="Login"
      pageDescription="Sign in to your Apni Zameen account"
      fullWidth={true}
      noPadding={true}
    >
      <AuthTemplate
        type="login"
        title="Welcome back"
        subtitle="Sign in to your Apni Zameen account"
        fields={loginFields}
        onSubmit={handleLogin}
        useStaticPage={false}
        message={message}
      />
    </PageLayout>
  );
};

export default Login; 