<?php
/**
 * Visitor Counter API for Postman Oils
 * This file should be placed in the blog directory or server root
 * Returns JSON response with visitor count
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow CORS for frontend requests

// Define the file to store visitor count
$counterFile = __DIR__ . '/visitor_count.txt';

// Initialize counter if file doesn't exist (starting from 10000)
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '10000');
}

// Lock file for concurrent access
$lockFile = $counterFile . '.lock';
$fp = fopen($lockFile, 'c+');

if (flock($fp, LOCK_EX)) {
    // Get current count
    $currentCount = (int)file_get_contents($counterFile);
    
    // Check if this is a count request (GET) or increment request (POST)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Check if visitor should be counted using session/cookie
        session_start();
        $cookieName = 'postman_visitor_counted';
        $sessionKey = 'visitor_counted';
        
        // Use both session and cookie for better tracking
        $alreadyCounted = isset($_SESSION[$sessionKey]) || isset($_COOKIE[$cookieName]);
        
        if (!$alreadyCounted) {
            // Increment counter
            $currentCount++;
            
            // Save new count
            file_put_contents($counterFile, $currentCount);
            
            // Mark this visitor as counted
            $_SESSION[$sessionKey] = true;
            setcookie($cookieName, 'yes', time() + (86400 * 30), '/'); // 30 days
            
            $response = [
                'success' => true,
                'count' => $currentCount,
                'incremented' => true
            ];
        } else {
            $response = [
                'success' => true,
                'count' => $currentCount,
                'incremented' => false
            ];
        }
    } else {
        // Just return the current count
        $response = [
            'success' => true,
            'count' => $currentCount
        ];
    }
    
    // Release the lock
    flock($fp, LOCK_UN);
} else {
    $response = [
        'success' => false,
        'error' => 'Could not acquire lock'
    ];
}

fclose($fp);

// Return JSON response
echo json_encode($response);
?>