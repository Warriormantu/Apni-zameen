<?php
/**
 * Validation Utilities
 * Handles input validation for API requests
 */

/**
 * Validate an email address
 * 
 * @param string $email Email to validate
 * @return bool True if valid, false otherwise
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validate a password according to security requirements
 * 
 * @param string $password Password to validate
 * @return bool True if valid, false otherwise
 */
function validatePassword($password) {
    // Minimum 8 characters, at least one letter and one number
    return strlen($password) >= 8 && 
           preg_match('/[A-Za-z]/', $password) && 
           preg_match('/[0-9]/', $password);
}

/**
 * Sanitize input data to prevent XSS and other attacks
 * 
 * @param mixed $data Input data to sanitize
 * @return mixed Sanitized data
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
    } else {
        // Convert special characters to HTML entities
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    }
    
    return $data;
}

/**
 * Validate required fields in a request
 * 
 * @param array $data Request data
 * @param array $requiredFields List of required field names
 * @return array|bool Errors array or true if valid
 */
function validateRequiredFields($data, $requiredFields) {
    $errors = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $errors[] = "Field '$field' is required";
        }
    }
    
    return empty($errors) ? true : $errors;
}

/**
 * Validate a numeric value is within range
 * 
 * @param mixed $value Value to validate
 * @param float $min Minimum allowed value
 * @param float $max Maximum allowed value
 * @return bool True if valid, false otherwise
 */
function validateNumericRange($value, $min, $max) {
    return is_numeric($value) && $value >= $min && $value <= $max;
}

/**
 * Validate a date string format
 * 
 * @param string $date Date string to validate
 * @param string $format Date format (default: Y-m-d)
 * @return bool True if valid, false otherwise
 */
function validateDate($date, $format = 'Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
} 