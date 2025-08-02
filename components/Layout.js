
// components/Layout.js
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content" className="w-full" tabIndex="-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}