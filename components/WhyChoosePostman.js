import React from 'react';

export default function WhyChoosePostmanOil() {
  const features = [
    {
      id: 1,
      title: "100% NATURAL",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/1.png",
      gradient: "from-emerald-500 to-green-600",
      bgGlow: "from-emerald-50 to-green-100",
      description: "Pure ingredients from nature",
      icon: "🌿"
    },
    {
      id: 2,
      title: "WOODEN COLD-PRESSED",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/2.png",
      gradient: "from-amber-500 to-orange-600",
      bgGlow: "from-amber-50 to-orange-100",
      description: "Traditional extraction methods",
      icon: "🏭"
    },
    {
      id: 3,
      title: "MADE IN INDIA",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/3.png",
      gradient: "from-orange-500 to-red-600",
      bgGlow: "from-orange-50 to-red-100",
      description: "Supporting local farmers",
      icon: "🇮🇳"
    },
    {
      id: 4,
      title: "AMAZING TASTE",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/4.png",
      gradient: "from-purple-500 to-violet-600",
      bgGlow: "from-purple-50 to-violet-100",
      description: "Authentic flavors preserved",
      icon: "✨"
    }
  ];

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-slate-50 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-emerald-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Premium Header */}
        <div className="text-center mb-8 lg:mb-10">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg border border-white/40 mb-4">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-gray-600 tracking-wider uppercase">Premium Quality</span>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-transparent leading-tight">
            Why Choose Postman Oil?
          </h2>
          
          <p className="text-gray-700 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Discover what makes our oil the <span className="text-red-600 font-bold">perfect choice</span> for your family's health and <span className="text-orange-600 font-bold">culinary excellence</span>
          </p>
          
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Optimized Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>

        {/* Compact Bottom Section */}
        <div className="text-center mt-8 lg:mt-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-pink-500/10 rounded-full blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/60">
              <p className="text-gray-700 text-base lg:text-lg font-semibold">
                Experience the <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-black">revolution</span> in cooking oil quality
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Optimized Feature Card Component
function FeatureCard({ feature, index }) {
  return (
    <div 
      className="group relative bg-white/95 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl border border-white/60 overflow-hidden transition-all duration-400 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer"
      style={{
        animationDelay: `${index * 100}ms`,
        willChange: 'transform'
      }}
    >
      {/* Optimized Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGlow} opacity-25 group-hover:opacity-45 transition-all duration-400`}></div>
      
      {/* Compact Floating Icon */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
        <span className="text-sm">{feature.icon}</span>
      </div>

      {/* Optimized Image Container */}
      <div className="relative p-4 lg:p-5">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-inner group-hover:shadow-lg transition-shadow duration-300">
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-contain p-2 lg:p-3 transition-all duration-400 group-hover:scale-105 group-hover:rotate-1"
            loading="lazy"
            decoding="async"
          />
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-0.5 bg-gradient-to-r from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          <div className="absolute top-2 left-2 w-0.5 h-4 bg-gradient-to-b from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
          
          {/* Gentle Hover Glow */}
          <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-400 rounded-xl`}></div>
        </div>
      </div>

      {/* Compact Content Section */}
      <div className="px-4 pb-5 lg:px-5 lg:pb-6">
        <h3 className={`font-bold text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text text-center text-sm lg:text-base leading-tight tracking-wide mb-2`}>
          {feature.title}
        </h3>
        
        <p className="text-gray-600 text-xs lg:text-sm text-center font-medium opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-2 group-hover:translate-y-0">
          {feature.description}
        </p>
        
        {/* Subtle Progress Indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${feature.gradient} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-800 delay-100`}></div>
          </div>
        </div>
      </div>

      {/* Clean Bottom Accent */}
      <div className={`h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-center`}></div>
      
      {/* Subtle Border Enhancement */}
      <div className="absolute inset-0 rounded-xl lg:rounded-2xl border border-transparent bg-gradient-to-r from-white/30 via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
    </div>
  );
}