# Postman Oil Contact Form Setup Guide

## Installation Steps

### 1. WordPress Setup

1. Copy `wp-postman-email-handler.php` to your WordPress theme directory or include it in your theme's `functions.php`:
   ```php
   require_once get_template_directory() . '/wp-postman-email-handler.php';
   ```

2. Add email configuration to `wp-config.php` (use the example from `wp-config-email-example.php`):
   ```php
   define('POSTMAN_SMTP_USERNAME', 'your-email@gmail.com');
   define('POSTMAN_SMTP_PASSWORD', 'your-app-password');
   ```

### 2. Frontend Setup

1. Include the contact form handler JavaScript in your Next.js pages:
   ```html
   <script src="/contact-form-handler.js"></script>
   ```

2. Add the `data-contact-form` attribute to your forms:
   ```jsx
   <form data-contact-form>
     <input type="text" name="name" required />
     <input type="email" name="email" required />
     <input type="tel" name="phone" />
     <input type="text" name="subject" required />
     <textarea name="message" required></textarea>
     <button type="submit">Send Message</button>
   </form>
   ```

### 3. Security Features

The system includes these security features:

1. **Nonce Verification**: Prevents CSRF attacks
2. **Rate Limiting**: Maximum 3 submissions per hour per IP
3. **Honeypot Field**: Catches spam bots
4. **Input Validation**: Server-side validation of all fields
5. **Spam Pattern Detection**: Checks for common spam content
6. **Sanitization**: All inputs are properly sanitized

### 4. Email Features

- Beautiful HTML email template for admin notifications
- Confirmation email sent to users
- All submissions logged in WordPress database
- Admin panel to view submissions

### 5. Testing

1. Test form submission without filling honeypot field
2. Verify rate limiting works (try submitting 4 times quickly)
3. Check that emails are received
4. Verify validation messages appear for invalid input

### 6. Gmail App Password Setup

1. Go to https://myaccount.google.com/security
2. Enable 2-factor authentication
3. Search for "App passwords"
4. Generate new app password for "Mail"
5. Use this 16-character password in wp-config.php

### 7. Alternative Email Services

You can use these services instead of Gmail:
- SendGrid (recommended for production)
- Mailgun
- Amazon SES
- Office 365

### 8. Troubleshooting

If emails aren't sending:
1. Check WordPress debug log for errors
2. Verify SMTP credentials are correct
3. Ensure your hosting allows SMTP connections
4. Try using a different SMTP service
5. Check spam folder for test emails

### 9. Database Access

View submissions in WordPress admin:
- Go to WordPress Dashboard
- Click "Contact Forms" in the menu
- View and manage all submissions

### 10. Important Notes

- Never expose email credentials in frontend code
- Keep wp-config.php out of version control
- Use HTTPS for all form submissions
- Regularly monitor the submissions log
- Consider implementing CAPTCHA for additional security