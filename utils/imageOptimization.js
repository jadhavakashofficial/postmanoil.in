// utils/imageOptimization.js

// SEO-friendly image configuration
export const imageConfig = {
  formats: ['webp', 'jpg', 'png'],
  sizes: {
    thumbnail: { width: 150, height: 150 },
    small: { width: 300, height: 300 },
    medium: { width: 600, height: 600 },
    large: { width: 1200, height: 1200 },
    og: { width: 1200, height: 630 }, // Open Graph
    twitter: { width: 1200, height: 675 } // Twitter Card
  }
};

// Generate SEO-friendly filename
export const generateSEOFilename = (productName, variant = '') => {
  const base = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  return variant ? `${base}-${variant}` : base;
};

// Generate image alt text
export const generateAltText = (productName, context = '') => {
  const baseAlt = `Postman ${productName}`;
  return context ? `${baseAlt} - ${context}` : baseAlt;
};

// Product images with SEO optimization
export const productImages = {
  'mustard-oil-1l': {
    src: '/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg',
    alt: 'Postman Mustard Oil Kachi Ghani 1 Litre Bottle',
    title: 'Buy Postman Mustard Oil 1L - Pure Kachi Ghani Sarson Tel',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg",
      "caption": "Postman Mustard Oil 1 Litre - Cold Pressed Kachi Ghani",
      "width": "800",
      "height": "800"
    }
  },
  'mustard-oil-5l': {
    src: '/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg',
    alt: 'Postman Mustard Oil Kachi Ghani 5 Litre Jar',
    title: 'Buy Postman Mustard Oil 5L - Pure Kachi Ghani Sarson Tel',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg",
      "caption": "Postman Mustard Oil 5 Litre - Cold Pressed Kachi Ghani",
      "width": "800",
      "height": "800"
    }
  },
  'groundnut-oil-1l': {
    src: '/images/products/postman-groundnut-oil-cold-pressed-1-litre.jpg',
    alt: 'Postman Groundnut Oil Cold Pressed 1 Litre Bottle',
    title: 'Buy Postman Groundnut Oil 1L - Pure Moongfali Tel',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-groundnut-oil-cold-pressed-1-litre.jpg",
      "caption": "Postman Groundnut Oil 1 Litre - Cold Pressed Peanut Oil",
      "width": "800",
      "height": "800"
    }
  },
  'groundnut-oil-5l': {
    src: '/images/products/postman-groundnut-oil-cold-pressed-5-litre.jpg',
    alt: 'Postman Groundnut Oil Cold Pressed 5 Litre Jar',
    title: 'Buy Postman Groundnut Oil 5L - Pure Moongfali Tel',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-groundnut-oil-cold-pressed-5-litre.jpg",
      "caption": "Postman Groundnut Oil 5 Litre - Cold Pressed Peanut Oil",
      "width": "800",
      "height": "800"
    }
  },
  'refined-oil-1l': {
    src: '/images/products/postman-refined-groundnut-oil-1-litre.jpg',
    alt: 'Postman Refined Groundnut Oil 1 Litre Bottle',
    title: 'Buy Postman Refined Groundnut Oil 1L - Premium Cooking Oil',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-refined-groundnut-oil-1-litre.jpg",
      "caption": "Postman Refined Groundnut Oil 1 Litre - Premium Quality",
      "width": "800",
      "height": "800"
    }
  },
  'refined-oil-5l': {
    src: '/images/products/postman-refined-groundnut-oil-5-litre.jpg',
    alt: 'Postman Refined Groundnut Oil 5 Litre Jar',
    title: 'Buy Postman Refined Groundnut Oil 5L - Premium Cooking Oil',
    schema: {
      "@type": "ImageObject",
      "url": "https://postmanoil.com/images/products/postman-refined-groundnut-oil-5-litre.jpg",
      "caption": "Postman Refined Groundnut Oil 5 Litre - Premium Quality",
      "width": "800",
      "height": "800"
    }
  }
};

// Factory and process images
export const factoryImages = {
  'oil-mill': {
    src: '/images/factory/postman-oil-mill-kekri-rajasthan.jpg',
    alt: 'Postman Oil Manufacturing Plant in Kekri Rajasthan',
    title: 'Postman Oils Factory - RIICO Industrial Area Kekri'
  },
  'cold-press-process': {
    src: '/images/factory/cold-pressed-kachi-ghani-process.jpg',
    alt: 'Traditional Kachi Ghani Cold Press Process at Postman Oils',
    title: 'Cold Pressed Oil Manufacturing Process'
  },
  'quality-testing': {
    src: '/images/factory/oil-quality-testing-laboratory.jpg',
    alt: 'Quality Testing Laboratory at Postman Oils Factory',
    title: 'ISO Certified Quality Testing Process'
  },
  'packaging': {
    src: '/images/factory/automated-oil-packaging-line.jpg',
    alt: 'Automated Oil Packaging Line at Postman Oils',
    title: 'Modern Packaging Facility'
  }
};

// Logo variations
export const logoImages = {
  main: {
    src: '/images/postman-oil-logo.png',
    alt: 'Postman Oils Logo - Premium Cooking Oil Since 1967',
    title: 'Postman Oils'
  },
  white: {
    src: '/images/postman-oil-logo-white.png',
    alt: 'Postman Oils Logo',
    title: 'Postman Oils'
  },
  icon: {
    src: '/images/postman-oil-icon.png',
    alt: 'Postman Oils Icon',
    title: 'Postman Oils'
  }
};

// Generate srcset for responsive images
export const generateSrcSet = (baseUrl, sizes = imageConfig.sizes) => {
  return Object.entries(sizes)
    .map(([_, config]) => `${baseUrl}?w=${config.width} ${config.width}w`)
    .join(', ');
};

// Image component props generator
export const getImageProps = (imageKey, category = 'products') => {
  const images = {
    products: productImages,
    factory: factoryImages,
    logo: logoImages
  };
  
  const image = images[category]?.[imageKey];
  if (!image) return null;
  
  return {
    src: image.src,
    alt: image.alt,
    title: image.title,
    loading: 'lazy',
    decoding: 'async',
    ...image.schema && { itemProp: 'image' }
  };
};