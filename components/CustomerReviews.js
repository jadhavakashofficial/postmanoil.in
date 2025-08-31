import { useState, useEffect, useRef } from 'react';

export default function CustomerReviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const videoRefs = useRef({});

  const reviews = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      location: 'Jaipur',
      rating: 5,
      text: 'I\'ve been using Postman Groundnut Filter Oil at home for years. It\'s cold pressed and non refined, made from real peanuts, and you can actually smell that fresh peanut aroma when you cook. My grandparents always said nothing beats Postman for cooking. The taste makes snacks like pyaaj kachori or pakoras way better — that peanutty flavor just lifts everything. Honestly, once you try this oil, switching feels impossible. It\'s been part of our kitchen forever.',
      productImage: 'https://postmanoil.com/blog/wp-content/uploads/2025/08/IMG_1770.jpg',
      product: 'Groundnut Filter Oil'
    },
    {
      id: 2,
      name: 'Sunita Verma',
      location: 'Udaipur',
      rating: 5,
      text: 'This is wood pressed, non refined, and has that real mustard aroma everyone loves. When we cook traditional Indian dishes with Postman mustard oil, the flavor is just next level. And my god, the taste it adds to pickles is amazing. It\'s been a kitchen staple for years. The real mustard smell fills the house and takes the taste of every dish up a notch. Nothing else comes close.',
      productImage: 'https://postmanoil.com/blog/wp-content/uploads/2025/08/IMG_2784.jpg',
      product: 'Kachi Ghani Mustard Oil'
    },
    {
      id: 3,
      name: 'Anil Mehta',
      location: 'Chittorgarh',
      rating: 5,
      text: 'My grandparents used to use Postman Refined Groundnut Oil back in the 90s, and my parents kept the tradition alive. It\'s lighter and better for health, so even today we choose it for everyday cooking and frying. The oil is smooth and clean, no heavy smell, just pure quality. It\'s the kind of oil that stays part of the family through generations. Once you taste Postman refined oil, you know why it\'s been trusted for decades.',
      productImage: null,
      product: 'Refined Groundnut Oil'
    }
  ];

  // Optimized auto-play with longer interval for better performance
  useEffect(() => {
    if (isAutoPlaying && hoveredCard === null) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(reviews.length / 3));
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, reviews.length, hoveredCard]);

  const handleCardHover = (reviewId) => {
    setHoveredCard(reviewId);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset slide when switching between mobile/desktop
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  return (
    <section className="py-6 md:py-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-orange-300 to-red-300 rounded-full animate-pulse"
          style={{ filter: 'blur(12px)' }}
        ></div>
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse" 
          style={{ 
            filter: 'blur(12px)',
            animationDelay: '2s'
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Customer Stories
              </span>
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg mt-6 font-medium">
            Real experiences from families who have made Postman Oil a part of their kitchen tradition
          </p>
        </div>

        {/* Enhanced Reviews Slider */}
        <div className="relative" ref={sliderRef}>
          {/* Main Slider Container with hardware acceleration */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8 px-4`}>
                    {reviews.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((review) => (
                      <div 
                        key={review.id} 
                        className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden flex flex-col"
                        onMouseEnter={() => handleCardHover(review.id)}
                        onMouseLeave={() => handleCardLeave(review.id)}
                        style={{
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          transform: 'translate3d(0, 0, 0)',
                          background: 'linear-gradient(135deg, #ffffff 0%, #fff9f5 100%)'
                        }}
                      >
                        {/* Product Image at Top */}
                        {review.productImage && (
                          <div className="h-48 bg-gradient-to-br from-orange-50 to-amber-50 p-4">
                            <img 
                              src={review.productImage} 
                              alt={review.product}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        
                        {/* Premium Header with Gradient */}
                        <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 p-6">
                          {/* Decorative Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 20% 80%, white 2px, transparent 2px), radial-gradient(circle at 80% 20%, white 2px, transparent 2px)`,
                              backgroundSize: '30px 30px'
                            }}></div>
                          </div>
                          
                          <div className="relative flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-30"></div>
                                <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                  <span className="text-xl font-black bg-gradient-to-br from-orange-500 to-red-600 bg-clip-text text-transparent">
                                    {review.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-black text-white text-lg tracking-wide">{review.name}</h4>
                                <p className="text-orange-100 text-sm font-medium flex items-center mt-1">
                                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                  </svg>
                                  {review.location}, Rajasthan
                                </p>
                              </div>
                            </div>
                            
                            {/* Premium Rating Display */}
                            <div className="flex flex-col items-end">
                              <div className="flex space-x-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-orange-100 text-xs mt-1 font-medium">Verified Customer</span>
                            </div>
                          </div>
                        </div>

                        {/* Elegant Content Section */}
                        <div className={`p-6 flex flex-col flex-grow relative transition-all duration-500 ${
                          !review.productImage ? 'min-h-[12rem]' : (hoveredCard === review.id ? 'max-h-96 overflow-y-auto' : 'max-h-36 overflow-hidden')
                        }`}>
                          {/* Decorative Quote */}
                          <div className="absolute top-4 left-4 opacity-10">
                            <svg className="w-10 h-10 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                          </div>
                          
                          <p className="relative text-gray-700 text-base leading-relaxed italic font-medium pl-8">
                            {review.text}
                          </p>
                          
                          {/* Read More Indicator - Only show when not hovered and has image */}
                          {review.productImage && hoveredCard !== review.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/95 to-transparent flex items-end justify-center pb-2">
                              <span className="text-orange-600 text-sm font-semibold">
                                Hover to read more →
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Premium Bottom Gradient */}
                        <div className="h-1 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-orange-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-700 hover:text-orange-600 z-20 border border-orange-100 hover:border-orange-300"
            aria-label="Previous reviews"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:shadow-orange-500/25 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-700 hover:text-orange-600 z-20 border border-orange-100 hover:border-orange-300"
            aria-label="Next reviews"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0, 0, 0)'
            }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full border-2 ${
                currentSlide === index 
                  ? 'w-12 h-4 bg-gradient-to-r from-orange-500 to-red-500 border-orange-500 shadow-lg' 
                  : 'w-4 h-4 bg-white border-gray-300 hover:border-orange-400 hover:bg-orange-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            />
          ))}
        </div>

        {/* Enhanced Stats Bar */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center relative z-10">
            <div className="group cursor-default">
              <div className="text-3xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
              <div className="text-sm opacity-90 font-semibold tracking-wide">Happy Families</div>
            </div>
            <div className="group cursor-default border-x border-white/20">
              <div className="text-3xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">4.9/5</div>
              <div className="text-sm opacity-90 font-semibold tracking-wide">Average Rating</div>
            </div>
            <div className="group cursor-default">
              <div className="text-3xl md:text-4xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
              <div className="text-sm opacity-90 font-semibold tracking-wide">Recommend Us</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}