# Apni Zameen Property Platform

A full-stack property listing and management application featuring a React frontend and PHP backend.

## Project Overview

Apni Zameen is a comprehensive property platform that allows users to:
- Browse property listings
- Search and filter properties by various criteria
- View detailed property information
- Save favorite properties
- User authentication and profile management
- For agents: create, update, and manage property listings

## Tech Stack

### Frontend
- React 
- Tailwind CSS
- Vite
- Axios

### Backend
- PHP
- MySQL
- JWT for authentication

## Installation

### Prerequisites
- XAMPP or equivalent (Apache, MySQL, PHP)
- Node.js and npm
- Composer

### Setup Backend
1. Navigate to the backend installation guide for detailed instructions:
   ```
   apni-zameen-backend/INSTALLATION.md
   ```

2. Quick Start:
   ```
   cd apni-zameen-backend
   composer install
   ```

3. Access the database setup script:
   ```
   http://localhost/trail/apni-zameen-backend/setup/setup.php
   ```

### Setup Frontend
1. Navigate to the frontend installation guide for detailed instructions:
   ```
   apni-zameen-frontend/INSTALLATION.md
   ```

2. Quick Start:
   ```
   cd apni-zameen-frontend
   npm install
   npm run dev
   ```

3. Access the application:
   ```
   http://localhost:5173
   ```

## Default Credentials

### Admin
- Email: admin@apnizameen.com
- Password: Admin123

### Agent
- Email: agent@apnizameen.com
- Password: Password123

### User
- Email: user@apnizameen.com
- Password: Password123

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check that the backend API path is correctly configured in `apni-zameen-frontend/src/services/api.js`
   - Verify that XAMPP is running properly
   - Ensure the database is properly set up

2. **Database Connection Error**
   - Check the database credentials in `apni-zameen-backend/config/database.php`
   - Ensure MySQL is running
   - Verify the `apni_zameen` database exists

3. **CORS Issues**
   - The backend includes CORS headers, but if you're still experiencing issues, check your browser extensions
   - Try using a different browser 