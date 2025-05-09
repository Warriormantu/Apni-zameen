import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * A template component for authentication pages (Login and Register)
 * This consolidates similar functionality into a single component
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Authentication type ('login' or 'register')
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Page subtitle
 * @param {Object[]} props.fields - Form fields configuration
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} props.useStaticPage - Whether to use static HTML page
 * @param {string} props.message - Optional message to display (e.g. from redirects)
 */
const AuthTemplate = ({
  type,
  title,
  subtitle,
  fields = [],
  onSubmit,
  useStaticPage = false,
  message = null
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = '';
      return acc;
    }, {})
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // If using static page, render with iframe approach
  if (useStaticPage) {
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        // Create an iframe that loads the static HTML
        const iframe = document.createElement('iframe');
        iframe.src = `/static-pages/${type}.html`;
        iframe.style.width = '100%';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        
        // Clear the container and add the iframe
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(iframe);
      }
    }, [type]);
    
    return <div ref={containerRef} className="w-full min-h-screen"></div>;
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      } else if (field.validate) {
        const error = field.validate(formData[field.name], formData);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Redirect message */}
          {message && (
            <div className="rounded-md bg-blue-50 dark:bg-blue-900 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Error message */}
          {errors.submit && (
            <div className="rounded-md bg-red-50 dark:bg-red-900 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    {errors.submit}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form fields */}
            {fields.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {field.label}
                </label>
                <div className="mt-1">
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || 'text'}
                    autoComplete={field.autoComplete}
                    required={field.required}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
                      errors[field.name] ? 'border-red-300 text-red-900 placeholder-red-300 dark:border-red-700 dark:text-red-500' : 'border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                    }`}
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Conditional content for Login/Register */}
            {type === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}

            {type === 'register' && (
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  I agree to the{' '}
                  <Link to="/terms-of-service" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy-policy" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-900 disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : type === 'login' ? 'Sign in' : 'Create account'}
              </button>
            </div>

            {/* Footer links */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {type === 'login' ? 'New to ApniZameen?' : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                {type === 'login' ? (
                  <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                    Create an account
                  </Link>
                ) : (
                  <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                    Sign in to your account
                  </Link>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate; 