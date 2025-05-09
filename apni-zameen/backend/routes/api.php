<?php
/**
 * API Routes Configuration
 * 
 * This file defines the API routes for the Apni Zameen application.
 */

return [
    // Authentication routes
    'auth/login' => [
        'controller' => 'AuthController',
        'method' => 'login',
        'auth' => false
    ],
    'auth/register' => [
        'controller' => 'AuthController',
        'method' => 'register',
        'auth' => false
    ],
    
    // Property routes
    'properties' => [
        'controller' => 'PropertyController',
        'method' => 'getAll',
        'auth' => false
    ],
    'properties/{id}' => [
        'controller' => 'PropertyController',
        'method' => 'getById',
        'auth' => false
    ],
    'properties/search' => [
        'controller' => 'PropertyController',
        'method' => 'search',
        'auth' => false
    ],
    'properties/featured' => [
        'controller' => 'PropertyController',
        'method' => 'getFeatured',
        'auth' => false
    ],
    'properties/trending-cities' => [
        'controller' => 'PropertyController',
        'method' => 'getTrendingCities',
        'auth' => false
    ],
    'properties/city/{city}' => [
        'controller' => 'PropertyController',
        'method' => 'getByCity',
        'auth' => false
    ],
    'properties/create' => [
        'controller' => 'PropertyController',
        'method' => 'create',
        'auth' => true
    ],
    'properties/update/{id}' => [
        'controller' => 'PropertyController',
        'method' => 'update',
        'auth' => true
    ],
    'properties/delete/{id}' => [
        'controller' => 'PropertyController',
        'method' => 'delete',
        'auth' => true
    ],
    'properties/images/upload/{id}' => [
        'controller' => 'PropertyController',
        'method' => 'uploadImages',
        'auth' => true
    ],
    
    // User routes
    'user/profile' => [
        'controller' => 'UserController',
        'method' => 'getProfile',
        'auth' => true
    ],
    'user/profile/update' => [
        'controller' => 'UserController',
        'method' => 'updateProfile',
        'auth' => true
    ],
    'user/saved-properties' => [
        'controller' => 'UserController',
        'method' => 'getSavedProperties',
        'auth' => true
    ],
    'user/save-property' => [
        'controller' => 'UserController',
        'method' => 'saveProperty',
        'auth' => true
    ],
    'user/unsave-property/{id}' => [
        'controller' => 'UserController',
        'method' => 'unsaveProperty',
        'auth' => true
    ],
    'user/avatar/upload' => [
        'controller' => 'UserController',
        'method' => 'uploadAvatar',
        'auth' => true
    ]
]; 