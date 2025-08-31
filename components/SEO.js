// components/SEO.js
import Head from 'next/head';

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image = '/images/postman-oil-logo.png',
  url = 'https://postmanoil.com',
  type = 'website',
  schemaData = null,
  additionalSchemas = [],
  author = 'Postman Oils',
  publishedDate,
  modifiedDate,
  noindex = false,
  breadcrumb = null
}) {
  const fullTitle = title ? `${title} | Postman Oils - Premium Cooking Oil Since 1967` : 'Postman Oils - Premium Cooking Oil Since 1967';
  const defaultDescription = 'Premium cold-pressed mustard oil, groundnut oil & refined cooking oil manufacturer since 1967. Buy authentic Postman Oil online - Available on Amazon, Flipkart & JioMart.';
  const finalDescription = description || defaultDescription;
  
  // Ensure absolute URL for images
  const absoluteImage = image.startsWith('http') ? image : `https://postmanoil.com${image}`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'Postman Oils Premium Cooking Oil'} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Postman Oils" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title || 'Postman Oils Premium Cooking Oil'} />
      <meta name="twitter:site" content="@PostmanOils" />
      <meta name="twitter:creator" content="@PostmanOils" />
      
      {/* Advanced SEO Optimizations */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="bingbot" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#f97316" />
      <meta name="revisit-after" content="1 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="copyright" content="Postman Oils (Mittal Oils) - All Rights Reserved" />
      
      {/* Mobile App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Postman Oils" />
      
      {/* Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta name="referrer" content="origin-when-cross-origin" />
      
      {/* Search Engine Verification */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="yandex-verification" content="your-yandex-verification-code" />
      
      {/* Dates */}
      {publishedDate && <meta property="article:published_time" content={publishedDate} />}
      {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
      
      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Kekri" />
      <meta name="geo.position" content="25.4726;75.1505" />
      <meta name="ICBM" content="25.4726, 75.1505" />
      
      {/* Enhanced Performance Optimizations */}
      <link rel="preconnect" href="https://postmanoil.com" />
      <link rel="dns-prefetch" href="https://postmanoil.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Resource hints for faster page loads */}
      <link rel="prefetch" href="/api/products" />
      <link rel="prerender" href="/" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="en-IN" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#FFA500" />
      
      {/* Schema.org structured data */}
      {schemaData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      
      {/* Additional schemas */}
      {additionalSchemas.map((schema, index) => (
        <script 
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Breadcrumb schema */}
      {breadcrumb && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      )}
    </Head>
  );
}