<?php
/**
 * JWT Configuration
 */

// JWT settings
define('JWT_SECRET', 'l1E7ZO8P4rJ9uF3kY2qV5mT0wX6sB8gN7cD2eK9pL5qA');
define('JWT_ISSUER', 'apni-zameen-api');
define('JWT_AUDIENCE', 'apni-zameen-client');
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRY', 3600); // 1 hour in seconds

// Custom JWT implementation (no external dependencies)

/**
 * Generate a JWT token for a user
 *
 * @param array $userData User data to encode in the token
 * @return string The generated JWT token
 */
function generateToken($userData) {
    $issuedAt = time();
    $expiresAt = $issuedAt + JWT_EXPIRY;
    
    $payload = [
        'iss' => JWT_ISSUER,
        'aud' => JWT_AUDIENCE,
        'iat' => $issuedAt,
        'exp' => $expiresAt,
        'data' => [
            'user_id' => $userData['id'],
            'email' => $userData['email'],
            'role' => $userData['role']
        ]
    ];
    
    // Create JWT
    $header = ['typ' => 'JWT', 'alg' => 'HS256'];
    
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($header)));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Decode and validate a JWT token
 *
 * @param string $token The JWT token to decode
 * @return array|bool The decoded token data or false if invalid
 */
function decodeToken($token) {
    try {
        // Split the token
        $tokenParts = explode('.', $token);
        if (count($tokenParts) != 3) {
            return false;
        }
        
        $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[0]));
        $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
        $signatureProvided = $tokenParts[2];
        
        // Check the header
        $headerObj = json_decode($header, true);
        if (!$headerObj || !isset($headerObj['alg']) || $headerObj['alg'] !== 'HS256') {
            return false;
        }
        
        // Check the payload
        $payloadObj = json_decode($payload, true);
        if (!$payloadObj) {
            return false;
        }
        
        // Verify the signature
        $base64UrlHeader = $tokenParts[0];
        $base64UrlPayload = $tokenParts[1];
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        
        if ($base64UrlSignature !== $signatureProvided) {
            return false;
        }
        
        // Check if token is expired
        if (isset($payloadObj['exp']) && $payloadObj['exp'] < time()) {
            return false;
        }
        
        return isset($payloadObj['data']) ? $payloadObj['data'] : false;
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Validate a token and return user data if valid
 *
 * @param string $token The JWT token to validate
 * @return array|bool The user data or false if invalid
 */
function validateToken($token) {
    $userData = decodeToken($token);
    
    if (!$userData) {
        return false;
    }
    
    // Additional validation can be done here, such as checking if the user still exists in the database
    
    return $userData;
} 