// pages/mustard-oil.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MustardOilPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => prev === benefitImages.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    const sizeOrder = [
      '200ml', '200 ml',
      '500ml', '500 ml', 
      '1l', '1 l', '1ltr', '1 ltr', '1 litre', '1litre',
      '2l', '2 l', '2ltr', '2 ltr', '2 litre', '2litre',
      '5l', '5 l', '5ltr', '5 ltr', '5 litre', '5litre',
      '15l', '15 l', '15ltr', '15 ltr', '15 litre', '15litre'
    ];
    
    return products.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Find size indicators in product names
      const aSizeIndex = sizeOrder.findIndex(size => aName.includes(size));
      const bSizeIndex = sizeOrder.findIndex(size => bName.includes(size));
      
      // If both have recognized sizes, sort by size order
      if (aSizeIndex !== -1 && bSizeIndex !== -1) {
        return aSizeIndex - bSizeIndex;
      }
      
      // If only one has a recognized size, prioritize it
      if (aSizeIndex !== -1) return -1;
      if (bSizeIndex !== -1) return 1;
      
      // For products without recognized sizes (new products), sort by date (newest last)
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
      'Amazon': 'https://postmanoil.com/blog/wp-content/uploads/2025/06/amazon-logo-on-transparent-background-free-vector.jpg',
      'Flipkart': 'https://postmanoil.com/blog/wp-content/uploads/2025/06/flipkart-logo-svg-vector.svg',
      'JioMart': 'https://postmanoil.com/blog/wp-content/uploads/2025/06/jio-mart-logo.png'
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

  return (
    <>
      <Head>
        <title>Wood Pressed Kacchi Ghani Mustard Oil Collection | Postman Oils - Premium Cold-Pressed Mustard Oil</title>
        <meta name="description" content="Shop premium Wood Pressed Kacchi Ghani Mustard Oil from Postman Oils. 100% natural, unrefined mustard oil made with traditional wood pressing methods. Available on Amazon, Flipkart & JioMart." />
        <meta name="keywords" content="wood pressed mustard oil, kacchi ghani mustard oil, cold pressed mustard oil, postman oil, traditional mustard oil, pure mustard oil, natural mustard oil" />
        <meta property="og:title" content="Premium Wood Pressed Kacchi Ghani Mustard Oil | Postman Oils" />
        <meta property="og:description" content="Authentic wood-pressed mustard oil made with traditional methods. 58+ years of trust and legacy." />
        <link rel="canonical" href="https://postmanoil.com/mustard-oil" />
      </Head>

      {/* Compact Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 py-6 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <div className="mr-4 md:mr-6">
              <img
                src="https://postmanoil.com/blog/wp-content/uploads/2025/05/Postman.png"
                alt="Postman Oils Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
            
            {/* Title */}
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black">
                Postman Oils <span className="text-yellow-200">Mustard Oil</span>
              </h1>
              <p className="text-sm md:text-lg font-bold mt-1">
                Wood Pressed • Natural • Traditional
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <section className="py-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black mb-3 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Postman Mustard Oil Collection
            </h3>
          </div>

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
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-black mb-3 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Benefits of Kacchi Ghani Mustard Oil
            </h3>
            <p className="text-base text-gray-700 font-medium">
              Discover the traditional benefits of wood-pressed mustard oil
            </p>
          </div>

          {/* 3-Image Grid Slider */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${Math.floor(currentSlide / 3) * 100}%)` }}
              >
                {/* Group images in sets of 3 */}
                {Array.from({ length: Math.ceil(benefitImages.length / 3) }, (_, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {benefitImages.slice(groupIndex * 3, (groupIndex + 1) * 3).map((image, imageIndex) => (
                      <div key={imageIndex} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <img
                          src={image}
                          alt={`Benefits of Kacchi Ghani Mustard Oil ${groupIndex * 3 + imageIndex + 1}`}
                          className="w-full h-48 md:h-56 lg:h-64 object-contain p-3"
                          loading="lazy"
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => prev === benefitImages.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Enhanced Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-3">
              {benefitImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'w-4 h-4 bg-gradient-to-r from-orange-600 to-red-600 scale-125 shadow-lg' 
                      : 'w-3 h-3 bg-orange-300 hover:bg-orange-400 hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Key Benefits Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-200">
              <div className="text-3xl mb-3">🌿</div>
              <h4 className="font-bold text-green-800 text-sm mb-1">100% Natural</h4>
              <p className="text-xs text-green-600">No artificial additives</p>
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
      </section>
    </>
  );
}

function ProductCard({ product, extractBuyButtons, getPlatformLogo }) {
  const buyButtons = extractBuyButtons(product);

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-orange-100">
      
      {/* Product Image - Clickable */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-yellow-50 to-orange-50 cursor-pointer">
          <img
            src={product.images[0]?.src || '/placeholder.jpg'}
            alt={product.name}
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
        <div className="space-y-2">
          {buyButtons.length === 1 ? (
            // Single button - full width
            <a
              href={buyButtons[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-10 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
            >
              <img
                src={getPlatformLogo(buyButtons[0].platform)}
                alt={`Buy on ${buyButtons[0].platform}`}
                className="w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 hover:border-orange-300 p-2"
              />
            </a>
          ) : (
            <>
              {/* Desktop: Single row, Mobile: Two rows */}
              <div className="hidden md:flex md:space-x-2">
                {buyButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block flex-1 h-10 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                  >
                    <img
                      src={getPlatformLogo(button.platform)}
                      alt={`Buy on ${button.platform}`}
                      className="w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 hover:border-orange-300 p-2"
                    />
                  </a>
                ))}
              </div>
              
              {/* Mobile: Two rows */}
              <div className="md:hidden space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  {buyButtons.slice(0, 2).map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-8 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    >
                      <img
                        src={getPlatformLogo(button.platform)}
                        alt={`Buy on ${button.platform}`}
                        className="w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 hover:border-orange-300 p-1"
                      />
                    </a>
                  ))}
                </div>
                
                {buyButtons.length > 2 && (
                  <div className={`grid gap-2 ${buyButtons.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {buyButtons.slice(2).map((button, index) => (
                      <a
                        key={index + 2}
                        href={button.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-8 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                      >
                        <img
                          src={getPlatformLogo(button.platform)}
                          alt={`Buy on ${button.platform}`}
                          className="w-full h-full object-contain bg-white rounded-lg border-2 border-gray-200 hover:border-orange-300 p-1"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"></div>
    </div>
  );
}