// components/SEOImage.js
import Image from 'next/image';

const SEOImage = ({ 
  src, 
  alt, 
  title,
  width = 800,
  height = 800,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 90,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onClick,
  style = {}
}) => {
  // Ensure src is absolute or relative to public folder
  const imageSrc = src.startsWith('http') ? src : src.startsWith('/') ? src : `/${src}`;
  
  // Generate blur placeholder if not provided
  const blurPlaceholder = blurDataURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  
  return (
    <div className={`relative ${className}`} style={style}>
      <Image
        src={imageSrc}
        alt={alt}
        title={title || alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? blurPlaceholder : undefined}
        onLoad={onLoad}
        onClick={onClick}
        className="object-cover"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {/* Hidden schema markup for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": `https://postmanoil.com${imageSrc}`,
            "contentUrl": `https://postmanoil.com${imageSrc}`,
            "name": title || alt,
            "description": alt,
            "width": width,
            "height": height,
            "encodingFormat": "image/jpeg",
            "uploadDate": new Date().toISOString()
          })
        }}
      />
    </div>
  );
};

export default SEOImage;