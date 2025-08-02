import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://postmanoil.com" />
        <link rel="dns-prefetch" href="https://postmanoil.com" />
        
        {/* Meta tags for better SEO and performance */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#f97316" />
        
        {/* Preload critical images */}
        <link rel="preload" as="image" href="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png" />
        <link rel="preload" as="image" href="https://postmanoil.com/blog/wp-content/uploads/2025/05/1.png" />
        <link rel="preload" as="image" href="https://postmanoil.com/blog/wp-content/uploads/2025/05/2.png" />
        <link rel="preload" as="image" href="https://postmanoil.com/blog/wp-content/uploads/2025/05/3.png" />
      </Head>
      <body className="antialiased">
        {/* Noscript fallback */}
        <noscript>
          <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff3cd', color: '#856404' }}>
            This website requires JavaScript to function properly. Please enable JavaScript in your browser settings.
          </div>
        </noscript>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
