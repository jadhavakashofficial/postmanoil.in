
// components/Layout.js
import { useEffect } from 'react';
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Skip to content with '1' key
      if (e.key === '1' && e.altKey) {
        const main = document.getElementById('main-content');
        if (main) {
          main.focus();
          main.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      
      // Skip to navigation with '2' key
      if (e.key === '2' && e.altKey) {
        const nav = document.querySelector('nav');
        if (nav) {
          const firstLink = nav.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }
      
      // Skip to footer with '3' key
      if (e.key === '3' && e.altKey) {
        const footer = document.getElementById('footer');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const firstLink = footer.querySelector('a');
          if (firstLink) firstLink.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Accessibility announcement region */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        id="aria-live-region"
      />
      
      {/* Skip links for accessibility */}
      <nav className="skip-links" aria-label="Skip links">
        <a 
          href="#main-content" 
          className="skip-to-content"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <a 
          href="#navigation" 
          className="skip-to-content"
          aria-label="Skip to navigation"
        >
          Skip to navigation
        </a>
        <a 
          href="#footer" 
          className="skip-to-content"
          aria-label="Skip to footer"
        >
          Skip to footer
        </a>
      </nav>

      {/* Keyboard shortcuts help */}
      <div className="sr-only" aria-label="Keyboard shortcuts">
        <h2>Keyboard Shortcuts</h2>
        <ul>
          <li>Alt + 1: Skip to main content</li>
          <li>Alt + 2: Skip to navigation</li>
          <li>Alt + 3: Skip to footer</li>
        </ul>
      </div>
      
      <Header />
      
      <main 
        id="main-content" 
        className="w-full gpu-accelerated" 
        tabIndex="-1"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      
      <Footer />
      
      {/* Back to top button for accessibility */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 hidden md:block"
        aria-label="Back to top"
        id="back-to-top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}