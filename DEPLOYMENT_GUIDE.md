# Postman Oils - Deployment Guide

## 🚀 Deployment Instructions

### Build Status: ✅ Successfully Built

The production build is ready in the `out/` directory.

## 📁 What to Upload

### 1. **For the Main Website**
Upload the entire contents of the `out/` directory to your web server's public_html folder:

```
out/
├── _next/           # JavaScript, CSS and other assets
├── images/          # All image assets
├── product/         # Product detail pages
├── recipes/         # Recipe detail pages
├── *.html           # All static HTML pages
├── robots.txt       # SEO robots file
├── sitemap.xml      # SEO sitemap
├── favicon.ico      # Favicon
└── site.webmanifest # PWA manifest
```

### 2. **For the WordPress Blog (Email Handler)**
Upload this file to your WordPress blog directory:

```
blog/postman-contact-handler.php → /public_html/blog/
```

## 📝 Step-by-Step Deployment

### Step 1: Prepare Files
1. The build is already created in the `out/` directory
2. The PHP email handler is in `blog/postman-contact-handler.php`

### Step 2: Upload Main Website
1. Connect to your hosting via FTP/cPanel
2. Navigate to `/public_html/`
3. Delete old website files (backup first!)
4. Upload entire contents of `out/` directory to `/public_html/`
5. Make sure `.htaccess` file exists for proper routing

### Step 3: Upload Email Handler
1. Navigate to `/public_html/blog/` (your WordPress directory)
2. Upload `postman-contact-handler.php`
3. Verify file permissions are 644

### Step 4: Verify Deployment
1. Visit https://postmanoil.com to check the website
2. Test contact form functionality
3. Check https://postmanoil.com/sitemap.xml
4. Verify https://postmanoil.com/robots.txt

## 🔧 Important Configuration

### .htaccess File (Required for proper routing)
Create/update `.htaccess` in your public_html:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # Redirect to HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
  
  # Redirect www to non-www
  RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
  RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
  
  # Handle Next.js routing
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^([^/]+)/?$ $1.html [L]
  
  # Handle product pages
  RewriteRule ^product/([0-9]+)/?$ product/$1.html [L]
  
  # Handle recipe pages  
  RewriteRule ^recipes/([^/]+)/?$ recipes/$1.html [L]
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/x-javascript "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-shockwave-flash "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresDefault "access plus 2 days"
</IfModule>
```

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly at https://postmanoil.com
- [ ] All pages are accessible
- [ ] Images are loading properly
- [ ] Contact forms are working
- [ ] Email notifications are being received
- [ ] Mobile responsiveness is working
- [ ] SEO meta tags are present (check page source)
- [ ] Sitemap is accessible
- [ ] Google Search Console is updated with new sitemap

## 🔍 SEO Verification

After deployment, verify SEO implementation:

1. **Google Search Console**
   - Submit new sitemap: https://postmanoil.com/sitemap.xml
   - Request indexing for updated pages

2. **Check Meta Tags**
   - View page source and verify meta tags contain target keywords
   - Ensure all images have proper alt text

3. **Test Structured Data**
   - Use Google's Rich Results Test
   - Verify Schema.org markup is valid

## 📧 Email Testing

Test the contact form:
1. Fill out the form on any page
2. Verify you receive email at `marketingpostmanoil@gmail.com`
3. Check that user receives confirmation email

## 🆘 Troubleshooting

### If pages show 404:
- Check .htaccess file is properly configured
- Ensure all files from `out/` directory are uploaded

### If contact form doesn't work:
- Verify `postman-contact-handler.php` is in `/blog/` directory
- Check PHP mail() is enabled on your server
- Verify CORS headers are working

### If images don't load:
- Check image paths in browser console
- Ensure all files from `out/images/` are uploaded

## 📱 Support

For any deployment issues, check:
- Browser console for JavaScript errors
- Network tab for failed requests
- Server error logs for PHP issues

---

**Build Date:** August 3, 2025
**Build Status:** Production Ready ✅