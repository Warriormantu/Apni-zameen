<?php
/**
 * Database Configuration
 */

// Database connection details
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'apni_zameen');

/**
 * Get database connection
 * 
 * @return mysqli Database connection object
 */
function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        // Log the error
        error_log("Database connection failed: " . $conn->connect_error);
        
        // For security reasons, don't expose the actual error in production
        die("Database connection failed. Please try again later.");
    }
    
    // Set character set
    $conn->set_charset("utf8mb4");
    
    return $conn;
}

/**
 * Execute a database query and return the result
 * 
 * @param string $sql SQL query
 * @param string $types Types of parameters (i: integer, d: double, s: string, b: blob)
 * @param array $params Parameters to bind
 * @return mixed Query result or false on failure
 */
function executeQuery($sql, $types = '', $params = []) {
    $conn = getDbConnection();
    $result = false;
    
    try {
        // If there are parameters, use prepared statement
        if (!empty($params)) {
            $stmt = $conn->prepare($sql);
            
            if ($stmt === false) {
                error_log("Failed to prepare statement: " . $conn->error);
                return false;
            }
            
            if (!empty($types) && !empty($params)) {
                // Bind parameters
                $bindParams = array_merge([$types], $params);
                $bindParamsRef = [];
                
                // Create references for bind_param
                foreach ($bindParams as $key => $value) {
                    $bindParamsRef[$key] = &$bindParams[$key];
                }
                
                call_user_func_array([$stmt, 'bind_param'], $bindParamsRef);
            }
            
            // Execute the statement
            $stmt->execute();
            
            // Check for errors
            if ($stmt->errno) {
                error_log("Failed to execute query: " . $stmt->error);
                return false;
            }
            
            // Get result
            $result = $stmt->get_result();
            
            // Close statement
            $stmt->close();
        } else {
            // If no parameters, execute the query directly
            $result = $conn->query($sql);
            
            if ($result === false) {
                error_log("Failed to execute query: " . $conn->error);
            }
        }
        
        // Close connection
        $conn->close();
        
        return $result;
    } catch (Exception $e) {
        error_log("Database error: " . $e->getMessage());
        return false;
    }
}

/**
 * Execute a query and fetch all results as an associative array
 * 
 * @param string $sql SQL query
 * @param string $types Types of parameters
 * @param array $params Parameters to bind
 * @return array|bool Array of results or false on failure
 */
function fetchAll($sql, $types = '', $params = []) {
    $result = executeQuery($sql, $types, $params);
    
    if ($result === false) {
        return false;
    }
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    return $data;
}

/**
 * Execute a query and fetch a single row as an associative array
 * 
 * @param string $sql SQL query
 * @param string $types Types of parameters
 * @param array $params Parameters to bind
 * @return array|bool Result row or false on failure
 */
function fetchOne($sql, $types = '', $params = []) {
    $result = executeQuery($sql, $types, $params);
    
    if ($result === false) {
        return false;
    }
    
    return $result->fetch_assoc();
} 