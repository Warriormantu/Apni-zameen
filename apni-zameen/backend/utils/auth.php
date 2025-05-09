<?php
/**
 * Authentication Utilities
 */

// Require the JWT library
require_once BASE_PATH . '/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * Generate a JWT token for a user
 * 
 * @param array $user User data
 * @return string JWT token
 */
function generateToken($user) {
    // Set token payload
    $payload = [
        'iss' => 'apni-zameen',
        'aud' => 'apni-zameen-client',
        'iat' => time(),
        'exp' => time() + (60 * 60 * 24), // 24 hours
        'user_id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role'] ?? 'user'
    ];
    
    // Generate token
    try {
        $jwt = JWT::encode($payload, JWT_SECRET, 'HS256');
        return $jwt;
    } catch (Exception $e) {
        error_log("Error generating token: " . $e->getMessage());
        return false;
    }
}

/**
 * Validate a JWT token
 * 
 * @param string $token JWT token
 * @return array|bool User data if valid, false if invalid
 */
function validateToken($token) {
    try {
        $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
        
        // Convert object to array
        $decodedArray = json_decode(json_encode($decoded), true);
        
        // Add debug log for token validation
        $logDir = BASE_PATH . '/logs';
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
        $logFile = $logDir . '/jwt_debug.log';
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - Token validated: " . json_encode($decodedArray) . "\n", FILE_APPEND);
        
        return $decodedArray;
    } catch (Exception $e) {
        // Log the error
        error_log("Token validation error: " . $e->getMessage());
        
        // Add debug log for token validation failures
        $logDir = BASE_PATH . '/logs';
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
        $logFile = $logDir . '/jwt_debug.log';
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - Token validation failed: " . $e->getMessage() . "\n", FILE_APPEND);
        
        return false;
    }
}

/**
 * Get the Bearer token from the request headers
 * 
 * @return string|bool Token if found, false if not
 */
function getBearerToken() {
    $headers = getallheaders();
    
    // Check for Authorization header
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } elseif (isset($headers['authorization'])) {
        // Handle case sensitivity
        $authHeader = $headers['authorization'];
    } else {
        return false;
    }
    
    // Check if it's a Bearer token
    if (strpos($authHeader, 'Bearer ') === 0) {
        return substr($authHeader, 7);
    }
    
    return false;
}

/**
 * Hash a password
 * 
 * @param string $password Plain text password
 * @return string Hashed password
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

/**
 * Verify a password
 * 
 * @param string $password Plain text password
 * @param string $hash Hashed password
 * @return bool True if verified, false otherwise
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

/**
 * Generate a random token for password reset or email verification
 * 
 * @param int $length Token length
 * @return string Random token
 */
function generateRandomToken($length = 32) {
    return bin2hex(random_bytes($length / 2));
}

/**
 * Requires authentication for the current request
 * Returns the authenticated user data or terminates the request
 * 
 * @return array User data
 */
function requireAuth() {
    $token = getBearerToken();
    
    if (!$token) {
        sendResponse(401, ['error' => 'Unauthorized - Token not provided']);
        exit;
    }
    
    $userData = validateToken($token);
    
    if (!$userData) {
        sendResponse(401, ['error' => 'Unauthorized - Invalid token']);
        exit;
    }
    
    return $userData;
}

/**
 * Requires a specific role for the current request
 * Returns the authenticated user data or terminates the request
 * 
 * @param string|array $roles Required role(s)
 * @return array User data
 */
function requireRole($roles) {
    $userData = requireAuth();
    
    if (is_string($roles)) {
        $roles = [$roles];
    }
    
    if (!in_array($userData['role'], $roles)) {
        sendResponse(403, ['error' => 'Forbidden - Insufficient permissions']);
        exit;
    }
    
    return $userData;
} 