# Apni Zameen - Real Estate Platform

Apni Zameen is a web-based real estate platform that allows users to buy, sell, and rent properties.

## Project Structure

The project follows a unified structure with frontend and backend components organized in a single repository:

```
apni-zameen/
├── backend/           # PHP backend API
│   ├── config/        # Configuration files
│   ├── controllers/   # API controllers
│   ├── models/        # Database models
│   ├── setup/         # Database setup scripts
│   ├── uploads/       # Uploaded files
│   ├── utils/         # Utility functions
│   ├── vendor/        # Composer dependencies
│   ├── index.php      # Main entry point
│   └── setup-test.php # Setup test script
│
└── frontend/          # React frontend
    ├── public/        # Static assets
    ├── src/           # Source code
    │   ├── components/    # React components
    │   ├── context/       # Context providers
    │   ├── pages/         # Page components
    │   ├── services/      # API services
    │   └── utils/         # Utility functions
    ├── package.json   # npm dependencies
    └── vite.config.js # Vite configuration
```

## Setup and Installation

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js 14 or higher
- npm or yarn
- Apache/Nginx web server

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd apni-zameen/backend
   ```

2. Install dependencies:
   ```
   composer install
   ```

3. Run the setup script:
   ```
   php setup/setup.php
   ```

4. Verify the setup:
   ```
   php setup-test.php
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd apni-zameen/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update API configuration:
   Edit `src/services/apiConfig.js` to point to your backend API URL

4. Start the development server:
   ```
   npm run dev
   ```

## Using PHP Development Server

For development, you can use PHP's built-in web server:

```
cd apni-zameen/backend
php -S localhost:8000 -t .
```

The API will be available at: `http://localhost:8000/api`

## Using with Apache

For Apache deployment:

1. Make sure mod_rewrite is enabled
2. Place the project in your web root directory
3. Access the API at: `http://localhost/apni-zameen/backend/api`

## Admin Login

Default admin credentials:
- Email: admin@apnizameen.com
- Password: admin123

## License

This project is proprietary and not for redistribution. 