-- Create the database
CREATE DATABASE IF NOT EXISTS apni_zameen;

-- Use the database
USE apni_zameen;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'agent', 'admin') DEFAULT 'user',
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status ENUM('rent', 'sale') NOT NULL,
    bedrooms INT,
    bathrooms INT,
    area DECIMAL(10, 2),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_featured BOOLEAN DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Property images table
CREATE TABLE IF NOT EXISTS property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Features table
CREATE TABLE IF NOT EXISTS features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50)
);

-- Property features junction table
CREATE TABLE IF NOT EXISTS property_features (
    property_id INT NOT NULL,
    feature_id INT NOT NULL,
    PRIMARY KEY (property_id, feature_id),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES features(id) ON DELETE CASCADE
);

-- Saved properties table
CREATE TABLE IF NOT EXISTS saved_properties (
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (user_id, property_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Saved searches table
CREATE TABLE IF NOT EXISTS saved_searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    search_params TEXT NOT NULL,
    name VARCHAR(100),
    created_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Property comparisons table
CREATE TABLE IF NOT EXISTS property_comparisons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Property comparison items junction table
CREATE TABLE IF NOT EXISTS comparison_items (
    comparison_id INT NOT NULL,
    property_id INT NOT NULL,
    PRIMARY KEY (comparison_id, property_id),
    FOREIGN KEY (comparison_id) REFERENCES property_comparisons(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    property_id INT,
    agent_id INT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE SET NULL,
    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    created_at DATETIME NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Populate features table with common property features
INSERT INTO features (name, icon) VALUES
('Air Conditioning', 'ac'),
('Heating', 'heating'),
('Parking', 'parking'),
('Swimming Pool', 'pool'),
('Gym', 'gym'),
('Balcony', 'balcony'),
('Fireplace', 'fireplace'),
('Garden', 'garden'),
('Security System', 'security'),
('Elevator', 'elevator'),
('Wheelchair Access', 'wheelchair'),
('Laundry Room', 'laundry'),
('Pets Allowed', 'pets'),
('WiFi', 'wifi'),
('Furnished', 'furniture');

-- Create admin user (password: Admin123)
INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES
('Admin User', 'admin@apnizameen.com', '$2y$10$Hl0RVx.ZV9hVS3s/pFE70OGwAi1Bq77ZnsjPOS2eDLsUz3G.bCCcm', 'admin', NOW(), NOW());

-- Create some sample users (password: Password123)
INSERT INTO users (name, email, password, role, phone, created_at, updated_at) VALUES
('John Agent', 'agent@apnizameen.com', '$2y$10$xsGm/ZqGJ.JLRsONVYRo2uGn4ChFpxHPHQjECBs3SCVsD6O62mEDW', 'agent', '555-1234', NOW(), NOW()),
('Jane User', 'user@apnizameen.com', '$2y$10$xsGm/ZqGJ.JLRsONVYRo2uGn4ChFpxHPHQjECBs3SCVsD6O62mEDW', 'user', '555-5678', NOW(), NOW());

-- Create sample properties
INSERT INTO properties (owner_id, title, description, price, type, status, bedrooms, bathrooms, area, address, city, state, zip_code, latitude, longitude, is_featured, created_at, updated_at) VALUES
(2, 'Modern Downtown Apartment', 'A beautiful modern apartment in the heart of downtown. Featuring high ceilings, large windows, and an open floor plan.', 250000, 'apartment', 'sale', 2, 2, 1200, '123 Main St', 'New York', 'NY', '10001', 40.7128, -74.0060, 1, NOW(), NOW()),
(2, 'Spacious Suburban Home', 'Lovely suburban home with a large backyard. Perfect for families. Close to schools and parks.', 450000, 'house', 'sale', 4, 3, 2500, '456 Oak Ave', 'Los Angeles', 'CA', '90001', 34.0522, -118.2437, 1, NOW(), NOW()),
(2, 'Luxury Beachfront Condo', 'Stunning beachfront condo with panoramic ocean views. Resort-style amenities include pool, gym, and concierge.', 350000, 'condo', 'sale', 3, 2, 1800, '789 Beach Blvd', 'Miami', 'FL', '33139', 25.7617, -80.1918, 1, NOW(), NOW()),
(2, 'Cozy Studio Apartment', 'Charming studio apartment in a historic building. Perfect for students or young professionals.', 1200, 'apartment', 'rent', 0, 1, 500, '101 College St', 'Boston', 'MA', '02108', 42.3601, -71.0589, 0, NOW(), NOW()),
(2, 'Modern Office Space', 'Prime office space in the business district. Open floor plan with meeting rooms and kitchen area.', 3500, 'commercial', 'rent', NULL, 2, 3000, '222 Business Pkwy', 'Chicago', 'IL', '60601', 41.8781, -87.6298, 0, NOW(), NOW()),
(2, 'Rustic Mountain Cabin', 'Secluded mountain cabin with stunning views. Great for weekend getaways or vacation rentals.', 200000, 'house', 'sale', 2, 1, 1000, '333 Mountain Rd', 'Denver', 'CO', '80202', 39.7392, -104.9903, 0, NOW(), NOW());

-- Add property images
INSERT INTO property_images (property_id, image_url, caption, created_at) VALUES
(1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 'Living Room', NOW()),
(1, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', 'Kitchen', NOW()),
(1, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', 'Bedroom', NOW()),
(2, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', 'Front View', NOW()),
(2, 'https://images.unsplash.com/photo-1583608205776-babe6e89fb38', 'Backyard', NOW()),
(2, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', 'Master Bedroom', NOW()),
(3, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', 'Ocean View', NOW()),
(3, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2', 'Master Suite', NOW()),
(3, 'https://images.unsplash.com/photo-1512916194211-3f2b7f5f7de3', 'Pool Area', NOW()),
(4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', 'Main Area', NOW()),
(5, 'https://images.unsplash.com/photo-1497366216548-37526070297c', 'Office Space', NOW()),
(6, 'https://images.unsplash.com/photo-1542718610-a1d656d1884c', 'Cabin Exterior', NOW());

-- Add property features
INSERT INTO property_features (property_id, feature_id) VALUES
(1, 1), (1, 2), (1, 11), (1, 13), -- Apartment features
(2, 1), (2, 2), (2, 3), (2, 7), (2, 8), (2, 9), -- House features
(3, 1), (3, 2), (3, 4), (3, 5), (3, 6), (3, 10), (3, 11), -- Condo features
(4, 2), (4, 13), (4, 14), (4, 15), -- Studio features
(5, 1), (5, 2), (5, 10), (5, 11), (5, 14), -- Office features
(6, 2), (6, 7), (6, 8), (6, 13); -- Cabin features

-- Add some saved properties for the sample user
INSERT INTO saved_properties (user_id, property_id, created_at) VALUES
(3, 1, NOW()),
(3, 3, NOW()); 