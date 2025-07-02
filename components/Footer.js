// components/Footer.js
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState(5425);
  const [isCounterAnimating, setIsCounterAnimating] = useState(false);
  const [lastUpdateHour, setLastUpdateHour] = useState(null);

  // Enhanced visitor counter with deterministic hourly increments (same for all users)
  useEffect(() => {
    const calculateVisitorCount = () => {
      const baseCount = 5425;
      const baseDate = new Date('2025-07-02T00:00:00Z'); // Fixed reference date
      const currentDate = new Date();
      
      // Calculate hours passed since base date
      const hoursPassed = Math.floor((currentDate - baseDate) / (1000 * 60 * 60));
      
      let totalIncrement = 0;
      
      // Generate consistent increments for each hour using a seed-based approach
      for (let i = 0; i < hoursPassed; i++) {
        // Use hour index as seed for consistent random generation
        const seed = (baseDate.getTime() + i * 3600000) / 1000000;
        const pseudoRandom = (seed * 9301 + 49297) % 233280;
        const increment = Math.floor((pseudoRandom / 233280) * 9) + 1; // 1-9
        totalIncrement += increment;
      }
      
      return baseCount + totalIncrement;
    };

    const updateVisitorCount = () => {
      const currentHour = new Date().getHours();
      const newCount = calculateVisitorCount();
      
      // Check if we're in a new hour
      if (lastUpdateHour !== null && currentHour !== lastUpdateHour && newCount > visitorCount) {
        setIsCounterAnimating(true);
        
        setTimeout(() => {
          setVisitorCount(newCount);
          setTimeout(() => setIsCounterAnimating(false), 500);
        }, 300);
      } else if (lastUpdateHour === null) {
        // Initial load
        setVisitorCount(newCount);
      }
      
      setLastUpdateHour(currentHour);
    };

    // Check every minute for hour changes
    const interval = setInterval(updateVisitorCount, 60000);
    updateVisitorCount(); // Initial check

    return () => clearInterval(interval);
  }, [lastUpdateHour, visitorCount]);

  return (
    <footer id="footer" className="bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 mt-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-400 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Desktop Layout: 3 Columns */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-16 lg:items-start">
          
          {/* Left Column: Company + Counter */}
          <div className="space-y-8">
            <div className="group">
              <img
                src="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png"
                alt="Postman Oils"
                className="h-14 w-auto mb-4 transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-gray-700 text-sm leading-relaxed font-medium">
                Experience the legacy of purity and tradition with Postman Oils – trusted by Indian families for over five decades.
              </p>
            </div>

            {/* Enhanced Visitor Counter */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-xl blur-sm opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl p-4 text-center shadow-2xl border border-orange-200 transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
                <div className="text-white text-xs font-bold mb-3 tracking-wider uppercase">
                  🔥 Live Visitor Count 🔥
                </div>
                <div className="flex justify-center space-x-1.5">
                  {visitorCount.toString().split('').map((digit, index) => (
                    <div
                      key={index}
                      className={`bg-black text-orange-300 font-bold text-lg px-2 py-2 rounded-lg border-2 border-orange-400 min-w-[32px] text-center shadow-lg transform transition-all duration-500 ${
                        isCounterAnimating ? 'animate-bounce scale-110' : 'hover:scale-110'
                      }`}
                      style={{
                        boxShadow: '0 0 20px rgba(251, 146, 60, 0.5), inset 0 0 10px rgba(251, 146, 60, 0.2)'
                      }}
                    >
                      {digit}
                    </div>
                  ))}
                </div>
                <div className="text-orange-200 text-xs mt-2 font-medium">
                  Updates every hour ⏰
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column: Links */}
          <div className="grid grid-cols-2 gap-10">
            {/* Products */}
            <div className="group">
              <h3 className="text-orange-700 font-bold text-lg mb-4 relative transition-colors duration-300 group-hover:text-orange-600">
                Products
                <div className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-16"></div>
              </h3>
              <ul className="space-y-3">
                <li><Link href="/refined-groundnut-oil" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">🥜 Refined Groundnut Oil</Link></li>
                <li><Link href="/groundnut-oil" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">🌰 Groundnut Filtered Oil</Link></li>
                <li><Link href="/mustard-oil" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">🌿 Kacchi Ghani Mustard Oil</Link></li>
              </ul>
              
              {/* Enhanced Social Icons */}
              <div className="mt-6">
                <h4 className="text-orange-700 font-semibold text-sm mb-3">Follow Our Journey</h4>
                <div className="flex space-x-3">
                  <a href="https://www.linkedin.com/company/postmanoil/" target="_blank" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl group">
                    <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61565820218513" target="_blank" className="bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl group">
                    <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/postmanoil.in" target="_blank" className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 p-3 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl group">
                    <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="group">
              <h3 className="text-orange-700 font-bold text-lg mb-4 relative transition-colors duration-300 group-hover:text-orange-600">
                Quick Links
                <div className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-16"></div>
              </h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">🏠 Home</Link></li>
                <li><Link href="/postman-recipes" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">👨‍🍳 Recipes</Link></li>
                <li><Link href="/privacy-policy" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">🔒 Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">📋 Terms & Conditions</Link></li>
                <li><Link href="/connect-for-dealership" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">📞 Contact Us</Link></li>
                <li><Link href="/about-us" className="text-gray-700 hover:text-orange-600 transition-all duration-300 text-sm font-medium hover:translate-x-2 block hover:bg-orange-50 hover:px-2 hover:py-1 hover:rounded-md">ℹ️ About Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact */}
          <div className="group">
            <h3 className="text-orange-700 font-bold text-lg mb-4 relative transition-colors duration-300 group-hover:text-orange-600">
              Contact Info
              <div className="absolute bottom-0 left-0 w-10 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-300 group-hover:w-16"></div>
            </h3>
            
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-all duration-300 group/item">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full flex-shrink-0 mt-1 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold text-sm">📍 Address</p>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    Mittal Oil Mills (Pvt.) Ltd.<br />
                    H-1, 87-94, RIICO Industrial Area,<br />
                    Jaipur Road, Kekri 305404,<br />
                    District Ajmer, Rajasthan, India.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-all duration-300 group/item">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-full flex-shrink-0 mt-1 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold text-sm">📧 Email</p>
                  <a href="mailto:marketingpostmanoil@gmail.com" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium hover:underline">
                    marketingpostmanoil@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-all duration-300 group/item">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-full flex-shrink-0 mt-1 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-orange-700 font-semibold text-sm">📞 Phone</p>
                  <div className="text-gray-700 text-sm space-y-1 font-medium">
                    <p className="hover:text-orange-600 transition-colors">Anil: 9928021482</p>
                    <p className="hover:text-orange-600 transition-colors">Sanjay: 9214044288</p>
                    <p className="hover:text-orange-600 transition-colors">Pakshik: 9529808832</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Enhanced Accordion Style */}
        <div className="lg:hidden">
          {/* Company Info - Always Visible */}
          <div className="text-center mb-8">
            <img
              src="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png"
              alt="Postman Oils"
              className="h-12 w-auto mx-auto mb-4 transition-transform duration-300 hover:scale-105"
            />
            <p className="text-gray-700 text-sm px-4 font-medium leading-relaxed">
              Trusted by Indian families for over five decades.
            </p>
          </div>

          {/* Enhanced Mobile Visitor Counter */}
          <div className="relative mx-4 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-xl blur-sm opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl p-4 text-center shadow-2xl border border-orange-200">
              <div className="text-white text-xs font-bold mb-3 tracking-wider">🔥 LIVE VISITOR COUNT 🔥</div>
              <div className="flex justify-center space-x-1">
                {visitorCount.toString().split('').map((digit, index) => (
                  <div
                    key={index}
                    className={`bg-black text-orange-300 font-bold text-base px-2 py-1.5 rounded-lg border-2 border-orange-400 min-w-[28px] text-center shadow-lg transition-all duration-500 ${
                      isCounterAnimating ? 'animate-bounce scale-110' : ''
                    }`}
                    style={{
                      boxShadow: '0 0 15px rgba(251, 146, 60, 0.4), inset 0 0 8px rgba(251, 146, 60, 0.2)'
                    }}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <div className="text-orange-200 text-xs mt-2 font-medium">Updates hourly ⏰</div>
            </div>
          </div>

          {/* Compact Links Grid */}
          <div className="grid grid-cols-2 gap-8 px-4 mb-8">
            {/* Products */}
            <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <h3 className="text-orange-700 font-bold text-base mb-3">🥜 Products</h3>
              <ul className="space-y-2">
                <li><Link href="/refined-groundnut-oil" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">Refined Oil</Link></li>
                <li><Link href="/groundnut-oil" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">Filtered Oil</Link></li>
                <li><Link href="/mustard-oil" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">Mustard Oil</Link></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <h3 className="text-orange-700 font-bold text-base mb-3">🔗 Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">Home</Link></li>
                <li><Link href="/postman-recipes" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">Recipes</Link></li>
                <li><Link href="/about-us" className="text-gray-700 text-sm hover:text-orange-600 transition-colors font-medium block hover:translate-x-1">About Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="px-4">
            <div className="bg-white rounded-xl p-4 shadow-xl border border-orange-100">
              <h3 className="text-orange-700 font-bold text-base mb-4">📞 Contact & Follow</h3>
              
              <div className="text-sm text-gray-700 mb-4 space-y-2 font-medium">
                <p>📍 Kekri, Rajasthan, India</p>
                <p>📧 marketingpostmanoil@gmail.com</p>
                <p>📞 9928021482 | 9214044288</p>
              </div>

              {/* Enhanced Mobile Social Icons */}
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/company/postmanoil/" target="_blank" className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61565820218513" target="_blank" className="bg-gradient-to-r from-blue-800 to-blue-900 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/postmanoil.in" target="_blank" className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Footer */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-20 h-20 bg-orange-500 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-red-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div className="text-sm text-gray-300 mb-3 sm:mb-0 font-medium">
              © {new Date().getFullYear()} Mittal Oils Pvt Ltd. Crafted with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/classictechak/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 font-semibold transition-all duration-300 hover:underline hover:scale-105 inline-block"
              >
                Akash Jadhav
              </a>
            </div>
            <div className="flex space-x-4 text-sm">
              <Link href="/terms-and-conditions" className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium hover:scale-105 hover:underline">
                Terms
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/privacy-policy" className="text-gray-300 hover:text-orange-400 transition-all duration-300 font-medium hover:scale-105 hover:underline">
                Privacy
              </Link>
            </div>
          </div>
          
          {/* Additional brand tagline */}
          <div className="text-center mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400 font-medium">
              🌟 Purity in Every Drop • Tradition in Every Bottle 🌟
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}