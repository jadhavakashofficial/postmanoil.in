// pages/index.js
import SEO from '../components/SEO';
import { generateOrganizationSchema, generateWebPageSchema, generateLocalBusinessSchema, generateFAQSchema } from '../utils/structuredData';
import HeroSection from "../components/HeroSection";
import PostmanOilCategories from "../components/PostmanOilCategories";
import HowOilIsMade from "../components/HowOilIsMade";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutUsSection from "../components/AboutUsSection";
import WhyChoosePostman from "../components/WhyChoosePostman";
import CustomerReviews from "../components/CustomerReviews";
import PostmanRecipes from "../components/PostmanRecipes";
import ContactForms from "../components/ContactForms";

export default function Home() {
  const faqs = [
    {
      question: "What makes Postman Oil different from other cooking oils?",
      answer: "Postman Oils has been manufacturing premium quality cooking oils since 1967. We use traditional cold-pressed methods (Kachi Ghani) to preserve nutrients and natural flavor. Our 58+ years of experience ensures consistent quality and purity."
    },
    {
      question: "Where can I buy Postman Oil online?",
      answer: "Postman Oils are available on major e-commerce platforms including Amazon India, Flipkart, and JioMart. You can also contact us directly for bulk orders and dealership inquiries."
    },
    {
      question: "What types of cooking oils does Postman manufacture?",
      answer: "We manufacture three main types of cooking oils: Cold-pressed Mustard Oil (Kachi Ghani), Groundnut Oil (Peanut Oil), and Refined Groundnut Oil. All our oils are premium quality and free from adulteration."
    },
    {
      question: "Is Postman Oil healthy for daily cooking?",
      answer: "Yes, Postman Oils are ideal for daily cooking. Our cold-pressed oils retain nutrients, vitamins, and antioxidants. They are made using traditional methods without preservatives, making them a healthy choice for your family."
    }
  ];

  const webPageSchema = generateWebPageSchema({
    title: "Postman Oils - Premium Cooking Oil Since 1967",
    description: "Experience the legacy of purity with Postman Oils. Premium cold-pressed mustard oil, groundnut oil & refined oil manufacturer since 1967.",
    url: "https://postmanoil.com",
    mainEntity: generateOrganizationSchema()
  });

  return (
    <>
      <SEO 
        title="Postman Oils - Premium Cooking Oil Manufacturer Since 1967 | Mittal Oils"
        description="Postman Oils (Mittal Oils) - Leading edible oil manufacturer. Buy Postman Oil online - Premium mustard oil, groundnut oil & refined oil. Postmanoils trusted by millions since 1967."
        keywords="postman oils, postman oil, postmanoils, mittal oils, edible oils, postman mustard oil, postman groundnut oil, postman refined oil, cooking oil, edible oil, kacchi ghani mustard oil, filtered groundnut oil, refined cooking oil, postman oil online, postman oils amazon, postman oil flipkart, mittal oil mills, postmanoils brand, premium cooking oil, healthy edible oil, traditional oil manufacturer, wood pressed oil, cold pressed oil, sarson ka tel, mungfali ka tel, postman oil price, postman oil 15 litre, postman oil 5 litre, postman oil 1 litre"
        image="https://postmanoil.com/blog/wp-content/uploads/2025/06/Logo.png"
        url="https://postmanoil.com"
        type="website"
        schemaData={webPageSchema}
        additionalSchemas={[
          generateOrganizationSchema(),
          generateLocalBusinessSchema(),
          generateFAQSchema(faqs),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://postmanoil.com",
            "name": "Postman Oils - Mittal Oils",
            "alternateName": ["Postmanoils", "Postman Oil", "Mittal Oil Mills"],
            "description": "Official website of Postman Oils - Premium edible oil manufacturer",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://postmanoil.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      <HeroSection />
      <PostmanOilCategories />
      <FeaturedProducts />
      <HowOilIsMade />
      <AboutUsSection />
      <WhyChoosePostman />
      <CustomerReviews />
      <PostmanRecipes />
      <ContactForms />
    </>
  );
}