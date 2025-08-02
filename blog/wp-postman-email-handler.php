<?php
/**
 * Postman Oil Email Handler for WordPress
 * Secure email handling without exposing credentials
 * Place this file in your WordPress theme's functions.php or as a separate plugin
 * 
 * @package PostmanOils
 * @version 2.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit('Direct access forbidden.');
}

// Handle contact form submissions via AJAX
add_action('wp_ajax_handle_contact_form', 'postman_handle_contact_form');
add_action('wp_ajax_nopriv_handle_contact_form', 'postman_handle_contact_form');

function postman_handle_contact_form() {
    // Security checks
    if (!wp_verify_nonce($_POST['nonce'], 'contact_form_nonce')) {
        wp_send_json_error('Security check failed');
        return;
    }
    
    // Rate limiting check
    $ip = $_SERVER['REMOTE_ADDR'];
    $transient_key = 'contact_form_' . md5($ip);
    $attempts = get_transient($transient_key);
    
    if ($attempts && $attempts > 3) {
        wp_send_json_error('Too many attempts. Please try again later.');
        return;
    }
    
    // Honeypot check for spam prevention
    if (!empty($_POST['website_url'])) {
        // Honeypot field was filled - likely spam
        wp_send_json_error('Invalid submission detected.');
        return;
    }

    // Sanitize and validate form data
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $phone = sanitize_text_field($_POST['phone']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Validation
    $errors = array();
    
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters long.';
    }
    
    if (!is_email($email)) {
        $errors[] = 'Please provide a valid email address.';
    }
    
    if (!empty($phone) && !preg_match('/^[0-9+\-\s()]+$/', $phone)) {
        $errors[] = 'Please provide a valid phone number.';
    }
    
    if (empty($subject)) {
        $errors[] = 'Subject is required.';
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters long.';
    }
    
    // Check for spam patterns
    $spam_patterns = array(
        '/\b(?:viagra|cialis|casino|lottery|winner|click here|free money)\b/i',
        '/https?:\/\/[^\s]+/i', // URLs in message
        '/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i' // Multiple emails
    );
    
    $spam_score = 0;
    foreach ($spam_patterns as $pattern) {
        if (preg_match($pattern, $message)) {
            $spam_score++;
        }
    }
    
    if ($spam_score >= 2) {
        $errors[] = 'Your message appears to contain spam content.';
    }
    
    if (!empty($errors)) {
        wp_send_json_error(array(
            'message' => 'Please correct the following errors:',
            'errors' => $errors
        ));
        return;
    }

    // Email configuration
    $to = 'marketingpostmanoil@gmail.com';
    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: Postman Oils <classictechak@gmail.com>',
        'Reply-To: ' . $name . ' <' . $email . '>'
    );

    // Email subject
    $email_subject = 'Postman Oil Contact Form: ' . $subject;

    // Email body with top-notch design
    $email_body = '
    <html>
    <head>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                margin: 0; 
                padding: 0; 
                background-color: #f4f4f5; 
                color: #18181b; 
            }
            .wrapper { 
                background-color: #f4f4f5; 
                padding: 40px 20px; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff; 
                border-radius: 16px; 
                overflow: hidden; 
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
            }
            .header { 
                background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); 
                padding: 40px 30px; 
                text-align: center; 
            }
            .logo { 
                display: inline-block; 
                background: white; 
                padding: 15px 25px; 
                border-radius: 12px; 
                margin-bottom: 20px; 
            }
            .header h1 { 
                color: white; 
                font-size: 24px; 
                font-weight: 700; 
                margin: 0 0 8px 0; 
                letter-spacing: -0.5px; 
            }
            .header p { 
                color: rgba(255, 255, 255, 0.9); 
                font-size: 16px; 
                margin: 0; 
            }
            .content { 
                padding: 40px 30px; 
            }
            .greeting { 
                font-size: 18px; 
                color: #18181b; 
                margin-bottom: 30px; 
                font-weight: 500; 
            }
            .info-card { 
                background: linear-gradient(to right, #fef3c7, #fee2e2); 
                border-radius: 12px; 
                padding: 24px; 
                margin-bottom: 30px; 
            }
            .field { 
                display: flex; 
                align-items: flex-start; 
                margin-bottom: 20px; 
                padding-bottom: 20px; 
                border-bottom: 1px solid #e5e7eb; 
            }
            .field:last-child { 
                margin-bottom: 0; 
                padding-bottom: 0; 
                border-bottom: none; 
            }
            .label { 
                font-weight: 600; 
                color: #6b7280; 
                min-width: 100px; 
                font-size: 14px; 
                text-transform: uppercase; 
                letter-spacing: 0.5px; 
            }
            .value { 
                color: #18181b; 
                font-size: 16px; 
                flex: 1; 
                line-height: 1.6; 
            }
            .message-box { 
                background-color: #f9fafb; 
                border: 1px solid #e5e7eb; 
                border-radius: 8px; 
                padding: 16px; 
                margin-top: 8px; 
            }
            .footer { 
                background-color: #f9fafb; 
                padding: 30px; 
                text-align: center; 
                border-top: 1px solid #e5e7eb; 
            }
            .footer-logo { 
                font-size: 20px; 
                font-weight: 700; 
                color: #f97316; 
                margin-bottom: 8px; 
            }
            .footer-text { 
                color: #6b7280; 
                font-size: 14px; 
                line-height: 1.5; 
            }
            .footer-links { 
                margin-top: 20px; 
            }
            .footer-links a { 
                color: #f97316; 
                text-decoration: none; 
                margin: 0 10px; 
                font-size: 14px; 
                font-weight: 500; 
            }
            .badge { 
                display: inline-block; 
                background-color: #fef3c7; 
                color: #92400e; 
                padding: 4px 12px; 
                border-radius: 20px; 
                font-size: 12px; 
                font-weight: 600; 
                margin-bottom: 20px; 
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <div class="logo">
                        <img src="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png" alt="Postman Oils" style="height: 40px; width: auto; display: block;">
                    </div>
                    <h1>New Contact Form Submission</h1>
                    <p>You have received a new inquiry from your website</p>
                </div>
                
                <div class="content">
                    <div class="badge">🔔 NEW INQUIRY</div>
                    
                    <div class="greeting">
                        Hello Team,<br>
                        A potential customer has reached out through the contact form.
                    </div>
                    
                    <div class="info-card">
                        <h3 style="margin: 0 0 20px 0; color: #18181b; font-size: 18px;">Customer Information</h3>
                        
                        <div class="field">
                            <span class="label">Name</span>
                            <span class="value"><strong>' . esc_html($name) . '</strong></span>
                        </div>
                        
                        <div class="field">
                            <span class="label">Email</span>
                            <span class="value">
                                <a href="mailto:' . esc_html($email) . '" style="color: #f97316; text-decoration: none;">' . esc_html($email) . '</a>
                            </span>
                        </div>
                        
                        <div class="field">
                            <span class="label">Phone</span>
                            <span class="value">
                                <a href="tel:' . esc_html($phone) . '" style="color: #f97316; text-decoration: none;">' . esc_html($phone) . '</a>
                            </span>
                        </div>
                        
                        <div class="field">
                            <span class="label">Subject</span>
                            <span class="value">' . esc_html($subject) . '</span>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <h3 style="margin: 0 0 16px 0; color: #18181b; font-size: 18px;">Message</h3>
                        <div class="message-box">' . nl2br(esc_html($message)) . '</div>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-radius: 8px; text-align: center;">
                        <p style="margin: 0; color: #065f46; font-weight: 500;">
                            💡 Tip: Respond within 24 hours for best customer experience
                        </p>
                    </div>
                </div>
                
                <div class="footer">
                    <div class="footer-logo">POSTMAN OILS</div>
                    <div class="footer-text">
                        Premium Quality Cooking Oils Since 1967<br>
                        58+ Years of Trust & Excellence
                    </div>
                    <div class="footer-links">
                        <a href="https://postmanoil.com">Website</a>
                        <a href="mailto:marketingpostmanoil@gmail.com">Email Us</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>';

    // Send email
    $sent = wp_mail($to, $email_subject, $email_body, $headers);

    if ($sent) {
        // Update rate limiting
        set_transient($transient_key, ($attempts ? $attempts + 1 : 1), HOUR_IN_SECONDS);
        
        // Log successful submission
        if (defined('WP_DEBUG_LOG') && WP_DEBUG_LOG) {
            error_log(sprintf('[Postman Oils] Contact form submitted from %s by %s (%s)', $ip, $name, $email));
        }
        
        // Send confirmation email to user (optional)
        $user_subject = 'Thank you for contacting Postman Oils';
        $user_message = postman_get_user_confirmation_email($name);
        $user_headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: Postman Oils <noreply@postmanoil.com>'
        );
        
        wp_mail($email, $user_subject, $user_message, $user_headers);
        
        wp_send_json_success(array(
            'message' => 'Thank you for contacting us! We will get back to you within 24 hours.',
            'data' => array(
                'name' => $name,
                'email' => $email
            )
        ));
    } else {
        // Log error
        if (defined('WP_DEBUG_LOG') && WP_DEBUG_LOG) {
            error_log(sprintf('[Postman Oils] Failed to send email from %s', $ip));
        }
        
        wp_send_json_error('Failed to send email. Please try again later or contact us directly at marketingpostmanoil@gmail.com.');
    }
}

// Add nonce to frontend
add_action('wp_footer', 'postman_add_contact_form_nonce');
function postman_add_contact_form_nonce() {
    ?>
    <script>
        window.contactFormNonce = '<?php echo wp_create_nonce('contact_form_nonce'); ?>';
    </script>
    <?php
}

// Configure SMTP for Gmail
add_action('phpmailer_init', 'postman_configure_smtp');
function postman_configure_smtp($phpmailer) {
    // Only use SMTP if credentials are defined
    if (defined('POSTMAN_SMTP_USERNAME') && defined('POSTMAN_SMTP_PASSWORD')) {
        $phpmailer->isSMTP();
        $phpmailer->Host = POSTMAN_SMTP_HOST ?? 'smtp.gmail.com';
        $phpmailer->SMTPAuth = true;
        $phpmailer->Port = POSTMAN_SMTP_PORT ?? 587;
        $phpmailer->Username = POSTMAN_SMTP_USERNAME;
        $phpmailer->Password = POSTMAN_SMTP_PASSWORD;
        $phpmailer->SMTPSecure = POSTMAN_SMTP_SECURE ?? 'tls';
        $phpmailer->From = POSTMAN_SMTP_FROM ?? 'noreply@postmanoil.com';
        $phpmailer->FromName = 'Postman Oils';
        
        // Enable debugging in development
        if (defined('WP_DEBUG') && WP_DEBUG) {
            $phpmailer->SMTPDebug = 2;
            $phpmailer->Debugoutput = 'error_log';
        }
    }
}

// User confirmation email template
function postman_get_user_confirmation_email($name) {
    return '
    <html>
    <head>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; background-color: #f4f4f5; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 40px 30px; text-align: center; color: white; }
            .content { padding: 40px 30px; }
            .footer { background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
            </div>
            <div class="content">
                <p>Dear ' . esc_html($name) . ',</p>
                <p>We have received your message and appreciate you reaching out to Postman Oils.</p>
                <p>Our team will review your inquiry and get back to you within 24 hours.</p>
                <p>If you have any urgent concerns, please feel free to call us at our customer service number.</p>
                <p>Best regards,<br>The Postman Oils Team</p>
            </div>
            <div class="footer">
                <p>Premium Quality Cooking Oils Since 1967</p>
                <p><a href="https://postmanoil.com" style="color: #f97316; text-decoration: none;">Visit our website</a></p>
            </div>
        </div>
    </body>
    </html>';
}

// Create database table for storing form submissions (optional)
function postman_create_submissions_table() {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'postman_contact_submissions';
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        email varchar(100) NOT NULL,
        phone varchar(20),
        subject varchar(200) NOT NULL,
        message text NOT NULL,
        ip_address varchar(45),
        submission_date datetime DEFAULT CURRENT_TIMESTAMP,
        status varchar(20) DEFAULT 'pending',
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

// Activate hook to create table
register_activation_hook(__FILE__, 'postman_create_submissions_table');

// Admin page to view submissions (optional)
add_action('admin_menu', 'postman_add_admin_menu');
function postman_add_admin_menu() {
    add_menu_page(
        'Contact Submissions',
        'Contact Forms',
        'manage_options',
        'postman-contact-submissions',
        'postman_admin_page',
        'dashicons-email-alt',
        30
    );
}

function postman_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'postman_contact_submissions';
    
    // Get submissions
    $submissions = $wpdb->get_results("SELECT * FROM $table_name ORDER BY submission_date DESC LIMIT 50");
    
    ?>
    <div class="wrap">
        <h1>Contact Form Submissions</h1>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($submissions as $submission): ?>
                <tr>
                    <td><?php echo esc_html($submission->submission_date); ?></td>
                    <td><?php echo esc_html($submission->name); ?></td>
                    <td><?php echo esc_html($submission->email); ?></td>
                    <td><?php echo esc_html($submission->subject); ?></td>
                    <td><?php echo esc_html($submission->status); ?></td>
                    <td>
                        <a href="#" onclick="alert('Message: ' + <?php echo json_encode($submission->message); ?>); return false;">View</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
?>