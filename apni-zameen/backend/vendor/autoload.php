<?php
/**
 * Minimal autoloader for JWT
 */

// Register autoloader
spl_autoload_register(function ($class) {
    // Base directory for Firebase classes
    $baseDir = __DIR__ . '/firebase/php-jwt/src/';
    
    // Check if the class is from the Firebase namespace
    if (strpos($class, 'Firebase\\JWT\\') === 0) {
        // Remove the namespace prefix
        $relativeClass = substr($class, strlen('Firebase\\JWT\\'));
        
        // Replace namespace separators with directory separators
        $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';
        
        // If the file exists, require it
        if (file_exists($file)) {
            require $file;
        }
    }
}); 