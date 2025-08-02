<?php
/**
 * Postman Oil Email Configuration Example
 * 
 * Add these constants to your wp-config.php file to configure email settings
 * without exposing credentials in the code.
 * 
 * IMPORTANT: Never commit wp-config.php to version control!
 */

// SMTP Configuration Constants
// Add these to your wp-config.php file above the line that says "That's all, stop editing!"

// Gmail SMTP Settings
define('POSTMAN_SMTP_HOST', 'smtp.gmail.com');
define('POSTMAN_SMTP_PORT', 587);
define('POSTMAN_SMTP_SECURE', 'tls');
define('POSTMAN_SMTP_USERNAME', 'your-email@gmail.com');
define('POSTMAN_SMTP_PASSWORD', 'your-app-password'); // Use Gmail App Password, not regular password
define('POSTMAN_SMTP_FROM', 'noreply@postmanoil.com');

// Alternative: Office 365 SMTP Settings
// define('POSTMAN_SMTP_HOST', 'smtp.office365.com');
// define('POSTMAN_SMTP_PORT', 587);
// define('POSTMAN_SMTP_SECURE', 'tls');
// define('POSTMAN_SMTP_USERNAME', 'your-email@yourdomain.com');
// define('POSTMAN_SMTP_PASSWORD', 'your-password');
// define('POSTMAN_SMTP_FROM', 'noreply@postmanoil.com');

// Alternative: SendGrid SMTP Settings
// define('POSTMAN_SMTP_HOST', 'smtp.sendgrid.net');
// define('POSTMAN_SMTP_PORT', 587);
// define('POSTMAN_SMTP_SECURE', 'tls');
// define('POSTMAN_SMTP_USERNAME', 'apikey');
// define('POSTMAN_SMTP_PASSWORD', 'your-sendgrid-api-key');
// define('POSTMAN_SMTP_FROM', 'noreply@postmanoil.com');

// How to generate Gmail App Password:
// 1. Go to https://myaccount.google.com/security
// 2. Enable 2-factor authentication if not already enabled
// 3. Search for "App passwords" in the security settings
// 4. Generate a new app password for "Mail"
// 5. Use this 16-character password as POSTMAN_SMTP_PASSWORD

// Security Note:
// - Always use environment variables or wp-config.php for sensitive data
// - Never hardcode credentials in theme files or plugins
// - Keep wp-config.php out of version control
// - Use strong, unique passwords for email accounts
// - Consider using a dedicated transactional email service for production