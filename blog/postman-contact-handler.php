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
    // Log email attempt
    error_log("Attempting to send email to: " . $to . " with subject: " . $subject);
    
    // Use WordPress's wp_mail function if available
    if (function_exists('wp_mail')) {
        add_filter('wp_mail_content_type', function() { return 'text/html'; });
        
        // Convert headers array to proper format for wp_mail
        $wp_headers = [];
        foreach ($headers as $header) {
            $wp_headers[] = $header;
        }
        
        $result = wp_mail($to, $subject, $html_content, $wp_headers);
        remove_filter('wp_mail_content_type', function() { return 'text/html'; });
        
        error_log("WordPress wp_mail result: " . ($result ? 'SUCCESS' : 'FAILED'));
        return $result;
    } else {
        // Fallback to PHP's mail function with proper headers
        $header_string = implode("\r\n", $headers);
        $result = mail($to, $subject, $html_content, $header_string);
        
        error_log("PHP mail result: " . ($result ? 'SUCCESS' : 'FAILED'));
        return $result;
    }
}

// Email template for company
function getCompanyEmailTemplate($data) {
    $currentDate = date('F j, Y \a\t g:i A');
    $template = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission - Postman Oils</title>
        <style>
            body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #2c3e50; background-color: #ecf0f1; margin: 0; padding: 20px; }
            .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); border: 1px solid #e1e8ed; }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 50%, #b91c1c 100%); padding: 50px 40px; text-align: center; color: white; position: relative; }
            .header::before { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
            .header-content { position: relative; z-index: 2; }
            .logo { width: 100px; height: auto; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.3); transition: transform 0.3s ease; }
            .logo:hover { transform: scale(1.05); }
            .header h1 { margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
            .header p { margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; font-weight: 300; }
            .priority-banner { background: linear-gradient(90deg, #10b981, #059669); color: white; padding: 15px; text-align: center; font-weight: bold; font-size: 16px; }
            .content { padding: 45px 40px; }
            .timestamp { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 10px; margin-bottom: 30px; text-align: center; color: #64748b; font-size: 14px; }
            .info-box { background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%); border-left: 5px solid #f97316; padding: 30px; margin: 25px 0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .info-row { margin: 18px 0; display: flex; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .info-row:last-child { border-bottom: none; }
            .info-label { font-weight: 600; color: #374151; min-width: 130px; font-size: 15px; }
            .info-value { color: #1f2937; flex: 1; font-size: 15px; }
            .email-link { color: #f97316; text-decoration: none; font-weight: 600; transition: color 0.3s ease; }
            .email-link:hover { color: #dc2626; text-decoration: underline; }
            .phone-link { color: #059669; text-decoration: none; font-weight: 600; }
            .phone-link:hover { color: #047857; text-decoration: underline; }
            .message-box { background: linear-gradient(145deg, #fef7ed 0%, #fed7aa 100%); border: 2px solid #fb923c; padding: 25px; margin: 25px 0; border-radius: 12px; position: relative; }
            .message-box::before { content: "💬"; position: absolute; top: -15px; left: 20px; background: #f97316; color: white; padding: 5px 10px; border-radius: 50%; font-size: 20px; }
            .message-content { margin-top: 10px; font-size: 16px; line-height: 1.6; white-space: pre-wrap; }
            .action-buttons { text-align: center; margin: 40px 0; }
            .btn-primary { display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3); transition: all 0.3s ease; margin: 0 10px; }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(249, 115, 22, 0.4); }
            .btn-secondary { display: inline-block; padding: 18px 40px; background: #10b981; color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3); transition: all 0.3s ease; margin: 0 10px; }
            .btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4); }
            .badge { display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #f97316, #dc2626); color: white; border-radius: 25px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
            .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: #d1d5db; padding: 40px; text-align: center; }
            .footer-logo { width: 60px; height: auto; margin-bottom: 20px; opacity: 0.8; }
            .social-links a { color: #f97316; text-decoration: none; margin: 0 15px; font-size: 14px; font-weight: 500; transition: color 0.3s ease; }
            .social-links a:hover { color: #fb923c; }
            .stats-box { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 10px; padding: 20px; margin: 20px 0; text-align: center; }
            .stats-number { font-size: 28px; font-weight: bold; color: #0ea5e9; }
            .stats-label { font-size: 14px; color: #64748b; margin-top: 5px; }
            @media (max-width: 600px) {
                .container { margin: 10px; border-radius: 15px; }
                .header, .content { padding: 30px 25px; }
                .btn-primary, .btn-secondary { display: block; margin: 10px 0; }
                .info-row { flex-direction: column; }
                .info-label { min-width: auto; margin-bottom: 5px; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="priority-banner">
                🚨 NEW CUSTOMER INQUIRY - IMMEDIATE ATTENTION REQUIRED 🚨
            </div>
            
            <div class="header">
                <div class="header-content">
                    <img src="https://postmanoil.com/blog/wp-content/uploads/2025/04/cropped-Postman-logo-2-1-e1745020681558.png" alt="Postman Oils Logo" class="logo" />
                    <h1>🎯 New Customer Contact</h1>
                    <p>Premium opportunity for business growth</p>
                </div>
            </div>
            
            <div class="content">
                <div class="timestamp">
                    📅 Received on ' . $currentDate . ' (IST)
                </div>
                
                <div class="stats-box">
                    <div class="stats-number">' . strtoupper($data['formType']) . '</div>
                    <div class="stats-label">Form Type</div>
                </div>
                
                <div class="info-box">
                    <h2 style="margin-top: 0; color: #1f2937; font-size: 24px; border-bottom: 2px solid #f97316; padding-bottom: 10px;">👤 Customer Information</h2>
                    <div class="info-row">
                        <span class="info-label">🏷️ Full Name:</span>
                        <span class="info-value"><strong>' . htmlspecialchars($data['name']) . '</strong></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📧 Email Address:</span>
                        <span class="info-value"><a href="mailto:' . htmlspecialchars($data['email']) . '" class="email-link">' . htmlspecialchars($data['email']) . '</a></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📱 Phone Number:</span>
                        <span class="info-value">' . ($data['phone'] ? '<a href="tel:' . htmlspecialchars($data['phone']) . '" class="phone-link">' . htmlspecialchars($data['phone']) . '</a>' : '<em style="color: #9ca3af;">Not provided</em>') . '</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">🎯 Inquiry Type:</span>
                        <span class="info-value"><span class="badge">' . htmlspecialchars($data['subject']) . '</span></span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">📝 Source:</span>
                        <span class="info-value">' . ucwords(str_replace('-', ' ', htmlspecialchars($data['formType']))) . ' Form</span>
                    </div>
                </div>
                
                <div class="message-box">
                    <h3 style="margin-top: 20px; color: #92400e; font-size: 20px;">💬 Customer Message</h3>
                    <div class="message-content">' . htmlspecialchars($data['message']) . '</div>
                </div>
                
                <div class="action-buttons">
                    <a href="mailto:' . htmlspecialchars($data['email']) . '?subject=Re: ' . htmlspecialchars($data['subject']) . ' - Postman Oils Response&body=Dear ' . htmlspecialchars($data['name']) . ',\n\nThank you for your interest in Postman Oils. We are excited to assist you with your inquiry.\n\nBest regards,\nPostman Oils Team" class="btn-primary">📧 Reply to Customer</a>
                    ' . ($data['phone'] ? '<a href="tel:' . htmlspecialchars($data['phone']) . '" class="btn-secondary">📞 Call Now</a>' : '') . '
                </div>
                
                <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 10px; padding: 20px; margin: 30px 0; text-align: center;">
                    <h4 style="color: #1e40af; margin-top: 0;">⚡ Quick Response Tips</h4>
                    <p style="margin: 10px 0; color: #1e3a8a; font-size: 14px;">
                        • Respond within 2 hours for best conversion<br>
                        • Mention specific products based on their inquiry<br>
                        • Include pricing and availability information<br>
                        • Offer dealership opportunities if applicable
                    </p>
                </div>
            </div>
            
            <div class="footer">
                <h3 style="color: #f97316; margin-top: 0; font-size: 22px;">Postman Oils</h3>
                <p style="margin: 15px 0; font-size: 16px; color: #d1d5db;">Premium Cooking Oils Since 1967</p>
                <p style="margin: 15px 0; font-size: 14px; color: #9ca3af;">
                    📍 H-1, 87-94, RIICO Industrial Area, Jaipur Road, Kekri - 305404, Rajasthan<br>
                    📞 +91-9928021482 | ✉️ marketingpostmanoil@gmail.com
                </p>
                <div class="social-links" style="margin-top: 25px;">
                    <a href="https://postmanoil.com">🌐 Website</a>
                    <a href="https://postmanoil.com/mustard-oil">🌻 Mustard Oil</a>
                    <a href="https://postmanoil.com/groundnut-oil">🥜 Groundnut Oil</a>
                    <a href="https://postmanoil.com/connect-for-dealership">🤝 Dealership</a>
                </div>
                <p style="margin-top: 30px; font-size: 12px; color: #6b7280; border-top: 1px solid #374151; padding-top: 20px;">
                    This email was automatically generated from the contact form on postmanoil.com<br>
                    © 2025 Postman Oils (Mittal Oil Mills Pvt. Ltd.). All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>';
    
    return $template;
}

// Email template for user confirmation
function getUserConfirmationTemplate($data) {
    $currentDate = date('F j, Y \a\t g:i A');
    $template = '
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting Postman Oils - We Will Respond Soon!</title>
        <style>
            body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #2c3e50; background-color: #ecf0f1; margin: 0; padding: 20px; }
            .container { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1); border: 1px solid #e1e8ed; }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 50%, #b91c1c 100%); padding: 60px 40px; text-align: center; color: white; position: relative; }
            .header::before { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
            .header-content { position: relative; z-index: 2; }
            .logo { width: 120px; height: auto; margin-bottom: 25px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: transform 0.3s ease; }
            .logo:hover { transform: scale(1.05); }
            .header h1 { margin: 0; font-size: 36px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
            .header p { margin: 20px 0 0 0; font-size: 18px; opacity: 0.95; font-weight: 300; }
            .success-banner { background: linear-gradient(90deg, #10b981, #059669); color: white; padding: 20px; text-align: center; font-weight: bold; font-size: 18px; }
            .content { padding: 50px 40px; }
            .greeting { font-size: 24px; color: #1f2937; margin-bottom: 25px; font-weight: 600; }
            .message-summary { background: linear-gradient(145deg, #fef7ed 0%, #fed7aa 100%); border-left: 5px solid #f97316; padding: 30px; margin: 30px 0; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
            .info-row { margin: 15px 0; }
            .info-label { font-weight: 600; color: #374151; font-size: 16px; }
            .message-content { margin-top: 15px; background: white; padding: 20px; border-radius: 8px; color: #1f2937; font-size: 15px; line-height: 1.6; border: 1px solid #e5e7eb; }
            .features { display: flex; justify-content: space-around; margin: 50px 0; text-align: center; flex-wrap: wrap; gap: 20px; }
            .feature { flex: 1; min-width: 200px; padding: 25px; background: linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); transition: transform 0.3s ease; }
            .feature:hover { transform: translateY(-5px); }
            .feature-icon { font-size: 50px; margin-bottom: 15px; }
            .feature h3 { margin: 15px 0; color: #1f2937; font-size: 18px; font-weight: 600; }
            .feature p { color: #6b7280; font-size: 14px; margin: 0; }
            .cta-section { text-align: center; margin: 50px 0; padding: 40px; background: linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 15px; border: 1px solid #0ea5e9; }
            .cta-button { display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 18px; box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3); transition: all 0.3s ease; margin: 10px; }
            .cta-button:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(249, 115, 22, 0.4); }
            .cta-secondary { display: inline-block; padding: 18px 40px; background: #10b981; color: white; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 18px; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3); transition: all 0.3s ease; margin: 10px; }
            .cta-secondary:hover { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(16, 185, 129, 0.4); }
            .response-timeline { background: #eff6ff; border: 1px solid #3b82f6; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; }
            .timeline-step { display: inline-block; margin: 0 15px; padding: 15px; background: white; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 120px; }
            .step-number { background: #3b82f6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: bold; }
            .footer { background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: #d1d5db; padding: 50px 40px; text-align: center; }
            .social-links { margin: 30px 0; }
            .social-links a { color: #f97316; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500; padding: 10px 20px; border: 1px solid #f97316; border-radius: 25px; transition: all 0.3s ease; }
            .social-links a:hover { background: #f97316; color: white; transform: translateY(-2px); }
            .contact-info { background: #374151; border-radius: 10px; padding: 20px; margin: 20px 0; }
            .testimonial { background: linear-gradient(145deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; border: 1px solid #f59e0b; }
            .testimonial-quote { font-size: 18px; font-style: italic; color: #92400e; margin-bottom: 15px; }
            .testimonial-author { font-weight: 600; color: #78350f; }
            @media (max-width: 600px) {
                .container { margin: 10px; border-radius: 15px; }
                .header, .content { padding: 30px 25px; }
                .features { flex-direction: column; }
                .feature { min-width: auto; }
                .cta-button, .cta-secondary { display: block; margin: 10px 0; }
                .timeline-step { display: block; margin: 10px auto; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="success-banner">
                ✅ MESSAGE RECEIVED SUCCESSFULLY - WE WILL RESPOND WITHIN 24 HOURS ✅
            </div>
            
            <div class="header">
                <div class="header-content">
                    <img src="https://postmanoil.com/blog/wp-content/uploads/2025/04/cropped-Postman-logo-2-1-e1745020681558.png" alt="Postman Oils Logo" class="logo" />
                    <h1>🙏 Thank You, ' . htmlspecialchars($data['name']) . '!</h1>
                    <p>Your message is important to us and we are excited to help</p>
                </div>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear ' . htmlspecialchars($data['name']) . ',
                </div>
                
                <p style="font-size: 18px; color: #374151; margin-bottom: 25px;">
                    Thank you for reaching out to <strong>Postman Oils</strong>! We have successfully received your inquiry and truly appreciate your interest in our premium cooking oils.
                </p>
                
                <div class="response-timeline">
                    <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 25px;">📋 What Happens Next</h3>
                    <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 15px;">
                        <div class="timeline-step">
                            <div class="step-number">1</div>
                            <div style="font-size: 12px; font-weight: 600;">Review</div>
                            <div style="font-size: 11px; color: #6b7280;">Within 2 hours</div>
                        </div>
                        <div class="timeline-step">
                            <div class="step-number">2</div>
                            <div style="font-size: 12px; font-weight: 600;">Prepare</div>
                            <div style="font-size: 11px; color: #6b7280;">Detailed response</div>
                        </div>
                        <div class="timeline-step">
                            <div class="step-number">3</div>
                            <div style="font-size: 12px; font-weight: 600;">Respond</div>
                            <div style="font-size: 11px; color: #6b7280;">Within 24 hours</div>
                        </div>
                    </div>
                </div>
                
                <div class="message-summary">
                    <h3 style="margin-top: 0; color: #92400e; font-size: 22px;">📋 Your Inquiry Summary</h3>
                    <div class="info-row">
                        <span class="info-label">🎯 Subject:</span> ' . htmlspecialchars($data['subject']) . '
                    </div>
                    <div class="info-row">
                        <span class="info-label">📅 Submitted on:</span> ' . $currentDate . ' (IST)
                    </div>
                    <div class="info-row">
                        <span class="info-label">💬 Your Message:</span>
                        <div class="message-content">' . htmlspecialchars($data['message']) . '</div>
                    </div>
                </div>
                
                <div class="testimonial">
                    <div class="testimonial-quote">
                        "From our family to yours, bringing you the purest oils since 1967. Every drop carries our commitment to quality and tradition."
                    </div>
                    <div class="testimonial-author">— The Postman Oils Family</div>
                </div>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🌿</div>
                        <h3>Premium Quality</h3>
                        <p>58+ years of excellence in traditional oil making with modern quality standards</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🏭</div>
                        <h3>Cold Pressed</h3>
                        <p>Traditional wooden kolhu method preserves natural nutrients and authentic flavors</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🚚</div>
                        <h3>Easy Ordering</h3>
                        <p>Available on Amazon, Flipkart, JioMart and direct delivery across India</p>
                    </div>
                </div>
                
                <div class="cta-section">
                    <h2 style="margin-top: 0; color: #1e40af; font-size: 28px;">🛍️ Explore While You Wait</h2>
                    <p style="color: #1e3a8a; margin-bottom: 25px; font-size: 16px;">Discover our premium range of cooking oils and learn more about our heritage</p>
                    <a href="https://postmanoil.com" class="cta-button">🌐 Visit Our Website</a>
                    <a href="https://postmanoil.com/mustard-oil" class="cta-secondary">🌻 Shop Mustard Oil</a>
                    <a href="https://postmanoil.com/groundnut-oil" class="cta-button">🥜 Shop Groundnut Oil</a>
                    <a href="https://postmanoil.com/connect-for-dealership" class="cta-secondary">🤝 Dealership Info</a>
                </div>
                
                <div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                    <h4 style="color: #15803d; margin-top: 0;">💡 Did You Know?</h4>
                    <p style="margin: 15px 0; color: #166534; font-size: 15px;">
                        Postman Oils has been trusted by Indian families for over <strong>5 decades</strong>. Our traditional cold-pressing method ensures that every bottle contains the purest, most nutritious oil possible.
                    </p>
                </div>
            </div>
            
            <div class="footer">
                <h3 style="color: #f97316; margin-top: 0; font-size: 26px;">Postman Oils</h3>
                <p style="margin: 20px 0; font-size: 18px; color: #d1d5db;">Premium Cooking Oils Since 1967</p>
                
                <div class="contact-info">
                    <p style="margin: 15px 0; font-size: 16px; color: #d1d5db;">
                        📍 <strong>Factory & Head Office:</strong><br>
                        H-1, 87-94, RIICO Industrial Area, Jaipur Road<br>
                        Kekri - 305404, Rajasthan, India
                    </p>
                    <p style="margin: 15px 0; font-size: 16px; color: #d1d5db;">
                        📞 <strong>Contact:</strong> +91-9928021482<br>
                        ✉️ <strong>Email:</strong> marketingpostmanoil@gmail.com<br>
                        🕒 <strong>Business Hours:</strong> Mon-Sat, 9 AM - 6 PM IST
                    </p>
                </div>
                
                <div class="social-links">
                    <a href="https://postmanoil.com">🌐 Website</a>
                    <a href="https://postmanoil.com/mustard-oil">🌻 Mustard Oil</a>
                    <a href="https://postmanoil.com/groundnut-oil">🥜 Groundnut Oil</a>
                    <a href="https://postmanoil.com/postman-recipes">🍳 Recipes</a>
                </div>
                
                <p style="margin-top: 40px; font-size: 13px; color: #6b7280; border-top: 1px solid #374151; padding-top: 25px;">
                    This is an automated confirmation email. Please do not reply to this email.<br>
                    For immediate assistance, call +91-9928021482 or email marketingpostmanoil@gmail.com<br><br>
                    © 2025 Postman Oils (Mittal Oil Mills Pvt. Ltd.). All rights reserved.<br>
                    Trusted by Indian families since 1967 • Premium Quality • Traditional Methods
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

error_log("Sending company email to: " . $company_email);
$company_result = sendEmailWithTemplate($company_email, $company_subject, $company_html, $headers);

if (!$company_result) {
    $success = false;
    $errors[] = 'Failed to send notification to company';
    error_log("Company email failed!");
} else {
    error_log("Company email sent successfully!");
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

error_log("Sending confirmation email to: " . $email);
$user_result = sendEmailWithTemplate($email, $user_subject, $user_html, $user_headers);

if (!$user_result) {
    // Don't mark as failed if user email fails, just log it
    $errors[] = 'Failed to send confirmation to user';
    error_log("User confirmation email failed!");
} else {
    error_log("User confirmation email sent successfully!");
}

// Return response
if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully! Check your email for confirmation.',
        'warnings' => $errors,
        'debug' => [
            'company_email_sent' => $company_result,
            'user_email_sent' => $user_result,
            'form_type' => $formType,
            'company_email' => $company_email
        ]
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send message. Please try again later.',
        'errors' => $errors,
        'debug' => [
            'company_email_sent' => $company_result,
            'user_email_sent' => $user_result,
            'form_type' => $formType,
            'company_email' => $company_email
        ]
    ]);
}
?>