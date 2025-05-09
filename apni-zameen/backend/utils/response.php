<?php
/**
 * Response Utilities
 * Handles formatting and sending API responses
 */

/**
 * Send a JSON response with the given status code and data
 * 
 * @param int $statusCode HTTP status code
 * @param mixed $data Response data
 * @return void
 */
function sendResponse($statusCode, $data) {
    // Set HTTP status code
    http_response_code($statusCode);
    
    // Set content type header
    header('Content-Type: application/json');
    
    // Create response array
    $response = [
        'status' => $statusCode,
        'data' => $data
    ];
    
    // Add success flag based on status code
    $response['success'] = $statusCode >= 200 && $statusCode < 300;
    
    // Output response as JSON
    echo json_encode($response);
    exit;
}

/**
 * Send an error response with the given status code and message
 * 
 * @param int $statusCode HTTP status code
 * @param string $message Error message
 * @param array $details Additional error details
 * @return void
 */
function sendErrorResponse($statusCode, $message, $details = []) {
    // Set HTTP status code
    http_response_code($statusCode);
    
    // Set content type header
    header('Content-Type: application/json');
    
    // Create error response
    $response = [
        'status' => $statusCode,
        'success' => false,
        'error' => [
            'message' => $message
        ]
    ];
    
    // Add details if provided
    if (!empty($details)) {
        $response['error']['details'] = $details;
    }
    
    // Output response as JSON
    echo json_encode($response);
    exit;
}

/**
 * Send a success response with the given data
 * 
 * @param mixed $data Response data
 * @param int $statusCode HTTP status code (defaults to 200)
 * @return void
 */
function sendSuccessResponse($data, $statusCode = 200) {
    sendResponse($statusCode, $data);
} 