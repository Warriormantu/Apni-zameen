import React, { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserCircleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Commercial', href: '/commercial' },
  { name: 'Agents', href: '/agents' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

interface HeaderProps {
  isLoggedIn: boolean;
  user?: {
    name: string;
    avatar?: string;
  };
}

const Header = ({ isLoggedIn, user }: HeaderProps) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
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
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex items-center">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Apni</span>
                    <span className="text-xl font-bold text-secondary-800 dark:text-white">Zameen</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        isActiveLink(item.href)
                          ? 'border-primary-500 text-gray-900 dark:text-white'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                      } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <form onSubmit={handleSearch} className="relative mx-4">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-64 px-4 py-1 text-sm text-gray-900 bg-gray-100 dark:bg-secondary-800 dark:text-white rounded-full border border-gray-300 dark:border-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

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
                              to="/dashboard/profile"
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
                              to="/dashboard/saved"
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
                              onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                              }}
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

          <Disclosure.Panel className="sm:hidden absolute w-full bg-white dark:bg-secondary-900 z-50 shadow-lg">
            <div className="space-y-1 pb-3 pt-2">
              <form onSubmit={handleSearch} className="px-4 pb-2">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 dark:bg-secondary-800 dark:text-white rounded-full border border-gray-300 dark:border-secondary-700 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={`${
                    isActiveLink(item.href)
                      ? 'bg-primary-50 dark:bg-primary-900 border-primary-500 text-primary-700 dark:text-primary-200'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-secondary-800 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
                  } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            
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
                    to="/dashboard/profile"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/dashboard/saved"
                    className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    Saved Properties
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    onClick={() => {
                      localStorage.removeItem('token');
                      window.location.href = '/login';
                    }}
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