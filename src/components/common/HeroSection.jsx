import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeroSection = ({
  title,
  subtitle,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink
}) => (
  <section className="bg-gradient-to-r from-emerald-500 to-teal-600 py-16 md:py-24">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">{title}</h1>
      <p className="text-lg md:text-2xl text-white/90 mb-8">{subtitle}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to={primaryLink}
          className="inline-block px-8 py-3 rounded-md text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-100 transition shadow"
        >
          {primaryText}
        </Link>
        <Link
          to={secondaryLink}
          className="inline-block px-8 py-3 rounded-md text-lg font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition shadow"
        >
          {secondaryText}
        </Link>
      </div>
    </div>
  </section>
);

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  primaryText: PropTypes.string.isRequired,
  primaryLink: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  secondaryLink: PropTypes.string.isRequired,
};

export default HeroSection; 