# .htaccess Files for Postman Oils Deployment

This directory contains the two .htaccess files needed for your Next.js + WordPress setup.

## Files:

### 1. `.htaccess-root`
**Upload to:** `/public_html/.htaccess`

This is the main .htaccess file for your root directory. It handles:
- HTTPS redirects
- www to non-www redirects
- Next.js static site routing
- WordPress blog subfolder routing
- PHP email handler access
- CORS headers for email functionality
- Security headers
- Compression and caching
- File protection

### 2. `.htaccess-blog`
**Upload to:** `/public_html/blog/.htaccess`

This is the .htaccess file for your WordPress blog directory. It handles:
- Standard WordPress routing
- Email handler CORS support
- WordPress-specific security
- API access for wp-json
- PHP configuration for email sending

## Deployment Instructions:

1. **Root Directory:**
   ```
   Copy .htaccess-root → /public_html/.htaccess
   ```

2. **Blog Directory:**
   ```
   Copy .htaccess-blog → /public_html/blog/.htaccess
   ```

3. **Email Handler:**
   ```
   Upload postman-contact-handler.php → /public_html/blog/
   ```

## Key Features:

✅ **Email Functionality:** Both files are configured to support your PHP email handler  
✅ **CORS Support:** Allows cross-origin requests from your Next.js site to WordPress  
✅ **SEO Optimization:** Proper redirects and clean URLs  
✅ **Security:** Headers and file protection  
✅ **Performance:** Compression and caching rules  
✅ **WordPress Compatibility:** Full WordPress functionality preserved  

## Testing After Upload:

1. Test website: https://postmanoil.com
2. Test blog: https://postmanoil.com/blog
3. Test contact form functionality
4. Verify email handler: https://postmanoil.com/blog/postman-contact-handler.php

## Notes:

- The email handler will work without app passwords
- CORS is configured to allow your contact forms to work
- All WordPress functionality is preserved
- Next.js static routing is properly handled
- Security and performance optimizations are included