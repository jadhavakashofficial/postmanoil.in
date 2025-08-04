// pages/mustard-oil.js
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import Link from 'next/link';
import BuyNowButtons from '../components/BuyNowButtons';
import { generateProductSchema, generateWebPageSchema, generateBreadcrumbSchema, generateFAQSchema } from '../utils/structuredData';
import { getImageSEO, generateImageSchema, generateProductGallerySchema } from '../utils/imageSEO';

export default function MustardOilPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const productsPerPage = 8;

  // WooCommerce API credentials
  const WC_BASE_URL = 'https://postmanoil.com/blog';
  const CONSUMER_KEY = 'ck_32dc33cd096651ea8476fe46f8435cea7ad9d713';
  const CONSUMER_SECRET = 'cs_54ddbb8dd5606fa41bbe040d091731fee0abbfdc';

  // Benefits images for slider
  const benefitImages = [
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/brand-colours-32.jpeg',
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/brand-colours-26.jpeg',
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/brand-colours-30.jpeg',
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/Untitled-13-1.png',
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/Untitled-15-1.png'
  ];

  useEffect(() => {
    fetchMustardOilProducts();
  }, []);

  // Auto-play for sliders
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefitImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, benefitImages.length]);

  const fetchMustardOilProducts = async () => {
    try {
      const response = await fetch(
        `${WC_BASE_URL}/wp-json/wc/v3/products?per_page=100&status=publish&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
      );
      
      const allProducts = await response.json();
      
      // Filter for mustard oil products with external buy buttons
      const mustardProducts = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const categories = product.categories.map(cat => cat.name.toLowerCase());
        const hasMustard = name.includes('mustard') || 
                          name.includes('kacchi ghani') ||
                          name.includes('sarso') ||
                          categories.some(cat => cat.includes('mustard'));
        
        const hasBuyButtons = extractBuyButtons(product).length > 0;
        
        return hasMustard && hasBuyButtons;
      });

      // Sort products by size priority
      const sortedProducts = sortProductsBySize(mustardProducts);
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProductsBySize = (products) => {
    // Define size mappings with priority order
    const sizeMap = {
      '200ml': 1, '200 ml': 1, '200ML': 1, '200 ML': 1,
      '500ml': 2, '500 ml': 2, '500ML': 2, '500 ML': 2,
      '1l': 3, '1 l': 3, '1ltr': 3, '1 ltr': 3, '1 litre': 3, '1litre': 3, '1 liter': 3, '1L': 3, '1 L': 3,
      '2l': 4, '2 l': 4, '2ltr': 4, '2 ltr': 4, '2 litre': 4, '2litre': 4, '2 liter': 4, '2L': 4, '2 L': 4,
      '5l': 5, '5 l': 5, '5ltr': 5, '5 ltr': 5, '5 litre': 5, '5litre': 5, '5 liter': 5, '5L': 5, '5 L': 5,
      '15l': 6, '15 l': 6, '15ltr': 6, '15 ltr': 6, '15 litre': 6, '15litre': 6, '15 liter': 6, '15L': 6, '15 L': 6
    };
    
    return products.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Extract size from product name using regex to avoid substring issues
      let aSize = 999; // Default high value for products without size
      let bSize = 999;
      
      // Check for exact size matches to avoid "15l" matching when looking for "5l"
      for (const [sizeKey, priority] of Object.entries(sizeMap)) {
        const sizeLower = sizeKey.toLowerCase();
        // Use word boundary or space to ensure exact match
        const regex = new RegExp(`\\b${sizeLower}\\b|\\s${sizeLower}\\s|\\s${sizeLower}$`, 'i');
        if (regex.test(aName)) {
          aSize = priority;
          break;
        }
      }
      
      for (const [sizeKey, priority] of Object.entries(sizeMap)) {
        const sizeLower = sizeKey.toLowerCase();
        const regex = new RegExp(`\\b${sizeLower}\\b|\\s${sizeLower}\\s|\\s${sizeLower}$`, 'i');
        if (regex.test(bName)) {
          bSize = priority;
          break;
        }
      }
      
      // Sort by size priority
      if (aSize !== bSize) {
        return aSize - bSize;
      }
      
      // If same size or both without size, sort by date
      return new Date(a.date_created) - new Date(b.date_created);
    });
  };

  const extractBuyButtons = (product) => {
    const buttons = [];

    // Check external URL
    if (product.type === 'external' && product.external_url) {
      buttons.push({
        url: product.external_url,
        platform: detectPlatform(product.external_url)
      });
    }

    // Check meta data for additional platforms
    if (product.meta_data) {
      const platforms = [
        { key: 'amazon_url', name: 'Amazon' },
        { key: 'flipkart_url', name: 'Flipkart' },
        { key: 'jiomart_url', name: 'JioMart' }
      ];
      
      platforms.forEach(platform => {
        const meta = product.meta_data.find(m => 
          m.key === platform.key || m.key === `_${platform.key}`
        );
        if (meta && meta.value) {
          buttons.push({
            url: meta.value,
            platform: platform.name
          });
        }
      });
    }

    // Remove duplicates based on platform
    const uniqueButtons = buttons.filter((button, index, self) =>
      index === self.findIndex(b => b.platform === button.platform)
    );

    return uniqueButtons;
  };

  const detectPlatform = (url) => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('amazon')) return 'Amazon';
    if (urlLower.includes('flipkart')) return 'Flipkart';
    if (urlLower.includes('jiomart')) return 'JioMart';
    return 'Amazon'; // Default
  };

  const getPlatformLogo = (platform) => {
    const logos = {
      'Amazon': 'https://postmanoil.com/blog/wp-content/uploads/2025/07/Amazon.png',
      'Flipkart': 'https://postmanoil.com/blog/wp-content/uploads/2025/07/flipkart.png',
      'JioMart': 'https://postmanoil.com/blog/wp-content/uploads/2025/07/Jiomart.png'
    };
    return logos[platform] || logos['Amazon'];
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600"></div>
        </div>
      </div>
    );
  }

  // Schema data for SEO
  const faqs = [
    {
      question: "What is Kachi Ghani mustard oil?",
      answer: "Kachi Ghani mustard oil is traditionally extracted using wooden kolhu (cold press) at low temperatures, preserving natural nutrients, flavor, and aroma. Postman's Kachi Ghani process ensures pure, unrefined oil."
    },
    {
      question: "Is Postman mustard oil good for cooking?",
      answer: "Yes, Postman mustard oil is ideal for Indian cooking, especially for tadka, deep frying, and pickling. Its high smoking point and pungent flavor enhance the taste of traditional dishes."
    },
    {
      question: "What are the health benefits of mustard oil?",
      answer: "Mustard oil is rich in omega-3 fatty acids, vitamin E, and has natural antibacterial properties. It supports heart health, improves digestion, and is beneficial for skin and hair when used externally."
    },
    {
      question: "Where can I buy Postman mustard oil online?",
      answer: "Postman mustard oil is available on Amazon, Flipkart, and JioMart. We offer various pack sizes from 200ml to 15 litres with free delivery options across India."
    }
  ];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://postmanoil.com' },
    { name: 'Products', url: 'https://postmanoil.com/products' },
    { name: 'Mustard Oil', url: 'https://postmanoil.com/mustard-oil' }
  ];

  const productSchemaData = {
    name: "Postman Kachi Ghani Mustard Oil",
    description: "Premium cold-pressed mustard oil manufactured using traditional wooden kolhu method. Rich in omega-3, vitamin E, perfect for Indian cooking.",
    images: [
      "https://postmanoil.com/images/products/postman-mustard-oil-kachi-ghani-1-litre.jpg",
      "https://postmanoil.com/images/products/postman-mustard-oil-kachi-ghani-5-litre.jpg",
      "https://postmanoil.com/images/products/postman-mustard-oil-kachi-ghani-15-litre.jpg"
    ],
    category: "Cooking Oil",
    oilType: "Mustard Oil",
    processingMethod: "Cold Pressed (Kachi Ghani)",
    lowPrice: "120",
    highPrice: "2400",
    nutrition: {
      "@type": "NutritionInformation",
      "servingSize": "1 tablespoon (14g)",
      "calories": "124",
      "fatContent": "14g",
      "saturatedFatContent": "1.6g",
      "unsaturatedFatContent": "12.4g"
    }
  };

  return (
    <>
      <SEO 
        title="Postman Oils Kacchi Ghani Mustard Oil - Premium Cold Pressed Sarson Ka Tel | Mittal Oils"
        description="Buy authentic Postman Oil Kachi Ghani mustard oil online. Postmanoils traditional wood-pressed, cold-pressed mustard oil by Mittal Oils. Rich in omega-3. Perfect for tadka, cooking & pickling. 58+ years trusted brand. Free delivery on Amazon, Flipkart, JioMart."
        keywords="postman oils, postman oil, postmanoils, mittal oils, edible oils, postman mustard oil, kachi ghani mustard oil, postman kacchi ghani, wood pressed mustard oil, cold pressed mustard oil, traditional mustard oil, sarson ka tel, cooking mustard oil, mustard oil 1 litre, mustard oil 5 litre, mustard oil for tadka, mustard oil for pickle, omega 3 mustard oil, healthy cooking oil, Indian mustard oil, Rajasthan mustard oil, Kekri mustard oil, buy mustard oil online, mustard oil amazon, mustard oil flipkart, postmanoils mustard oil, mittal oil mills mustard oil"
        image="https://postmanoil.com/blog/wp-content/uploads/2025/06/1_yellow_mustard_bottle_FRONT.webp"
        url="https://postmanoil.com/mustard-oil"
        type="product"
        schemaData={generateProductSchema(productSchemaData)}
        additionalSchemas={[
          generateFAQSchema(faqs),
          generateBreadcrumbSchema(breadcrumbItems),
          generateImageSchema(
            "https://postmanoil.com/blog/wp-content/uploads/2025/06/1_yellow_mustard_bottle_FRONT.webp",
            "postman-kachi-ghani-mustard-oil-bottle",
            "Postman Kachi Ghani Mustard Oil - Premium Cold Pressed Sarson Ka Tel"
          ),
          generateProductGallerySchema({
            name: "Postman Mustard Oil Gallery",
            images: benefitImages.map((img, idx) => ({
              src: img,
              alt: `Postman Mustard Oil ${[
                'Traditional Wood Pressed Method',
                'Premium Quality Standards',
                'Health Benefits of Mustard Oil',
                'Perfect for Indian Cooking',
                'Quality Assurance Process'
              ][idx] || `Feature ${idx + 1}`}`
            }))
          })
        ]}
        breadcrumb={generateBreadcrumbSchema(breadcrumbItems)}
      />

      {/* Compact Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-2 md:py-3 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <div className="mr-3 md:mr-6 bg-white/40 backdrop-blur-sm rounded-lg p-1 md:p-1.5">
              <img
                src="https://postmanoil.com/blog/wp-content/uploads/2025/05/Postman.png"
                alt="Postman Oils Logo - Premium Mustard Oil Brand"
                title="Postman Oils - Trusted Since 1967"
                loading="eager"
                width="60"
                height="60"
                className="h-10 md:h-16 w-auto object-contain"
              />
            </div>
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black">
                Postman <span className="text-yellow-200 block md:inline">Kacchi Ghani Mustard Oil</span>
              </h1>
            </div>
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <section className="py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">

          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {currentProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    extractBuyButtons={extractBuyButtons}
                    getPlatformLogo={getPlatformLogo}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    {currentPage > 1 && (
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        className="px-3 py-2 bg-white text-orange-600 border-2 border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors font-bold text-sm"
                      >
                        Previous
                      </button>
                    )}
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-2 rounded-lg font-bold transition-colors text-sm ${
                          currentPage === index + 1
                            ? 'bg-orange-600 text-white'
                            : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-600 hover:text-white'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    
                    {currentPage < totalPages && (
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        className="px-3 py-2 bg-white text-orange-600 border-2 border-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-colors font-bold text-sm"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🌻</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">No Mustard Oil Products Found</h4>
              <p className="text-base text-gray-600">Products are being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits 3-Image Slider Section */}
      <section className="py-8 bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-100">
        <div className="max-w-7xl mx-auto px-4">

          {/* Mobile Slider / Desktop Grid */}
          <div className="relative max-w-6xl mx-auto">
            {/* Mobile: Single Image Slider */}
            <div className="md:hidden">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${(currentSlide % benefitImages.length) * 100}%)` }}
                >
                  {benefitImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`Postman Mustard Oil Benefits - ${[
                            'Traditional Wood Pressed Method',
                            'Premium Quality Kachi Ghani',
                            'Heart Healthy Omega-3 Rich',  
                            'Perfect for Indian Cooking',
                            'Lab Tested Pure Mustard Oil'
                          ][index] || `Feature ${index + 1}`}`}
                          title={`Postman Kachi Ghani Mustard Oil - ${[
                            'Traditional Extraction Process',
                            'Premium Quality Standards',
                            'Health Benefits',
                            'Cooking Excellence',
                            'Quality Assurance'
                          ][index] || `Benefit ${index + 1}`}`}
                          loading="lazy"
                          width="400"
                          height="300"
                          className="w-full h-64 object-contain p-4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: 3-Image Grid Slider */}
            <div className="hidden md:block overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${Math.floor(currentSlide / 3) * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(benefitImages.length / 3) }, (_, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                    {benefitImages.slice(groupIndex * 3, (groupIndex + 1) * 3).map((image, imageIndex) => (
                      <div key={imageIndex} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <img
                          src={image}
                          alt={`Postman Mustard Oil Benefits - ${[
                            'Traditional Wood Pressed Method',
                            'Premium Quality Kachi Ghani',
                            'Heart Healthy Omega-3 Rich',
                            'Perfect for Indian Cooking',
                            'Lab Tested Pure Mustard Oil'
                          ][groupIndex * 3 + imageIndex] || `Feature ${groupIndex * 3 + imageIndex + 1}`}`}
                          title={`Postman Kachi Ghani Mustard Oil - ${[
                            'Traditional Extraction Process',
                            'Premium Quality Standards',
                            'Health Benefits',
                            'Cooking Excellence',
                            'Quality Assurance'
                          ][groupIndex * 3 + imageIndex] || `Benefit ${groupIndex * 3 + imageIndex + 1}`}`}
                          loading="lazy"
                          width="400"
                          height="300"
                          className="w-full h-56 lg:h-64 object-contain p-3"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation */}
            <button
              onClick={() => setCurrentSlide((prev) => prev === 0 ? benefitImages.length - 1 : prev - 1)}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-2 md:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => prev === benefitImages.length - 1 ? 0 : prev + 1)}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-2 md:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Enhanced Key Benefits - Mobile Slider / Desktop Grid */}
          <div className="mt-8">
            {/* Mobile Slider View */}
            <div className="md:hidden relative">
              <div 
                className="overflow-hidden"
                onTouchStart={() => setIsAutoPlaying(false)}
                onTouchEnd={() => setTimeout(() => setIsAutoPlaying(true), 5000)}
              >
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${(currentSlide % 4) * 100}%)` }}
                >
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center shadow-lg border border-green-200">
                      <div className="text-4xl mb-3">🌿</div>
                      <h4 className="font-bold text-green-800 text-base mb-2">Traditionally Crafted</h4>
                      <p className="text-sm text-green-600">Time-honored extraction</p>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center shadow-lg border border-amber-200">
                      <div className="text-4xl mb-3">🏭</div>
                      <h4 className="font-bold text-amber-800 text-base mb-2">Wood Pressed</h4>
                      <p className="text-sm text-amber-600">Traditional method</p>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 text-center shadow-lg border border-red-200">
                      <div className="text-4xl mb-3">❤️</div>
                      <h4 className="font-bold text-red-800 text-base mb-2">Heart Healthy</h4>
                      <p className="text-sm text-red-600">Cardiovascular benefits</p>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 text-center shadow-lg border border-yellow-200">
                      <div className="text-4xl mb-3">🏆</div>
                      <h4 className="font-bold text-yellow-800 text-base mb-2">58+ Years Trust</h4>
                      <p className="text-sm text-yellow-600">Legacy of quality</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile Arrow Navigation */}
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + 4) % 4)}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-2 rounded-full transition-all duration-300"
                  aria-label="Previous benefit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}
                  className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-2 rounded-full transition-all duration-300"
                  aria-label="Next benefit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-200">
                <div className="text-3xl mb-3">🌿</div>
                <h4 className="font-bold text-green-800 text-sm mb-1">Traditionally Crafted</h4>
                <p className="text-xs text-green-600">Time-honored extraction</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-amber-200">
                <div className="text-3xl mb-3">🏭</div>
                <h4 className="font-bold text-amber-800 text-sm mb-1">Wood Pressed</h4>
                <p className="text-xs text-amber-600">Traditional method</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-red-200">
                <div className="text-3xl mb-3">❤️</div>
                <h4 className="font-bold text-red-800 text-sm mb-1">Heart Healthy</h4>
                <p className="text-xs text-red-600">Cardiovascular benefits</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-yellow-200">
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="font-bold text-yellow-800 text-sm mb-1">58+ Years Trust</h4>
                <p className="text-xs text-yellow-600">Legacy of quality</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductCard({ product, extractBuyButtons, getPlatformLogo }) {
  const buyButtons = extractBuyButtons(product);
  const [isHovered, setIsHovered] = useState(false);
  const hasSecondImage = product.images && product.images.length > 1;

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-orange-100 gpu-accelerated card-hover"
      role="article"
      aria-label={`Product: ${product.name}`}
    >
      
      {/* Product Image - Clickable */}
      <Link href={`/product/${product.id}`}>
        <div 
          className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && hasSecondImage ? product.images[1].src : (product.images[0]?.src || '/placeholder.jpg')}
            alt={`${product.name} - Postman Kachi Ghani Mustard Oil`}
            title={`Buy ${product.name} Online - Premium Cold Pressed Mustard Oil`}
            loading="lazy"
            width="300"
            height="300"
            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badges */}
          {(product.featured || product.on_sale) && (
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {product.featured && (
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Featured
                </span>
              )}
              {product.on_sale && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  🔥 Sale!
                </span>
              )}
            </div>
          )}

          {/* Stock Status - Removed */}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3">
        
        {/* Product Name - Clickable */}
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-sm mb-3 cursor-pointer hover:text-orange-600 transition-colors line-clamp-2 min-h-[2.5rem] leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Buy Buttons */}
        <BuyNowButtons 
          buyButtons={buyButtons} 
          getPlatformLogo={getPlatformLogo}
          colorScheme="orange"
        />
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
    </div>
  );
}