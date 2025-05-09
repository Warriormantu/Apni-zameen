<?php
/**
 * Apni Zameen - Setup Test Script
 * This script checks if the application can connect to the database and verifies path configurations
 */

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define base path
define('BASE_PATH', __DIR__);

// Create logs directory if it doesn't exist
$logsDir = BASE_PATH . '/logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Set up log file
$logFile = $logsDir . '/setup-test.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - Setup test started\n", FILE_APPEND);

// Function to log messages
function logMessage($message, $type = 'INFO') {
    global $logFile;
    $logMessage = date('Y-m-d H:i:s') . " - [$type] $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND);
    return $logMessage;
}

// Function to check database connection
function checkDatabase() {
    try {
        $conn = new mysqli('localhost', 'root', '', 'apni_zameen');
        
        if ($conn->connect_error) {
            logMessage("Database connection failed: " . $conn->connect_error, 'ERROR');
            return false;
        }
        
        logMessage("Database connection successful", 'SUCCESS');
        
        // Check if users table exists
        $result = $conn->query("SHOW TABLES LIKE 'users'");
        if ($result->num_rows > 0) {
            logMessage("Users table exists", 'SUCCESS');
            
            // Check if there are any users
            $userResult = $conn->query("SELECT COUNT(*) as count FROM users");
            $row = $userResult->fetch_assoc();
            logMessage("Users count: " . $row['count'], 'INFO');
        } else {
            logMessage("Users table does not exist", 'WARNING');
        }
        
        $conn->close();
        return true;
    } catch (Exception $e) {
        logMessage("Database error: " . $e->getMessage(), 'ERROR');
        return false;
    }
}

// Function to check path configuration
function checkPaths() {
    $requestUri = $_SERVER['REQUEST_URI'];
    $scriptPath = $_SERVER['SCRIPT_NAME'];
    $serverName = $_SERVER['SERVER_NAME'];
    $serverPort = $_SERVER['SERVER_PORT'];
    
    logMessage("Server name: $serverName", 'INFO');
    logMessage("Server port: $serverPort", 'INFO');
    logMessage("Request URI: $requestUri", 'INFO');
    logMessage("Script path: $scriptPath", 'INFO');
    
    // Expected base path
    $expectedPath = '/apni-zameen/backend';
    if (strpos($scriptPath, $expectedPath) !== false) {
        logMessage("Path configuration looks correct", 'SUCCESS');
        return true;
    } else {
        logMessage("Path configuration might be incorrect. Expected '$expectedPath' in path", 'WARNING');
        return false;
    }
}

// Function to check if files exist
function checkRequiredFiles() {
    $requiredFiles = [
        '/index.php',
        '/config/database.php',
        '/utils/cors.php',
        '/controllers/AuthController.php',
        '/models/User.php'
    ];
    
    $allExist = true;
    
    foreach ($requiredFiles as $file) {
        $fullPath = BASE_PATH . $file;
        if (file_exists($fullPath)) {
            logMessage("File exists: $file", 'SUCCESS');
        } else {
            logMessage("File missing: $file", 'ERROR');
            $allExist = false;
        }
    }
    
    return $allExist;
}

// Output as HTML
header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apni Zameen - Setup Test</title>
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
        .info {
            color: #0288d1;
            background: #e1f5fe;
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
    <h1>Apni Zameen - Setup Test</h1>
    
    <h2>Database Connection</h2>
    <?php
    $dbSuccess = checkDatabase();
    if ($dbSuccess) {
        echo '<div class="success">Database connection is working properly!</div>';
    } else {
        echo '<div class="error">Database connection failed. Please check your database settings.</div>';
    }
    ?>
    
    <h2>Path Configuration</h2>
    <?php
    $pathsCorrect = checkPaths();
    if ($pathsCorrect) {
        echo '<div class="success">Path configuration looks correct.</div>';
    } else {
        echo '<div class="warning">Path configuration might be incorrect. Check the logs for details.</div>';
    }
    ?>
    
    <h2>Required Files</h2>
    <?php
    $filesExist = checkRequiredFiles();
    if ($filesExist) {
        echo '<div class="success">All required files are present.</div>';
    } else {
        echo '<div class="error">Some required files are missing. Check the logs for details.</div>';
    }
    ?>
    
    <h2>Log Output</h2>
    <pre><?php echo file_get_contents($logFile); ?></pre>
    
    <p><a href="/apni-zameen/backend/api/properties/featured?limit=1">Test API Endpoint</a></p>
</body>
</html> 