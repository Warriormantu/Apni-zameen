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
        try {
            // Get user ID from token
            $token = getBearerToken();
            $userData = validateToken($token);
            
            if (!$userData) {
                sendResponse(401, ['error' => 'Unauthorized']);
                return;
            }
            
            // Log the request data for debugging
            error_log("Update profile request data: " . json_encode($requestData));
            
            // Check that there's at least one field to update
            if (empty($requestData)) {
                sendResponse(400, ['error' => 'No fields to update']);
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
            
            // Validate phone number if provided (basic validation)
            if (isset($requestData['phone']) && !empty($requestData['phone'])) {
                if (!preg_match('/^[0-9+\-\s()]{6,20}$/', $requestData['phone'])) {
                    sendResponse(400, ['error' => 'Invalid phone number format']);
                    return;
                }
            }
            
            // Sanitize input data
            $sanitizedData = sanitizeInput($requestData);
            
            // Update user profile
            $success = $this->userModel->update($userData['user_id'], $sanitizedData);
            
            if (!$success) {
                error_log("Failed to update user profile: " . json_encode([
                    'user_id' => $userData['user_id'],
                    'data' => $sanitizedData
                ]));
                sendResponse(500, ['error' => 'Failed to update profile']);
                return;
            }
            
            // Get updated user details
            $updatedUser = $this->userModel->getById($userData['user_id']);
            
            if (!$updatedUser) {
                error_log("User not found after update: " . $userData['user_id']);
                sendResponse(500, ['error' => 'Failed to retrieve updated profile']);
                return;
            }
            
            sendResponse(200, [
                'message' => 'Profile updated successfully',
                'user' => $updatedUser
            ]);
        } catch (Exception $e) {
            error_log("Error updating user profile: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while updating profile']);
        }
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
     * Placeholder method for uploading avatar
     */
    public function uploadAvatar($files) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Basic implementation - would normally include proper file handling
        sendResponse(200, ['message' => 'Avatar upload functionality available in full version']);
    }
    
    /**
     * Placeholder method for saved searches
     */
    public function getSavedSearches() {
        sendResponse(200, ['message' => 'Saved searches functionality available in full version']);
    }
    
    /**
     * Placeholder method for saving searches
     */
    public function saveSearch($requestData) {
        sendResponse(200, ['message' => 'Save search functionality available in full version']);
    }
    
    /**
     * Placeholder method for deleting saved searches
     */
    public function deleteSavedSearch($searchId) {
        sendResponse(200, ['message' => 'Delete saved search functionality available in full version']);
    }
    
    /**
     * Placeholder method for appointments
     */
    public function getAppointments() {
        sendResponse(200, ['message' => 'Appointments functionality available in full version']);
    }
    
    /**
     * Placeholder method for creating appointments
     */
    public function createAppointment($requestData) {
        sendResponse(200, ['message' => 'Create appointment functionality available in full version']);
    }
    
    /**
     * Placeholder method for updating appointments
     */
    public function updateAppointment($appointmentId, $requestData) {
        sendResponse(200, ['message' => 'Update appointment functionality available in full version']);
    }
    
    /**
     * Placeholder method for canceling appointments
     */
    public function cancelAppointment($appointmentId) {
        sendResponse(200, ['message' => 'Cancel appointment functionality available in full version']);
    }
    
    /**
     * Placeholder method for comparisons
     */
    public function getComparisons() {
        sendResponse(200, ['message' => 'Comparisons functionality available in full version']);
    }
    
    /**
     * Placeholder method for creating comparisons
     */
    public function createComparison($requestData) {
        sendResponse(200, ['message' => 'Create comparison functionality available in full version']);
    }
    
    /**
     * Placeholder method for updating comparisons
     */
    public function updateComparison($comparisonId, $requestData) {
        sendResponse(200, ['message' => 'Update comparison functionality available in full version']);
    }
    
    /**
     * Placeholder method for deleting comparisons
     */
    public function deleteComparison($comparisonId) {
        sendResponse(200, ['message' => 'Delete comparison functionality available in full version']);
    }
    
    /**
     * Placeholder method for documents
     */
    public function getDocuments() {
        sendResponse(200, ['message' => 'Documents functionality available in full version']);
    }
    
    /**
     * Placeholder method for uploading documents
     */
    public function uploadDocument($files, $postData) {
        sendResponse(200, ['message' => 'Upload document functionality available in full version']);
    }
    
    /**
     * Placeholder method for deleting documents
     */
    public function deleteDocument($documentId) {
        sendResponse(200, ['message' => 'Delete document functionality available in full version']);
    }
    
    /**
     * Placeholder method for getting conversations
     */
    public function getConversations() {
        sendResponse(200, ['message' => 'Conversations functionality available in full version']);
    }
    
    /**
     * Placeholder method for getting a conversation
     */
    public function getConversation($conversationId) {
        sendResponse(200, ['message' => 'Get conversation functionality available in full version']);
    }
    
    /**
     * Placeholder method for starting a conversation
     */
    public function startConversation($requestData) {
        sendResponse(200, ['message' => 'Start conversation functionality available in full version']);
    }
    
    /**
     * Placeholder method for sending a message
     */
    public function sendMessage($conversationId, $requestData) {
        sendResponse(200, ['message' => 'Send message functionality available in full version']);
    }
} 