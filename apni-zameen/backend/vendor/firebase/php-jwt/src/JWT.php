<?php
namespace Firebase\JWT;

use DomainException;
use InvalidArgumentException;
use UnexpectedValueException;
use DateTime;
use Exception;

/**
 * JSON Web Token implementation
 */
class JWT
{
    /**
     * Encode a payload array into a JWT string.
     *
     * @param array  $payload  The payload to encode
     * @param string $key      The secret key
     * @param string $alg      The signing algorithm (HS256, HS384, HS512, RS256, RS384, RS512)
     * @param string $keyId    The key ID
     * @param array  $head     Additional header elements
     *
     * @return string The JWT string
     */
    public static function encode($payload, $key, $alg = 'HS256', $keyId = null, $head = null)
    {
        $header = ['typ' => 'JWT', 'alg' => $alg];
        if ($keyId !== null) {
            $header['kid'] = $keyId;
        }
        if (isset($head) && is_array($head)) {
            $header = array_merge($header, $head);
        }

        $segments = [];
        $segments[] = static::urlsafeB64Encode(static::jsonEncode($header));
        $segments[] = static::urlsafeB64Encode(static::jsonEncode($payload));
        $signature = static::sign(implode('.', $segments), $key, $alg);
        $segments[] = static::urlsafeB64Encode($signature);

        return implode('.', $segments);
    }

    /**
     * Decode a JWT string into a PHP object.
     *
     * @param string       $jwt        JWT string
     * @param string|array $key        Key used to sign the token
     * @param array        $allowed_algs List of supported signing algorithms
     *
     * @return object The JWT's payload as a PHP object
     */
    public static function decode($jwt, $key, array $allowed_algs = [])
    {
        $tks = explode('.', $jwt);
        if (count($tks) != 3) {
            throw new UnexpectedValueException('Wrong number of segments');
        }
        list($headb64, $bodyb64, $cryptob64) = $tks;
        
        $header = static::jsonDecode(static::urlsafeB64Decode($headb64));
        if (null === $header) {
            throw new UnexpectedValueException('Invalid header encoding');
        }
        
        $payload = static::jsonDecode(static::urlsafeB64Decode($bodyb64));
        if (null === $payload) {
            throw new UnexpectedValueException('Invalid claims encoding');
        }
        
        $sig = static::urlsafeB64Decode($cryptob64);
        if (empty($header->alg)) {
            throw new UnexpectedValueException('Empty algorithm');
        }
        
        if (empty($allowed_algs)) {
            $allowed_algs = ['HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512'];
        }
        
        if (!in_array($header->alg, $allowed_algs)) {
            throw new UnexpectedValueException('Algorithm not allowed');
        }
        
        if (!static::verify("$headb64.$bodyb64", $sig, $key, $header->alg)) {
            throw new UnexpectedValueException('Signature verification failed');
        }
        
        // Check if the token is expired
        if (isset($payload->exp) && $payload->exp < time()) {
            throw new UnexpectedValueException('Expired token');
        }
        
        return $payload;
    }

    /**
     * Sign a string with a given key and algorithm.
     */
    private static function sign($msg, $key, $alg = 'HS256')
    {
        if ($alg === 'HS256') {
            return hash_hmac('sha256', $msg, $key, true);
        } elseif ($alg === 'HS384') {
            return hash_hmac('sha384', $msg, $key, true);
        } elseif ($alg === 'HS512') {
            return hash_hmac('sha512', $msg, $key, true);
        } else {
            throw new DomainException('Algorithm not supported');
        }
    }

    /**
     * Verify a signature with the message, key and method.
     */
    private static function verify($msg, $signature, $key, $alg)
    {
        if ($alg === 'HS256') {
            $hash = hash_hmac('sha256', $msg, $key, true);
            return hash_equals($signature, $hash);
        } elseif ($alg === 'HS384') {
            $hash = hash_hmac('sha384', $msg, $key, true);
            return hash_equals($signature, $hash);
        } elseif ($alg === 'HS512') {
            $hash = hash_hmac('sha512', $msg, $key, true);
            return hash_equals($signature, $hash);
        } else {
            throw new DomainException('Algorithm not supported');
        }
    }

    /**
     * Encode a PHP object into a JSON string.
     */
    private static function jsonEncode($input)
    {
        $json = json_encode($input);
        if (function_exists('json_last_error') && $errno = json_last_error()) {
            static::handleJsonError($errno);
        } elseif ($json === 'null' && $input !== null) {
            throw new DomainException('Null result with non-null input');
        }
        return $json;
    }

    /**
     * Decode a JSON string into a PHP object.
     */
    private static function jsonDecode($input)
    {
        if (version_compare(PHP_VERSION, '5.4.0', '>=') && !(defined('JSON_C_VERSION') && PHP_INT_SIZE > 4)) {
            $obj = json_decode($input, false, 512, JSON_BIGINT_AS_STRING);
        } else {
            $obj = json_decode($input);
        }

        if (function_exists('json_last_error') && $errno = json_last_error()) {
            static::handleJsonError($errno);
        } elseif ($obj === null && $input !== 'null') {
            throw new DomainException('Null result with non-null input');
        }
        return $obj;
    }

    /**
     * Encode a string with URL-safe Base64.
     */
    private static function urlsafeB64Encode($input)
    {
        return str_replace('=', '', strtr(base64_encode($input), '+/', '-_'));
    }

    /**
     * Decode a string with URL-safe Base64.
     */
    private static function urlsafeB64Decode($input)
    {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

    /**
     * Handle JSON errors.
     */
    private static function handleJsonError($errno)
    {
        $messages = [
            JSON_ERROR_DEPTH => 'Maximum stack depth exceeded',
            JSON_ERROR_STATE_MISMATCH => 'Invalid or malformed JSON',
            JSON_ERROR_CTRL_CHAR => 'Unexpected control character found',
            JSON_ERROR_SYNTAX => 'Syntax error, malformed JSON',
            JSON_ERROR_UTF8 => 'Malformed UTF-8 characters'
        ];
        throw new DomainException(
            isset($messages[$errno])
            ? $messages[$errno]
            : 'Unknown JSON error: ' . $errno
        );
    }
}

class Key {
    /**
     * @var string
     */
    public $key;

    /**
     * @var string
     */
    public $algorithm;

    /**
     * @param string $key       The key
     * @param string $algorithm The algorithm
     */
    public function __construct($key, $algorithm)
    {
        $this->key = $key;
        $this->algorithm = $algorithm;
    }
} 