<?php
/**
 * Database Setup Script
 * This script creates the database and initializes tables
 */

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database credentials
$host = 'localhost';
$user = 'root';
$password = '';

// Create connection
$conn = new mysqli($host, $user, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected to MySQL server successfully. <br>";

// Read SQL file
$sqlFile = file_get_contents(__DIR__ . '/database.sql');

if (!$sqlFile) {
    die("Error reading SQL file.");
}

// Split SQL into individual queries
$queries = explode(';', $sqlFile);

// Execute each query
foreach ($queries as $query) {
    $query = trim($query);
    if (!empty($query)) {
        if ($conn->query($query) === TRUE) {
            echo "Executed query successfully: " . substr($query, 0, 50) . "... <br>";
        } else {
            echo "Error executing query: " . $conn->error . " <br>Query: " . substr($query, 0, 50) . "... <br>";
        }
    }
}

echo "<br>Database setup completed.";

// Close connection
$conn->close(); 