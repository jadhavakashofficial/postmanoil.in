// utils/structuredData.js

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Postman Oils",
  "alternateName": "Postman Oil",
  "url": "https://postmanoil.com",
  "logo": "https://postmanoil.com/images/postman-logo.png",
  "foundingDate": "1967",
  "description": "Premium cooking oil manufacturer since 1967, specializing in cold-pressed mustard oil, groundnut oil, and refined oils",
  "slogan": "The Legacy of Purity",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H-1, 87-94, RIICO Industrial Area, Jaipur Road",
    "addressLocality": "Kekri",
    "addressRegion": "Rajasthan",
    "postalCode": "305404",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.4726",
    "longitude": "75.1505"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9928021482",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.amazon.in/stores/PostmanOils",
    "https://www.flipkart.com/seller/postman-oils",
    "https://www.jiomart.com/seller/postman-oils"
  ]
});

export const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "image": product.images || [],
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "Postman Oils"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Postman Oils"
  },
  "category": product.category || "Cooking Oil",
  "sku": product.sku,
  "gtin13": product.gtin13,
  "mpn": product.mpn,
  "offers": {
    "@type": "AggregateOffer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "INR",
    "lowPrice": product.lowPrice,
    "highPrice": product.highPrice,
    "offerCount": product.offerCount || 3,
    "seller": [
      {
        "@type": "Organization",
        "name": "Amazon India",
        "url": product.amazonUrl
      },
      {
        "@type": "Organization",
        "name": "Flipkart",
        "url": product.flipkartUrl
      },
      {
        "@type": "Organization",
        "name": "JioMart",
        "url": product.jioMartUrl
      }
    ]
  },
  "aggregateRating": product.rating ? {
    "@type": "AggregateRating",
    "ratingValue": product.rating.value,
    "reviewCount": product.rating.count
  } : undefined,
  "nutrition": product.nutrition,
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Oil Type",
      "value": product.oilType
    },
    {
      "@type": "PropertyValue",
      "name": "Processing Method",
      "value": product.processingMethod || "Cold Pressed"
    },
    {
      "@type": "PropertyValue",
      "name": "Since",
      "value": "1967"
    }
  ]
});

export const generateRecipeSchema = (recipe) => ({
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": recipe.name,
  "image": recipe.images || [],
  "author": {
    "@type": "Organization",
    "name": "Postman Oils"
  },
  "datePublished": recipe.datePublished || new Date().toISOString(),
  "description": recipe.description,
  "prepTime": recipe.prepTime,
  "cookTime": recipe.cookTime,
  "totalTime": recipe.totalTime,
  "keywords": recipe.keywords,
  "recipeYield": recipe.yield,
  "recipeCategory": recipe.category,
  "recipeCuisine": recipe.cuisine || "Indian",
  "recipeIngredient": recipe.ingredients,
  "recipeInstructions": recipe.instructions.map((instruction, index) => ({
    "@type": "HowToStep",
    "name": `Step ${index + 1}`,
    "text": instruction,
    "url": `${recipe.url}#step${index + 1}`
  })),
  "nutrition": recipe.nutrition,
  "video": recipe.videoUrl ? {
    "@type": "VideoObject",
    "name": recipe.name,
    "description": recipe.description,
    "thumbnailUrl": recipe.videoThumbnail,
    "contentUrl": recipe.videoUrl,
    "uploadDate": recipe.videoUploadDate
  } : undefined
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Postman Oils Manufacturing Plant",
  "image": "https://postmanoil.com/images/factory.jpg",
  "url": "https://postmanoil.com",
  "telephone": "+91-9928021482",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "H-1, 87-94, RIICO Industrial Area, Jaipur Road",
    "addressLocality": "Kekri",
    "addressRegion": "Rajasthan",
    "postalCode": "305404",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.4726",
    "longitude": "75.1505"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "₹₹",
  "servesCuisine": "Indian",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateWebPageSchema = (page) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": page.title,
  "description": page.description,
  "url": page.url,
  "breadcrumb": page.breadcrumb,
  "mainEntity": page.mainEntity,
  "datePublished": page.datePublished || "2025-01-01",
  "dateModified": new Date().toISOString(),
  "inLanguage": "en-IN",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Postman Oils",
    "url": "https://postmanoil.com"
  }
});