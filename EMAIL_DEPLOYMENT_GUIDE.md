# Email Setup Deployment Guide for Postman Oil

## Overview
This guide explains how to deploy the email functionality for your Postman Oil website using Gmail SMTP through a secure PHP handler.

## Files Created

1. **`/blog/wp-postman-email-handler.php`** - Server-side email handler (PHP)
2. **`/blog/test-email.php`** - Email testing script (DELETE after testing)
3. **`/utils/serverEmailService.js`** - Client-side email service
4. **Updated files:**
   - `/components/ContactForms.js`
   - `/pages/connect-for-dealership.js`

## Deployment Steps

### 1. Build Your Next.js Application
```bash
npm run build
```

### 2. Upload Files to Server

Upload the following files to your server:

#### To root directory (where your Next.js build goes):
- All files from `/out/` directory (your Next.js build)
- The updated JavaScript files will be included in the build

#### To `/blog/` directory (your WordPress installation):
- `wp-postman-email-handler.php` (the email handler)
- `test-email.php` (for testing only)

### 3. Set File Permissions

Via FTP or hosting panel, set permissions:
```
wp-postman-email-handler.php: 644 or 755
test-email.php: 644 or 755
```

### 4. Test the Email System

1. Access `https://postmanoil.com/blog/test-email.php`
2. Click "Send Test Email" button
3. Check if email arrives at `jadhavakashofficial@gmail.com`
4. **DELETE `test-email.php` after successful testing**

### 5. Verify Contact Forms

Test both contact forms on the live site:
- Main contact form
- Dealership application form

## How It Works

1. User fills out contact form on your Next.js site
2. Form data is sent to `/blog/wp-postman-email-handler.php`
3. PHP handler uses Gmail SMTP to send email
4. Email arrives at `jadhavakashofficial@gmail.com`
5. User sees success/error message

## Email Configuration Details

- **From:** classictechak@gmail.com (Postman Oils)
- **To:** jadhavakashofficial@gmail.com
- **SMTP:** smtp.gmail.com:587 (TLS)
- **App Password:** Already configured in PHP file

## Security Features

- No credentials exposed in client-side code
- CORS protection (only allows requests from postmanoil.com)
- Input validation and sanitization
- HTML encoding to prevent XSS attacks
- Only POST requests accepted

## Troubleshooting

### Email not sending?

1. **Check server logs** for PHP errors
2. **Verify Gmail settings:**
   - App password is correct
   - 2-factor authentication is enabled on Gmail
   - App password hasn't expired

3. **Server requirements:**
   - PHP mail() function enabled
   - Outbound SMTP connections allowed on port 587
   - PHP version 5.6 or higher

### Getting CORS errors?

Update line 9 in `wp-postman-email-handler.php`:
```php
header('Access-Control-Allow-Origin: https://your-actual-domain.com');
```

### Form showing network error?

Check if `/blog/wp-postman-email-handler.php` is accessible:
```
https://postmanoil.com/blog/wp-postman-email-handler.php
```
Should return: "Method not allowed" (405 error) - this is correct!

## Maintenance

- Regularly check if emails are being received
- Monitor for spam folder issues
- Update app password if it expires
- Keep PHP handler file secure (don't share credentials)

## Important Notes

1. **Never commit credentials to Git**
2. **Delete test-email.php after testing**
3. **Keep wp-postman-email-handler.php secure**
4. **Monitor email delivery rates**
5. **Have a backup email method ready**

## Alternative Hostinger Setup

If you have access to Hostinger's email service:
1. Create an email account in hPanel
2. Update SMTP settings in `wp-postman-email-handler.php`
3. Use Hostinger's SMTP server instead of Gmail

## Support

For issues:
1. Check server error logs
2. Test with `test-email.php`
3. Verify all files are uploaded correctly
4. Ensure proper file permissions