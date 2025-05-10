/**
 * Projects page functionality for Apni Zameen
 */

document.addEventListener('DOMContentLoaded', function() {
  // Sample project data - in a real app, this would come from an API
  const projects = [
    {
      id: 1,
      name: 'Green Valley Residences',
      location: 'Gurgaon, Haryana',
      type: 'Residential',
      price: '₹85 Lac - ₹1.5 Cr',
      completion: 'Dec 2025',
      developer: 'Apni Zameen Developers',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Horizon Business Park',
      location: 'Mumbai, Maharashtra',
      type: 'Commercial',
      price: '₹1.8 Cr - ₹4.5 Cr',
      completion: 'Mar 2026',
      developer: 'Metro Builders',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'Lakeside Villas',
      location: 'Bangalore, Karnataka',
      type: 'Villa',
      price: '₹2.2 Cr - ₹5.8 Cr',
      completion: 'Jun 2026',
      developer: 'Prestige Group',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: 'Urban Heights',
      location: 'Delhi, NCR',
      type: 'Residential',
      price: '₹45 Lac - ₹1.2 Cr',
      completion: 'Sep 2025',
      developer: 'DLF Builders',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: 'Oceanic Towers',
      location: 'Chennai, Tamil Nadu',
      type: 'Residential',
      price: '₹72 Lac - ₹1.8 Cr',
      completion: 'Jan 2026',
      developer: 'South India Shelters',
      image: 'https://images.unsplash.com/photo-1517659649778-bae24b8c2e26?w=600&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: 'Tech Park Plaza',
      location: 'Hyderabad, Telangana',
      type: 'Commercial',
      price: '₹1.5 Cr - ₹4.2 Cr',
      completion: 'Apr 2026',
      developer: 'Hyderabad Developers',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop&q=60'
    }
  ];

  // Function to render project cards
  function renderProjects(projectsToRender) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = '';
    
    if (projectsToRender.length === 0) {
      projectsContainer.innerHTML = '<div class="col-span-3 text-center py-10">No projects found matching your criteria.</div>';
      return;
    }
    
    projectsToRender.forEach(project => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl';
      card.innerHTML = `
        <div class="relative h-48 overflow-hidden">
          <img 
            src="${project.image}" 
            alt="${project.name}" 
            class="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='/assets/images/fallback-property.jpg';"
          />
          <div class="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ${project.type}
          </div>
        </div>
        <div class="p-5">
          <h3 class="text-lg font-semibold mb-2">${project.name}</h3>
          <p class="text-gray-600 mb-3">${project.location}</p>
          <p class="text-emerald-600 font-bold mb-3">${project.price}</p>
          
          <div class="space-y-2 text-sm text-gray-600 mb-4">
            <div class="flex justify-between">
              <span>Developer:</span>
              <span class="font-medium">${project.developer}</span>
            </div>
            <div class="flex justify-between">
              <span>Completion:</span>
              <span class="font-medium">${project.completion}</span>
            </div>
          </div>
          
          <a href="/property/${project.id}" class="block text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition duration-200">
            View Details
          </a>
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  }

  // Filter functionality
  const filterForm = document.getElementById('project-filter-form');
  if (filterForm) {
    filterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const typeFilter = document.getElementById('type-filter')?.value || 'all';
      const locationFilter = document.getElementById('location-filter')?.value || 'all';
      
      let filteredProjects = [...projects];
      
      if (typeFilter !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.type.toLowerCase() === typeFilter.toLowerCase());
      }
      
      if (locationFilter !== 'all') {
        filteredProjects = filteredProjects.filter(project => project.location.includes(locationFilter));
      }
      
      renderProjects(filteredProjects);
    });
  }

  // Initial render of projects
  renderProjects(projects);
}); 