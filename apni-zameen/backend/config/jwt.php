<?php
/**
 * JWT Configuration
 */

// JWT Secret Key - should be a secure random string
// In production, this should be stored in environment variables
define('JWT_SECRET', 'apnizameen_secret_key_change_in_production_env');

// JWT Token Expiration time in seconds
define('JWT_EXPIRATION', 86400); // 24 hours

// JWT Issuer - the entity that issued the token
define('JWT_ISSUER', 'apni-zameen-api');

// JWT Audience - the entity for which the token is intended
define('JWT_AUDIENCE', 'apni-zameen-client'); 