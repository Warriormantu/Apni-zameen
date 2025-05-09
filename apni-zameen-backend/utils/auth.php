<?php
/**
 * Authentication Utilities
 * Functions for handling authentication and JWT
 */

/**
 * Generate a JWT token
 *
 * @param array $payload Data to include in the token
 * @return string JWT token
 */
function generateCustomToken($payload) {
    global $jwt_secret, $jwt_expiry;
    
    // Set issued at and expiration time
    $issuedAt = time();
    $expirationTime = $issuedAt + $jwt_expiry;
    
    // Create token payload
    $tokenPayload = [
        'iat' => $issuedAt,
        'exp' => $expirationTime,
        'data' => $payload
    ];
    
    // Encode Header
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    
    // Encode Payload
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($tokenPayload)));
    
    // Create Signature
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $jwt_secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    // Create JWT
    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    
    return $jwt;
}

/**
 * Validate a JWT token
 *
 * @param string $token JWT token
 * @return array|boolean Payload data if valid, false otherwise
 */
function validateCustomToken($token) {
    global $jwt_secret;
    
    // Split the token
    $tokenParts = explode('.', $token);
    if (count($tokenParts) != 3) {
        return false;
    }
    
    $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
    $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
    $signatureProvided = $tokenParts[2];
    
    // Check if token is expired
    $payloadObj = json_decode($payload, true);
    if ($payloadObj === null) {
        return false;
    }
    
    if (isset($payloadObj['exp']) && $payloadObj['exp'] < time()) {
        return false;
    }
    
    // Verify signature
    $base64UrlHeader = $tokenParts[0];
    $base64UrlPayload = $tokenParts[1];
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $jwt_secret, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    if ($base64UrlSignature !== $signatureProvided) {
        return false;
    }
    
    return isset($payloadObj['data']) ? $payloadObj['data'] : $payloadObj;
}

/**
 * Get the user ID from the token
 *
 * @return int|false User ID if valid token, false otherwise
 */
function getCurrentUserId() {
    $token = getBearerToken();
    if (!$token) {
        return false;
    }
    
    $payload = validateCustomToken($token);
    if (!$payload || !isset($payload['id'])) {
        return false;
    }
    
    return $payload['id'];
}

/**
 * Get the current user role from the token
 *
 * @return string|false User role if valid token, false otherwise
 */
function getCurrentUserRole() {
    $token = getBearerToken();
    if (!$token) {
        return false;
    }
    
    $payload = validateCustomToken($token);
    if (!$payload || !isset($payload['role'])) {
        return false;
    }
    
    return $payload['role'];
}

/**
 * Get bearer token from the Authorization header
 *
 * @return string|false Token if found, false otherwise
 */
function getBearerToken() {
    $headers = getAuthorizationHeader();
    
    // Check if token is available in header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    
    return false;
}

/**
 * Get Authorization header
 *
 * @return string|null Authorization header if found, null otherwise
 */
function getAuthorizationHeader() {
    if (isset($_SERVER['Authorization'])) {
        return trim($_SERVER['Authorization']);
    }
    
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['HTTP_AUTHORIZATION']);
    }
    
    if (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        $requestHeaders = array_combine(
            array_map('ucwords', array_keys($requestHeaders)),
            array_values($requestHeaders)
        );
        
        if (isset($requestHeaders['Authorization'])) {
            return trim($requestHeaders['Authorization']);
        }
    }
    
    return null;
}

/**
 * Hash a password
 *
 * @param string $password Plain text password
 * @return string Hashed password
 */
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

/**
 * Verify a password
 *
 * @param string $password Plain text password
 * @param string $hash Hashed password
 * @return boolean True if password matches hash, false otherwise
 */
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
} 