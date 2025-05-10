/**
 * Navigation functionality for Apni Zameen static pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // User dropdown menu toggle
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenu = document.getElementById('user-menu');
  
  if (userMenuButton && userMenu) {
    userMenuButton.addEventListener('click', function() {
      const expanded = userMenuButton.getAttribute('aria-expanded') === 'true';
      userMenuButton.setAttribute('aria-expanded', !expanded);
      userMenu.classList.toggle('hidden');
    });
  }

  // Close menus when clicking outside
  document.addEventListener('click', function(event) {
    if (userMenuButton && userMenu && !userMenuButton.contains(event.target)) {
      userMenu.classList.add('hidden');
      userMenuButton.setAttribute('aria-expanded', 'false');
    }
    
    if (mobileMenuButton && mobileMenu && !mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Add active class to current page in nav
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.includes(linkPath) && linkPath !== '/') {
      link.classList.add('text-emerald-600', 'border-emerald-600');
      link.classList.remove('text-gray-500', 'border-transparent');
    } else if (currentPath === '/' && linkPath === '/') {
      link.classList.add('text-emerald-600', 'border-emerald-600');
      link.classList.remove('text-gray-500', 'border-transparent');
    }
  });
}); 