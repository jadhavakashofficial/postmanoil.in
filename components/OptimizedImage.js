import { useState, useEffect } from 'react';
import Image from 'next/image';

const OptimizedImage = ({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 90,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    const widths = [320, 640, 768, 1024, 1280, 1536, 1920];
    const devicePixelRatios = [1, 2, 3];
    
    return widths
      .flatMap(w => 
        devicePixelRatios.map(dpr => 
          `${src}?w=${w * dpr}&q=${quality} ${w * dpr}w`
        )
      )
      .join(', ');
  };

  // Intersection Observer for lazy loading with performance
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Preload slightly before entering viewport
        threshold: 0.01
      }
    );

    const element = document.querySelector(`[data-image-id="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [src, priority]);

  // Generate blur placeholder if not provided
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Generate a simple gradient blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 10, 10);
    gradient.addColorStop(0, '#FF6B35');
    gradient.addColorStop(1, '#F7931E');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 10, 10);
    
    return canvas.toDataURL();
  };

  const handleLoad = (result) => {
    setIsLoaded(true);
    if (onLoad) onLoad(result);
  };

  // SEO-friendly image attributes
  const imageProps = {
    src,
    alt: alt || 'Postman Oils Product Image',
    title: title || alt,
    width: width || 800,
    height: height || 600,
    quality,
    priority,
    loading: priority ? 'eager' : 'lazy',
    sizes,
    className: `
      ${className}
      ${isLoaded ? 'opacity-100' : 'opacity-0'}
      transition-opacity duration-500 ease-in-out
      transform-gpu
    `,
    onLoadingComplete: handleLoad,
    placeholder: placeholder,
    blurDataURL: placeholder === 'blur' ? getBlurDataURL() : undefined,
    ...props
  };

  // Structured data for images
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": src,
    "name": alt,
    "description": title || alt,
    "width": width,
    "height": height,
    "encodingFormat": "image/webp"
  };

  return (
    <div 
      className="relative overflow-hidden"
      data-image-id={src}
    >
      {/* Preload link for critical images */}
      {priority && (
        <link
          rel="preload"
          as="image"
          href={src}
          imageSrcSet={generateSrcSet()}
          imageSizes={sizes}
        />
      )}

      {/* SEO metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Optimized Next.js Image */}
      {isInView && (
        <Image
          {...imageProps}
          style={{
            maxWidth: '100%',
            height: 'auto',
            ...props.style
          }}
        />
      )}

      {/* Native img fallback for better SEO */}
      <noscript>
        <img
          src={src}
          alt={alt}
          title={title}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </noscript>
    </div>
  );
};

// Helper function to generate responsive image data
export const generateImageData = (baseUrl, alt, sizes = {}) => {
  const defaultSizes = {
    mobile: 640,
    tablet: 1024,
    desktop: 1920
  };

  const imageSizes = { ...defaultSizes, ...sizes };

  return {
    src: baseUrl,
    srcSet: Object.entries(imageSizes)
      .map(([key, width]) => `${baseUrl}?w=${width} ${width}w`)
      .join(', '),
    sizes: `(max-width: 640px) ${imageSizes.mobile}px, (max-width: 1024px) ${imageSizes.tablet}px, ${imageSizes.desktop}px`,
    alt,
    loading: 'lazy',
    decoding: 'async'
  };
};

export default OptimizedImage;