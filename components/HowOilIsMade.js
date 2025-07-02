import React from 'react';

export default function HowOilIsMade() {
  const steps = [
    {
      id: 1,
      title: "Procurement of Seeds",
      image: "https://www.zettafarms.com/wp-content/uploads/2024/01/blog-3.jpg",
      description: "Sourcing premium, pesticide-free seeds directly from trusted farmers",
      icon: "🌱",
      gradient: "from-emerald-500 to-teal-600",
      titleColor: "from-emerald-700 to-teal-800"
    },
    {
      id: 2,
      title: "Cleaning & Selection",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/1.png",
      description: "Thorough cleaning and hand-sorting to remove all impurities",
      icon: "✨",
      gradient: "from-blue-500 to-cyan-600",
      titleColor: "from-blue-700 to-cyan-800"
    },
    {
      id: 3,
      title: "Seed Crushing",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8333-scaled.jpg",
      description: "Traditional stone mills gently crush seeds to preserve nutrients",
      icon: "⚡",
      gradient: "from-purple-500 to-indigo-600",
      titleColor: "from-purple-700 to-indigo-800"
    },
    {
      id: 4,
      title: "Oil Extraction",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8326-scaled.jpg",
      description: "Cold-press extraction below 40°C to preserve nutrients",
      icon: "💧",
      gradient: "from-orange-500 to-red-600",
      titleColor: "from-orange-700 to-red-800"
    },
    {
      id: 5,
      title: "Filtration",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8244-scaled.jpg",
      description: "Multi-stage purification process for crystal-clear oil",
      icon: "🔬",
      gradient: "from-pink-500 to-rose-600",
      titleColor: "from-pink-700 to-rose-800"
    },
    {
      id: 6,
      title: "Laboratory Testing",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8516-scaled.jpg",
      description: "Rigorous quality control to ensure purity and freshness",
      icon: "🧪",
      gradient: "from-yellow-500 to-amber-600",
      titleColor: "from-yellow-700 to-amber-800"
    },
    {
      id: 7,
      title: "Packaging",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8284-scaled.jpg",
      description: "Nitrogen-flushed bottles sealed for freshness",
      icon: "📦",
      gradient: "from-green-500 to-emerald-600",
      titleColor: "from-green-700 to-emerald-800"
    }
  ];

  const handleCardClick = (stepId) => {
    window.location.href = '/how-postman-oil-is-made';
  };

  const handleKnowMoreClick = () => {
    window.location.href = '/how-postman-oil-is-made';
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden" itemScope itemType="https://schema.org/Process">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-24 h-24 bg-violet-400 rounded-full blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-cyan-400 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-emerald-400 rounded-full blur-sm"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 bg-clip-text text-transparent leading-tight" itemProp="name">
            How Postman Oil Is Made
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl font-medium max-w-3xl mx-auto px-2" itemProp="description">
            Our meticulous <span className="text-red-600 font-bold">7-step process</span> ensures every drop meets the highest standards of <span className="text-orange-600 font-bold">purity and quality</span>
          </p>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full mt-4 sm:mt-6"></div>
        </div>

        {/* Mobile Layout (2 columns + full width for 7th) */}
        <div className="block sm:hidden">
          {/* First 6 cards in 2 columns */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {steps.slice(0, 6).map((step) => (
              <StepCard key={step.id} step={step} onClick={() => handleCardClick(step.id)} isMobile={true} />
            ))}
          </div>
          
          {/* 7th card full width */}
          <div className="w-full">
            <StepCard step={steps[6]} onClick={() => handleCardClick(steps[6].id)} isMobile={true} isFullWidth={true} />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          {/* First 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-10">
            {steps.slice(0, 4).map((step) => (
              <StepCard key={step.id} step={step} onClick={() => handleCardClick(step.id)} />
            ))}
          </div>

          {/* Last 3 cards centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-w-5xl">
              {steps.slice(4, 7).map((step) => (
                <StepCard key={step.id} step={step} onClick={() => handleCardClick(step.id)} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10 sm:mt-14">
          <button 
            onClick={handleKnowMoreClick}
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-red-600 via-orange-500 to-pink-600 hover:from-red-700 hover:via-orange-600 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-xl hover:shadow-red-500/30 transform transition-all duration-300 ring-2 ring-white/40 font-bold text-sm sm:text-base tracking-wide active:scale-95"
          >
            <span>Know More About Our Process</span>
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// Enhanced Card Component with dynamic height and perfect image fitting
function StepCard({ step, onClick, isMobile = false, isFullWidth = false }) {
  const cardClasses = `
    group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl 
    transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-1.5 
    border border-white/40 overflow-hidden cursor-pointer
    active:scale-95 active:shadow-md
    ${isFullWidth ? 'w-full' : ''}
  `;

  return (
    <article 
      className={cardClasses}
      itemScope 
      itemType="https://schema.org/HowToStep"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Step Number */}
      <div className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-20 w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-md ring-1 ring-white/50`}>
        <span className="text-white font-bold text-xs sm:text-sm" itemProp="position">{step.id}</span>
      </div>

      {/* Image Container with perfect fitting - Dynamic height based on content */}
      <div className={`relative ${isMobile ? 'h-36' : 'h-44 sm:h-48'} overflow-hidden bg-gray-100`}>
        <img
          src={step.image}
          alt={`Step ${step.id}: ${step.title}`}
          className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
          itemProp="image"
          loading="lazy"
          decoding="async"
          style={{
            objectPosition: 'center'
          }}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Icon */}
        <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
          <span className={`${isMobile ? 'text-base' : 'text-lg'}`}>{step.icon}</span>
        </div>
      </div>

      {/* Content - Compact and optimized */}
      <div className={`${isMobile ? 'p-3 pb-4' : 'p-4 pb-5'}`}>
        <h3 className={`font-bold text-transparent bg-gradient-to-r ${step.titleColor} bg-clip-text mb-2 ${isMobile ? 'text-sm leading-tight' : 'text-base leading-tight'}`} itemProp="name">
          {step.title}
        </h3>
        <p className={`text-gray-600 leading-snug mb-3 ${isMobile ? 'text-xs' : 'text-sm'}`} itemProp="text">
          {step.description}
        </p>
        
        {/* Click indicator - Always visible but subtle */}
        <div className="flex items-center justify-between group-hover:opacity-100 opacity-70 transition-opacity duration-300">
          <span className={`text-gray-400 font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Learn more</span>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className={`h-1 bg-gradient-to-r ${step.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
    </article>
  );
}