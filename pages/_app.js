// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "../styles/performance.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Performance optimizations on mount
  useEffect(() => {
    // Enable smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    // Enable GPU acceleration for animations
    document.body.classList.add('gpu-accelerated');
  }, []);

  // Enhanced route change handling with smooth transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Add loading state
      document.body.classList.add('page-loading');
    };

    const handleRouteChangeComplete = () => {
      // Smooth scroll to top with easing
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Remove loading state
      document.body.classList.remove('page-loading');
      
      // Focus management for accessibility
      const main = document.querySelector('main');
      if (main) {
        main.focus({ preventScroll: true });
      }
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router.events]);

  // Page transition variants for 120fps smoothness
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3
  };

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.asPath}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="will-change-transform"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
