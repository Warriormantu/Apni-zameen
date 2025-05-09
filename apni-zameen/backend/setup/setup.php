<?php
/**
 * Apni Zameen - Database Setup Script
 * This script creates the database and tables required for the application
 */

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define base path
define('BASE_PATH', dirname(__DIR__));

// Create logs directory if it doesn't exist
$logsDir = BASE_PATH . '/logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Set up log file
$logFile = $logsDir . '/setup.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Setup script started\n", FILE_APPEND);

// Function to log messages
function logMessage($message, $type = 'INFO') {
    global $logFile;
    $logMessage = date('Y-m-d H:i:s') . " - [$type] $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    return $logMessage;
}

// Function to safely execute queries with proper error handling
function safeExecuteQuery($conn, $sql, $description = '') {
    try {
        $result = $conn->query($sql);
        if ($result === false) {
            echo "Error executing query: " . $conn->error . "<br>";
            logMessage("Error executing query: " . $conn->error, 'ERROR');
            logMessage("Query: " . $sql, 'ERROR');
            return false;
        } else {
            echo "Executed query successfully: " . substr($sql, 0, 50) . "... <br>";
            logMessage("Executed query successfully: " . $description, 'SUCCESS');
            return true;
        }
    } catch (Exception $e) {
        echo "Exception: " . $e->getMessage() . "<br>";
        logMessage("Exception: " . $e->getMessage(), 'ERROR');
        return false;
    }
}

// Database connection details
$dbHost = 'localhost';
$dbUser = 'root';
$dbPass = '';
$dbName = 'apni_zameen';

// Connect to MySQL server
echo "Connecting to MySQL server... <br>";
try {
    $conn = new mysqli($dbHost, $dbUser, $dbPass);
    
    if ($conn->connect_error) {
        die(logMessage("Connection failed: " . $conn->connect_error, 'ERROR'));
    }
    
    echo "Connected to MySQL server successfully. <br>";
    logMessage("Connected to MySQL server", 'SUCCESS');
    
    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS $dbName CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
    safeExecuteQuery($conn, $sql, "Create the database");
    
    // Select the database
    $sql = "USE $dbName";
    safeExecuteQuery($conn, $sql, "Use the database");
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        profile_picture VARCHAR(255),
        bio TEXT,
        address TEXT,
        role ENUM('user', 'agent', 'admin') DEFAULT 'user',
        email_verified TINYINT(1) DEFAULT 0,
        verification_token VARCHAR(255),
        reset_token VARCHAR(255),
        reset_token_expires DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    safeExecuteQuery($conn, $sql, "Users table");
    
    // Create properties table
    $sql = "CREATE TABLE IF NOT EXISTS properties (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11) UNSIGNED NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(15,2) NOT NULL,
        property_type ENUM('house', 'apartment', 'plot', 'commercial') NOT NULL,
        property_category ENUM('sale', 'rent') NOT NULL,
        area_size DECIMAL(10,2) NOT NULL,
        area_unit ENUM('marla', 'kanal', 'square_feet', 'square_meter') NOT NULL,
        bedrooms INT(2),
        bathrooms INT(2),
        city VARCHAR(100) NOT NULL,
        area VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        features TEXT,
        is_featured TINYINT(1) DEFAULT 0,
        status ENUM('active', 'pending', 'sold', 'rented') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )";
    safeExecuteQuery($conn, $sql, "Properties table");
    
    // Create property_images table
    $sql = "CREATE TABLE IF NOT EXISTS property_images (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        property_id INT(11) UNSIGNED NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        is_primary TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
    )";
    safeExecuteQuery($conn, $sql, "Property images table");
    
    // Create saved_properties table
    $sql = "CREATE TABLE IF NOT EXISTS saved_properties (
        id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11) UNSIGNED NOT NULL,
        property_id INT(11) UNSIGNED NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
        UNIQUE KEY user_property (user_id, property_id)
    )";
    safeExecuteQuery($conn, $sql, "Saved properties table");
    
    // Create test admin user if it doesn't exist
    $password = password_hash('admin123', PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (name, email, password, role) 
            SELECT 'Admin User', 'admin@apnizameen.com', '$password', 'admin'
            FROM dual 
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@apnizameen.com')";
    
    if (safeExecuteQuery($conn, $sql, "Create admin user")) {
        if ($conn->affected_rows > 0) {
            logMessage("Test admin user created", 'SUCCESS');
            echo "Admin user created successfully. <br>";
        } else {
            logMessage("Test admin user already exists", 'INFO');
            echo "Admin user already exists. <br>";
        }
    }
    
    // Create sample properties
    $sampleProperties = [
        [
            'title' => 'Luxury Villa in Bahria Town',
            'description' => 'Beautiful 5 bedroom villa with modern amenities',
            'price' => 25000000,
            'property_type' => 'house',
            'property_category' => 'sale',
            'area_size' => 10,
            'area_unit' => 'marla',
            'bedrooms' => 5,
            'bathrooms' => 5,
            'city' => 'Lahore',
            'area' => 'Bahria Town',
            'address' => 'Street 5, Block A, Bahria Town',
            'is_featured' => 1
        ],
        [
            'title' => 'Commercial Plaza on MM Alam Road',
            'description' => 'Prime location commercial property',
            'price' => 75000000,
            'property_type' => 'commercial',
            'property_category' => 'sale',
            'area_size' => 4000,
            'area_unit' => 'square_feet',
            'city' => 'Lahore',
            'area' => 'Gulberg',
            'address' => 'MM Alam Road, Gulberg III',
            'is_featured' => 1
        ],
        [
            'title' => 'Modern Apartment in Clifton',
            'description' => 'Fully furnished 3 bedroom apartment with sea view',
            'price' => 150000,
            'property_type' => 'apartment',
            'property_category' => 'rent',
            'area_size' => 2200,
            'area_unit' => 'square_feet',
            'bedrooms' => 3,
            'bathrooms' => 2,
            'city' => 'Karachi',
            'area' => 'Clifton',
            'address' => 'Block 5, Clifton',
            'is_featured' => 1
        ]
    ];
    
    // Get admin user ID
    $result = $conn->query("SELECT id FROM users WHERE email = 'admin@apnizameen.com' LIMIT 1");
    if ($result && $result->num_rows > 0) {
        $adminUser = $result->fetch_assoc();
        $adminId = $adminUser['id'];
        
        // Insert sample properties
        foreach ($sampleProperties as $property) {
            // Check if similar property exists
            $checkSql = "SELECT COUNT(*) as count FROM properties WHERE title = '{$property['title']}' AND city = '{$property['city']}'";
            $checkResult = $conn->query($checkSql);
            $row = $checkResult->fetch_assoc();
            
            if ($row['count'] == 0) {
                $sql = "INSERT INTO properties (user_id, title, description, price, property_type, property_category, 
                        area_size, area_unit, bedrooms, bathrooms, city, area, address, is_featured, status) 
                        VALUES ('$adminId', '{$property['title']}', '{$property['description']}', {$property['price']}, 
                        '{$property['property_type']}', '{$property['property_category']}', {$property['area_size']}, 
                        '{$property['area_unit']}', " . 
                        (isset($property['bedrooms']) ? $property['bedrooms'] : "NULL") . ", " . 
                        (isset($property['bathrooms']) ? $property['bathrooms'] : "NULL") . ", 
                        '{$property['city']}', '{$property['area']}', '{$property['address']}', 
                        {$property['is_featured']}, 'active')";
                
                if (safeExecuteQuery($conn, $sql, "Create sample property: {$property['title']}")) {
                    echo "Sample property created: {$property['title']} <br>";
                    logMessage("Sample property created: {$property['title']}", 'SUCCESS');
                }
            } else {
                echo "Sample property already exists: {$property['title']} <br>";
                logMessage("Sample property already exists: {$property['title']}", 'INFO');
            }
        }
    } else {
        echo "Could not find admin user to create sample properties. <br>";
        logMessage("Could not find admin user to create sample properties", 'WARNING');
    }
    
    // Close the connection
    $conn->close();
    
    echo "<br>Setup completed successfully.<br>";
    logMessage("Setup completed successfully", 'SUCCESS');
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "<br>";
    logMessage("Error: " . $e->getMessage(), 'ERROR');
}

// Output as HTML
header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apni Zameen - Setup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .success {
            color: green;
            background: #e8f5e9;
            padding: 10px;
            border-radius: 4px;
        }
        .error {
            color: red;
            background: #ffebee;
            padding: 10px;
            border-radius: 4px;
        }
        .warning {
            color: #f57c00;
            background: #fff3e0;
            padding: 10px;
            border-radius: 4px;
        }
        pre {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
    </style>
</head>
<body>
    <h1>Apni Zameen - Database Setup</h1>
    
    <p>The setup process has completed. Please check the log output below for details.</p>
    
    <h2>Log Output</h2>
    <pre><?php echo file_get_contents($logFile); ?></pre>
    
    <p><a href="../setup-test.php">Run Setup Test</a></p>
    <p><a href="../api/properties/featured?limit=3">Test API Endpoint</a></p>
</body>
</html> 