<?php
/**
 * Visitor Counter for Postman Oils Blog
 * This file should be placed in the blog directory
 * Starting count: 10000
 */

// Define the file to store visitor count
$counterFile = __DIR__ . '/visitor_count.txt';

// Initialize counter if file doesn't exist
if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '10000');
}

// Get current count
$currentCount = (int)file_get_contents($counterFile);

// Check if visitor is unique (using session)
session_start();
if (!isset($_SESSION['counted'])) {
    // Increment counter
    $currentCount++;
    
    // Save new count
    file_put_contents($counterFile, $currentCount);
    
    // Mark this session as counted
    $_SESSION['counted'] = true;
}

// Format the count with thousand separators
$formattedCount = number_format($currentCount);

// Return count as JSON for AJAX requests
if (isset($_GET['ajax'])) {
    header('Content-Type: application/json');
    echo json_encode(['count' => $formattedCount]);
    exit;
}

// Function to display counter HTML
function displayVisitorCounter() {
    global $formattedCount;
    ?>
    <div class="visitor-counter" id="visitor-counter">
        <style>
            .visitor-counter {
                background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                color: white;
                padding: 12px 20px;
                border-radius: 25px;
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-family: Arial, sans-serif;
                box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .visitor-icon {
                width: 24px;
                height: 24px;
                fill: white;
            }
            
            .visitor-text {
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 0.5px;
            }
            
            .visitor-count {
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 1px;
            }
        </style>
        
        <svg class="visitor-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        
        <div>
            <div class="visitor-text">Visitors</div>
            <div class="visitor-count" id="visitor-count-number"><?php echo $formattedCount; ?></div>
        </div>
    </div>
    
    <script>
        // Optional: Update counter in real-time using AJAX
        function updateVisitorCount() {
            fetch('<?php echo $_SERVER['PHP_SELF']; ?>?ajax=1')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('visitor-count-number').textContent = data.count;
                })
                .catch(error => console.error('Error updating visitor count:', error));
        }
        
        // Update every 30 seconds
        setInterval(updateVisitorCount, 30000);
    </script>
    <?php
}

// Example usage - call this function where you want to display the counter
// displayVisitorCounter();
?>