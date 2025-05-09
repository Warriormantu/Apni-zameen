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

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Load configuration
require_once BASE_PATH . '/config/database.php';
require_once BASE_PATH . '/config/jwt.php';

// Load utility functions
require_once BASE_PATH . '/utils/response.php';
require_once BASE_PATH . '/utils/auth.php';
require_once BASE_PATH . '/utils/validation.php';

// Parse the URL
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/trail/apni-zameen-backend/api'; // Updated to match frontend expected path

// Remove the base path from the request URI
$requestUri = str_replace($basePath, '', $requestUri);

// Extract the endpoint and parameters
$uri = parse_url($requestUri, PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

// Set the resource (endpoint)
$resource = isset($uri[0]) ? $uri[0] : '';
$resourceId = isset($uri[1]) ? $uri[1] : null;
$subresource = isset($uri[2]) ? $uri[2] : null;

// Get request method
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Get request body
$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

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
        
    default:
        sendResponse(404, ['error' => 'Resource not found']);
        break;
} 