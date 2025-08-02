import Head from 'next/head';
import Link from 'next/link';
import SEO from '../components/SEO';
import { generateWebPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '../utils/structuredData';
import { getImageSEO, generateImageSchema } from '../utils/imageSEO';

export default function CertificationsPage() {
  const certifications = [
    {
      id: 1,
      name: "Government of India Trademark",
      description: "Registered trademark under the Government of India, ensuring brand authenticity and legal protection for Postman Oils products.",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/1.png",
      category: "Legal"
    },
    {
      id: 2,
      name: "TCCPL Certification",
      description: "Certified by TCCPL for quality standards and manufacturing excellence.",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/2.png",
      category: "Quality"
    },
    {
      id: 3,
      name: "FSSAI License",
      description: "Food Safety and Standards Authority of India certified, ensuring our oils meet the highest food safety standards.",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/3.png",
      category: "Food Safety"
    },
    {
      id: 4,
      name: "ISO Certification",
      description: "ISO certified for maintaining international quality management standards in our manufacturing processes.",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/4.png",
      category: "International Standards"
    },
    {
      id: 5,
      name: "HACCP Certification",
      description: "Hazard Analysis and Critical Control Points certified, ensuring systematic preventive approach to food safety.",
      image: "https://postmanoil.com/blog/wp-content/uploads/2025/08/5.png",
      category: "Food Safety"
    }
  ];

  const breadcrumbItems = [
    { name: 'Home', url: 'https://postmanoil.com' },
    { name: 'About', url: 'https://postmanoil.com/about-us' },
    { name: 'Certifications', url: 'https://postmanoil.com/certifications' }
  ];

  const webPageSchema = generateWebPageSchema({
    title: "Postman Oils Certifications - Quality Assured Since 1967",
    description: "View all Postman Oils certifications including FSSAI, ISO, HACCP, Government trademark. 58+ years of certified quality.",
    url: "https://postmanoil.com/certifications"
  });

  const imageSchemas = certifications.map(cert => generateImageSchema(
    cert.image,
    `certification-${cert.name.toLowerCase().replace(/\s+/g, '-')}`,
    cert.name
  ));

  return (
    <>
      <SEO 
        title="Postman Oils Certifications - Quality Assured | Mittal Oils"
        description="View Postman Oil certifications including FSSAI, ISO, HACCP, Government trademark. Postmanoils by Mittal Oils - 58+ years of certified quality and trust in edible oil manufacturing."
        keywords="postman oils certifications, postman oil certificates, postmanoils quality, mittal oils certifications, fssai certified oil, iso certified cooking oil, haccp certification, government trademark, edible oil certifications, cooking oil quality certificates, food safety certification, postman oil fssai, postmanoils iso, mittal oil mills certification"
        image="https://postmanoil.com/blog/wp-content/uploads/2025/08/1.png"
        url="https://postmanoil.com/certifications"
        type="website"
        schemaData={webPageSchema}
        additionalSchemas={[
          generateOrganizationSchema(),
          generateBreadcrumbSchema(breadcrumbItems),
          ...imageSchemas
        ]}
      />

      {/* Compact Header Section */}
      <section className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 py-3 md:py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
            Our Certifications
          </h1>
        </div>
      </section>

      {/* Quality Badge */}
      <section className="py-6 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full shadow-lg">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-lg">Quality Assured Since 1967</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-12 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Layout: 2 columns + full width for 5th */}
          <div className="block md:hidden">
            {/* First 4 cards in 2 columns */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              {certifications.slice(0, 4).map((cert) => (
                <div 
                  key={cert.id} 
                  className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:border-orange-400 group transform hover:-translate-y-2"
                >
                <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-yellow-100 to-orange-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                  <img
                    src={cert.image}
                    {...getImageSEO('certification', cert.name)}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {cert.category}
                    </span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-b from-white to-orange-50">
                  <h3 className="text-sm sm:text-base lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 lg:mb-3">{cert.name}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{cert.description}</p>
                </div>
                </div>
              ))}
            </div>
            
            {/* 5th card full width */}
            {certifications.length === 5 && (
              <div className="w-full">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:border-orange-400 group transform hover:-translate-y-2">
                  <div className="relative h-32 sm:h-40 bg-gradient-to-br from-yellow-100 to-orange-100 p-4 sm:p-6 flex items-center justify-center">
                    <img
                      src={certifications[4].image}
                      {...getImageSEO('certification', certifications[4].name)}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {certifications[4].category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-b from-white to-orange-50">
                    <h3 className="text-sm sm:text-base font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">{certifications[4].name}</h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{certifications[4].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Layout: 3 columns grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-orange-200 hover:border-orange-400 group transform hover:-translate-y-2"
              >
                <div className="relative h-40 lg:h-48 bg-gradient-to-br from-yellow-100 to-orange-100 p-6 lg:p-8 flex items-center justify-center">
                  <img
                    src={cert.image}
                    {...getImageSEO('certification', cert.name)}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {cert.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 lg:p-6 bg-gradient-to-b from-white to-orange-50">
                  <h3 className="text-base lg:text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 lg:mb-3">{cert.name}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gradient-to-r from-orange-100 via-yellow-100 to-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-8">
            What Our Certifications Mean For You
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Guaranteed Quality</h3>
              <p className="text-gray-600 text-xs md:text-sm px-2 md:px-0">Every batch tested and certified for purity</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Food Safety</h3>
              <p className="text-gray-600 text-xs md:text-sm px-2 md:px-0">FSSAI & HACCP certified processes</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Global Standards</h3>
              <p className="text-gray-600 text-xs md:text-sm px-2 md:px-0">ISO certified manufacturing</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">Legal Protection</h3>
              <p className="text-gray-600 text-xs md:text-sm px-2 md:px-0">Government registered trademark</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trademark Warning Section */}
      <section className="py-12 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto px-4">
          {/* Professional Warning Box */}
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-red-600">
            {/* Animated warning stripes */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #f97316, #f97316 10px, #fbbf24 10px, #fbbf24 20px)',
                animation: 'slide 20s linear infinite'
              }}></div>
            </div>
            
            {/* Professional Red Warning Header */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 p-3 sm:p-4 relative overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
              }}></div>
              <div className="relative z-10 flex items-center justify-center">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider">
                    TRADEMARK PROTECTION NOTICE
                  </h2>
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Warning content */}
            <div className="p-8 relative z-10">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                <div className="text-center mb-6">
                  <p className="text-gray-800 text-lg font-semibold mb-2">
                    All trademarks, certifications, and brand elements are the exclusive property of
                  </p>
                  <p className="text-2xl font-black text-orange-600">
                    Mittal Oil Mills (Pvt.) Ltd.
                  </p>
                </div>
                
                <div className="relative mb-6">
                  {/* Professional Red Alert Box */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur opacity-75"></div>
                  <div className="relative bg-white border border-red-200 rounded-lg p-4 sm:p-5">
                    <div className="flex items-center justify-center mb-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                      <p className="text-red-700 font-black text-base sm:text-lg px-4 tracking-wide">
                        LEGAL ACTION WARNING
                      </p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
                    </div>
                    <p className="text-gray-700 text-center text-sm sm:text-base leading-relaxed">
                      Unauthorized use, reproduction, or copying of these trademarks will result in
                    </p>
                    <div className="mt-3 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-md text-center shadow-lg">
                      <span className="font-black text-base sm:text-lg tracking-wide">IMMEDIATE LEGAL ACTION</span>
                    </div>
                    <p className="text-center mt-3 text-xs sm:text-sm text-gray-600">
                      Under the Indian Trademark Act and applicable laws
                    </p>
                    <p className="text-center mt-2 font-bold text-red-800 text-sm">
                      Criminal prosecution to the fullest extent of law
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 px-3 sm:px-4 py-2 rounded-lg border border-green-400 shadow-sm">
                    <span className="text-green-800 font-bold text-xs sm:text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Govt. Registered
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-3 sm:px-4 py-2 rounded-lg border border-blue-400 shadow-sm">
                    <span className="text-blue-800 font-bold text-xs sm:text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                      </svg>
                      Protected by Law
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-3 sm:px-4 py-2 rounded-lg border border-orange-400 shadow-sm">
                    <span className="text-orange-800 font-bold text-xs sm:text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Court Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(28px); }
          }
        `}</style>
      </section>
    </>
  );
}