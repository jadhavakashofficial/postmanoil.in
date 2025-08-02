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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>New Contact - Postman Oils</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    
                    <!-- Priority Header -->
                    <tr>
                        <td style="background-color: #dc2626; color: white; padding: 12px; text-align: center; font-weight: bold; font-size: 14px;">
                            🚨 NEW CUSTOMER INQUIRY - IMMEDIATE ATTENTION REQUIRED
                        </td>
                    </tr>
                    
                    <!-- Main Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f97316, #dc2626); color: white; padding: 40px 30px; text-align: center;">
                            <img src="https://postmanoil.com/blog/wp-content/uploads/2025/04/cropped-Postman-logo-2-1-e1745020681558.png" alt="Postman Oils" style="width: 80px; height: auto; margin-bottom: 15px; border-radius: 8px;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">New Customer Contact</h1>
                            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Premium business opportunity</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            
                            <!-- Timestamp -->
                            <table width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 12px; text-align: center; color: #64748b; font-size: 14px;">
                                        📅 Received on ' . $currentDate . ' (IST)
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Customer Information -->
                            <table width="100%" style="background-color: #f8fafc; border-left: 4px solid #f97316; border-radius: 6px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 20px; border-bottom: 2px solid #f97316; padding-bottom: 8px;">
                                            👤 Customer Information
                                        </h2>
                                        
                                        <table width="100%" cellpadding="8" cellspacing="0">
                                            <tr>
                                                <td style="font-weight: 600; color: #374151; width: 120px; font-size: 14px;">
                                                    🏷️ Name:
                                                </td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <strong>' . htmlspecialchars($data['name']) . '</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: 600; color: #374151; width: 120px; font-size: 14px;">
                                                    📧 Email:
                                                </td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <a href="mailto:' . htmlspecialchars($data['email']) . '" style="color: #f97316; text-decoration: none; font-weight: 600;">' . htmlspecialchars($data['email']) . '</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: 600; color: #374151; width: 120px; font-size: 14px;">
                                                    📱 Phone:
                                                </td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    ' . ($data['phone'] ? '<a href="tel:' . htmlspecialchars($data['phone']) . '" style="color: #059669; text-decoration: none; font-weight: 600;">' . htmlspecialchars($data['phone']) . '</a>' : '<em style="color: #9ca3af;">Not provided</em>') . '
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: 600; color: #374151; width: 120px; font-size: 14px;">
                                                    🎯 Subject:
                                                </td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    <span style="background: linear-gradient(135deg, #f97316, #dc2626); color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold;">' . htmlspecialchars($data['subject']) . '</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: 600; color: #374151; width: 120px; font-size: 14px;">
                                                    📝 Source:
                                                </td>
                                                <td style="color: #1f2937; font-size: 14px;">
                                                    ' . ucwords(str_replace('-', ' ', htmlspecialchars($data['formType']))) . ' Form
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message -->
                            <table width="100%" style="background: linear-gradient(145deg, #fef7ed, #fed7aa); border: 2px solid #fb923c; border-radius: 6px; margin-bottom: 20px;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">💬 Customer Message</h3>
                                        <div style="background: white; padding: 15px; border-radius: 6px; color: #1f2937; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">' . htmlspecialchars($data['message']) . '</div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Buttons -->
                            <table width="100%" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="mailto:' . htmlspecialchars($data['email']) . '?subject=Re: ' . htmlspecialchars($data['subject']) . ' - Postman Oils Response" style="display: inline-block; background: linear-gradient(135deg, #f97316, #dc2626); color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 14px; margin: 5px;">📧 Reply to Customer</a>
                                        ' . ($data['phone'] ? '<a href="tel:' . htmlspecialchars($data['phone']) . '" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; font-size: 14px; margin: 5px;">📞 Call Now</a>' : '') . '
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Tips -->
                            <table width="100%" style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 6px;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <h4 style="color: #1e40af; margin: 0 0 10px 0;">⚡ Quick Response Tips</h4>
                                        <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.5;">
                                            • Respond within 2 hours for best conversion<br>
                                            • Mention specific products based on their inquiry<br>
                                            • Include pricing and availability information<br>
                                            • Offer dealership opportunities if applicable
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1f2937, #111827); color: #d1d5db; padding: 30px; text-align: center;">
                            <h3 style="color: #f97316; margin: 0 0 10px 0; font-size: 20px;">Postman Oils</h3>
                            <p style="margin: 10px 0; font-size: 14px;">Premium Cooking Oils Since 1967</p>
                            <p style="margin: 15px 0; font-size: 13px; color: #9ca3af;">
                                📍 H-1, 87-94, RIICO Industrial Area, Jaipur Road, Kekri - 305404<br>
                                📞 +91-9928021482 | ✉️ marketingpostmanoil@gmail.com
                            </p>
                            <p style="margin-top: 20px; font-size: 11px; color: #6b7280; border-top: 1px solid #374151; padding-top: 15px;">
                                This email was generated from postmanoil.com contact form<br>
                                © 2025 Postman Oils. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';
    
    return $template;
}

// Email template for user confirmation
function getUserConfirmationTemplate($data) {
    $currentDate = date('F j, Y \a\t g:i A');
    $template = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thank You - Postman Oils</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    
                    <!-- Success Header -->
                    <tr>
                        <td style="background-color: #10b981; color: white; padding: 15px; text-align: center; font-weight: bold; font-size: 16px;">
                            ✅ MESSAGE RECEIVED - WE WILL RESPOND WITHIN 24 HOURS
                        </td>
                    </tr>
                    
                    <!-- Main Header -->
                    <tr>
                        <td style="background-color: #f97316; color: white; padding: 40px 30px; text-align: center;">
                            <img src="https://postmanoil.com/blog/wp-content/uploads/2025/04/cropped-Postman-logo-2-1-e1745020681558.png" alt="Postman Oils" style="width: 60px; height: auto; margin-bottom: 15px; border-radius: 8px;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Thank You, ' . htmlspecialchars($data['name']) . '!</h1>
                            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">We appreciate your interest in our premium oils</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 30px;">
                            
                            <p style="font-size: 16px; color: #374151; margin-bottom: 20px; line-height: 1.6;">
                                Thank you for reaching out to <strong>Postman Oils</strong>! We have successfully received your inquiry and will respond soon.
                            </p>
                            
                            <!-- Response Timeline -->
                            <table width="100%" style="background-color: #eff6ff; border: 1px solid #3b82f6; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">What Happens Next</h3>
                                        <table width="100%">
                                            <tr>
                                                <td style="text-align: center; padding: 10px;">
                                                    <div style="background: #3b82f6; color: white; border-radius: 50%; width: 25px; height: 25px; margin: 0 auto 5px; line-height: 25px; font-weight: bold; font-size: 12px;">1</div>
                                                    <div style="font-size: 12px; font-weight: bold;">Review</div>
                                                    <div style="font-size: 11px; color: #6b7280;">Within 2 hours</div>
                                                </td>
                                                <td style="text-align: center; padding: 10px;">
                                                    <div style="background: #3b82f6; color: white; border-radius: 50%; width: 25px; height: 25px; margin: 0 auto 5px; line-height: 25px; font-weight: bold; font-size: 12px;">2</div>
                                                    <div style="font-size: 12px; font-weight: bold;">Prepare</div>
                                                    <div style="font-size: 11px; color: #6b7280;">Response</div>
                                                </td>
                                                <td style="text-align: center; padding: 10px;">
                                                    <div style="background: #3b82f6; color: white; border-radius: 50%; width: 25px; height: 25px; margin: 0 auto 5px; line-height: 25px; font-weight: bold; font-size: 12px;">3</div>
                                                    <div style="font-size: 12px; font-weight: bold;">Reply</div>
                                                    <div style="font-size: 11px; color: #6b7280;">Within 24 hours</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Message Summary -->
                            <table width="100%" style="background-color: #fef7ed; border-left: 4px solid #f97316; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px;">
                                        <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px;">Your Inquiry Details</h3>
                                        <table width="100%" cellpadding="5" cellspacing="0">
                                            <tr>
                                                <td style="font-weight: bold; color: #374151; width: 80px;">Subject:</td>
                                                <td style="color: #1f2937;">' . htmlspecialchars($data['subject']) . '</td>
                                            </tr>
                                            <tr>
                                                <td style="font-weight: bold; color: #374151;">Date:</td>
                                                <td style="color: #1f2937;">' . $currentDate . ' (IST)</td>
                                            </tr>
                                        </table>
                                        <div style="margin-top: 15px;">
                                            <strong style="color: #374151;">Message:</strong>
                                            <div style="background: white; padding: 15px; border-radius: 6px; color: #1f2937; margin-top: 5px; border: 1px solid #e5e7eb;">' . htmlspecialchars($data['message']) . '</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Company Info -->
                            <table width="100%" style="background-color: #f0fdf4; border: 1px solid #22c55e; border-radius: 6px; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <h4 style="color: #15803d; margin: 0 0 10px 0;">About Postman Oils</h4>
                                        <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.5;">
                                            Trusted by Indian families for over <strong>57 years</strong>. Our traditional cold-pressing method ensures the purest, most nutritious oils.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Action Buttons -->
                            <table width="100%" style="margin: 25px 0;">
                                <tr>
                                    <td style="text-align: center;">
                                        <a href="https://postmanoil.com" style="display: inline-block; background-color: #f97316; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 5px;">Visit Website</a>
                                        <a href="https://postmanoil.com/mustard-oil" style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 5px;">Shop Mustard Oil</a>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #1f2937; color: #d1d5db; padding: 30px; text-align: center;">
                            <h3 style="color: #f97316; margin: 0 0 10px 0; font-size: 20px;">Postman Oils</h3>
                            <p style="margin: 10px 0; font-size: 14px;">Premium Cooking Oils Since 1967</p>
                            <table width="100%" style="margin: 15px 0;">
                                <tr>
                                    <td style="text-align: center; padding: 5px 0; font-size: 13px; color: #9ca3af;">
                                        📍 H-1, 87-94, RIICO Industrial Area, Jaipur Road, Kekri - 305404<br>
                                        📞 +91-9928021482 | ✉️ marketingpostmanoil@gmail.com
                                    </td>
                                </tr>
                            </table>
                            <p style="margin-top: 20px; font-size: 11px; color: #6b7280; border-top: 1px solid #374151; padding-top: 15px;">
                                This is an automated confirmation. For immediate assistance, call +91-9928021482<br>
                                © 2025 Postman Oils. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
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