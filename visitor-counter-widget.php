<?php
/**
 * Visitor Counter Widget for Footer
 * Include this file in your blog's footer.php
 * Usage: <?php include_once('path/to/visitor-counter-widget.php'); ?>
 */

// Define the file to store visitor count
$counterFile = __DIR__ . '/visitor_count.txt';

// Initialize counter if file doesn't exist (starting from 10000)
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '10000');
}

// Get current count
$currentCount = (int)file_get_contents($counterFile);

// Check if visitor is unique using cookies (more reliable for footer widgets)
$cookieName = 'postman_visitor_counted';
$cookieExpire = time() + (86400 * 30); // 30 days

if (!isset($_COOKIE[$cookieName])) {
    // Increment counter
    $currentCount++;
    
    // Save new count
    file_put_contents($counterFile, $currentCount);
    
    // Set cookie to mark this visitor as counted
    setcookie($cookieName, 'yes', $cookieExpire, '/');
}

// Format the count with thousand separators
$formattedCount = number_format($currentCount);
?>

<!-- Visitor Counter Widget -->
<div class="visitor-counter-widget">
    <style>
        .visitor-counter-widget {
            text-align: center;
            margin: 20px 0;
        }
        
        .visitor-counter-box {
            display: inline-flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 30px;
            padding: 10px 25px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .visitor-counter-box:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        .visitor-icon-wrapper {
            margin-right: 12px;
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        
        .visitor-counter-text {
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            margin-right: 8px;
            opacity: 0.9;
        }
        
        .visitor-counter-number {
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            font-family: 'Arial', sans-serif;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 480px) {
            .visitor-counter-box {
                padding: 8px 20px;
            }
            .visitor-counter-text {
                font-size: 12px;
            }
            .visitor-counter-number {
                font-size: 16px;
            }
        }
    </style>
    
    <div class="visitor-counter-box">
        <div class="visitor-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
        </div>
        <span class="visitor-counter-text">Visitors:</span>
        <span class="visitor-counter-number"><?php echo $formattedCount; ?></span>
    </div>
</div>