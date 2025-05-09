import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PropertyList from './pages/PropertyList';
import PropertyDetails from './pages/PropertyDetails';
import PropertyImageUpload from './pages/PropertyImageUpload';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Agents from './pages/Agents';
import Buy from './pages/Buy';
import Commercial from './pages/Commercial';
import MortgageCalculator from './pages/MortgageCalculator';
import PG from './pages/PG';
import Plot from './pages/Plot';
import Projects from './pages/Projects';
import PropertyType from './pages/PropertyType';
import Rent from './pages/Rent';
import FAQ from './pages/FAQ';
import Sell from './pages/Sell';
import ServerError from './pages/ServerError';
import AddProperty from './pages/AddProperty';
import AddAgent from './pages/AddAgent';
import ErrorBoundary from './components/ErrorBoundary';
import SessionHandler from './components/SessionHandler';
import LoadingScreen from './components/common/LoadingScreen';
import ConnectionStatus from './components/ConnectionStatus';

// Main App component
const App = () => {
  const [appLoading, setAppLoading] = useState(true);

  // Handle initial app loading
  useEffect(() => {
    // Wait for authentication to initialize and add a slight delay for better UX
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen visible={appLoading} />
      <div className={`min-h-screen ${appLoading ? 'hidden' : ''}`}>
        <SessionHandler />
        <ConnectionStatus checkInterval={300000} />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertyList />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/commercial" element={<Commercial />} />
            <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
            <Route path="/pg" element={<PG />} />
            <Route path="/plot" element={<Plot />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/property-type" element={<PropertyType />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/add-agent" element={<AddAgent />} />
            <Route path="/property/:id/images" element={<PropertyImageUpload />} />
            <Route path="/error" element={<ServerError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
