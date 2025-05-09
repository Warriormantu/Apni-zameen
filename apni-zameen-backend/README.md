# Apni Zameen Backend

This is the backend API for the Apni Zameen real estate platform, built with PHP and MySQL.

## Features

- RESTful API architecture
- JWT authentication
- Property listing and search
- User management
- Image handling
- Filtering and pagination

## Getting Started

### Prerequisites
- PHP 8.0+
- MySQL 5.7+
- XAMPP, WAMP, MAMP, or any similar PHP development environment
- Composer (for package management)

### Installation
1. Clone the repository
2. Set up your XAMPP or other web server environment
3. Import the database using the SQL script in `/setup/database.sql`
4. Update configuration in `/config/database.php` if needed
5. Create the required directories and set permissions:
   ```
   mkdir -p public/uploads/avatars
   mkdir -p public/uploads/properties
   chmod -R 755 public/uploads
   ```
6. Install dependencies using Composer:
   ```
   composer install
   ```

## API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Properties Endpoints
- `GET /properties` - Get all properties with filtering
- `GET /properties/{id}` - Get property by ID
- `GET /properties/search` - Search properties
- `GET /properties/featured` - Get featured properties
- `GET /properties/trending-cities` - Get trending cities
- `GET /properties/city/{city}` - Get properties by city
- `GET /properties/{id}/similar` - Get similar properties
- `POST /properties` - Add a new property (authenticated)
- `PUT /properties/{id}` - Update property (authenticated)
- `DELETE /properties/{id}` - Delete property (authenticated)

### User Endpoints
- `GET /user/profile` - Get user profile (authenticated)
- `PUT /user/profile` - Update user profile (authenticated)
- `POST /user/password` - Update user password (authenticated)
- `GET /user/saved-properties` - Get saved properties (authenticated)
- `POST /user/saved-properties` - Save a property (authenticated)
- `DELETE /user/saved-properties/{id}` - Unsave a property (authenticated)
- `POST /user/avatar` - Upload user avatar (authenticated)

## Database Schema

The database consists of the following main tables:
- `users` - User accounts
- `properties` - Property listings
- `property_images` - Images for properties
- `features` - Available property features
- `property_features` - Junction table for properties and features
- `saved_properties` - User's saved properties

## Demo Accounts

- **Admin**
  - Email: admin@apnizameen.com
  - Password: Admin123

- **Agent**
  - Email: agent@apnizameen.com
  - Password: Password123

- **User**
  - Email: user@apnizameen.com
  - Password: Password123 