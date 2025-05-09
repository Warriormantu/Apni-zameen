<?php
/**
 * User Model
 */

class User {
    /**
     * Get user by ID
     * 
     * @param int $id User ID
     * @return array|bool User data or false if not found
     */
    public function getById($id) {
        $sql = "SELECT id, name, email, phone, profile_picture, bio, address, role, created_at, updated_at 
                FROM users 
                WHERE id = ?";
        
        return fetchOne($sql, 'i', [$id]);
    }
    
    /**
     * Get user by email
     * 
     * @param string $email User email
     * @return array|bool User data or false if not found
     */
    public function getByEmail($email) {
        $sql = "SELECT id, name, email, password, phone, profile_picture, bio, address, role, created_at, updated_at 
                FROM users 
                WHERE email = ?";
        
        return fetchOne($sql, 's', [$email]);
    }
    
    /**
     * Create a new user
     * 
     * @param array $userData User data
     * @return int|bool New user ID or false on failure
     */
    public function create($userData) {
        $conn = getDbConnection();
        
        try {
            // Prepare SQL statement
            $sql = "INSERT INTO users (name, email, password, phone, role) 
                    VALUES (?, ?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Set default role if not provided
            $role = isset($userData['role']) ? $userData['role'] : 'user';
            
            // Bind parameters
            $stmt->bind_param('sssss', 
                $userData['name'], 
                $userData['email'], 
                $userData['password'], 
                $userData['phone'], 
                $role
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
            
            // Get the new user ID
            $userId = $conn->insert_id;
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return $userId;
        } catch (Exception $e) {
            error_log("Error creating user: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Update an existing user
     * 
     * @param int $id User ID
     * @param array $userData User data to update
     * @return bool True on success, false on failure
     */
    public function update($id, $userData) {
        $conn = getDbConnection();
        
        try {
            // Build the SQL query based on provided fields
            $updateFields = [];
            $params = [];
            $types = '';
            
            // Check each possible field
            if (isset($userData['name'])) {
                $updateFields[] = 'name = ?';
                $params[] = $userData['name'];
                $types .= 's';
            }
            
            if (isset($userData['email'])) {
                $updateFields[] = 'email = ?';
                $params[] = $userData['email'];
                $types .= 's';
            }
            
            if (isset($userData['phone'])) {
                $updateFields[] = 'phone = ?';
                $params[] = $userData['phone'];
                $types .= 's';
            }
            
            if (isset($userData['profile_picture'])) {
                $updateFields[] = 'profile_picture = ?';
                $params[] = $userData['profile_picture'];
                $types .= 's';
            }
            
            if (isset($userData['bio'])) {
                $updateFields[] = 'bio = ?';
                $params[] = $userData['bio'];
                $types .= 's';
            }
            
            if (isset($userData['address'])) {
                $updateFields[] = 'address = ?';
                $params[] = $userData['address'];
                $types .= 's';
            }
            
            if (isset($userData['password'])) {
                $updateFields[] = 'password = ?';
                $params[] = $userData['password'];
                $types .= 's';
            }
            
            // If no fields to update, return true
            if (empty($updateFields)) {
                return true;
            }
            
            // Build the SQL query
            $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
            
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
            error_log("Error updating user: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Delete a user
     * 
     * @param int $id User ID
     * @return bool True on success, false on failure
     */
    public function delete($id) {
        $sql = "DELETE FROM users WHERE id = ?";
        
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
            error_log("Error deleting user: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get saved properties for a user
     * 
     * @param int $userId User ID
     * @return array|bool Properties or false on failure
     */
    public function getSavedProperties($userId) {
        $sql = "SELECT p.* 
                FROM properties p
                JOIN saved_properties sp ON p.id = sp.property_id
                WHERE sp.user_id = ?
                ORDER BY sp.created_at DESC";
        
        return fetchAll($sql, 'i', [$userId]);
    }
    
    /**
     * Save a property for a user
     * 
     * @param int $userId User ID
     * @param int $propertyId Property ID
     * @return bool True on success, false on failure
     */
    public function saveProperty($userId, $propertyId) {
        $conn = getDbConnection();
        
        try {
            // Check if already saved
            $sql = "SELECT id FROM saved_properties WHERE user_id = ? AND property_id = ?";
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Bind parameters
            $stmt->bind_param('ii', $userId, $propertyId);
            
            // Execute the statement
            $stmt->execute();
            
            // Get result
            $result = $stmt->get_result();
            
            // If already saved, return true
            if ($result->num_rows > 0) {
                $stmt->close();
                $conn->close();
                return true;
            }
            
            // Insert the saved property
            $sql = "INSERT INTO saved_properties (user_id, property_id) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Bind parameters
            $stmt->bind_param('ii', $userId, $propertyId);
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                $stmt->close();
                $conn->close();
                return false;
            }
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return true;
        } catch (Exception $e) {
            error_log("Error saving property: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Unsave a property for a user
     * 
     * @param int $userId User ID
     * @param int $propertyId Property ID
     * @return bool True on success, false on failure
     */
    public function unsaveProperty($userId, $propertyId) {
        $sql = "DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?";
        
        $conn = getDbConnection();
        
        try {
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            // Bind parameters
            $stmt->bind_param('ii', $userId, $propertyId);
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                $stmt->close();
                $conn->close();
                return false;
            }
            
            // Close statement and connection
            $stmt->close();
            $conn->close();
            
            return true;
        } catch (Exception $e) {
            error_log("Error unsaving property: " . $e->getMessage());
            return false;
        }
    }
} 