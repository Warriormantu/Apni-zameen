<?php
/**
 * Validation Utilities
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
 * Validate required fields in an array
 *
 * @param array $data Data to validate
 * @param array $requiredFields Required field names
 * @return array Array of missing fields or empty if all required fields are present
 */
function validateRequiredFields($data, $requiredFields) {
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $missingFields[] = $field;
        }
    }
    
    return $missingFields;
}

/**
 * Validate a password (at least 8 characters, containing uppercase, lowercase, and number)
 *
 * @param string $password Password to validate
 * @return bool True if valid, false otherwise
 */
function validatePassword($password) {
    // At least 8 characters
    if (strlen($password) < 8) {
        return false;
    }
    
    // At least one uppercase letter
    if (!preg_match('/[A-Z]/', $password)) {
        return false;
    }
    
    // At least one lowercase letter
    if (!preg_match('/[a-z]/', $password)) {
        return false;
    }
    
    // At least one number
    if (!preg_match('/[0-9]/', $password)) {
        return false;
    }
    
    return true;
}

/**
 * Sanitize input data
 *
 * @param mixed $data Data to sanitize
 * @return mixed Sanitized data
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
    } else {
        $data = htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
    
    return $data;
}

/**
 * Validate numeric value
 *
 * @param mixed $value Value to validate
 * @return bool True if numeric, false otherwise
 */
function validateNumeric($value) {
    return is_numeric($value);
}

/**
 * Validate date format (YYYY-MM-DD)
 *
 * @param string $date Date to validate
 * @return bool True if valid, false otherwise
 */
function validateDate($date) {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    return $d && $d->format('Y-m-d') === $date;
}

/**
 * Validate URL
 *
 * @param string $url URL to validate
 * @return bool True if valid, false otherwise
 */
function validateUrl($url) {
    return filter_var($url, FILTER_VALIDATE_URL) !== false;
} 