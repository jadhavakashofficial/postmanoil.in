// pages/contact-us.js
import { useState } from 'react';
import Head from 'next/head';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-yellow-300 rounded-full blur-xl"></div>
      </div>

      <Head>
        <title>Contact Us | Postman Oils - Premium Cooking Oil Manufacturer</title>
        <meta name="description" content="Contact Postman Oils for premium cooking oil inquiries, dealership opportunities, and bulk orders. Call Anil Mittal +91-9928021482" />
        <meta name="keywords" content="contact postman oils, cooking oil supplier, dealership inquiry, bulk order" />
        <link rel="canonical" href="https://postmanoil.com/contact-us" />
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-8">
        
        {/* Hero Section */}
        <div className="text-center pb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Contact Postman Oils
            </span>
          </h1>
          <p className="text-base text-amber-800 font-medium max-w-2xl mx-auto">
            Get in touch with India's trusted cooking oil manufacturer
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 h-1 w-24 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="pb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden">
            
            {/* Contact Form Section - TOP */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-orange-50 to-amber-50">
              <h2 className="text-xl font-bold flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-sm">1</span>
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Send Us a Message
                </span>
              </h2>

              <div className="bg-white rounded-xl p-6 shadow-md border border-orange-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
                        <option value="">Select subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="dealership">Dealership</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="quality">Quality Concern</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-vertical"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 rounded-lg font-medium transition-all ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : submitStatus === 'success'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                      } text-white shadow-lg`}
                    >
                      {isSubmitting ? 'Sending...' : 
                       submitStatus === 'success' ? '✓ Message Sent!' : 
                       'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="p-6 md:p-8 border-b border-amber-100">
              <h2 className="text-xl font-bold flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-sm">2</span>
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Office */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-orange-800">Our Office</h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p className="font-medium">Mittal Oil Mills (Pvt.) Ltd.</p>
                    <p>H-1, 87-94, RIICO Industrial Area</p>
                    <p>Jaipur Road, Kekri 305404</p>
                    <p>District Ajmer, Rajasthan, India</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-orange-800">Call Us</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-gray-600 font-medium">Anil Mittal</p>
                      <a href="tel:+919928021482" className="text-orange-600 font-semibold hover:text-orange-700">
                        +91-9928021482
                      </a>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-gray-600 font-medium">Sanjay Mittal</p>
                      <a href="tel:+919214044288" className="text-orange-600 font-semibold hover:text-orange-700">
                        +91-9214044288
                      </a>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <p className="text-gray-600 font-medium">Pakshik Mittal</p>
                      <a href="tel:+919529808832" className="text-orange-600 font-semibold hover:text-orange-700">
                        +91-9529808832
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-orange-800">Email Us</h3>
                  </div>
                  <div className="bg-white/70 rounded-lg p-4">
                    <p className="text-gray-600 font-medium mb-2">Marketing Department</p>
                    <a 
                      href="mailto:marketingpostmanoil@gmail.com" 
                      className="text-orange-600 font-semibold hover:text-orange-700 break-all text-sm"
                    >
                      marketingpostmanoil@gmail.com
                    </a>
                    <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-amber-50 to-yellow-50">
              <h2 className="text-xl font-bold flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-sm">3</span>
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Why Choose Postman Oils?
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🏆</span>
                  </div>
                  <h3 className="font-bold text-orange-800 mb-2 text-center">Premium Quality</h3>
                  <p className="text-sm text-gray-600 text-center">Highest grade oils with authentic taste</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🌱</span>
                  </div>
                  <h3 className="font-bold text-orange-800 mb-2 text-center">Natural Process</h3>
                  <p className="text-sm text-gray-600 text-center">Traditional methods preserving goodness</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">✅</span>
                  </div>
                  <h3 className="font-bold text-orange-800 mb-2 text-center">Certified Quality</h3>
                  <p className="text-sm text-gray-600 text-center">FSSAI approved with quality checks</p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🚚</span>
                  </div>
                  <h3 className="font-bold text-orange-800 mb-2 text-center">Reliable Supply</h3>
                  <p className="text-sm text-gray-600 text-center">Consistent availability across regions</p>
                </div>
              </div>

              {/* Trust Stats */}
              <div className="mt-8 bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6 border border-orange-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-orange-800">55+</div>
                    <div className="text-sm text-gray-700">Years of Excellence</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-800">4</div>
                    <div className="text-sm text-gray-700">Generations of Expertise</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-800">100%</div>
                    <div className="text-sm text-gray-700">Pure & Organic</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}