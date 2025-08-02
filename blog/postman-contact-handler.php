<?php
/**
 * Postman Oils Contact Form Handler
 * This file handles all contact form submissions from the Next.js website
 * Place this file in your WordPress blog directory
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Missing required fields: ' . implode(', ', $missing_fields)
    ]);
    exit;
}

// Sanitize input data
$name = filter_var($input['name'], FILTER_SANITIZE_STRING);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? filter_var($input['phone'], FILTER_SANITIZE_STRING) : 'Not provided';
$subject = isset($input['subject']) ? filter_var($input['subject'], FILTER_SANITIZE_STRING) : 'General Inquiry';
$message = filter_var($input['message'], FILTER_SANITIZE_STRING);
$formType = isset($input['formType']) ? filter_var($input['formType'], FILTER_SANITIZE_STRING) : 'contact';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Company email
$company_email = 'marketingpostmanoil@gmail.com';
$from_email = 'noreply@postmanoil.com';
$from_name = 'Postman Oils Website';

// Function to send email using WordPress wp_mail
function sendEmailWithTemplate($to, $subject, $html_content, $headers) {
    // Use WordPress's wp_mail function if available
    if (function_exists('wp_mail')) {
        add_filter('wp_mail_content_type', function() { return 'text/html'; });
        $result = wp_mail($to, $subject, $html_content, $headers);
        remove_filter('wp_mail_content_type', function() { return 'text/html'; });
        return $result;
    } else {
        // Fallback to PHP's mail function
        return mail($to, $subject, $html_content, implode("\r\n", $headers));
    }
}

// Email template for company
function getCompanyEmailTemplate($data) {
    $template = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 40px 30px; text-align: center; color: white; }
            .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .info-box { background-color: #f8f9fa; border-left: 4px solid #f97316; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .info-row { margin: 15px 0; display: flex; align-items: flex-start; }
            .info-label { font-weight: bold; color: #666; min-width: 120px; }
            .info-value { color: #333; flex: 1; }
            .message-box { background-color: #fff8ed; border: 1px solid #fed7aa; padding: 20px; margin: 20px 0; border-radius: 8px; }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666; font-size: 14px; }
            .badge { display: inline-block; padding: 4px 12px; background-color: #f97316; color: white; border-radius: 20px; font-size: 12px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 New Contact Form Submission</h1>
                <p>You have received a new message from your website</p>
            </div>
            <div class="content">
                <div class="info-box">
                    <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
                    <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">' . htmlspecialchars($data['name']) . '</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value"><a href="mailto:' . htmlspecialchars($data['email']) . '" style="color: #f97316;">' . htmlspecialchars($data['email']) . '</a></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Phone:</span>
                        <span class="info-value">' . htmlspecialchars($data['phone']) . '</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Subject:</span>
                        <span class="info-value"><span class="badge">' . htmlspecialchars($data['subject']) . '</span></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Form Type:</span>
                        <span class="info-value">' . htmlspecialchars($data['formType']) . '</span>
                    </div>
                </div>
                
                <div class="message-box">
                    <h3 style="margin-top: 0; color: #333;">Message</h3>
                    <p style="margin: 0; white-space: pre-wrap;">' . htmlspecialchars($data['message']) . '</p>
                </div>
                
                <p style="text-align: center; margin-top: 30px;">
                    <a href="mailto:' . htmlspecialchars($data['email']) . '?subject=Re: ' . htmlspecialchars($data['subject']) . '" style="display: inline-block; padding: 12px 30px; background-color: #f97316; color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">Reply to ' . htmlspecialchars($data['name']) . '</a>
                </p>
            </div>
            <div class="footer">
                <p>This email was sent from the contact form on <a href="https://postmanoil.com" style="color: #f97316;">postmanoil.com</a></p>
                <p>© 2024 Postman Oils. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>';
    
    return $template;
}

// Email template for user confirmation
function getUserConfirmationTemplate($data) {
    $template = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Thank You for Contacting Postman Oils</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 50px 30px; text-align: center; color: white; position: relative; }
            .logo { width: 120px; height: auto; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 32px; font-weight: bold; }
            .header p { margin: 10px 0 0 0; font-size: 18px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 20px; color: #333; margin-bottom: 20px; }
            .message-summary { background-color: #fff8ed; border-left: 4px solid #f97316; padding: 20px; margin: 30px 0; border-radius: 8px; }
            .info-row { margin: 10px 0; }
            .info-label { font-weight: bold; color: #666; }
            .cta-section { text-align: center; margin: 40px 0; padding: 30px; background-color: #f8f9fa; border-radius: 12px; }
            .cta-button { display: inline-block; padding: 15px 40px; background-color: #f97316; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; }
            .features { display: flex; justify-content: space-around; margin: 40px 0; text-align: center; }
            .feature { flex: 1; padding: 20px; }
            .feature-icon { font-size: 40px; margin-bottom: 10px; }
            .feature h3 { margin: 10px 0; color: #333; }
            .feature p { color: #666; font-size: 14px; }
            .footer { background-color: #1a1a1a; color: #ffffff; padding: 40px 30px; text-align: center; }
            .social-links { margin: 20px 0; }
            .social-links a { color: #f97316; text-decoration: none; margin: 0 10px; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
                <p>We have received your message and will respond soon</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Hello ' . htmlspecialchars($data['name']) . ',
                </div>
                
                <p>Thank you for reaching out to Postman Oils. We appreciate your interest in our premium cooking oils and are excited to assist you.</p>
                
                <p>Our team has received your inquiry and will review it carefully. You can expect a response within <strong>24-48 hours</strong> during business days.</p>
                
                <div class="message-summary">
                    <h3 style="margin-top: 0; color: #f97316;">Your Message Summary:</h3>
                    <div class="info-row">
                        <span class="info-label">Subject:</span> ' . htmlspecialchars($data['subject']) . '
                    </div>
                    <div class="info-row">
                        <span class="info-label">Message:</span><br>
                        <div style="margin-top: 10px; color: #555;">' . htmlspecialchars($data['message']) . '</div>
                    </div>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🌿</div>
                        <h3>Premium Quality</h3>
                        <p>58+ years of trust in traditional oil making</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🏭</div>
                        <h3>Cold Pressed</h3>
                        <p>Traditional wooden kolhu method</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🚚</div>
                        <h3>Fast Delivery</h3>
                        <p>Available on Amazon, Flipkart & JioMart</p>
                    </div>
                </div>
                
                <div class="cta-section">
                    <h2 style="margin-top: 0; color: #333;">While You Wait...</h2>
                    <p style="color: #666; margin-bottom: 20px;">Explore our premium range of cooking oils</p>
                    <a href="https://postmanoil.com" class="cta-button">Visit Our Website</a>
                </div>
                
                <p style="text-align: center; color: #666; font-style: italic;">
                    "From our family to yours, bringing you the purest oils since 1967"
                </p>
            </div>
            
            <div class="footer">
                <h3 style="color: #f97316; margin-top: 0;">Postman Oils</h3>
                <p style="margin: 10px 0;">Premium Cooking Oils Manufacturer</p>
                <p style="margin: 10px 0; font-size: 14px;">
                    📍 H-1, 87-94, RIICO Industrial Area, Jaipur Road, Kekri - 305404<br>
                    📞 +91-9928021482 | ✉️ marketingpostmanoil@gmail.com
                </p>
                <div class="social-links">
                    <a href="https://postmanoil.com">Website</a> |
                    <a href="https://postmanoil.com/mustard-oil">Mustard Oil</a> |
                    <a href="https://postmanoil.com/groundnut-oil">Groundnut Oil</a>
                </div>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">
                    © 2024 Postman Oils (Mittal Oil Mills Pvt. Ltd.). All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>';
    
    return $template;
}

// Prepare email data
$email_data = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'subject' => $subject,
    'message' => $message,
    'formType' => $formType
];

// Email headers
$headers = [
    'From: ' . $from_name . ' <' . $from_email . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

$success = true;
$errors = [];

// Send email to company
$company_subject = 'New ' . ucfirst($formType) . ' Form Submission - ' . $subject;
$company_html = getCompanyEmailTemplate($email_data);

if (!sendEmailWithTemplate($company_email, $company_subject, $company_html, $headers)) {
    $success = false;
    $errors[] = 'Failed to send notification to company';
}

// Send confirmation email to user
$user_subject = 'Thank You for Contacting Postman Oils';
$user_html = getUserConfirmationTemplate($email_data);
$user_headers = [
    'From: Postman Oils <' . $from_email . '>',
    'Reply-To: ' . $company_email,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

if (!sendEmailWithTemplate($email, $user_subject, $user_html, $user_headers)) {
    // Don't mark as failed if user email fails, just log it
    $errors[] = 'Failed to send confirmation to user';
}

// Return response
if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully! Check your email for confirmation.',
        'warnings' => $errors
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again later.',
        'errors' => $errors
    ]);
}
?>