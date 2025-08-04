// pages/groundnut-oil.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import BuyNowButtons from '../components/BuyNowButtons';
import SEO from '../components/SEO';
import { generateProductSchema, generateWebPageSchema, generateBreadcrumbSchema, generateFAQSchema } from '../utils/structuredData';
import { getImageSEO, generateImageSchema } from '../utils/imageSEO';

export default function GroundnutOilPage() {
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

  // Benefits images for slider - Updated with groundnut oil specific images
  const benefitImages = [
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/brand-colours-20.jpeg',
    'https://postmanoil.com/blog/wp-content/uploads/2025/06/brand-colours-15.jpeg',
  ];

  useEffect(() => {
    fetchGroundnutOilProducts();
  }, []);

  // Auto-play for sliders
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % benefitImages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, benefitImages.length]);

  const fetchGroundnutOilProducts = async () => {
    try {
      const response = await fetch(
        `${WC_BASE_URL}/wp-json/wc/v3/products?per_page=100&status=publish&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
      );
      
      const allProducts = await response.json();
      
      // Filter for groundnut oil products with external buy buttons
      const groundnutProducts = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const categories = product.categories.map(cat => cat.name.toLowerCase());
        const hasGroundnut = (name.includes('groundnut') || 
                            name.includes('peanut') ||
                            categories.some(cat => cat.includes('groundnut') || cat.includes('peanut'))) &&
                           !name.includes('refined'); // Exclude refined products
        
        const hasBuyButtons = extractBuyButtons(product).length > 0;
        
        return hasGroundnut && hasBuyButtons;
      });

      // Sort products by size priority
      const sortedProducts = sortProductsBySize(groundnutProducts);
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
      '500ml': 1, '500 ml': 1, '500ML': 1, '500 ML': 1,
      '1l': 2, '1 l': 2, '1ltr': 2, '1 ltr': 2, '1 litre': 2, '1litre': 2, '1 liter': 2, '1L': 2, '1 L': 2,
      '2l': 3, '2 l': 3, '2ltr': 3, '2 ltr': 3, '2 litre': 3, '2litre': 3, '2 liter': 3, '2L': 3, '2 L': 3,
      '5l': 4, '5 l': 4, '5ltr': 4, '5 ltr': 4, '5 litre': 4, '5litre': 4, '5 liter': 4, '5L': 4, '5 L': 4,
      '15l': 5, '15 l': 5, '15ltr': 5, '15 ltr': 5, '15 litre': 5, '15litre': 5, '15 liter': 5, '15L': 5, '15 L': 5
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600"></div>
        </div>
      </div>
    );
  }

  // Schema data
  const faqs = [
    {
      question: "What is the difference between filtered and refined groundnut oil?",
      answer: "Filtered groundnut oil retains natural nutrients and flavor as it's minimally processed, while refined oil undergoes extensive processing. Postman's filtered groundnut oil is cold-pressed to preserve vitamins and antioxidants."
    },
    {
      question: "Is Postman groundnut oil good for deep frying?",
      answer: "Yes, Postman groundnut oil has a high smoke point (232°C) making it ideal for deep frying. It doesn't break down easily at high temperatures and adds a mild nutty flavor to food."
    },
    {
      question: "Where can I buy Postman groundnut oil online?",
      answer: "Postman groundnut oil is available on Amazon India, Flipkart, and JioMart. We offer various pack sizes from 500ml to 15 litres with fast delivery across India."
    }
  ];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://postmanoil.com' },
    { name: 'Products', url: 'https://postmanoil.com/products' },
    { name: 'Groundnut Oil', url: 'https://postmanoil.com/groundnut-oil' }
  ];

  const productSchemaData = {
    name: "Postman Groundnut Filter Oil",
    description: "Premium cold-pressed groundnut oil perfect for deep frying and cooking. Rich in vitamin E and antioxidants.",
    images: [
      "https://postmanoil.com/blog/wp-content/uploads/2025/06/2_yellow_groundnut_bottle_FRONT.webp"
    ],
    category: "Cooking Oil",
    oilType: "Groundnut Oil",
    processingMethod: "Cold Pressed Filtered",
    lowPrice: "140",
    highPrice: "2600"
  };

  return (
    <>
      <SEO 
        title="Postman Oils Groundnut Filter Oil - Premium Peanut Oil | Mittal Oils"
        description="Buy premium Postman Oil cold-pressed groundnut filter oil. Postmanoils perfect for deep frying & cooking by Mittal Oils. Rich in vitamin E & antioxidants. 58+ years of trust. Available on Amazon, Flipkart, JioMart."
        keywords="postman oils, postman oil, postmanoils, mittal oils, edible oils, postman groundnut oil, groundnut filter oil, peanut oil, cold pressed groundnut oil, filtered groundnut oil, cooking groundnut oil, groundnut oil for deep frying, healthy groundnut oil, vitamin e oil, moongfali ka tel, traditional groundnut oil, Indian peanut oil, Rajasthan groundnut oil, buy groundnut oil online, postmanoils groundnut oil, mittal oil mills groundnut oil"
        image="https://postmanoil.com/blog/wp-content/uploads/2025/06/2_yellow_groundnut_bottle_FRONT.webp"
        url="https://postmanoil.com/groundnut-oil"
        type="product"
        schemaData={generateProductSchema(productSchemaData)}
        additionalSchemas={[
          generateFAQSchema(faqs),
          generateBreadcrumbSchema(breadcrumbItems),
          generateImageSchema(
            "https://postmanoil.com/blog/wp-content/uploads/2025/06/2_yellow_groundnut_bottle_FRONT.webp",
            "groundnut-oil-bottle",
            "Groundnut Filter Oil"
          )
        ]}
      />

      {/* Compact Hero Section */}
      <section className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 py-2 md:py-3 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <div className="mr-3 md:mr-6 bg-white/40 backdrop-blur-sm rounded-lg p-1 md:p-1.5">
              <img
                src="https://postmanoil.com/blog/wp-content/uploads/2025/05/Postman.png"
                {...getImageSEO('postman-logo', '')}
                className="h-10 md:h-16 w-auto object-contain"
              />
            </div>
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black">
                Postman <span className="text-yellow-200">Groundnut Filter Oil</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
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
              <div className="text-5xl mb-3">🥜</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">No Groundnut Oil Products Found</h4>
              <p className="text-base text-gray-600">Products are being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Slider Section */}
      <section className="py-6 bg-gradient-to-br from-orange-100 via-red-100 to-yellow-100">
        <div className="max-w-7xl mx-auto px-4">

          {/* Mobile Slider / Desktop Grid */}
          <div className="relative max-w-6xl mx-auto">
            {/* Mobile: Single Image Slider */}
            <div className="md:hidden">
              <div className="overflow-hidden rounded-2xl shadow-2xl bg-white p-4"
                   onTouchStart={() => setIsAutoPlaying(false)}
                   onTouchEnd={() => setTimeout(() => setIsAutoPlaying(true), 5000)}
              >
                <div 
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {benefitImages.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`Postman Groundnut Oil Benefits - ${[
                            'Premium Quality Groundnuts',
                            'Traditional Cold Pressed Method'
                          ][index] || `Feature ${index + 1}`}`}
                          title={`Postman Groundnut Filter Oil - ${[
                            'Made with Premium Groundnuts',
                            'Traditional Extraction Process'
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

            {/* Desktop: 2 Images Grid */}
            <div className="hidden md:block overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
              <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
                {benefitImages.map((image, index) => (
                  <div key={index} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <img
                      src={image}
                      alt={`Postman Groundnut Oil Benefits - ${[
                        'Premium Quality Groundnuts',
                        'Traditional Cold Pressed Method'
                      ][index] || `Feature ${index + 1}`}`}
                      title={`Postman Groundnut Filter Oil - ${[
                        'Made with Premium Groundnuts',
                        'Traditional Extraction Process'
                      ][index] || `Benefit ${index + 1}`}`}
                      loading="lazy"
                      width="400"
                      height="300"
                      className="w-full h-48 md:h-56 lg:h-64 object-contain p-3"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Arrows - Only visible on mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setCurrentSlide((prev) => prev === 0 ? benefitImages.length - 1 : prev - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-2 rounded-full shadow-xl transition-all duration-300"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % benefitImages.length)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white p-2 rounded-full shadow-xl transition-all duration-300"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
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
                      <h4 className="font-bold text-green-800 text-base mb-2">Premium Quality</h4>
                      <p className="text-sm text-green-600">Made with premium groundnuts only</p>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center shadow-lg border border-blue-200">
                      <div className="text-4xl mb-3">❄️</div>
                      <h4 className="font-bold text-blue-800 text-base mb-2">Cold Pressed</h4>
                      <p className="text-sm text-blue-600">Traditional cold pressing method</p>
                    </div>
                  </div>
                  <div className="w-full flex-shrink-0 px-2">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center shadow-lg border border-purple-200">
                      <div className="text-4xl mb-3">🔥</div>
                      <h4 className="font-bold text-purple-800 text-base mb-2">High Smoke Point</h4>
                      <p className="text-sm text-purple-600">Perfect for frying pakodas & snacks</p>
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
                <h4 className="font-bold text-green-800 text-sm mb-1">Premium Quality</h4>
                <p className="text-xs text-green-600">Made with premium groundnuts only</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-blue-200">
                <div className="text-3xl mb-3">❄️</div>
                <h4 className="font-bold text-blue-800 text-sm mb-1">Cold Pressed</h4>
                <p className="text-xs text-blue-600">Traditional cold pressing method</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-200">
                <div className="text-3xl mb-3">🔥</div>
                <h4 className="font-bold text-purple-800 text-sm mb-1">High Smoke Point</h4>
                <p className="text-xs text-purple-600">Perfect for frying pakodas & snacks</p>
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
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-orange-100">
      
      {/* Product Image - Clickable */}
      <Link href={`/product/${product.id}`}>
        <div 
          className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-red-50 to-orange-50 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && hasSecondImage ? product.images[1].src : (product.images[0]?.src || '/placeholder.jpg')}
            {...getImageSEO('groundnut-oil', product.name)}
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

        {/* Enhanced Buy Buttons with Better Alignment */}
        <BuyNowButtons 
          buyButtons={buyButtons} 
          getPlatformLogo={getPlatformLogo}
          colorScheme="orange"
        />
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
    </div>
  );
}