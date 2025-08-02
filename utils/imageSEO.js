// utils/imageSEO.js

// Generate optimized image attributes for SEO
export const getImageSEO = (imageName, productName = '') => {
  const baseKeywords = ['postman oils', 'postman oil', 'postmanoils', 'mittal oils', 'edible oils', 'cooking oil'];
  
  const imageTypes = {
    'mustard-oil': {
      alt: `Postman Oils Kacchi Ghani Mustard Oil ${productName} - Premium Cold Pressed Sarson Ka Tel`,
      title: `Buy Postman Oil Mustard Oil ${productName} Online - Postmanoils Traditional Wood Pressed`,
      keywords: ['kacchi ghani', 'mustard oil', 'sarson ka tel', 'cold pressed oil']
    },
    'groundnut-oil': {
      alt: `Postman Oils Groundnut Oil ${productName} - Premium Filtered Peanut Oil by Mittal Oils`,
      title: `Postman Oil Groundnut Oil ${productName} - Postmanoils Pure Filtered Cooking Oil`,
      keywords: ['groundnut oil', 'peanut oil', 'filtered oil', 'mungfali tel']
    },
    'refined-oil': {
      alt: `Postman Oils Refined Groundnut Oil ${productName} - Premium Refined Cooking Oil`,
      title: `Postman Oil Refined Oil ${productName} - Postmanoils High Quality Edible Oil`,
      keywords: ['refined oil', 'refined groundnut oil', 'cooking oil', 'refined peanut oil']
    },
    'process': {
      alt: `Postman Oils Manufacturing Process - Traditional Oil Making by Mittal Oils Since 1967`,
      title: `How Postman Oil is Made - Postmanoils Premium Quality Oil Production`,
      keywords: ['oil manufacturing', 'traditional process', 'wood pressed', 'cold pressed']
    },
    'logo': {
      alt: `Postman Oils Logo - Premium Cooking Oil Brand by Mittal Oils Pvt Ltd`,
      title: `Postman Oil Official Logo - Postmanoils Trusted Since 1967`,
      keywords: ['postman oils logo', 'brand logo', 'mittal oils logo']
    },
    'certification': {
      alt: `Postman Oils ${productName} Certification - Quality Assured Edible Oil`,
      title: `Postman Oil ${productName} Certificate - Postmanoils Certified Quality`,
      keywords: ['certification', 'quality certificate', 'fssai', 'iso certified']
    },
    'recipe': {
      alt: `Cooking Recipe with Postman Oils - Delicious Dishes using Postman Oil`,
      title: `Recipe using Postman Oil - Postmanoils Cooking Ideas`,
      keywords: ['cooking recipe', 'postman oil recipe', 'indian cooking']
    },
    'default': {
      alt: `Postman Oils ${productName} - Premium Edible Cooking Oil by Mittal Oils`,
      title: `Postman Oil ${productName} - Postmanoils Quality Cooking Oil`,
      keywords: ['cooking oil', 'edible oil', 'premium oil']
    }
  };

  // Determine image type from name
  let imageType = 'default';
  if (imageName.toLowerCase().includes('mustard') || imageName.toLowerCase().includes('kacchi')) {
    imageType = 'mustard-oil';
  } else if (imageName.toLowerCase().includes('groundnut') || imageName.toLowerCase().includes('peanut')) {
    imageType = imageName.toLowerCase().includes('refined') ? 'refined-oil' : 'groundnut-oil';
  } else if (imageName.toLowerCase().includes('refined')) {
    imageType = 'refined-oil';
  } else if (imageName.toLowerCase().includes('process') || imageName.toLowerCase().includes('manufacturing')) {
    imageType = 'process';
  } else if (imageName.toLowerCase().includes('logo')) {
    imageType = 'logo';
  } else if (imageName.toLowerCase().includes('certif')) {
    imageType = 'certification';
  } else if (imageName.toLowerCase().includes('recipe')) {
    imageType = 'recipe';
  }

  const seoData = imageTypes[imageType];
  
  return {
    alt: seoData.alt,
    title: seoData.title,
    loading: 'lazy',
    decoding: 'async',
    'data-keywords': [...baseKeywords, ...seoData.keywords].join(', ')
  };
};

// Generate image structured data for Google Images
export const generateImageSchema = (imageUrl, imageName, productName = '', width = 1200, height = 800) => {
  const seoData = getImageSEO(imageName, productName);
  
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": imageUrl,
    "license": "https://postmanoil.com/terms-and-conditions",
    "acquireLicensePage": "https://postmanoil.com/contact-us",
    "creditText": "Postman Oils - Mittal Oil Mills Pvt Ltd",
    "creator": {
      "@type": "Organization",
      "name": "Postman Oils (Mittal Oil Mills Pvt Ltd)",
      "url": "https://postmanoil.com"
    },
    "copyrightNotice": "© 2024 Postman Oils. All rights reserved.",
    "name": seoData.title,
    "caption": seoData.alt,
    "description": `${seoData.alt}. Premium quality cooking oil from Postman Oils, trusted since 1967. Available online.`,
    "width": {
      "@type": "QuantitativeValue",
      "value": width,
      "unitCode": "E37"
    },
    "height": {
      "@type": "QuantitativeValue", 
      "value": height,
      "unitCode": "E37"
    },
    "representativeOfPage": true,
    "keywords": seoData['data-keywords']
  };
};

// Generate Product Image Gallery Schema
export const generateProductGallerySchema = (product) => {
  const images = product.images || [];
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://postmanoil.com/product/${product.id}`,
    "name": `${product.name} - Postman Oils`,
    "image": images.map((img, index) => ({
      "@type": "ImageObject",
      "url": img.src,
      "name": `${product.name} - View ${index + 1} - Postman Oil`,
      "caption": `Postman Oils ${product.name} Product Image ${index + 1} - Premium Cooking Oil`,
      "creditText": "Postman Oils",
      "creator": {
        "@type": "Organization",
        "name": "Postman Oils"
      }
    })),
    "brand": {
      "@type": "Brand",
      "name": "Postman Oils",
      "logo": "https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Mittal Oil Mills Pvt Ltd",
      "brand": "Postman Oils",
      "url": "https://postmanoil.com"
    }
  };
};

// SEO-friendly image component wrapper
export const SEOImage = ({ src, alt, title, className, width, height, priority = false, productName = '' }) => {
  const imageName = src.split('/').pop().split('.')[0];
  const seoAttrs = getImageSEO(imageName, productName);
  
  return {
    src,
    alt: alt || seoAttrs.alt,
    title: title || seoAttrs.title,
    className,
    width,
    height,
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    itemProp: 'image',
    'data-keywords': seoAttrs['data-keywords']
  };
};