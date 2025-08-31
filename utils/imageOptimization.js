// Image optimization utility for reducing image quality to 70%
export const getOptimizedImageUrl = (url) => {
  // If it's already an optimized URL or local image, return as is
  if (!url || url.startsWith('/') || url.includes('localhost')) {
    return url;
  }
  
  // For WordPress uploads, we can add quality parameters
  if (url.includes('postmanoil.com/blog/wp-content/uploads/')) {
    // WordPress doesn't support direct quality params in URL
    // You'll need to configure this on the WordPress side
    // or use a CDN service like Cloudinary
    return url;
  }
  
  // For external images that support quality params
  if (url.includes('vecteezy.com')) {
    // These are already optimized PNGs
    return url;
  }
  
  return url;
};

// Get responsive image sizes for better performance
export const getResponsiveImageSizes = () => {
  return {
    small: 640,
    medium: 768,
    large: 1024,
    xlarge: 1280
  };
};

// Generate srcSet for responsive images
export const generateSrcSet = (url) => {
  const sizes = getResponsiveImageSizes();
  
  // For now return the original URL
  // In production, you'd want to use an image CDN that can resize
  return url;
};

// Image loading optimization attributes
export const getImageLoadingAttributes = (priority = false) => {
  return {
    loading: priority ? 'eager' : 'lazy',
    decoding: 'async',
    fetchpriority: priority ? 'high' : 'auto'
  };
};