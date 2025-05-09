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
     * Get property by ID
     *
     * @param int $id Property ID
     * @return void
     */
    public function getById($id) {
        $property = $this->propertyModel->getById($id);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        sendResponse(200, $property);
    }
    
    /**
     * Get all properties with optional filtering
     *
     * @param array $filters Optional filters
     * @return void
     */
    public function getAll($filters = []) {
        // Set pagination parameters
        $limit = isset($filters['limit']) ? (int)$filters['limit'] : 10;
        $page = isset($filters['page']) ? (int)$filters['page'] : 1;
        $offset = ($page - 1) * $limit;
        
        // Get properties
        $properties = $this->propertyModel->getAll($filters, $limit, $offset);
        
        sendResponse(200, [
            'properties' => $properties,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => count($properties) // This should ideally be a separate count query
            ]
        ]);
    }
    
    /**
     * Search properties
     *
     * @param array $params Search parameters
     * @return void
     */
    public function search($params) {
        // Check if search term is provided
        if (!isset($params['q']) || empty($params['q'])) {
            sendResponse(400, ['error' => 'Search term is required']);
            return;
        }
        
        $searchTerm = $params['q'];
        
        // Set pagination parameters
        $limit = isset($params['limit']) ? (int)$params['limit'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $offset = ($page - 1) * $limit;
        
        // Extract filters from parameters
        $filters = [];
        $filterableFields = ['price_min', 'price_max', 'bedrooms', 'bathrooms', 'type', 'city', 'status'];
        
        foreach ($filterableFields as $field) {
            if (isset($params[$field]) && !empty($params[$field])) {
                $filters[$field] = $params[$field];
            }
        }
        
        // Search properties
        $properties = $this->propertyModel->search($searchTerm, $filters, $limit, $offset);
        
        sendResponse(200, [
            'properties' => $properties,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => count($properties) // This should ideally be a separate count query
            ]
        ]);
    }
    
    /**
     * Get featured properties
     *
     * @param array $params Optional parameters
     * @return void
     */
    public function getFeatured($params) {
        $limit = isset($params['limit']) ? (int)$params['limit'] : 6;
        $properties = $this->propertyModel->getFeatured($limit);
        
        sendResponse(200, $properties);
    }
    
    /**
     * Get properties by city
     *
     * @param string $city City name
     * @param array $params Optional parameters
     * @return void
     */
    public function getByCity($city, $params) {
        // Set pagination parameters
        $limit = isset($params['limit']) ? (int)$params['limit'] : 10;
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $offset = ($page - 1) * $limit;
        
        // Get properties
        $properties = $this->propertyModel->getByCity($city, $limit, $offset);
        
        sendResponse(200, [
            'properties' => $properties,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => count($properties) // This should ideally be a separate count query
            ]
        ]);
    }
    
    /**
     * Get trending cities
     *
     * @param array $params Optional parameters
     * @return void
     */
    public function getTrendingCities($params) {
        $limit = isset($params['limit']) ? (int)$params['limit'] : 6;
        $cities = $this->propertyModel->getTrendingCities($limit);
        
        sendResponse(200, $cities);
    }
    
    /**
     * Get similar properties
     *
     * @param int $propertyId Property ID
     * @param array $params Optional parameters
     * @return void
     */
    public function getSimilar($propertyId, $params) {
        $limit = isset($params['limit']) ? (int)$params['limit'] : 4;
        $properties = $this->propertyModel->getSimilar($propertyId, $limit);
        
        sendResponse(200, $properties);
    }
    
    /**
     * Create a new property
     *
     * @param array $requestData Property data
     * @return void
     */
    public function create($requestData) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Validate required fields
        $requiredFields = ['title', 'description', 'price', 'type', 'status', 'bedrooms', 'bathrooms', 'area', 'address', 'city', 'state', 'zip_code'];
        $missingFields = validateRequiredFields($requestData, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(400, ['error' => 'Missing required fields', 'fields' => $missingFields]);
            return;
        }
        
        // Validate numeric fields
        $numericFields = ['price', 'bedrooms', 'bathrooms', 'area'];
        foreach ($numericFields as $field) {
            if (!validateNumeric($requestData[$field])) {
                sendResponse(400, ['error' => "Field '{$field}' must be numeric"]);
                return;
            }
        }
        
        // Sanitize input data
        $sanitizedData = sanitizeInput($requestData);
        
        // Create property
        $propertyId = $this->propertyModel->create($sanitizedData, $userData['user_id']);
        
        if (!$propertyId) {
            sendResponse(500, ['error' => 'Failed to create property']);
            return;
        }
        
        // Process images if provided
        if (isset($requestData['images']) && is_array($requestData['images'])) {
            foreach ($requestData['images'] as $image) {
                $this->propertyModel->addImage($propertyId, $image['url'], $image['caption'] ?? null);
            }
        }
        
        // Get the newly created property
        $property = $this->propertyModel->getById($propertyId);
        
        sendResponse(201, [
            'message' => 'Property created successfully',
            'property' => $property
        ]);
    }
    
    /**
     * Update a property
     *
     * @param int $id Property ID
     * @param array $requestData Property data to update
     * @return void
     */
    public function update($id, $requestData) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Check if property exists
        $property = $this->propertyModel->getById($id);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        // Check if user is the owner
        if ($property['owner_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
            sendResponse(403, ['error' => 'You are not authorized to update this property']);
            return;
        }
        
        // Validate numeric fields if provided
        $numericFields = ['price', 'bedrooms', 'bathrooms', 'area'];
        foreach ($numericFields as $field) {
            if (isset($requestData[$field]) && !validateNumeric($requestData[$field])) {
                sendResponse(400, ['error' => "Field '{$field}' must be numeric"]);
                return;
            }
        }
        
        // Sanitize input data
        $sanitizedData = sanitizeInput($requestData);
        
        // Update property
        $success = $this->propertyModel->update($id, $sanitizedData);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to update property']);
            return;
        }
        
        // Process images if provided
        if (isset($requestData['images']) && is_array($requestData['images'])) {
            // Remove existing images
            $existingImages = $property['images'] ?? [];
            foreach ($existingImages as $image) {
                $this->propertyModel->removeImage($image['id']);
            }
            
            // Add new images
            foreach ($requestData['images'] as $image) {
                $this->propertyModel->addImage($id, $image['url'], $image['caption'] ?? null);
            }
        }
        
        // Get the updated property
        $updatedProperty = $this->propertyModel->getById($id);
        
        sendResponse(200, [
            'message' => 'Property updated successfully',
            'property' => $updatedProperty
        ]);
    }
    
    /**
     * Delete a property
     *
     * @param int $id Property ID
     * @return void
     */
    public function delete($id) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Check if property exists
        $property = $this->propertyModel->getById($id);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        // Check if user is the owner
        if ($property['owner_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
            sendResponse(403, ['error' => 'You are not authorized to delete this property']);
            return;
        }
        
        // Delete property
        $success = $this->propertyModel->delete($id);
        
        if (!$success) {
            sendResponse(500, ['error' => 'Failed to delete property']);
            return;
        }
        
        sendResponse(200, ['message' => 'Property deleted successfully']);
    }
    
    /**
     * Upload property images
     *
     * @param int $propertyId Property ID
     * @param array $files Uploaded files
     * @return void
     */
    public function uploadImages($propertyId, $files) {
        // Get user ID from token
        $token = getBearerToken();
        $userData = validateToken($token);
        
        if (!$userData) {
            sendResponse(401, ['error' => 'Unauthorized']);
            return;
        }
        
        // Check if property exists
        $property = $this->propertyModel->getById($propertyId);
        
        if (!$property) {
            sendResponse(404, ['error' => 'Property not found']);
            return;
        }
        
        // Check if user is the owner
        if ($property['owner_id'] != $userData['user_id'] && $userData['role'] !== 'admin') {
            sendResponse(403, ['error' => 'You are not authorized to upload images for this property']);
            return;
        }
        
        // Check if images are uploaded
        if (empty($files['images'])) {
            sendResponse(400, ['error' => 'No images uploaded']);
            return;
        }
        
        $uploadedImages = [];
        $errors = [];
        
        // Handle multiple file uploads
        if (is_array($files['images']['name'])) {
            // Multiple files
            $fileCount = count($files['images']['name']);
            
            for ($i = 0; $i < $fileCount; $i++) {
                $file = [
                    'name' => $files['images']['name'][$i],
                    'type' => $files['images']['type'][$i],
                    'tmp_name' => $files['images']['tmp_name'][$i],
                    'error' => $files['images']['error'][$i],
                    'size' => $files['images']['size'][$i]
                ];
                
                $result = $this->processImageUpload($file, $propertyId);
                
                if (isset($result['error'])) {
                    $errors[] = $result['error'];
                } else {
                    $uploadedImages[] = $result;
                }
            }
        } else {
            // Single file
            $result = $this->processImageUpload($files['images'], $propertyId);
            
            if (isset($result['error'])) {
                $errors[] = $result['error'];
            } else {
                $uploadedImages[] = $result;
            }
        }
        
        if (empty($uploadedImages)) {
            sendResponse(400, ['error' => 'Failed to upload any images', 'details' => $errors]);
            return;
        }
        
        sendResponse(200, [
            'message' => 'Images uploaded successfully',
            'images' => $uploadedImages,
            'errors' => $errors
        ]);
    }
    
    /**
     * Process a single image upload
     *
     * @param array $file File data
     * @param int $propertyId Property ID
     * @return array Result data
     */
    private function processImageUpload($file, $propertyId) {
        // Check for upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['error' => 'Upload failed with error code: ' . $file['error']];
        }
        
        // Validate file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!in_array($file['type'], $allowedTypes)) {
            return ['error' => 'Invalid file type. Only JPEG and PNG are allowed'];
        }
        
        // Validate file size (max 5MB)
        $maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if ($file['size'] > $maxSize) {
            return ['error' => 'File size exceeds the limit of 5MB'];
        }
        
        // Create upload directory if it doesn't exist
        $uploadDir = BASE_PATH . '/uploads/properties';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        
        // Generate a unique filename
        $filename = uniqid('property_') . '_' . $propertyId . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
        $filepath = $uploadDir . '/' . $filename;
        
        // Move uploaded file
        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            return ['error' => 'Failed to move uploaded file'];
        }
        
        // Get the relative URL for the image
        $imageUrl = '/uploads/properties/' . $filename;
        
        // Add image to database
        $imageId = $this->propertyModel->addImage($propertyId, $imageUrl);
        
        if (!$imageId) {
            return ['error' => 'Failed to add image to database'];
        }
        
        return [
            'id' => $imageId,
            'url' => $imageUrl,
            'property_id' => $propertyId
        ];
    }
} 