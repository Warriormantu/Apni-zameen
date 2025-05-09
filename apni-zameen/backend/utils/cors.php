<?php
/**
 * CORS Utilities
 * Handles Cross-Origin Resource Sharing headers
 */

/**
 * Set CORS headers for the response
 * 
 * @return void
 */
function setCorsHeaders() {
    // Allow any origin for development
    // In production, this should be set to specific origins
    $allowOrigin = '*';
    
    // Check if the Origin header is set
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // For development, accept any origin
        // In production, you should check against a whitelist
        $allowOrigin = $_SERVER['HTTP_ORIGIN'];
    }
    
    // Set the allowed origins
    header("Access-Control-Allow-Origin: $allowOrigin");
    
    // Allow credentials
    header("Access-Control-Allow-Credentials: true");
    
    // Allow specific methods
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    
    // Allow specific headers
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
    // Cache the preflight response for 3600 seconds (1 hour)
    header("Access-Control-Max-Age: 3600");
}

/**
 * Log CORS debug information
 * 
 * @return void
 */
function logCorsDebugInfo() {
    // Create logs directory if it doesn't exist
    $logsDir = BASE_PATH . '/logs';
    if (!is_dir($logsDir)) {
        mkdir($logsDir, 0755, true);
    }
    
    // Log request headers for debugging
    $requestHeaders = getallheaders();
    $headerLog = date('Y-m-d H:i:s') . " - CORS Headers:\n";
    foreach ($requestHeaders as $name => $value) {
        $headerLog .= "$name: $value\n";
    }
    
    // Log request method and URI
    $headerLog .= "Request Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
    $headerLog .= "Request URI: " . $_SERVER['REQUEST_URI'] . "\n";
    
    // Write to log file
    $logFile = $logsDir . '/cors_debug.log';
    file_put_contents($logFile, $headerLog . "\n", FILE_APPEND);
} 