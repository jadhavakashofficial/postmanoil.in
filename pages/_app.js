// pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Reset scroll position on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
