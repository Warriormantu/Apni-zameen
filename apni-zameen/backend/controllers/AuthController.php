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
     * Login a user
     *
     * @param array $requestData Request data
     * @return void
     */
    public function login($requestData) {
        try {
            // Validate required fields
            if (!isset($requestData['email']) || empty($requestData['email'])) {
                sendResponse(400, ['error' => 'Email is required']);
                return;
            }
            
            if (!isset($requestData['password']) || empty($requestData['password'])) {
                sendResponse(400, ['error' => 'Password is required']);
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
            if (!verifyPassword($requestData['password'], $user['password'])) {
                sendResponse(401, ['error' => 'Invalid email or password']);
                return;
            }
            
            // Generate token
            $token = generateToken($user);
            
            if (!$token) {
                sendResponse(500, ['error' => 'Failed to generate token']);
                return;
            }
            
            // Remove password from response
            unset($user['password']);
            
            // Send response
            sendResponse(200, [
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while logging in']);
        }
    }
    
    /**
     * Register a new user
     *
     * @param array $requestData Request data
     * @return void
     */
    public function register($requestData) {
        try {
            // Validate required fields
            $requiredFields = ['name', 'email', 'password'];
            $errors = validateRequiredFields($requestData, $requiredFields);
            
            if ($errors !== true) {
                sendResponse(400, ['errors' => $errors]);
                return;
            }
            
            // Validate email format
            if (!validateEmail($requestData['email'])) {
                sendResponse(400, ['error' => 'Invalid email format']);
                return;
            }
            
            // Validate password
            if (!validatePassword($requestData['password'])) {
                sendResponse(400, ['error' => 'Password must be at least 8 characters and contain at least one letter and one number']);
                return;
            }
            
            // Check if email is already registered
            $existingUser = $this->userModel->getByEmail($requestData['email']);
            
            if ($existingUser) {
                sendResponse(409, ['error' => 'Email already registered']);
                return;
            }
            
            // Hash password
            $hashedPassword = hashPassword($requestData['password']);
            
            // Prepare user data
            $userData = [
                'name' => $requestData['name'],
                'email' => $requestData['email'],
                'password' => $hashedPassword,
                'phone' => isset($requestData['phone']) ? $requestData['phone'] : null,
                'role' => 'user'
            ];
            
            // Create user
            $userId = $this->userModel->create($userData);
            
            if (!$userId) {
                sendResponse(500, ['error' => 'Failed to create user']);
                return;
            }
            
            // Get the newly created user
            $user = $this->userModel->getById($userId);
            
            if (!$user) {
                sendResponse(500, ['error' => 'Failed to retrieve user data']);
                return;
            }
            
            // Generate token
            $token = generateToken($user);
            
            if (!$token) {
                sendResponse(500, ['error' => 'Failed to generate token']);
                return;
            }
            
            // Send response
            sendResponse(201, [
                'message' => 'Registration successful',
                'token' => $token,
                'user' => $user
            ]);
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage());
            sendResponse(500, ['error' => 'An error occurred while registering']);
        }
    }
} 