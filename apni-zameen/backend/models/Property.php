<?php
/**
 * Property Model
 */

class Property {
    /**
     * Get all properties with pagination
     * 
     * @param int $page Page number
     * @param int $limit Items per page
     * @param string $sortBy Field to sort by
     * @param string $sortOrder Sort order
     * @return array Properties with pagination info
     */
    public function getAll($page = 1, $limit = 10, $sortBy = 'created_at', $sortOrder = 'DESC') {
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['id', 'title', 'price', 'created_at', 'updated_at'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }
        
        // Validate sort order
        $sortOrder = strtoupper($sortOrder) === 'ASC' ? 'ASC' : 'DESC';
        
        // Calculate offset
        $offset = ($page - 1) * $limit;
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM properties WHERE status = 'active'";
        $countResult = fetchOne($countSql);
        $total = $countResult ? $countResult['total'] : 0;
        
        // Calculate total pages
        $totalPages = ceil($total / $limit);
        
        // Get properties
        $sql = "SELECT p.*, u.name as owner_name 
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE p.status = 'active'
                ORDER BY p.$sortBy $sortOrder
                LIMIT ?, ?";
        
        $properties = fetchAll($sql, 'ii', [$offset, $limit]);
        
        // Add images to each property
        if ($properties) {
            foreach ($properties as &$property) {
                $property['images'] = $this->getPropertyImages($property['id']);
            }
        }
        
        return [
            'properties' => $properties,
            'pagination' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => (int)$total,
                'total_pages' => (int)$totalPages
            ]
        ];
    }
    
    /**
     * Get property by ID
     * 
     * @param int $id Property ID
     * @return array|bool Property data or false if not found
     */
    public function getById($id) {
        $sql = "SELECT p.*, u.name as owner_name, u.email as owner_email, u.phone as owner_phone
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE p.id = ? AND p.status = 'active'";
        
        $property = fetchOne($sql, 'i', [$id]);
        
        if ($property) {
            // Get property images
            $property['images'] = $this->getPropertyImages($id);
        }
        
        return $property;
    }
    
    /**
     * Get property images
     * 
     * @param int $propertyId Property ID
     * @return array Property images
     */
    private function getPropertyImages($propertyId) {
        $sql = "SELECT id, image_path, is_primary
                FROM property_images
                WHERE property_id = ?
                ORDER BY is_primary DESC, id ASC";
        
        return fetchAll($sql, 'i', [$propertyId]) ?: [];
    }
    
    /**
     * Search properties
     * 
     * @param array $criteria Search criteria
     * @param int $page Page number
     * @param int $limit Items per page
     * @return array Properties with pagination info
     */
    public function search($criteria, $page = 1, $limit = 10) {
        // Build WHERE clause
        $where = ["p.status = 'active'"];
        $params = [];
        $types = '';
        
        // Keyword search
        if (isset($criteria['keyword']) && !empty($criteria['keyword'])) {
            $keyword = '%' . $criteria['keyword'] . '%';
            $where[] = "(p.title LIKE ? OR p.description LIKE ? OR p.address LIKE ? OR p.city LIKE ? OR p.area LIKE ?)";
            $params = array_merge($params, [$keyword, $keyword, $keyword, $keyword, $keyword]);
            $types .= 'sssss';
        }
        
        // Property type
        if (isset($criteria['property_type']) && !empty($criteria['property_type'])) {
            $where[] = "p.property_type = ?";
            $params[] = $criteria['property_type'];
            $types .= 's';
        }
        
        // Property category
        if (isset($criteria['property_category']) && !empty($criteria['property_category'])) {
            $where[] = "p.property_category = ?";
            $params[] = $criteria['property_category'];
            $types .= 's';
        }
        
        // Price range
        if (isset($criteria['min_price']) && is_numeric($criteria['min_price'])) {
            $where[] = "p.price >= ?";
            $params[] = $criteria['min_price'];
            $types .= 'd';
        }
        
        if (isset($criteria['max_price']) && is_numeric($criteria['max_price'])) {
            $where[] = "p.price <= ?";
            $params[] = $criteria['max_price'];
            $types .= 'd';
        }
        
        // Area range
        if (isset($criteria['min_area']) && is_numeric($criteria['min_area'])) {
            $where[] = "p.area_size >= ?";
            $params[] = $criteria['min_area'];
            $types .= 'd';
        }
        
        if (isset($criteria['max_area']) && is_numeric($criteria['max_area'])) {
            $where[] = "p.area_size <= ?";
            $params[] = $criteria['max_area'];
            $types .= 'd';
        }
        
        // Bedrooms
        if (isset($criteria['bedrooms']) && is_numeric($criteria['bedrooms'])) {
            $where[] = "p.bedrooms >= ?";
            $params[] = $criteria['bedrooms'];
            $types .= 'i';
        }
        
        // Bathrooms
        if (isset($criteria['bathrooms']) && is_numeric($criteria['bathrooms'])) {
            $where[] = "p.bathrooms >= ?";
            $params[] = $criteria['bathrooms'];
            $types .= 'i';
        }
        
        // City
        if (isset($criteria['city']) && !empty($criteria['city'])) {
            $where[] = "p.city = ?";
            $params[] = $criteria['city'];
            $types .= 's';
        }
        
        // Area
        if (isset($criteria['area']) && !empty($criteria['area'])) {
            $where[] = "p.area = ?";
            $params[] = $criteria['area'];
            $types .= 's';
        }
        
        // Features
        if (isset($criteria['features']) && is_array($criteria['features']) && !empty($criteria['features'])) {
            $featureConditions = [];
            foreach ($criteria['features'] as $feature) {
                $featureConditions[] = "p.features LIKE ?";
                $params[] = '%' . $feature . '%';
                $types .= 's';
            }
            $where[] = '(' . implode(' OR ', $featureConditions) . ')';
        }
        
        // Build WHERE clause
        $whereClause = implode(' AND ', $where);
        
        // Validate sort field to prevent SQL injection
        $sortBy = isset($criteria['sort_by']) ? $criteria['sort_by'] : 'created_at';
        $allowedSortFields = ['id', 'title', 'price', 'created_at', 'updated_at'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }
        
        // Validate sort order
        $sortOrder = isset($criteria['sort_order']) && strtoupper($criteria['sort_order']) === 'ASC' ? 'ASC' : 'DESC';
        
        // Calculate offset
        $offset = ($page - 1) * $limit;
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total 
                    FROM properties p
                    WHERE $whereClause";
        
        $countResult = executeQuery($countSql, $types, $params);
        $countRow = $countResult ? $countResult->fetch_assoc() : null;
        $total = $countRow ? $countRow['total'] : 0;
        
        // Calculate total pages
        $totalPages = ceil($total / $limit);
        
        // Add pagination parameters
        $params[] = $offset;
        $params[] = $limit;
        $types .= 'ii';
        
        // Get properties
        $sql = "SELECT p.*, u.name as owner_name 
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE $whereClause
                ORDER BY p.$sortBy $sortOrder
                LIMIT ?, ?";
        
        $properties = fetchAll($sql, $types, $params);
        
        // Add images to each property
        if ($properties) {
            foreach ($properties as &$property) {
                $property['images'] = $this->getPropertyImages($property['id']);
            }
        }
        
        return [
            'properties' => $properties,
            'pagination' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => (int)$total,
                'total_pages' => (int)$totalPages
            ]
        ];
    }
    
    /**
     * Get featured properties
     * 
     * @param int $limit Limit
     * @return array Featured properties
     */
    public function getFeatured($limit = 6) {
        $sql = "SELECT p.*, u.name as owner_name 
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE p.is_featured = 1 AND p.status = 'active'
                ORDER BY p.created_at DESC
                LIMIT ?";
        
        $properties = fetchAll($sql, 'i', [$limit]);
        
        // Add images to each property
        if ($properties) {
            foreach ($properties as &$property) {
                $property['images'] = $this->getPropertyImages($property['id']);
            }
        }
        
        return $properties;
    }
    
    /**
     * Get trending cities
     * 
     * @param int $limit Limit
     * @return array Trending cities
     */
    public function getTrendingCities($limit = 6) {
        $sql = "SELECT city, COUNT(*) as property_count 
                FROM properties 
                WHERE status = 'active'
                GROUP BY city 
                ORDER BY property_count DESC
                LIMIT ?";
        
        return fetchAll($sql, 'i', [$limit]);
    }
    
    /**
     * Get properties by city
     * 
     * @param string $city City name
     * @param int $page Page number
     * @param int $limit Items per page
     * @param string $sortBy Field to sort by
     * @param string $sortOrder Sort order
     * @return array Properties with pagination info
     */
    public function getByCity($city, $page = 1, $limit = 10, $sortBy = 'created_at', $sortOrder = 'DESC') {
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['id', 'title', 'price', 'created_at', 'updated_at'];
        if (!in_array($sortBy, $allowedSortFields)) {
            $sortBy = 'created_at';
        }
        
        // Validate sort order
        $sortOrder = strtoupper($sortOrder) === 'ASC' ? 'ASC' : 'DESC';
        
        // Calculate offset
        $offset = ($page - 1) * $limit;
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total 
                    FROM properties 
                    WHERE city = ? AND status = 'active'";
        
        $countResult = executeQuery($countSql, 's', [$city]);
        $countRow = $countResult ? $countResult->fetch_assoc() : null;
        $total = $countRow ? $countRow['total'] : 0;
        
        // Calculate total pages
        $totalPages = ceil($total / $limit);
        
        // Get properties
        $sql = "SELECT p.*, u.name as owner_name 
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE p.city = ? AND p.status = 'active'
                ORDER BY p.$sortBy $sortOrder
                LIMIT ?, ?";
        
        $properties = fetchAll($sql, 'sii', [$city, $offset, $limit]);
        
        // Add images to each property
        if ($properties) {
            foreach ($properties as &$property) {
                $property['images'] = $this->getPropertyImages($property['id']);
            }
        }
        
        return [
            'properties' => $properties,
            'pagination' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => (int)$total,
                'total_pages' => (int)$totalPages
            ]
        ];
    }
    
    /**
     * Get similar properties
     * 
     * @param int $propertyId Property ID
     * @param int $limit Limit
     * @return array Similar properties
     */
    public function getSimilar($propertyId, $limit = 4) {
        // Get the property
        $property = $this->getById($propertyId);
        
        if (!$property) {
            return [];
        }
        
        // Get similar properties based on city and property type
        $sql = "SELECT p.*, u.name as owner_name 
                FROM properties p
                JOIN users u ON p.user_id = u.id
                WHERE p.id != ? 
                AND p.city = ? 
                AND p.property_type = ? 
                AND p.status = 'active'
                ORDER BY RAND()
                LIMIT ?";
        
        $properties = fetchAll($sql, 'issi', [
            $propertyId, 
            $property['city'], 
            $property['property_type'], 
            $limit
        ]);
        
        // Add images to each property
        if ($properties) {
            foreach ($properties as &$property) {
                $property['images'] = $this->getPropertyImages($property['id']);
            }
        }
        
        return $properties;
    }
    
    /**
     * Create a new property
     * 
     * @param array $propertyData Property data
     * @return int|bool New property ID or false on failure
     */
    public function create($propertyData) {
        $conn = getDbConnection();
        
        try {
            // Prepare SQL statement
            $sql = "INSERT INTO properties (
                        user_id, title, description, price, property_type, property_category,
                        area_size, area_unit, bedrooms, bathrooms, city, area, address,
                        features, status
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Convert features array to JSON if provided
            $features = isset($propertyData['features']) ? json_encode($propertyData['features']) : null;
            
            // Set default status if not provided
            $status = isset($propertyData['status']) ? $propertyData['status'] : 'pending';
            
            // Bind parameters
            $stmt->bind_param('issdssdssissss', 
                $propertyData['user_id'],
                $propertyData['title'],
                $propertyData['description'],
                $propertyData['price'],
                $propertyData['property_type'],
                $propertyData['property_category'],
                $propertyData['area_size'],
                $propertyData['area_unit'],
                $propertyData['bedrooms'],
                $propertyData['bathrooms'],
                $propertyData['city'],
                $propertyData['area'],
                $propertyData['address'],
                $features,
                $status
            );
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                $stmt->close();
                $conn->close();
                return false;
            }
            
            // Get the new property ID
            $propertyId = $conn->insert_id;
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return $propertyId;
        } catch (Exception $e) {
            error_log("Error creating property: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Update an existing property
     * 
     * @param int $id Property ID
     * @param array $propertyData Property data to update
     * @return bool True on success, false on failure
     */
    public function update($id, $propertyData) {
        $conn = getDbConnection();
        
        try {
            // Build the SQL query based on provided fields
            $updateFields = [];
            $params = [];
            $types = '';
            
            // Check each possible field
            if (isset($propertyData['title'])) {
                $updateFields[] = 'title = ?';
                $params[] = $propertyData['title'];
                $types .= 's';
            }
            
            if (isset($propertyData['description'])) {
                $updateFields[] = 'description = ?';
                $params[] = $propertyData['description'];
                $types .= 's';
            }
            
            if (isset($propertyData['price'])) {
                $updateFields[] = 'price = ?';
                $params[] = $propertyData['price'];
                $types .= 'd';
            }
            
            if (isset($propertyData['property_type'])) {
                $updateFields[] = 'property_type = ?';
                $params[] = $propertyData['property_type'];
                $types .= 's';
            }
            
            if (isset($propertyData['property_category'])) {
                $updateFields[] = 'property_category = ?';
                $params[] = $propertyData['property_category'];
                $types .= 's';
            }
            
            if (isset($propertyData['area_size'])) {
                $updateFields[] = 'area_size = ?';
                $params[] = $propertyData['area_size'];
                $types .= 'd';
            }
            
            if (isset($propertyData['area_unit'])) {
                $updateFields[] = 'area_unit = ?';
                $params[] = $propertyData['area_unit'];
                $types .= 's';
            }
            
            if (isset($propertyData['bedrooms'])) {
                $updateFields[] = 'bedrooms = ?';
                $params[] = $propertyData['bedrooms'];
                $types .= 'i';
            }
            
            if (isset($propertyData['bathrooms'])) {
                $updateFields[] = 'bathrooms = ?';
                $params[] = $propertyData['bathrooms'];
                $types .= 'i';
            }
            
            if (isset($propertyData['city'])) {
                $updateFields[] = 'city = ?';
                $params[] = $propertyData['city'];
                $types .= 's';
            }
            
            if (isset($propertyData['area'])) {
                $updateFields[] = 'area = ?';
                $params[] = $propertyData['area'];
                $types .= 's';
            }
            
            if (isset($propertyData['address'])) {
                $updateFields[] = 'address = ?';
                $params[] = $propertyData['address'];
                $types .= 's';
            }
            
            if (isset($propertyData['features'])) {
                $updateFields[] = 'features = ?';
                $params[] = json_encode($propertyData['features']);
                $types .= 's';
            }
            
            if (isset($propertyData['status'])) {
                $updateFields[] = 'status = ?';
                $params[] = $propertyData['status'];
                $types .= 's';
            }
            
            if (isset($propertyData['is_featured'])) {
                $updateFields[] = 'is_featured = ?';
                $params[] = $propertyData['is_featured'];
                $types .= 'i';
            }
            
            // If no fields to update, return true
            if (empty($updateFields)) {
                return true;
            }
            
            // Build the SQL query
            $sql = "UPDATE properties SET " . implode(', ', $updateFields) . " WHERE id = ?";
            
            // Add the ID parameter
            $params[] = $id;
            $types .= 'i';
            
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Bind parameters
            $bindParams = array_merge([$types], $params);
            $bindParamsRef = [];
            
            foreach ($bindParams as $key => $value) {
                $bindParamsRef[$key] = &$bindParams[$key];
            }
            
            call_user_func_array([$stmt, 'bind_param'], $bindParamsRef);
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                $stmt->close();
                $conn->close();
                return false;
            }
            
            // Check if any rows were affected
            $success = $stmt->affected_rows > 0;
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return $success;
        } catch (Exception $e) {
            error_log("Error updating property: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Delete a property
     * 
     * @param int $id Property ID
     * @return bool True on success, false on failure
     */
    public function delete($id) {
        $sql = "DELETE FROM properties WHERE id = ?";
        
        $conn = getDbConnection();
        
        try {
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Bind parameter
            $stmt->bind_param('i', $id);
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                $stmt->close();
                $conn->close();
                return false;
            }
            
            // Check if any rows were affected
            $success = $stmt->affected_rows > 0;
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return $success;
        } catch (Exception $e) {
            error_log("Error deleting property: " . $e->getMessage());
            return false;
        }
    }
} 