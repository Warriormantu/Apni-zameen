# Apni Zameen Backend - Installation Guide

## Prerequisites
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Composer

## Installation Steps

1. **Clone the repository**
   Clone or download the repository to your XAMPP's htdocs folder.

2. **Install dependencies**
   Navigate to the backend directory and run:
   ```
   cd /path/to/xampp/htdocs/trail/apni-zameen-backend
   composer install
   ```

3. **Set up the database**
   You can set up the database in two ways:

   **Option 1:** Run the setup script
   ```
   http://localhost/trail/apni-zameen-backend/setup/setup.php
   ```

   **Option 2:** Import the SQL manually
   - Create a database named `apni_zameen` in MySQL
   - Import the `setup/database.sql` file

4. **Verify the installation**
   Test the API by visiting:
   ```
   http://localhost/trail/apni-zameen-backend/api/properties
   ```

## Login Credentials

- **Admin**
  - Email: admin@apnizameen.com
  - Password: Admin123

- **Agent**
  - Email: agent@apnizameen.com
  - Password: Password123

- **User**
  - Email: user@apnizameen.com
  - Password: Password123

## API Documentation

The API provides endpoints for:
- Authentication (login, register)
- Properties (search, filter, create, update, delete)
- User management (profile, preferences)
- Saved properties 