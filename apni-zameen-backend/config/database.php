<?php
/**
 * Database Configuration
 */

// Database credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'apni_zameen');

// Create a database connection
function getDbConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Execute a query and return the result
function executeQuery($query, $params = []) {
    $conn = getDbConnection();
    $stmt = $conn->prepare($query);
    
    if (!empty($params)) {
        $types = '';
        $bindParams = [];
        
        foreach ($params as $param) {
            if (is_int($param)) {
                $types .= 'i';
            } elseif (is_float($param)) {
                $types .= 'd';
            } elseif (is_string($param)) {
                $types .= 's';
            } else {
                $types .= 'b';
            }
            $bindParams[] = $param;
        }
        
        $bindValues = array_merge([$types], $bindParams);
        $stmt->bind_param(...$bindValues);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    $conn->close();
    
    return $result;
}

// Get a single row
function fetchOne($query, $params = []) {
    $result = executeQuery($query, $params);
    return $result->fetch_assoc();
}

// Get multiple rows
function fetchAll($query, $params = []) {
    $result = executeQuery($query, $params);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Execute insert, update, or delete query
function executeNonQuery($query, $params = []) {
    $conn = getDbConnection();
    $stmt = $conn->prepare($query);
    
    if (!empty($params)) {
        $types = '';
        $bindParams = [];
        
        foreach ($params as $param) {
            if (is_int($param)) {
                $types .= 'i';
            } elseif (is_float($param)) {
                $types .= 'd';
            } elseif (is_string($param)) {
                $types .= 's';
            } else {
                $types .= 'b';
            }
            $bindParams[] = $param;
        }
        
        $bindValues = array_merge([$types], $bindParams);
        $stmt->bind_param(...$bindValues);
    }
    
    $stmt->execute();
    $affectedRows = $stmt->affected_rows;
    $insertId = $stmt->insert_id;
    $stmt->close();
    $conn->close();
    
    return [
        'affected_rows' => $affectedRows,
        'insert_id' => $insertId
    ];
} 