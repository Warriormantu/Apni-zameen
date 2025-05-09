<?php
/**
 * Authentication Controller
 */

class AuthController {
    private $userModel;
    
    public function __construct() {
        require_once BASE_PATH . '/models/User.php';
        $this->userModel = new User();
    }
    
    /**
     * User login
     *
     * @param array $requestData Request data
     * @return void
     */
    public function login($requestData) {
        // Validate required fields
        $requiredFields = ['email', 'password'];
        $missingFields = validateRequiredFields($requestData, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(400, ['error' => 'Missing required fields', 'fields' => $missingFields]);
            return;
        }
        
        // Validate email format
        if (!validateEmail($requestData['email'])) {
            sendResponse(400, ['error' => 'Invalid email format']);
            return;
        }
        
        // Get user by email
        $user = $this->userModel->getByEmail($requestData['email']);
        
        if (!$user) {
            sendResponse(401, ['error' => 'Invalid email or password']);
            return;
        }
        
        // Verify password
        if (!$this->userModel->verifyPassword($requestData['password'], $user['password'])) {
            sendResponse(401, ['error' => 'Invalid email or password']);
            return;
        }
        
        // Remove password from user data
        unset($user['password']);
        
        // Generate JWT token
        $token = generateToken($user);
        
        // Return user data and token
        sendResponse(200, [
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token
        ]);
    }
    
    /**
     * User registration
     *
     * @param array $requestData Request data
     * @return void
     */
    public function register($requestData) {
        // Validate required fields
        $requiredFields = ['name', 'email', 'password'];
        $missingFields = validateRequiredFields($requestData, $requiredFields);
        
        if (!empty($missingFields)) {
            sendResponse(400, ['error' => 'Missing required fields', 'fields' => $missingFields]);
            return;
        }
        
        // Validate email format
        if (!validateEmail($requestData['email'])) {
            sendResponse(400, ['error' => 'Invalid email format']);
            return;
        }
        
        // Validate password strength
        if (!validatePassword($requestData['password'])) {
            sendResponse(400, [
                'error' => 'Password does not meet requirements',
                'message' => 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
            ]);
            return;
        }
        
        // Check if email already exists
        $existingUser = $this->userModel->getByEmail($requestData['email']);
        
        if ($existingUser) {
            sendResponse(409, ['error' => 'Email already registered']);
            return;
        }
        
        // Sanitize input data
        $sanitizedData = sanitizeInput($requestData);
        
        // Create new user
        $userId = $this->userModel->create($sanitizedData);
        
        if (!$userId) {
            sendResponse(500, ['error' => 'Failed to create user']);
            return;
        }
        
        // Get the newly created user
        $user = $this->userModel->getById($userId);
        
        // Generate JWT token
        $token = generateToken($user);
        
        // Return user data and token
        sendResponse(201, [
            'message' => 'Registration successful',
            'user' => $user,
            'token' => $token
        ]);
    }
} 