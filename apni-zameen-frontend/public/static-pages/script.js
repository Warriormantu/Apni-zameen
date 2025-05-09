// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = document.querySelector('.menu-icon');

if (mobileMenuBtn && mobileMenu && menuIcon) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Animate the menu icon
    if (mobileMenu.classList.contains('active')) {
      menuIcon.style.background = 'transparent';
      // We cannot set pseudo-elements directly with JavaScript
      // These won't work as written:
      // menuIcon.style.before = 'top: 0; transform: rotate(90deg)';
      // menuIcon.style.after = 'bottom: 0; transform: rotate(90deg)';
      
      // Instead, we'll add a class to handle the animation
      menuIcon.classList.add('active');
    } else {
      menuIcon.style.background = '';
      menuIcon.classList.remove('active');
    }
  });
}

// Tabs functionality
const tabBtns = document.querySelectorAll('.tab-btn');

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all tabs
      tabBtns.forEach(tab => tab.classList.remove('active'));
      
      // Add active class to clicked tab
      btn.classList.add('active');
      
      // Store the selected tab in sessionStorage
      sessionStorage.setItem('activeTab', btn.dataset.tab);
      
      // Navigate to the appropriate listing page based on tab
      if (btn.dataset.tab) {
        window.location.href = `${btn.dataset.tab}.html`;
      }
    });
  });
}

// Property carousel navigation
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const propertiesCarousel = document.querySelector('.properties-carousel');

if (prevBtn && nextBtn && propertiesCarousel) {
  prevBtn.addEventListener('click', () => {
    propertiesCarousel.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    propertiesCarousel.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });
}

// Wishlist toggle
const wishlistBtns = document.querySelectorAll('.wishlist-btn');

if (wishlistBtns.length > 0) {
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Toggle wishlist status
      const isFavorite = btn.classList.toggle('active');
      btn.textContent = isFavorite ? '❤️' : '❤';
    });
  });
}

// Login functionality
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on login page
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      // Validate form
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Store user data in localStorage to simulate login
      localStorage.setItem('vistaUser', JSON.stringify({ email, isLoggedIn: true }));
      
      // Simulate login success
      alert('Login successful! Redirecting to home page...');
      window.location.href = 'index.html';
    });
  }
  
  // Check if we're on register page
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const acceptTerms = document.getElementById('terms').checked;
      
      // Validate form
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!acceptTerms) {
        alert('You must accept the terms and conditions');
        return;
      }
      
      // Store user data in localStorage to simulate registration
      localStorage.setItem('vistaUser', JSON.stringify({ name, email, isLoggedIn: true }));
      
      // Simulate registration success
      alert('Account created successfully! Redirecting to home page...');
      window.location.href = 'index.html';
    });
  }
  
  // Update UI based on login status
  updateAuthUI();
  
  // Initialize property search
  initializeSearch();

  // Load appropriate content based on page
  loadPageContent();
});

// Function to update UI based on authentication status
function updateAuthUI() {
  const userData = localStorage.getItem('vistaUser');
  const authButtons = document.querySelectorAll('.auth-buttons');
  const mobileAuth = document.querySelectorAll('.mobile-auth');
  
  if (userData) {
    const user = JSON.parse(userData);
    
    // Update desktop auth buttons
    authButtons.forEach(container => {
      container.innerHTML = `
        <div class="user-info">
          <span>Welcome${user.name ? ', ' + user.name : ''}</span>
          <button class="btn btn-outline logout-btn">Logout</button>
        </div>
      `;
    });
    
    // Update mobile auth buttons
    mobileAuth.forEach(container => {
      container.innerHTML = `
        <div class="user-info">
          <span>Welcome${user.name ? ', ' + user.name : ''}</span>
          <button class="btn btn-outline logout-btn">Logout</button>
        </div>
      `;
    });
    
    // Add logout event listeners
    document.querySelectorAll('.logout-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.removeItem('vistaUser');
        alert('You have been logged out');
        window.location.href = 'index.html';
      });
    });
  }
}

// Function to initialize property search
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  
  if (searchInput && searchBtn) {
    // Add click event listener to search button
    searchBtn.addEventListener('click', () => {
      performSearch(searchInput.value);
    });
    
    // Add enter key event listener to search input
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }
}

// Function to perform the search
function performSearch(searchValue) {
  searchValue = searchValue.trim();
  if (searchValue) {
    // Store search term in sessionStorage
    sessionStorage.setItem('searchTerm', searchValue);
    window.location.href = 'search-results.html';
  } else {
    alert('Please enter a search term');
  }
}

// Function to load page content based on current page
function loadPageContent() {
  const path = window.location.pathname;
  
  // Check if we're on one of the listing pages
  if (path.includes('buy.html') || path.includes('rent.html') || path.includes('pg.html') || path.includes('plot.html')) {
    loadListings();
  } else if (path.includes('search-results.html')) {
    loadSearchResults();
  }
}

// Function to load property listings based on type
function loadListings() {
  const path = window.location.pathname;
  let listingType = '';
  
  if (path.includes('buy.html')) {
    listingType = 'buy';
  } else if (path.includes('rent.html')) {
    listingType = 'rent';
  } else if (path.includes('pg.html')) {
    listingType = 'pg';
  } else if (path.includes('plot.html')) {
    listingType = 'plot';
  }
  
  // Get the listing container
  const listingContainer = document.querySelector('.property-listings');
  if (!listingContainer) return;
  
  // Simulated property data - in a real app, you would fetch this from a server
  const properties = getPropertiesData(listingType);
  
  // Render properties
  renderProperties(listingContainer, properties);
}

// Function to load search results
function loadSearchResults() {
  const searchTerm = sessionStorage.getItem('searchTerm') || '';
  const resultContainer = document.querySelector('.search-results-container');
  if (!resultContainer) return;
  
  // Update search term display
  const searchTermDisplay = document.querySelector('.search-term');
  if (searchTermDisplay) {
    searchTermDisplay.textContent = searchTerm;
  }
  
  // Get all properties for searching
  const allProperties = [
    ...getPropertiesData('buy'),
    ...getPropertiesData('rent'),
    ...getPropertiesData('pg')
  ];
  
  // Filter properties based on search term
  const filteredProperties = allProperties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Render filtered properties
  renderProperties(resultContainer, filteredProperties);
}

// Function to render property cards
function renderProperties(container, properties) {
  if (properties.length === 0) {
    container.innerHTML = '<div class="no-results"><p>No properties found</p></div>';
    return;
  }
  
  let html = '';
  
  properties.forEach(property => {
    html += `
      <div class="property-card">
        <div class="property-image">
          <img src="${property.image}" alt="${property.title}">
          ${property.tag ? `<span class="property-tag ${property.tag}-tag">${property.tag}</span>` : ''}
          <button class="wishlist-btn">❤</button>
        </div>
        <div class="property-details">
          <h3>${property.title}</h3>
          <p class="property-price">${property.price}</p>
          <p class="property-location">${property.location}</p>
          <div class="property-features">
            <span>${property.beds} Beds</span>
            <span>${property.baths} Baths</span>
            <span>${property.area}</span>
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Re-attach wishlist event listeners
  const newWishlistBtns = container.querySelectorAll('.wishlist-btn');
  newWishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isFavorite = btn.classList.toggle('active');
      btn.textContent = isFavorite ? '❤️' : '❤';
    });
  });
}

// Function to get property data based on type
function getPropertiesData(type) {
  // Base properties
  const baseProperties = [
    {
      id: 1,
      title: "Modern Apartment with City View",
      price: "$1,250,000",
      location: "123 Downtown Ave, New York",
      beds: 3,
      baths: 2,
      area: "1,800 sqft",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      tag: "new"
    },
    {
      id: 2,
      title: "Luxury Penthouse Suite",
      price: "$3,500,000",
      location: "456 Park Ave, New York",
      beds: 4,
      baths: 3.5,
      area: "3,200 sqft",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      tag: "verified"
    },
    {
      id: 3,
      title: "Cozy Suburban Family Home",
      price: "$850,000",
      location: "789 Maple St, Brooklyn",
      beds: 4,
      baths: 2.5,
      area: "2,400 sqft",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      tag: "owner"
    }
  ];
  
  // Additional properties for specific types
  const typeSpecificProperties = {
    rent: [
      {
        id: 4,
        title: "Modern Studio Apartment",
        price: "$2,000/month",
        location: "101 Midtown Blvd, New York",
        beds: 1,
        baths: 1,
        area: "600 sqft",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        tag: "new"
      },
      {
        id: 5,
        title: "Spacious 2-Bedroom Apartment",
        price: "$3,500/month",
        location: "202 Riverside Dr, New York",
        beds: 2,
        baths: 2,
        area: "1,200 sqft",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        tag: "featured"
      }
    ],
    pg: [
      {
        id: 6,
        title: "Student Housing Near University",
        price: "$800/month",
        location: "Campus Corner, New York",
        beds: 1,
        baths: 1,
        area: "300 sqft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        tag: "student"
      },
      {
        id: 7,
        title: "Shared Apartment for Professionals",
        price: "$1,200/month",
        location: "Business District, New York",
        beds: 1,
        baths: 1,
        area: "Private room in shared space",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        tag: "verified"
      }
    ],
    plot: [
      {
        id: 8,
        title: "Prime Building Plot",
        price: "$400,000",
        location: "Suburban Heights, New York",
        beds: "N/A",
        baths: "N/A",
        area: "5,000 sqft",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        tag: "premium"
      },
      {
        id: 9,
        title: "Commercial Development Land",
        price: "$1,200,000",
        location: "Business Park, New York",
        beds: "N/A",
        baths: "N/A",
        area: "12,000 sqft",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
        tag: "commercial"
      }
    ]
  };
  
  // Return appropriate properties based on type
  if (type === 'buy') {
    return baseProperties;
  } else if (typeSpecificProperties[type]) {
    return typeSpecificProperties[type];
  }
  
  return baseProperties;
}
