import { useState, useEffect, useRef } from 'react';

export default function HowOilIsMade() {
  const [activeStep, setActiveStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const steps = [
    {
      id: 1,
      title: "Procurement of Seeds",
      icon: "🌱",
      accent: "from-orange-500 to-amber-500",
      image: "https://www.zettafarms.com/wp-content/uploads/2024/01/blog-3.jpg",
      detail: "We source only the highest quality, pesticide-free seeds from trusted local farmers who practice sustainable agriculture. Our rigorous selection process ensures only premium seeds with optimal oil content make it to production.",
      stats: "100% organic seeds | Traceable origin | Pesticide-free guarantee"
    },
    {
      id: 2,
      title: "Cleaning & Selection",
      icon: "✨",
      accent: "from-amber-500 to-yellow-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/1.png",
      detail: "Seeds undergo a meticulous 3-stage cleaning process. First, mechanical sieving removes large debris. Then, air classification eliminates dust and lightweight particles. Finally, hand-sorting ensures only perfect seeds proceed.",
      stats: "99.9% purity | Zero foreign matter | 3-stage verification"
    },
    {
      id: 3,
      title: "Seed Crushing",
      icon: "⚡",
      accent: "from-yellow-500 to-orange-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8333-scaled.jpg",
      detail: "Using traditional granite stone mills, we gently crush seeds at low RPM to prevent heat buildup. This ancient technique preserves delicate nutrients while preparing the seeds for oil extraction.",
      stats: "Low-temperature crushing | Nutrient preservation | 24-hour batch monitoring"
    },
    {
      id: 4,
      title: "Oil Extraction",
      icon: "💧",
      accent: "from-orange-500 to-red-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8326-scaled.jpg",
      detail: "Our cold-press extraction maintains temperatures below 40°C (104°F) throughout the process. This slow, pressure-controlled method ensures maximum nutrient retention and authentic flavor profile.",
      stats: "Temperature-controlled <40°C | Single-press extraction | No chemical solvents"
    },
    {
      id: 5,
      title: "Filtration",
      icon: "🔬",
      accent: "from-red-500 to-pink-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8244-scaled.jpg",
      detail: "Freshly pressed oil undergoes a natural sedimentation process followed by triple-layer filtration through food-grade cellulose, diatomaceous earth, and activated charcoal. This removes impurities while preserving nutrients.",
      stats: "3-stage filtration | 99.99% clarity | Natural sedimentation"
    },
    {
      id: 6,
      title: "Laboratory Testing",
      icon: "🧪",
      accent: "from-pink-500 to-red-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8516-scaled.jpg",
      detail: "Each batch is tested for 47 quality parameters including peroxide value, free fatty acids, and nutrient content. Our in-house lab and third-party verification ensure every bottle meets our strict standards.",
      stats: "47 quality parameters | Batch-specific reports | ISO-certified testing"
    },
    {
      id: 7,
      title: "Packaging",
      icon: "📦",
      accent: "from-red-500 to-orange-500",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8284-scaled.jpg",
      detail: "Oil is immediately bottled in UV-protected amber glass under nitrogen flushing to prevent oxidation. Each bottle is sealed with tamper-evident caps and labeled with harvest date and batch number.",
      stats: "Nitrogen-flushed | Light-protected bottles | Farm-to-bottle traceability"
    }
  ];

  const handleStepClick = (stepId) => {
    if (expandedStep === stepId) {
      setExpandedStep(null);
      setActiveStep(null);
    } else {
      setExpandedStep(stepId);
      setActiveStep(stepId);
    }
  };

  const getExpandedStepPosition = (stepId) => {
    // For desktop: determine which row the step is in
    if (stepId <= 4) {
      return 'after-row-1'; // After first row
    } else {
      return 'after-row-2'; // After second row
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-orange-200 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png" 
              alt="Postman Oils Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
              The Art of Pure Oil Creation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-orange-800 font-medium max-w-3xl mx-auto mb-6">
            Our meticulous <span className="font-semibold text-orange-600">7-step process</span> transforms premium seeds into liquid gold, preserving <span className="font-semibold text-amber-600">nature's goodness</span> in every drop
          </p>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 h-1.5 w-32 rounded-full"></div>
          </div>
        </div>

        {/* Interactive Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-800 mb-8">Our Production Journey</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Click on any step to explore the detailed process and quality metrics
          </p>
          
          {/* Desktop Layout: 2 Rows with Dynamic Details */}
          <div className="hidden lg:block">
            {/* First Row - Steps 1-4 */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              {steps.slice(0, 4).map((step) => (
                <StepCard 
                  key={step.id} 
                  step={step} 
                  activeStep={activeStep} 
                  expandedStep={expandedStep}
                  onStepClick={handleStepClick}
                />
              ))}
            </div>
            
            {/* Dynamic Detail Panel after Row 1 */}
            {expandedStep && expandedStep <= 4 && (
              <StepDetailPanel 
                step={steps.find(s => s.id === expandedStep)} 
                onClose={() => {
                  setExpandedStep(null);
                  setActiveStep(null);
                }}
              />
            )}
            
            {/* Second Row - Steps 5-7 (centered) */}
            <div className="flex justify-center mt-8">
              <div className="grid grid-cols-3 gap-6 max-w-4xl">
                {steps.slice(4, 7).map((step) => (
                  <StepCard 
                    key={step.id} 
                    step={step} 
                    activeStep={activeStep} 
                    expandedStep={expandedStep}
                    onStepClick={handleStepClick}
                  />
                ))}
              </div>
            </div>
            
            {/* Dynamic Detail Panel after Row 2 */}
            {expandedStep && expandedStep > 4 && (
              <StepDetailPanel 
                step={steps.find(s => s.id === expandedStep)} 
                onClose={() => {
                  setExpandedStep(null);
                  setActiveStep(null);
                }}
              />
            )}
          </div>

          {/* Mobile Layout: 2 Columns with Full Width Details */}
          <div className="block lg:hidden">
            {/* Process all steps with their potential details */}
            {steps.map((step, index) => {
              const isEvenIndex = index % 2 === 0;
              const nextStep = steps[index + 1];
              const shouldShowDetail = expandedStep === step.id;
              const shouldShowDetailAfterPair = expandedStep === step.id || (nextStep && expandedStep === nextStep.id);
              
              return (
                <div key={step.id}>
                  {/* Start new row for even indices */}
                  {isEvenIndex && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Current step */}
                      <StepCard 
                        step={step} 
                        activeStep={activeStep} 
                        expandedStep={expandedStep}
                        onStepClick={handleStepClick}
                        isMobile={true}
                      />
                      
                      {/* Next step if exists */}
                      {nextStep && (
                        <StepCard 
                          step={nextStep} 
                          activeStep={activeStep} 
                          expandedStep={expandedStep}
                          onStepClick={handleStepClick}
                          isMobile={true}
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Show detail panel after each pair if either step is expanded */}
                  {isEvenIndex && shouldShowDetailAfterPair && (
                    <div className="mb-6">
                      <StepDetailPanel 
                        step={steps.find(s => s.id === expandedStep)} 
                        onClose={() => {
                          setExpandedStep(null);
                          setActiveStep(null);
                        }}
                        isMobile={true}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality Promise Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 border border-orange-200 shadow-xl">
          <div className="text-center mb-8 lg:mb-10">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full mb-6 text-lg lg:text-xl font-bold shadow-lg">
              Our Quality Promise
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-orange-800 mb-6">
              Pure, Nutrient-Rich Oil Crafted with <span className="text-orange-600">Passion</span> & <span className="text-amber-600">Precision</span>
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto">
              From seed selection to bottling, every step of our process is designed to preserve the natural goodness of our oils. We never use chemicals, high heat, or shortcuts - just traditional methods perfected over generations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md border border-orange-100 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-4 text-xl lg:text-2xl shadow-lg">
                  🌿
                </div>
                <h4 className="font-bold text-lg lg:text-xl text-orange-800 mb-3">100% Natural</h4>
                <p className="text-gray-700 text-sm lg:text-base">No chemicals, additives, or preservatives - just pure oil as nature intended</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md border border-orange-100 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-4 text-xl lg:text-2xl shadow-lg">
                  🔬
                </div>
                <h4 className="font-bold text-lg lg:text-xl text-orange-800 mb-3">Lab Tested</h4>
                <p className="text-gray-700 text-sm lg:text-base">Every batch undergoes rigorous testing for purity and nutritional content</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-md border border-orange-100 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <div className="text-center">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full w-14 h-14 lg:w-16 lg:h-16 flex items-center justify-center mx-auto mb-4 text-xl lg:text-2xl shadow-lg">
                  ♻️
                </div>
                <h4 className="font-bold text-lg lg:text-xl text-orange-800 mb-3">Sustainable</h4>
                <p className="text-gray-700 text-sm lg:text-base">Ethically sourced from farmers practicing sustainable agriculture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Step Card Component with Click Interactions
function StepCard({ step, activeStep, expandedStep, onStepClick, isMobile = false, isFullWidth = false }) {
  const isActive = activeStep === step.id;
  const isExpanded = expandedStep === step.id;

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-400 group ${
        isActive ? 'transform scale-105' : 'hover:transform hover:scale-102'
      } ${isFullWidth ? 'w-full' : ''}`}
      onClick={() => onStepClick(step.id)}
    >
      {/* Step Card */}
      <div className={`bg-white rounded-xl lg:rounded-2xl shadow-lg border-2 transition-all duration-400 overflow-hidden ${
        isActive 
          ? 'border-orange-400 shadow-xl ring-2 ring-orange-200' 
          : 'border-orange-100 hover:border-orange-300 hover:shadow-lg'
      }`}>
        {/* Image Container - Consistent sizing */}
        <div className={`relative bg-gradient-to-br from-orange-50 to-amber-50 p-3 ${isMobile ? 'h-36' : 'h-44'}`}>
          <img 
            src={step.image} 
            alt={step.title}
            className="w-full h-full object-contain rounded-lg transition-transform duration-400 group-hover:scale-105"
            style={{ 
              objectPosition: 'center'
            }}
          />
          {/* Step Number Badge */}
          <div className={`absolute top-2 right-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-r ${step.accent} flex items-center justify-center shadow-md transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
            <span className="text-white font-bold text-xs lg:text-sm">{step.id}</span>
          </div>
          
          {/* Click Indicator */}
          <div className={`absolute top-2 left-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-300 ${isExpanded ? 'bg-orange-500 text-white' : 'group-hover:bg-orange-100'}`}>
            <svg className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        
        {/* Content */}
        <div className={`${isMobile ? 'p-2.5' : 'p-4'}`}>
          <div className="flex items-center mb-2">
            <div className={`${isMobile ? 'w-7 h-7' : 'w-10 h-10'} rounded-full bg-gradient-to-r ${step.accent} flex items-center justify-center ${isMobile ? 'text-sm' : 'text-lg'} mr-2 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-orange-800 ${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>{step.title}</h3>
              <p className={`text-orange-600 ${isMobile ? 'text-xs' : 'text-xs'}`}>Step {step.id}/7</p>
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="mt-2">
            <div className="w-full bg-orange-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${step.accent} h-1.5 rounded-full transition-all duration-500 ${isActive ? 'animate-pulse' : ''}`}
                style={{ width: isActive ? '100%' : '30%' }}
              ></div>
            </div>
          </div>
          
          {/* Click to Expand Hint */}
          <div className={`mt-2 text-center transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-60 group-hover:opacity-100'}`}>
            <span className={`text-orange-600 font-medium ${isMobile ? 'text-xs' : 'text-xs'}`}>
              {isExpanded ? 'Click to close' : 'Click to explore'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dynamic Step Detail Panel Component
function StepDetailPanel({ step, onClose, isMobile = false }) {
  return (
    <div className={`bg-white/98 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-2xl border border-orange-200 overflow-hidden animate-in slide-in-from-top duration-500`}>
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'}`}>
        {/* Image Section */}
        <div className={`${isMobile ? 'w-full' : 'lg:w-2/5'} relative bg-gradient-to-br from-orange-50 to-amber-50 p-4 lg:p-6`}>
          <div className={`relative ${isMobile ? 'h-48' : 'h-64 lg:h-80'} rounded-2xl overflow-hidden shadow-lg bg-white group`}>
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              style={{ objectPosition: 'center' }}
            />
            
            {/* Clean corner indicator */}
            <div className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r ${step.accent} flex items-center justify-center text-white text-lg shadow-lg`}>
              {step.icon}
            </div>
            
            {/* Subtle step number */}
            <div className="absolute top-3 left-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <span className="text-orange-800 font-bold text-sm">{step.id}</span>
            </div>
          </div>
          
          {/* Step info moved below image */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-orange-200">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-r ${step.accent} text-white mr-3 shadow-sm`}>
                {step.icon}
              </div>
              <div className="text-left">
                <span className="text-orange-600 font-medium text-sm">Step {step.id}/7</span>
                <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-orange-800`}>{step.title}</h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className={`${isMobile ? 'w-full' : 'lg:w-3/5'} p-4 lg:p-6`}>
          {/* Close Button */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="font-semibold text-orange-600 text-lg">Process Details</span>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-300 group"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <p className={`text-gray-700 leading-relaxed ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>
              {step.detail}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-0.5 bg-orange-500 mr-3"></div>
              <span className="font-semibold text-orange-600 text-lg">Quality Metrics</span>
            </div>
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 lg:p-5 rounded-xl border border-orange-200 shadow-inner">
              <p className={`text-orange-800 font-medium ${isMobile ? 'text-sm' : 'text-base lg:text-lg'}`}>{step.stats}</p>
            </div>
          </div>
          
          {/* Navigation Hint */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Click on other steps to explore the complete process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}