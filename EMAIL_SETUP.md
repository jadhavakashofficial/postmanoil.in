# Email Setup Instructions for Postman Oils

## WordPress Backend Setup

1. **Add Email Handler to WordPress**
   - Copy the contents of `blog/wp-postman-email-handler.php`
   - Add it to your WordPress theme's `functions.php` file
   - Or create a custom plugin with this code

2. **Email Configuration**
   - From Email: `classictechak@gmail.com`
   - To Email: `jadhavakashofficial@gmail.com`
   - SMTP Password: `xjjn awqp rabp ylhm`

## How It Works

1. Contact forms submit to WordPress AJAX endpoint: `/wp-admin/admin-ajax.php`
2. WordPress processes the form and sends email via Gmail SMTP
3. Uses WordPress nonce for security
4. Sends HTML formatted emails

## Testing

1. Fill out the contact form on your website
2. Check if email is received at `jadhavakashofficial@gmail.com`
3. If not working, check:
   - WordPress AJAX is accessible
   - Gmail app password is correct
   - Less secure apps or 2FA with app passwords enabled

## Security Notes

- Never expose email credentials in frontend code
- Always use WordPress nonce for form security
- Sanitize all user inputs before sending emails