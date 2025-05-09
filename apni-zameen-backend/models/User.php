<?php
/**
 * User Model
 */

class User {
    /**
     * Get user by ID
     *
     * @param int $id User ID
     * @return array|null User data or null if not found
     */
    public function getById($id) {
        $query = "SELECT id, name, email, role, phone, profile_image, created_at, updated_at FROM users WHERE id = ?";
        return fetchOne($query, [$id]);
    }
    
    /**
     * Get user by email
     *
     * @param string $email User email
     * @return array|null User data or null if not found
     */
    public function getByEmail($email) {
        $query = "SELECT id, name, email, password, role, phone, profile_image, created_at, updated_at FROM users WHERE email = ?";
        return fetchOne($query, [$email]);
    }
    
    /**
     * Create a new user
     *
     * @param array $userData User data
     * @return int|bool The new user ID or false on failure
     */
    public function create($userData) {
        $query = "INSERT INTO users (name, email, password, role, phone, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())";
        
        $params = [
            $userData['name'],
            $userData['email'],
            password_hash($userData['password'], PASSWORD_DEFAULT),
            $userData['role'] ?? 'user',
            $userData['phone'] ?? null
        ];
        
        $result = executeNonQuery($query, $params);
        return $result['insert_id'] ?? false;
    }
    
    /**
     * Update user profile
     *
     * @param int $id User ID
     * @param array $userData User data to update
     * @return bool True on success, false on failure
     */
    public function update($id, $userData) {
        $query = "UPDATE users SET ";
        $params = [];
        
        if (isset($userData['name'])) {
            $query .= "name = ?, ";
            $params[] = $userData['name'];
        }
        
        if (isset($userData['phone'])) {
            $query .= "phone = ?, ";
            $params[] = $userData['phone'];
        }
        
        if (isset($userData['profile_image'])) {
            $query .= "profile_image = ?, ";
            $params[] = $userData['profile_image'];
        }
        
        $query .= "updated_at = NOW() WHERE id = ?";
        $params[] = $id;
        
        $result = executeNonQuery($query, $params);
        return $result['affected_rows'] > 0;
    }
    
    /**
     * Update user password
     *
     * @param int $id User ID
     * @param string $password New password
     * @return bool True on success, false on failure
     */
    public function updatePassword($id, $password) {
        $query = "UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?";
        $params = [password_hash($password, PASSWORD_DEFAULT), $id];
        
        $result = executeNonQuery($query, $params);
        return $result['affected_rows'] > 0;
    }
    
    /**
     * Verify user password
     *
     * @param string $password Plain password
     * @param string $hash Hashed password
     * @return bool True if verified, false otherwise
     */
    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
    
    /**
     * Get saved properties for a user
     *
     * @param int $userId User ID
     * @return array List of saved property IDs
     */
    public function getSavedProperties($userId) {
        $query = "SELECT p.* FROM properties p 
                  JOIN saved_properties sp ON p.id = sp.property_id 
                  WHERE sp.user_id = ?";
        return fetchAll($query, [$userId]);
    }
    
    /**
     * Save property for a user
     *
     * @param int $userId User ID
     * @param int $propertyId Property ID
     * @return bool True on success, false on failure
     */
    public function saveProperty($userId, $propertyId) {
        $query = "INSERT INTO saved_properties (user_id, property_id, created_at) VALUES (?, ?, NOW()) 
                  ON DUPLICATE KEY UPDATE created_at = NOW()";
        $params = [$userId, $propertyId];
        
        $result = executeNonQuery($query, $params);
        return $result['affected_rows'] > 0;
    }
    
    /**
     * Unsave property for a user
     *
     * @param int $userId User ID
     * @param int $propertyId Property ID
     * @return bool True on success, false on failure
     */
    public function unsaveProperty($userId, $propertyId) {
        $query = "DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?";
        $params = [$userId, $propertyId];
        
        $result = executeNonQuery($query, $params);
        return $result['affected_rows'] > 0;
    }
} 