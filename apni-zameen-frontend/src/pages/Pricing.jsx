import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Basic property listing',
        'Up to 5 photos per listing',
        'Basic search filters',
        'Email support',
        'Property viewing requests'
      ]
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Best for serious sellers',
      features: [
        'Everything in Basic',
        'Up to 20 photos per listing',
        'Advanced search filters',
        'Priority support',
        'Property analytics',
        'Featured listings',
        'Virtual tour support'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For real estate agencies',
      features: [
        'Everything in Professional',
        'Unlimited photos',
        'Custom branding',
        'Dedicated account manager',
        'API access',
        'Bulk listing upload',
        'Advanced analytics',
        'Team management'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700 ${
                plan.popular
                  ? 'border-2 border-primary-500 dark:border-primary-400'
                  : 'border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-6">
                {plan.popular && (
                  <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-primary-500 py-1.5 px-4 text-sm font-semibold text-white">
                    Most Popular
                  </p>
                )}
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {plan.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                      {plan.period}
                    </span>
                  )}
                </p>
                <Link
                  to="/signup"
                  className={`mt-8 block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-md font-medium ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700'
                      : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}
                >
                  Get started
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-600 dark:text-gray-400">
            Need a custom plan?{' '}
            <Link
              to="/contact"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 