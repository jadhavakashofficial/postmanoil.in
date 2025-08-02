import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostmanRecipes() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch blogs from WordPress
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(blogs.length / itemsPerSlide);

  // Auto-slide functionality
  useEffect(() => {
    if (blogs.length > itemsPerSlide) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [blogs.length, totalSlides, itemsPerSlide]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      
      // Fetch from your WordPress blog
      const response = await fetch('https://postmanoil.com/blog/wp-json/wp/v2/posts?per_page=12&_embed');
      
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      
      const posts = await response.json();
      
      // Transform WordPress posts to blog format
      const transformedBlogs = posts.map(post => ({
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
                       'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 50) + '...',
        content: post.content.rendered,
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        author: post._embedded?.author?.[0]?.name || 'Postman Oil Team',
        categories: post._embedded?.['wp:term']?.[0]?.map(cat => cat.name) || ['Recipes']
      }));
      
      setBlogs(transformedBlogs);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(err.message);
      // Fallback to static blogs if WordPress fetch fails
      setBlogs(getFallbackBlogs());
    } finally {
      setLoading(false);
    }
  };

  // Fallback static blogs if WordPress is not available
  const getFallbackBlogs = () => [
    {
      id: 1,
      title: "Traditional Mustard Fish Curry Recipe",
      slug: "traditional-mustard-fish-curry",
      featuredImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
      excerpt: "Authentic Bengali fish curry recipe...",
      content: "<p>Full recipe content here...</p>",
      date: "December 15, 2024",
      author: "Chef Priya",
      categories: ["Bengali Cuisine", "Fish Recipes"]
    },
    {
      id: 2,
      title: "Healthy Vegetable Stir-fry with Groundnut Oil",
      slug: "healthy-vegetable-stir-fry",
      featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
      excerpt: "Quick mixed vegetable stir-fry...",
      content: "<p>Full recipe content here...</p>",
      date: "December 10, 2024",
      author: "Postman Oil Team",
      categories: ["Healthy Cooking", "Vegetarian"]
    },
    {
      id: 3,
      title: "Crispy Golden Samosas - Perfect Snack",
      slug: "crispy-golden-samosas",
      featuredImage: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop",
      excerpt: "Crispy samosa recipe guide...",
      content: "<p>Full recipe content here...</p>",
      date: "December 5, 2024",
      author: "Chef Rajesh",
      categories: ["Snacks", "Indian Street Food"]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <section className="py-6 lg:py-8 bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full mb-3 shadow-lg">
              <div className="w-3 h-3 bg-white/30 rounded-full mr-1.5 animate-pulse"></div>
              <span className="font-bold text-xs tracking-wide">LOADING</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Postman Recipes
            </h2>
            <p className="text-gray-600 text-xs lg:text-sm">Loading recipes...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse border border-orange-100">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 h-32 lg:h-40"></div>
                <div className="p-3 lg:p-4">
                  <div className="h-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-3"></div>
                  <div className="h-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full w-3/4 mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-3 lg:py-4 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-full mb-2 shadow-md">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5"></div>
            <span className="font-bold text-xs tracking-wide">FRESH RECIPES</span>
          </div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-2 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent leading-tight">
            Postman Recipes
          </h2>
          
          <p className="text-gray-700 text-xs lg:text-sm max-w-2xl mx-auto">
            Discover authentic recipes using pure Postman Oil
          </p>
          
          <div className="flex justify-center mt-1.5">
            <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {/* Error State with better styling */}
        {error && !blogs.length && (
          <div className="text-center py-6 mb-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 max-w-md mx-auto shadow-lg">
              <div className="text-3xl mb-3">⚠️</div>
              <p className="text-red-600 font-semibold mb-2">Unable to load recipes from blog</p>
              <p className="text-red-500 text-sm">Showing fallback recipes instead</p>
            </div>
          </div>
        )}

        {/* Enhanced Blog Slider */}
        <div className="relative">
          {/* Main Slider Container */}
          <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
            <div 
              className="flex transition-transform duration-400 ease-out"
              style={{ 
                transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,
                willChange: 'transform'
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-3 sm:gap-4 lg:gap-6 px-1 sm:px-2`}>
                    {blogs.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((blog) => (
                      <Link 
                        key={blog.id}
                        href={`/recipes/${blog.slug}`}
                        className="group block"
                      >
                        <article 
                          className="bg-white rounded-lg lg:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 hover:scale-[1.005] border border-orange-100 hover:border-orange-300 cursor-pointer"
                          style={{
                            willChange: 'transform'
                          }}
                        >
                          {/* Featured Image */}
                          <div className="relative h-32 sm:h-36 lg:h-40 overflow-hidden">
                            <img
                              src={blog.featuredImage}
                              alt={blog.title}
                              className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop';
                              }}
                            />
                            
                            {/* Enhanced Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Improved Read More Badge */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg border border-orange-200">
                                <span className="text-orange-600 font-bold flex items-center text-xs lg:text-sm">
                                  <span className="mr-1">👨‍🍳</span>
                                  View Recipe
                                </span>
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-2 left-2">
                              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-md">
                                Recipe Blog
                              </span>
                            </div>

                            {/* Date Badge */}
                            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium border border-white/20">
                              {blog.date}
                            </div>
                          </div>

                          {/* Enhanced Content */}
                          <div className="p-3 lg:p-4">
                            <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 leading-tight line-clamp-1">
                              {blog.title}
                            </h3>

                            {/* Author and CTA */}
                            <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                              <div className="flex items-center">
                                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-2">
                                  <span className="text-white text-xs font-bold">
                                    {blog.author.charAt(0)}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600 font-medium">{blog.author}</span>
                              </div>
                              
                              <span className="text-orange-600 font-semibold text-xs flex items-center group-hover:translate-x-0.5 transition-transform duration-200">
                                Read More
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-1 lg:left-2 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 text-gray-700 hover:text-orange-600 z-20 border border-orange-100 hover:border-orange-300"
                aria-label="Previous recipes"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-1 lg:right-2 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 text-gray-700 hover:text-orange-600 z-20 border border-orange-100 hover:border-orange-300"
                aria-label="Next recipes"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Enhanced Slide Indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-4 lg:mt-6 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-200 rounded-full ${
                  currentSlide === index 
                    ? 'w-6 lg:w-8 h-2 lg:h-3 bg-gradient-to-r from-orange-500 to-red-500 shadow-md' 
                    : 'w-2 h-2 lg:w-3 lg:h-3 bg-white border border-orange-200 hover:border-orange-400 hover:bg-orange-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Enhanced Recipe Count Info */}
        {blogs.length > 0 && (
          <div className="text-center mt-3 lg:mt-4">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-orange-200">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
              <p className="text-gray-600 text-xs font-medium">
                <span className="font-bold text-orange-600">{blogs.length}</span> delicious recipes • 
                <span className="mx-1">Fresh from our blog</span> • 
                <span className="font-medium">Updated {new Date().toLocaleDateString()}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}