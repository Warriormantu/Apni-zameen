<?php
/**
 * Response Utilities
 * Functions for handling API responses
 */

/**
 * Send a JSON response with appropriate status code
 *
 * @param int $statusCode HTTP status code
 * @param array $data Data to be sent in response
 * @return void
 */
function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

/**
 * Send a success response
 *
 * @param array $data Data to be sent in response
 * @param int $statusCode HTTP status code (default: 200)
 * @return void
 */
function sendSuccessResponse($data, $statusCode = 200) {
    sendResponse($statusCode, $data);
}

/**
 * Send an error response
 *
 * @param string $message Error message
 * @param int $statusCode HTTP status code (default: 400)
 * @param array $errors Additional error details
 * @return void
 */
function sendErrorResponse($message, $statusCode = 400, $errors = []) {
    $response = [
        'error' => $message
    ];
    
    if (!empty($errors)) {
        $response['details'] = $errors;
    }
    
    sendResponse($statusCode, $response);
}

/**
 * Send a not found response
 *
 * @param string $message Error message (default: 'Resource not found')
 * @return void
 */
function sendNotFoundResponse($message = 'Resource not found') {
    sendErrorResponse($message, 404);
}

/**
 * Send an unauthorized response
 *
 * @param string $message Error message (default: 'Unauthorized')
 * @return void
 */
function sendUnauthorizedResponse($message = 'Unauthorized') {
    sendErrorResponse($message, 401);
}

/**
 * Send a forbidden response
 *
 * @param string $message Error message (default: 'Forbidden')
 * @return void
 */
function sendForbiddenResponse($message = 'Forbidden') {
    sendErrorResponse($message, 403);
}

/**
 * Send a validation error response
 *
 * @param array $errors Validation errors
 * @param string $message Error message (default: 'Validation error')
 * @return void
 */
function sendValidationErrorResponse($errors, $message = 'Validation error') {
    sendErrorResponse($message, 422, $errors);
}

/**
 * Send a server error response
 *
 * @param string $message Error message (default: 'Internal server error')
 * @return void
 */
function sendServerErrorResponse($message = 'Internal server error') {
    sendErrorResponse($message, 500);
} 