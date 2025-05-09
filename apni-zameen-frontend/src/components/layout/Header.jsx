import React, { useState, Fragment, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

// Unified navigation items for all pages
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Commercial', href: '/commercial' },
  { name: 'Agents', href: '/agents' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

/**
 * Unified header component for all pages
 */
const Header = () => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status on component mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        // Get user info from localStorage (in a real app, you might fetch this from an API)
        setUser({
          name: localStorage.getItem('userName') || 'User',
          role: localStorage.getItem('userRole') || 'user'
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (for when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  // Check if a navigation link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Disclosure as="nav" className="bg-white dark:bg-secondary-900 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              {/* Logo and desktop navigation */}
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex items-center">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Apni</span>
                    <span className="text-xl font-bold text-secondary-800 dark:text-white">Zameen</span>
                  </Link>
                </div>
                
                {/* Desktop navigation */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`nav-link ${isActiveLink(item.href) ? 'nav-link-active' : 'nav-link-inactive'}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Desktop search, theme toggle, and user menu */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Search form */}
                <form onSubmit={handleSearch} className="relative mx-4">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-64 px-4 py-1 text-sm text-gray-900 bg-gray-100 dark:bg-secondary-800 dark:text-white rounded-full border border-gray-300 dark:border-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                {/* Theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-full bg-white dark:bg-secondary-800 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors relative group"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                  <span className="absolute hidden group-hover:block right-0 top-full mt-2 w-32 bg-gray-800 text-white text-xs rounded py-1 px-2 z-50">
                    {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  </span>
                </button>

                {/* User menu if logged in */}
                {isLoggedIn ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-white dark:bg-secondary-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        {user?.avatar ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.avatar}
                            alt={user.name}
                          />
                        ) : (
                          <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-secondary-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-secondary-700' : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-secondary-700' : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/add-property"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-secondary-700' : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                            >
                              Add Property
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/saved-properties"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-secondary-700' : ''
                              } block px-4 py-2 text-sm text-gray-700 dark:text-white`}
                            >
                              Saved Properties
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100 dark:bg-secondary-700' : ''
                              } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white`}
                              onClick={handleLogout}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="flex items-center space-x-3 ml-4">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      Sign in
                    </Link>
                    <Link to="/register" className="btn btn-primary text-sm">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile theme toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mr-2 rounded-full bg-white dark:bg-secondary-800 p-1 text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
                
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-secondary-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden absolute w-full bg-white dark:bg-secondary-900 z-50 shadow-lg">
            <div className="space-y-1 pb-3 pt-2">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="px-4 pb-2">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 dark:bg-secondary-800 dark:text-white rounded-full border border-gray-300 dark:border-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              {/* Mobile navigation links */}
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`mobile-nav-link ${
                    isActiveLink(item.href)
                      ? 'mobile-nav-link-active'
                      : 'mobile-nav-link-inactive'
                  }`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            
            {/* Mobile user menu */}
            <div className="border-t border-gray-200 dark:border-secondary-700 pb-3 pt-4">
              {isLoggedIn ? (
                <div className="space-y-1">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {user?.avatar ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.avatar}
                          alt={user.name}
                        />
                      ) : (
                        <UserCircleIcon className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800 dark:text-white">{user?.name}</div>
                    </div>
                  </div>
                  <Disclosure.Button
                    as={Link}
                    to="/dashboard"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/add-property"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Add Property
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/saved-properties"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Saved Properties
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={handleLogout}
                    className="block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              ) : (
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:text-gray-900 dark:hover:text-white"
                  >
                    Sign in
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Sign up
                  </Disclosure.Button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header; 