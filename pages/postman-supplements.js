import { useState } from 'react';
import Head from 'next/head';

export default function PremiumSupplements() {
  const supplements = [
    {
      id: 'mustard-doc',
      name: "Mustard DOC",
      description: "A protein-rich feed supplement made from mustard seeds after oil extraction",
      benefits: [
        "Boosts livestock immunity",
        "Enhances growth and vitality",
        "Ideal for cattle and poultry"
      ],
      icon: "🐄",
      imageUrl: "https://postmanoil.com/blog/wp-content/uploads/2025/05/IMG_8533-scaled.jpg"
    },
    {
      id: 'mustard-cake',
      name: "Mustard Cake",
      description: "A powerful dual-purpose supplement for soil and livestock",
      benefits: [
        "Works as a natural fertilizer to improve soil fertility",
        "Serves as a nutrient-rich animal feed",
        "Organic and eco-friendly"
      ],
      icon: "🌱",
      imageUrl: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_8726-1-scaled.jpg"
    },
    {
      id: 'groundnut-cake',
      name: "Groundnut Cake",
      description: "High-energy feed extracted from cold-pressed groundnut oil production",
      benefits: [
        "Promotes weight gain and milk production",
        "Strengthens animal health",
        "Supports sustained livestock productivity"
      ],
      icon: "🥜",
      imageUrl: "https://postmanoil.com/blog/wp-content/uploads/2025/06/IMG_6416-scaled.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-lime-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-lime-200 rounded-full blur-3xl"></div>
      </div>
      
      <Head>
        <title>Industry Supplements | Postman Oils</title>
        <meta name="description" content="High-quality organic supplements for livestock and agriculture - Mustard DOC, Mustard Cake, and Groundnut Cake." />
        <link rel="canonical" href="https://www.postmanoil.com/postman-supplements" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-6 text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Industry Supplements
            </span>
          </h1>
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 h-1 w-20 rounded-full"></div>
          </div>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            High-quality organic supplements for livestock and agriculture from our oil extraction process
          </p>
        </div>

        <div className="pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {supplements.map((supplement) => (
              <div key={supplement.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-100 to-yellow-100">
                  <img
                    src={supplement.imageUrl}
                    alt={supplement.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-3 rounded-full shadow-lg border-2 border-white/20">
                    <span className="text-2xl drop-shadow-sm">{supplement.icon}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    PREMIUM
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <div className="flex items-center mb-3">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 bg-clip-text text-transparent">{supplement.name}</h2>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed font-medium">{supplement.description}</p>
                  
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-amber-800 flex items-center">
                      <span className="text-green-500 mr-2">✨</span>
                      Key Benefits:
                    </h3>
                    <ul className="space-y-2">
                      {supplement.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-5 h-5 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-xl"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-indigo-300 to-blue-300 rounded-full blur-lg"></div>
                    </div>
                    <div className="relative flex items-center">
                      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white p-2 rounded-lg mr-3 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-800 text-sm flex items-center">
                          <span className="mr-1">🏆</span>
                          Quality Assured
                        </h4>
                        <p className="text-blue-600 text-xs font-medium">Lab-tested for purity and nutrition</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-6 md:p-8 bg-gradient-to-r from-amber-50 to-yellow-50">
              <h2 className="text-2xl font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Why Choose Postman Supplements?
                </span>
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-xl p-4 border-2 border-green-200 shadow-lg transition-transform duration-300 hover:scale-105 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full blur-lg opacity-50"></div>
                  <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-2">Pure & Organic</h3>
                  <p className="text-xs text-green-700 font-medium">Made from natural by-products with no additives</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-lg transition-transform duration-300 hover:scale-105 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-lg opacity-50"></div>
                  <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Lab-Tested</h3>
                  <p className="text-xs text-blue-700 font-medium">Rigorous testing ensures quality and nutrition</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-xl p-4 border-2 border-orange-200 shadow-lg transition-transform duration-300 hover:scale-105 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-orange-300 to-red-300 rounded-full blur-lg opacity-50"></div>
                  <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-orange-800 mb-2">Farmer-Trusted</h3>
                  <p className="text-xs text-orange-700 font-medium">Decades of proven results nationwide</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 shadow-lg transition-transform duration-300 hover:scale-105 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-yellow-300 to-amber-300 rounded-full blur-lg opacity-50"></div>
                  <div className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-3 mx-auto shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-amber-800 mb-2">Proven Results</h3>
                  <p className="text-xs text-amber-700 font-medium">Enhanced livestock health and crop yields</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-center text-amber-800 mb-6">
                Trusted by Farmers Nationwide
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-green-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-xl opacity-60"></div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm shadow-lg">
                      RK
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800 text-sm">Rajesh Kumar</h4>
                      <p className="text-xs text-green-600">Dairy Farmer, Rajasthan</p>
                    </div>
                  </div>
                  <p className="text-green-700 italic text-sm font-medium relative z-10">
                    "Postman Mustard DOC improved my cattle's health dramatically. Milk production increased by 15%!"
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-xl opacity-60"></div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm shadow-lg">
                      PS
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 text-sm">Priya Sharma</h4>
                      <p className="text-xs text-blue-600">Organic Farmer, Punjab</p>
                    </div>
                  </div>
                  <p className="text-blue-700 italic text-sm font-medium relative z-10">
                    "Mustard Cake transformed my soil quality. Wheat yield increased by 20% without chemicals."
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-xl p-4 border-2 border-orange-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-xl opacity-60"></div>
                  <div className="flex items-center mb-3">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm shadow-lg">
                      VM
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-800 text-sm">Vikram Mehta</h4>
                      <p className="text-xs text-orange-600">Poultry Farm Owner, Haryana</p>
                    </div>
                  </div>
                  <p className="text-orange-700 italic text-sm font-medium relative z-10">
                    "Groundnut Cake significantly improved weight gain in my chickens. Quality is unmatched!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}