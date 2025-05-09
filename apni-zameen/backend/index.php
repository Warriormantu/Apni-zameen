<?php
/**
 * Apni Zameen - Property Platform
 * Main API Entry Point
 */

// Enable error reporting for development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Define the base path
define('BASE_PATH', __DIR__);

// Create logs directory if it doesn't exist
$logsDir = BASE_PATH . '/logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Configure error logging
ini_set('log_errors', 1);
ini_set('error_log', $logsDir . '/php-errors.log');

// Load utility functions - CORS must be first
require_once BASE_PATH . '/utils/cors.php';

// Add debugging for CORS issues
if (function_exists('logCorsDebugInfo')) {
    logCorsDebugInfo();
}

// Handle CORS - must be done before any output
if (function_exists('setCorsHeaders')) {
    setCorsHeaders();
}

// Handle OPTIONS preflight requests - must return immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Success response for preflight requests
    http_response_code(200);
    header('Content-Type: application/json');
    header('Content-Length: 0');
    exit;
}

// Set content type for all other responses
header('Content-Type: application/json');

// Load other required files
$requiredFiles = [
    '/utils/response.php',
    '/utils/auth.php',
    '/utils/validation.php',
    '/config/database.php',
    '/config/jwt.php'
];

// Check and load each required file
foreach ($requiredFiles as $file) {
    $filePath = BASE_PATH . $file;
    if (file_exists($filePath)) {
        require_once $filePath;
    } else {
        // Log the missing file
        error_log("Missing required file: $file");
        // Return error response if sendResponse function is available
        if (function_exists('sendResponse')) {
            sendResponse(500, ['error' => 'Server configuration error', 'detail' => "Missing required file: $file"]);
        } else {
            // Fallback error response
            http_response_code(500);
            echo json_encode(['error' => 'Server configuration error', 'detail' => "Missing required file: $file"]);
        }
        exit;
    }
}

// Parse the URL
$requestUri = $_SERVER['REQUEST_URI'];

// Log original request URI
error_log("Original Request URI: $requestUri");

// Check if we're running under PHP's built-in server
$isDevServer = php_sapi_name() === 'cli-server';

if ($isDevServer) {
    error_log("Running under PHP built-in server");
    
    // For dev server, accept both /api/endpoint and /endpoint formats
    if (strpos($requestUri, '/api/') === 0) {
        // Already has /api/ prefix, just use it
        $requestUri = substr($requestUri, 4); // Remove /api from the beginning
    }
    
    $basePath = '';
} else {
    error_log("Running under Apache/production server");
    
    // For production (Apache), expect the URL in the form /apni-zameen/backend/api/endpoint
    $basePath = '/apni-zameen/backend/api';
    $requestUri = str_replace($basePath, '', $requestUri);
}

// Log the processed URI
error_log("Processed Request URI: $requestUri");

// Extract the endpoint and parameters
$uri = parse_url($requestUri, PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

// Set the resource (endpoint)
$resource = isset($uri[0]) ? $uri[0] : '';
$resourceId = isset($uri[1]) ? $uri[1] : null;
$subresource = isset($uri[2]) ? $uri[2] : null;

// Log parsed components for debugging
error_log("Parsed components - Resource: '$resource', ResourceId: '$resourceId', Subresource: '$subresource'");

// Get request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Get request body
$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

// Log request method and data for debugging
error_log("Request Method: $requestMethod");
if (!empty($requestData)) {
    error_log("Request Data: " . json_encode($requestData));
}

try {
    // Route the request to the appropriate controller
    switch ($resource) {
        case 'auth':
            require_once BASE_PATH . '/controllers/AuthController.php';
            $controller = new AuthController();
            
            if ($requestMethod === 'POST') {
                if ($resourceId === 'login') {
                    $controller->login($requestData);
                } elseif ($resourceId === 'register') {
                    $controller->register($requestData);
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } else {
                sendResponse(405, ['error' => 'Method not allowed']);
            }
            break;
            
        case 'properties':
            require_once BASE_PATH . '/controllers/PropertyController.php';
            $controller = new PropertyController();
            
            if ($requestMethod === 'GET') {
                if ($resourceId === null) {
                    $controller->getAll($_GET);
                } elseif ($resourceId === 'search') {
                    $controller->search($_GET);
                } elseif ($resourceId === 'featured') {
                    $controller->getFeatured($_GET);
                } elseif ($resourceId === 'trending-cities') {
                    $controller->getTrendingCities($_GET);
                } elseif ($subresource === 'similar') {
                    $controller->getSimilar($resourceId, $_GET);
                } elseif (is_numeric($resourceId)) {
                    $controller->getById($resourceId);
                } elseif ($resourceId === 'city' && $subresource !== null) {
                    $controller->getByCity($subresource, $_GET);
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } elseif ($requestMethod === 'POST') {
                // Check authentication for POST requests
                $token = getBearerToken();
                if (!$token || !validateToken($token)) {
                    sendResponse(401, ['error' => 'Unauthorized']);
                    exit;
                }
                
                if ($resourceId === 'images' && is_numeric($subresource)) {
                    $controller->uploadImages($subresource, $_FILES);
                } else {
                    $controller->create($requestData);
                }
            } elseif ($requestMethod === 'PUT' && is_numeric($resourceId)) {
                // Check authentication for PUT requests
                $token = getBearerToken();
                if (!$token || !validateToken($token)) {
                    sendResponse(401, ['error' => 'Unauthorized']);
                    exit;
                }
                
                $controller->update($resourceId, $requestData);
            } elseif ($requestMethod === 'DELETE' && is_numeric($resourceId)) {
                // Check authentication for DELETE requests
                $token = getBearerToken();
                if (!$token || !validateToken($token)) {
                    sendResponse(401, ['error' => 'Unauthorized']);
                    exit;
                }
                
                $controller->delete($resourceId);
            } else {
                sendResponse(405, ['error' => 'Method not allowed']);
            }
            break;
            
        case 'user':
            require_once BASE_PATH . '/controllers/UserController.php';
            $controller = new UserController();
            
            // All user endpoints require authentication
            $token = getBearerToken();
            if (!$token || !validateToken($token)) {
                sendResponse(401, ['error' => 'Unauthorized']);
                exit;
            }
            
            if ($requestMethod === 'GET') {
                if ($resourceId === 'profile') {
                    $controller->getProfile();
                } elseif ($resourceId === 'saved-properties') {
                    $controller->getSavedProperties();
                } elseif ($resourceId === 'saved-searches') {
                    $controller->getSavedSearches();
                } elseif ($resourceId === 'appointments') {
                    $controller->getAppointments();
                } elseif ($resourceId === 'comparisons') {
                    $controller->getComparisons();
                } elseif ($resourceId === 'documents') {
                    $controller->getDocuments();
                } elseif ($resourceId === 'conversations') {
                    if ($subresource === null) {
                        $controller->getConversations();
                    } else {
                        $controller->getConversation($subresource);
                    }
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } elseif ($requestMethod === 'POST') {
                if ($resourceId === 'saved-properties') {
                    $controller->saveProperty($requestData);
                } elseif ($resourceId === 'saved-searches') {
                    $controller->saveSearch($requestData);
                } elseif ($resourceId === 'appointments') {
                    $controller->createAppointment($requestData);
                } elseif ($resourceId === 'comparisons') {
                    $controller->createComparison($requestData);
                } elseif ($resourceId === 'documents') {
                    $controller->uploadDocument($_FILES, $_POST);
                } elseif ($resourceId === 'avatar') {
                    $controller->uploadAvatar($_FILES);
                } elseif ($resourceId === 'conversations') {
                    if ($subresource === null) {
                        $controller->startConversation($requestData);
                    } elseif ($subresource === 'messages') {
                        $controller->sendMessage($resourceId, $requestData);
                    } else {
                        sendResponse(404, ['error' => 'Endpoint not found']);
                    }
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } elseif ($requestMethod === 'PUT') {
                if ($resourceId === 'profile') {
                    $controller->updateProfile($requestData);
                } elseif ($resourceId === 'appointments' && is_numeric($subresource)) {
                    $controller->updateAppointment($subresource, $requestData);
                } elseif ($resourceId === 'comparisons' && is_numeric($subresource)) {
                    $controller->updateComparison($subresource, $requestData);
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } elseif ($requestMethod === 'DELETE') {
                if ($resourceId === 'saved-properties' && is_numeric($subresource)) {
                    $controller->unsaveProperty($subresource);
                } elseif ($resourceId === 'saved-searches' && is_numeric($subresource)) {
                    $controller->deleteSavedSearch($subresource);
                } elseif ($resourceId === 'appointments' && is_numeric($subresource)) {
                    $controller->cancelAppointment($subresource);
                } elseif ($resourceId === 'comparisons' && is_numeric($subresource)) {
                    $controller->deleteComparison($subresource);
                } elseif ($resourceId === 'documents' && is_numeric($subresource)) {
                    $controller->deleteDocument($subresource);
                } else {
                    sendResponse(404, ['error' => 'Endpoint not found']);
                }
            } else {
                sendResponse(405, ['error' => 'Method not allowed']);
            }
            break;
        
        case '':
            // Handle root endpoint
            sendResponse(200, [
                'message' => 'Apni Zameen API',
                'version' => '1.0.0',
                'status' => 'active',
                'endpoints' => [
                    'auth/login',
                    'auth/register',
                    'properties',
                    'properties/featured',
                    'properties/search',
                    'user/profile',
                    'user/saved-properties'
                ]
            ]);
            break;
            
        default:
            sendResponse(404, ['error' => 'Resource not found']);
            break;
    }
} catch (Exception $e) {
    // Log the error
    error_log("API Error: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    // Send error response
    sendResponse(500, ['error' => 'Internal server error', 'message' => $e->getMessage()]);
} 