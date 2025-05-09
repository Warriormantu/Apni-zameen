<?php
/**
 * Property Controller
 */

class PropertyController {
    private $propertyModel;
    
    public function __construct() {
        require_once BASE_PATH . '/models/Property.php';
        $this->propertyModel = new Property();
    }
    
    /**
     * Get all properties with pagination
     *
     * @param array $params Query parameters
     * @return void
     */
    public function getAll($params) {
        // Set default parameters
        $page = isset($params['page']) && is_numeric($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 10;
        $sortBy = isset($params['sort_by']) ? $params['sort_by'] : 'created_at';
        $sortOrder = isset($params['sort_order']) && strtolower($params['sort_order']) === 'asc' ? 'ASC' : 'DESC';
        
        // Get properties
        $result = $this->propertyModel->getAll($page, $limit, $sortBy, $sortOrder);
        
        // Send response
        sendResponse(200, $result);
    }
    
    /**
     * Get property by ID
     *
     * @param int $id Property ID
     * @return void
     */
    public function getById($id) {
        // Get property
        $property = $this->propertyModel->getById($id);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        // Send response
        sendResponse(200, $property);
    }
    
    /**
     * Search properties
     *
     * @param array $params Search parameters
     * @return void
     */
    public function search($params) {
        // Set default parameters
        $page = isset($params['page']) && is_numeric($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 10;
        
        // Prepare search criteria
        $criteria = [
            'keyword' => isset($params['keyword']) ? $params['keyword'] : null,
            'property_type' => isset($params['property_type']) ? $params['property_type'] : null,
            'property_category' => isset($params['property_category']) ? $params['property_category'] : null,
            'min_price' => isset($params['min_price']) && is_numeric($params['min_price']) ? (float)$params['min_price'] : null,
            'max_price' => isset($params['max_price']) && is_numeric($params['max_price']) ? (float)$params['max_price'] : null,
            'min_area' => isset($params['min_area']) && is_numeric($params['min_area']) ? (float)$params['min_area'] : null,
            'max_area' => isset($params['max_area']) && is_numeric($params['max_area']) ? (float)$params['max_area'] : null,
            'bedrooms' => isset($params['bedrooms']) && is_numeric($params['bedrooms']) ? (int)$params['bedrooms'] : null,
            'bathrooms' => isset($params['bathrooms']) && is_numeric($params['bathrooms']) ? (int)$params['bathrooms'] : null,
            'city' => isset($params['city']) ? $params['city'] : null,
            'area' => isset($params['area']) ? $params['area'] : null,
            'features' => isset($params['features']) ? explode(',', $params['features']) : null,
            'sort_by' => isset($params['sort_by']) ? $params['sort_by'] : 'created_at',
            'sort_order' => isset($params['sort_order']) && strtolower($params['sort_order']) === 'asc' ? 'ASC' : 'DESC'
        ];
        
        // Search properties
        $result = $this->propertyModel->search($criteria, $page, $limit);
        
        // Send response
        sendResponse(200, $result);
    }
    
    /**
     * Get featured properties
     *
     * @param array $params Query parameters
     * @return void
     */
    public function getFeatured($params) {
        // Set default limit
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 6;
        
        // Get featured properties
        $properties = $this->propertyModel->getFeatured($limit);
        
        // Send response
        sendResponse(200, $properties);
    }
    
    /**
     * Get trending cities
     *
     * @param array $params Query parameters
     * @return void
     */
    public function getTrendingCities($params) {
        // Set default limit
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 6;
        
        // Get trending cities
        $cities = $this->propertyModel->getTrendingCities($limit);
        
        // Send response
        sendResponse(200, $cities);
    }
    
    /**
     * Get properties by city
     *
     * @param string $city City name
     * @param array $params Query parameters
     * @return void
     */
    public function getByCity($city, $params) {
        // Set default parameters
        $page = isset($params['page']) && is_numeric($params['page']) ? (int)$params['page'] : 1;
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 10;
        $sortBy = isset($params['sort_by']) ? $params['sort_by'] : 'created_at';
        $sortOrder = isset($params['sort_order']) && strtolower($params['sort_order']) === 'asc' ? 'ASC' : 'DESC';
        
        // Get properties by city
        $result = $this->propertyModel->getByCity($city, $page, $limit, $sortBy, $sortOrder);
        
        // Send response
        sendResponse(200, $result);
    }
    
    /**
     * Get similar properties
     *
     * @param int $propertyId Property ID
     * @param array $params Query parameters
     * @return void
     */
    public function getSimilar($propertyId, $params) {
        // Set default limit
        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int)$params['limit'] : 4;
        
        // Get similar properties
        $properties = $this->propertyModel->getSimilar($propertyId, $limit);
        
        // Send response
        sendResponse(200, $properties);
    }
    
    /**
     * Create a new property
     *
     * @param array $requestData Property data
     * @return void
     */
    public function create($requestData) {
        try {
            // Get user ID from token
            $token = getBearerToken();
            $userData = validateToken($token);
            
            if (!$userData) {
                sendResponse(401, ['error' => 'Unauthorized']);
                return;
            }
            
            // Add user ID to property data
            $requestData['user_id'] = $userData['user_id'];
            
            // Validate required fields
            $requiredFields = [
                'title', 'description', 'price', 'property_type', 'property_category', 
                'area_size', 'area_unit', 'city', 'address'
            ];
            
            foreach ($requiredFields as $field) {
                if (!isset($requestData[$field]) || empty($requestData[$field])) {
                    sendResponse(400, ['error' => "Field '$field' is required"]);
                    return;
                }
            }
            
            // Sanitize input data
            $sanitizedData = sanitizeInput($requestData);
            
            // Create property
            $propertyId = $this->propertyModel->create($sanitizedData);
            
            if (!$propertyId) {
                sendResponse(500, ['error' => 'Failed to create property']);
                return;
            }
            
            // Get the newly created property
            $property = $this->propertyModel->getById($propertyId);
            
            // Send response
            sendResponse(201, [
                'message' => 'Property created successfully',
                'property' => $property
            ]);
        } catch (Exception $e) {
            error_log("Error creating property: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while creating property']);
        }
    }
    
    /**
     * Update a property
     *
     * @param int $id Property ID
     * @param array $requestData Property data to update
     * @return void
     */
    public function update($id, $requestData) {
        try {
            // Get user ID from token
            $token = getBearerToken();
            $userData = validateToken($token);
            
            if (!$userData) {
                sendResponse(401, ['error' => 'Unauthorized']);
                return;
            }
            
            // Get property
            $property = $this->propertyModel->getById($id);
            
            if (!$property) {
                sendResponse(404, ['error' => 'Property not found']);
                return;
            }
            
            // Check if user is the owner of the property
            if ($property['user_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
                sendResponse(403, ['error' => 'You are not authorized to update this property']);
                return;
            }
            
            // Check that there's at least one field to update
            if (empty($requestData)) {
                sendResponse(400, ['error' => 'No fields to update']);
                return;
            }
            
            // Sanitize input data
            $sanitizedData = sanitizeInput($requestData);
            
            // Update property
            $success = $this->propertyModel->update($id, $sanitizedData);
            
            if (!$success) {
                sendResponse(500, ['error' => 'Failed to update property']);
                return;
            }
            
            // Get the updated property
            $updatedProperty = $this->propertyModel->getById($id);
            
            // Send response
            sendResponse(200, [
                'message' => 'Property updated successfully',
                'property' => $updatedProperty
            ]);
        } catch (Exception $e) {
            error_log("Error updating property: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while updating property']);
        }
    }
    
    /**
     * Delete a property
     *
     * @param int $id Property ID
     * @return void
     */
    public function delete($id) {
        try {
            // Get user ID from token
            $token = getBearerToken();
            $userData = validateToken($token);
            
            if (!$userData) {
                sendResponse(401, ['error' => 'Unauthorized']);
                return;
            }
            
            // Get property
            $property = $this->propertyModel->getById($id);
            
            if (!$property) {
                sendResponse(404, ['error' => 'Property not found']);
                return;
            }
            
            // Check if user is the owner of the property
            if ($property['user_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
                sendResponse(403, ['error' => 'You are not authorized to delete this property']);
                return;
            }
            
            // Delete property
            $success = $this->propertyModel->delete($id);
            
            if (!$success) {
                sendResponse(500, ['error' => 'Failed to delete property']);
                return;
            }
            
            // Send response
            sendResponse(200, ['message' => 'Property deleted successfully']);
        } catch (Exception $e) {
            error_log("Error deleting property: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while deleting property']);
        }
    }
    
    /**
     * Upload property images
     *
     * @param int $propertyId Property ID
     * @param array $files Uploaded files
     * @return void
     */
    public function uploadImages($propertyId, $files) {
        try {
            // Get user ID from token
            $token = getBearerToken();
            $userData = validateToken($token);
            
            if (!$userData) {
                sendResponse(401, ['error' => 'Unauthorized']);
                return;
            }
            
            // Get property
            $property = $this->propertyModel->getById($propertyId);
            
            if (!$property) {
                sendResponse(404, ['error' => 'Property not found']);
                return;
            }
            
            // Check if user is the owner of the property
            if ($property['user_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
                sendResponse(403, ['error' => 'You are not authorized to upload images for this property']);
                return;
            }
            
            // Check if files were uploaded
            if (empty($files) || !isset($files['images'])) {
                sendResponse(400, ['error' => 'No images uploaded']);
                return;
            }
            
            // Basic implementation - would normally include proper file handling
            sendResponse(200, ['message' => 'Image upload functionality available in full version']);
        } catch (Exception $e) {
            error_log("Error uploading property images: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while uploading images']);
        }
    }
} 