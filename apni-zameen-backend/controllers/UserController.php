<?php
/**
 * User Controller
 */

class UserController {
    private $userModel;
    
    public function __construct() {
        require_once BASE_PATH . '/models/User.php';
        $this->userModel = new User();
    }
    
    /**
     * Get user profile
     *
     * @return void
     */
    public function getProfile() {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Get user details
        $user = $this->userModel->getById($userData['user_id']);
        
        if (!$user) {
            sendResponse(404, ['error' => 'User not found']);
            return;
        }
        
        sendResponse(200, $user);
    }
    
    /**
     * Update user profile
     *
     * @param array $requestData Profile data to update
     * @return void
     */
    public function updateProfile($requestData) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Validate email if provided
        if (isset($requestData['email']) && !validateEmail($requestData['email'])) {
            sendResponse(400, ['error' => 'Invalid email format']);
            return;
        }
        
        // Check if email is already taken
        if (isset($requestData['email'])) {
            $existingUser = $this->userModel->getByEmail($requestData['email']);
            if ($existingUser && $existingUser['id'] != $userData['user_id']) {
                sendResponse(409, ['error' => 'Email already registered']);
                return;
            }
        }
        
        // Sanitize input data
        $sanitizedData = sanitizeInput($requestData);
        
        // Update user profile
        $success = $this->userModel->update($userData['user_id'], $sanitizedData);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to update profile']);
            return;
        }
        
        // Get updated user details
        $updatedUser = $this->userModel->getById($userData['user_id']);
        
        sendResponse(200, [
            'message' => 'Profile updated successfully',
            'user' => $updatedUser
        ]);
    }
    
    /**
     * Get saved properties for the user
     *
     * @return void
     */
    public function getSavedProperties() {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Get saved properties
        $properties = $this->userModel->getSavedProperties($userData['user_id']);
        
        sendResponse(200, $properties);
    }
    
    /**
     * Save a property for the user
     *
     * @param array $requestData Request data
     * @return void
     */
    public function saveProperty($requestData) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Validate required fields
        if (!isset($requestData['property_id']) || empty($requestData['property_id'])) {
            sendResponse(400, ['error' => 'Property ID is required']);
            return;
        }
        
        $propertyId = $requestData['property_id'];
        
        // Check if property exists
        require_once BASE_PATH . '/models/Property.php';
        $propertyModel = new Property();
        $property = $propertyModel->getById($propertyId);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        // Save property
        $success = $this->userModel->saveProperty($userData['user_id'], $propertyId);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to save property']);
            return;
        }
        
        sendResponse(200, ['message' => 'Property saved successfully']);
    }
    
    /**
     * Unsave a property for the user
     *
     * @param int $propertyId Property ID
     * @return void
     */
    public function unsaveProperty($propertyId) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Unsave property
        $success = $this->userModel->unsaveProperty($userData['user_id'], $propertyId);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to unsave property']);
            return;
        }
        
        sendResponse(200, ['message' => 'Property unsaved successfully']);
    }
    
    /**
     * Upload user avatar
     *
     * @param array $files Uploaded files
     * @return void
     */
    public function uploadAvatar($files) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Check if avatar file is uploaded
        if (!isset($files['avatar']) || $files['avatar']['error'] !== UPLOAD_ERR_OK) {
            sendResponse(400, ['error' => 'No avatar file uploaded or upload error']);
            return;
        }
        
        $file = $files['avatar'];
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            sendResponse(400, ['error' => 'Invalid file type. Only JPEG, PNG, and GIF are allowed']);
            return;
        }
        
        // Validate file size (max 2MB)
        $maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if ($file['size'] > $maxSize) {
            sendResponse(400, ['error' => 'File size exceeds the limit of 2MB']);
            return;
        }
        
        // Create upload directory if it doesn't exist
        $uploadDir = BASE_PATH . '/uploads/avatars';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        // Generate a unique filename
        $filename = uniqid('avatar_') . '_' . $userData['user_id'] . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $filepath = $uploadDir . '/' . $filename;
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            sendResponse(500, ['error' => 'Failed to upload avatar']);
            return;
        }
        
        // Update user profile with new avatar URL
        $avatarUrl = '/uploads/avatars/' . $filename;
        $success = $this->userModel->update($userData['user_id'], ['profile_image' => $avatarUrl]);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to update avatar']);
            return;
        }
        
        sendResponse(200, [
            'message' => 'Avatar uploaded successfully',
            'avatar_url' => $avatarUrl
        ]);
    }
    
    /**
     * Update user password
     *
     * @param array $requestData Request data
     * @return void
     */
    public function updatePassword($requestData) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Validate required fields
        $requiredFields = ['current_password', 'new_password'];
        $missingFields = validateRequiredFields($requestData, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(400, ['error' => 'Missing required fields', 'fields' => $missingFields]);
            return;
        }
        
        // Validate password strength
        if (!validatePassword($requestData['new_password'])) {
            sendResponse(400, [
                'error' => 'Password does not meet requirements',
                'message' => 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
            ]);
            return;
        }
        
        // Get user with password
        $user = $this->userModel->getByEmail($userData['email']);
        
        // Verify current password
        if (!$this->userModel->verifyPassword($requestData['current_password'], $user['password'])) {
            sendResponse(401, ['error' => 'Current password is incorrect']);
            return;
        }
        
        // Update password
        $success = $this->userModel->updatePassword($userData['user_id'], $requestData['new_password']);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to update password']);
            return;
        }
        
        sendResponse(200, ['message' => 'Password updated successfully']);
    }
    
    // The following methods are placeholders for the functionality mentioned in the index.php
    // They should be implemented as needed
    
    public function getSavedSearches() {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function saveSearch($requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function deleteSavedSearch($searchId) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function getAppointments() {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function createAppointment($requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function updateAppointment($appointmentId, $requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function cancelAppointment($appointmentId) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function getComparisons() {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function createComparison($requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function updateComparison($comparisonId, $requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function deleteComparison($comparisonId) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function getDocuments() {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function uploadDocument($files, $postData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function deleteDocument($documentId) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function getConversations() {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function getConversation($conversationId) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function startConversation($requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
    
    public function sendMessage($conversationId, $requestData) {
        sendResponse(200, ['message' => 'Functionality not implemented yet']);
    }
} 