// Updated ContactForms.js for WordPress Backend
import { useState } from "react";

export default function ContactForms() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ success: false, message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit to PHP handler in blog directory
      const response = await fetch('https://postmanoil.com/blog/postman-contact-handler.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          formType: 'contact'
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ 
          success: true, 
          message: "Thank you! Your message has been sent successfully. Check your email for confirmation!" 
        });
        setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
      } else {
        setStatus({ 
          success: false, 
          message: result.message || "Failed to send message. Please try again." 
        });
      }
    } catch (error) {
      setStatus({ 
        success: false, 
        message: "Network error. Please check your connection and try again." 
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus({ success: false, message: "" }), 8000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subjectOptions = [
    "General Inquiry",
    "Product Information", 
    "Dealership Opportunity",
    "Bulk Orders",
    "Quality Concerns",
    "Partnership",
    "Other"
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-300 rounded-full" style={{ filter: 'blur(20px)' }}></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-300 rounded-full" style={{ filter: 'blur(20px)' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-white p-3 rounded-full shadow-xl border-4 border-orange-100">
                <img 
                  src="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png" 
                  alt="Postman Oil Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
            Get In Touch With Us
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Ready to experience the <span className="font-bold text-orange-600">purity and quality</span> of Postman Oil? 
            We're here to help.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-4"></div>
        </div>
            {/* Contact Form - Centered */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Send Us a Message</h2>
                  <p className="text-gray-600 mb-6 text-center">Fill out the form below and we'll get back to you as soon as possible.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-700"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                          <svg className="w-5 h-5 absolute right-4 top-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-700"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <svg className="w-5 h-5 absolute right-4 top-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Phone and Subject Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-700"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                          <svg className="w-5 h-5 absolute right-4 top-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Subject *
                        </label>
                        <div className="relative">
                          <select
                            name="subject"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-700 appearance-none cursor-pointer"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                          >
                            {subjectOptions.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          <svg className="w-5 h-5 absolute right-4 top-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 text-gray-700 resize-none"
                        placeholder="Tell us about your inquiry, requirements, or any questions you have about our products..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-4 px-8 rounded-xl font-bold text-white text-lg transition-all duration-300 transform ${
                          isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 hover:-translate-y-1 active:scale-95'
                        }`}
                        style={{
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Your Message...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            Send Message
                            <svg className="ml-3 w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </div>
                    
                    {/* Status Message */}
                    {status.message && (
                      <div className={`p-4 rounded-xl text-center font-medium border-2 ${
                        status.success 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        <div className="flex items-center justify-center">
                          {status.success ? (
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                          {status.message}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
      </div>
    </section>
  );
}