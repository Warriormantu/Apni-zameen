<?php
/**
 * Property Model
 */

class Property {
    /**
     * Get property by ID
     *
     * @param int $id Property ID
     * @return array|null Property data or null if not found
     */
    public function getById($id) {
        $query = "SELECT p.*, u.name as owner_name, u.email as owner_email, u.phone as owner_phone
                  FROM properties p
                  JOIN users u ON p.owner_id = u.id
                  WHERE p.id = ?";
        
        $property = fetchOne($query, [$id]);
        
        if ($property) {
            // Get property images
            $imagesQuery = "SELECT * FROM property_images WHERE property_id = ?";
            $property['images'] = fetchAll($imagesQuery, [$id]);
            
            // Get property features
            $featuresQuery = "SELECT f.* FROM features f
                             JOIN property_features pf ON f.id = pf.feature_id
                             WHERE pf.property_id = ?";
            $property['features'] = fetchAll($featuresQuery, [$id]);
        }
        
        return $property;
    }
    
    /**
     * Get all properties with optional filtering
     *
     * @param array $filters Optional filters
     * @param int $limit Result limit
     * @param int $offset Result offset
     * @return array Properties data
     */
    public function getAll($filters = [], $limit = 10, $offset = 0) {
        $query = "SELECT p.*, u.name as owner_name, 
                 (SELECT image_url FROM property_images WHERE property_id = p.id LIMIT 1) as main_image
                 FROM properties p
                 JOIN users u ON p.owner_id = u.id
                 WHERE 1=1";
        
        $params = [];
        
        // Apply filters
        if (isset($filters['price_min']) && is_numeric($filters['price_min'])) {
            $query .= " AND p.price >= ?";
            $params[] = $filters['price_min'];
        }
        
        if (isset($filters['price_max']) && is_numeric($filters['price_max'])) {
            $query .= " AND p.price <= ?";
            $params[] = $filters['price_max'];
        }
        
        if (isset($filters['bedrooms']) && is_numeric($filters['bedrooms'])) {
            $query .= " AND p.bedrooms >= ?";
            $params[] = $filters['bedrooms'];
        }
        
        if (isset($filters['bathrooms']) && is_numeric($filters['bathrooms'])) {
            $query .= " AND p.bathrooms >= ?";
            $params[] = $filters['bathrooms'];
        }
        
        if (isset($filters['type']) && !empty($filters['type'])) {
            $query .= " AND p.type = ?";
            $params[] = $filters['type'];
        }
        
        if (isset($filters['city']) && !empty($filters['city'])) {
            $query .= " AND p.city LIKE ?";
            $params[] = "%{$filters['city']}%";
        }
        
        if (isset($filters['status']) && !empty($filters['status'])) {
            $query .= " AND p.status = ?";
            $params[] = $filters['status'];
        }
        
        // Add sorting
        $query .= " ORDER BY p.created_at DESC";
        
        // Add pagination
        $query .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        
        return fetchAll($query, $params);
    }
    
    /**
     * Search properties
     *
     * @param string $searchTerm Search term
     * @param array $filters Optional filters
     * @param int $limit Result limit
     * @param int $offset Result offset
     * @return array Properties data
     */
    public function search($searchTerm, $filters = [], $limit = 10, $offset = 0) {
        $query = "SELECT p.*, u.name as owner_name,
                 (SELECT image_url FROM property_images WHERE property_id = p.id LIMIT 1) as main_image
                 FROM properties p
                 JOIN users u ON p.owner_id = u.id
                 WHERE (p.title LIKE ? OR p.description LIKE ? OR p.address LIKE ? OR p.city LIKE ?)";
        
        $params = [
            "%{$searchTerm}%",
            "%{$searchTerm}%",
            "%{$searchTerm}%",
            "%{$searchTerm}%"
        ];
        
        // Apply filters (same as getAll)
        if (isset($filters['price_min']) && is_numeric($filters['price_min'])) {
            $query .= " AND p.price >= ?";
            $params[] = $filters['price_min'];
        }
        
        if (isset($filters['price_max']) && is_numeric($filters['price_max'])) {
            $query .= " AND p.price <= ?";
            $params[] = $filters['price_max'];
        }
        
        // Add other filters as needed...
        
        // Add sorting
        $query .= " ORDER BY p.created_at DESC";
        
        // Add pagination
        $query .= " LIMIT ? OFFSET ?";
        $params[] = $limit;
        $params[] = $offset;
        
        return fetchAll($query, $params);
    }
    
    /**
     * Get featured properties
     *
     * @param int $limit Result limit
     * @return array Featured properties
     */
    public function getFeatured($limit = 6) {
        $query = "SELECT p.*, 
                 (SELECT image_url FROM property_images WHERE property_id = p.id LIMIT 1) as main_image
                 FROM properties p
                 WHERE p.is_featured = 1
                 ORDER BY p.created_at DESC
                 LIMIT ?";
        
        return fetchAll($query, [$limit]);
    }
    
    /**
     * Get properties by city
     *
     * @param string $city City name
     * @param int $limit Result limit
     * @param int $offset Result offset
     * @return array Properties data
     */
    public function getByCity($city, $limit = 10, $offset = 0) {
        $query = "SELECT p.*, 
                 (SELECT image_url FROM property_images WHERE property_id = p.id LIMIT 1) as main_image
                 FROM properties p
                 WHERE p.city LIKE ?
                 ORDER BY p.created_at DESC
                 LIMIT ? OFFSET ?";
        
        return fetchAll($query, ["%{$city}%", $limit, $offset]);
    }
    
    /**
     * Get trending cities (cities with most properties)
     *
     * @param int $limit Result limit
     * @return array Trending cities
     */
    public function getTrendingCities($limit = 6) {
        $query = "SELECT city, COUNT(*) as property_count,
                 (SELECT image_url FROM property_images 
                  WHERE property_id = MIN(p.id) LIMIT 1) as city_image
                 FROM properties p
                 GROUP BY city
                 ORDER BY property_count DESC
                 LIMIT ?";
        
        return fetchAll($query, [$limit]);
    }
    
    /**
     * Get similar properties
     *
     * @param int $propertyId Property ID
     * @param int $limit Result limit
     * @return array Similar properties
     */
    public function getSimilar($propertyId, $limit = 4) {
        // First get the current property details
        $property = $this->getById($propertyId);
        
        if (!$property) {
            return [];
        }
        
        // Find similar properties based on type, city, price range
        $query = "SELECT p.*, 
                 (SELECT image_url FROM property_images WHERE property_id = p.id LIMIT 1) as main_image
                 FROM properties p
                 WHERE p.id != ? 
                 AND (p.type = ? OR p.city = ?)
                 AND p.price BETWEEN ? AND ?
                 ORDER BY p.created_at DESC
                 LIMIT ?";
        
        $minPrice = $property['price'] * 0.7; // 70% of the price
        $maxPrice = $property['price'] * 1.3; // 130% of the price
        
        return fetchAll($query, [
            $propertyId,
            $property['type'],
            $property['city'],
            $minPrice,
            $maxPrice,
            $limit
        ]);
    }
    
    /**
     * Create a new property
     *
     * @param array $propertyData Property data
     * @param int $ownerId Owner user ID
     * @return int|bool The new property ID or false on failure
     */
    public function create($propertyData, $ownerId) {
        $query = "INSERT INTO properties (
                    owner_id, title, description, price, type, status,
                    bedrooms, bathrooms, area, address, city, state, zip_code,
                    latitude, longitude, is_featured, created_at, updated_at
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW()
                )";
        
        $params = [
            $ownerId,
            $propertyData['title'],
            $propertyData['description'],
            $propertyData['price'],
            $propertyData['type'],
            $propertyData['status'],
            $propertyData['bedrooms'],
            $propertyData['bathrooms'],
            $propertyData['area'],
            $propertyData['address'],
            $propertyData['city'],
            $propertyData['state'],
            $propertyData['zip_code'],
            $propertyData['latitude'] ?? null,
            $propertyData['longitude'] ?? null,
            $propertyData['is_featured'] ?? 0
        ];
        
        $result = executeNonQuery($query, $params);
        $propertyId = $result['insert_id'] ?? false;
        
        // If property created successfully and features provided, add them
        if ($propertyId && isset($propertyData['features']) && is_array($propertyData['features'])) {
            foreach ($propertyData['features'] as $featureId) {
                $featureQuery = "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)";
                executeNonQuery($featureQuery, [$propertyId, $featureId]);
            }
        }
        
        return $propertyId;
    }
    
    /**
     * Update a property
     *
     * @param int $id Property ID
     * @param array $propertyData Property data to update
     * @return bool True on success, false on failure
     */
    public function update($id, $propertyData) {
        $query = "UPDATE properties SET updated_at = NOW()";
        $params = [];
        
        // Dynamically build the query based on provided data
        $fields = [
            'title', 'description', 'price', 'type', 'status',
            'bedrooms', 'bathrooms', 'area', 'address', 'city', 'state', 'zip_code',
            'latitude', 'longitude', 'is_featured'
        ];
        
        foreach ($fields as $field) {
            if (isset($propertyData[$field])) {
                $query .= ", {$field} = ?";
                $params[] = $propertyData[$field];
            }
        }
        
        $query .= " WHERE id = ?";
        $params[] = $id;
        
        $result = executeNonQuery($query, $params);
        
        // Update features if provided
        if (isset($propertyData['features']) && is_array($propertyData['features'])) {
            // First delete existing features
            executeNonQuery("DELETE FROM property_features WHERE property_id = ?", [$id]);
            
            // Then add new features
            foreach ($propertyData['features'] as $featureId) {
                $featureQuery = "INSERT INTO property_features (property_id, feature_id) VALUES (?, ?)";
                executeNonQuery($featureQuery, [$id, $featureId]);
            }
        }
        
        return $result['affected_rows'] > 0;
    }
    
    /**
     * Delete a property
     *
     * @param int $id Property ID
     * @return bool True on success, false on failure
     */
    public function delete($id) {
        // First delete related records (images, features, etc.)
        executeNonQuery("DELETE FROM property_images WHERE property_id = ?", [$id]);
        executeNonQuery("DELETE FROM property_features WHERE property_id = ?", [$id]);
        executeNonQuery("DELETE FROM saved_properties WHERE property_id = ?", [$id]);
        
        // Then delete the property itself
        $query = "DELETE FROM properties WHERE id = ?";
        $result = executeNonQuery($query, [$id]);
        
        return $result['affected_rows'] > 0;
    }
    
    /**
     * Add an image to a property
     *
     * @param int $propertyId Property ID
     * @param string $imageUrl Image URL
     * @param string $caption Optional image caption
     * @return int|bool The new image ID or false on failure
     */
    public function addImage($propertyId, $imageUrl, $caption = null) {
        $query = "INSERT INTO property_images (property_id, image_url, caption, created_at) VALUES (?, ?, ?, NOW())";
        $params = [$propertyId, $imageUrl, $caption];
        
        $result = executeNonQuery($query, $params);
        return $result['insert_id'] ?? false;
    }
    
    /**
     * Remove an image from a property
     *
     * @param int $imageId Image ID
     * @return bool True on success, false on failure
     */
    public function removeImage($imageId) {
        $query = "DELETE FROM property_images WHERE id = ?";
        $result = executeNonQuery($query, [$imageId]);
        
        return $result['affected_rows'] > 0;
    }
} 