import React from "react";
import Hero from "../components/Hero";
import FeatureSection from "../components/FeatureSection";
import ExploreMenu from "../components/ExploreProducts";
import BestSeller from "../components/BestSeller";
import FAQSection, { faqsData } from "../components/FAQSection";
import SEO from "../components/SEO";

const Home = () => {
  // Home Page Schemas: Organization, WebSite, and FAQPage
  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Usfah Industry",
      "url": "https://usfahindustry.com",
      "logo": "https://usfahindustry.com/android-chrome-192x192.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+92-346-0424486",
        "contactType": "customer service",
        "areaServed": "Global",
        "availableLanguage": ["English", "Urdu"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ugoki Road",
        "addressLocality": "Sialkot",
        "addressRegion": "Punjab",
        "postalCode": "51310",
        "addressCountry": "PK"
      },
      "sameAs": [
        "https://www.facebook.com/share/1ENJsxDC4L/?mibextid=wwXIfr",
        "https://www.instagram.com/usfah_industry"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Usfah Industry",
      "url": "https://usfahindustry.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://usfahindustry.com/products?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqsData.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <>
      <SEO
        title="Usfah Industry | Surgical, Dental & Beauty Instruments Manufacturer Sialkot"
        description="Usfah Industry is a premier manufacturer and exporter of ISO-certified surgical instruments, dental extracting forceps, root elevators, periodontal scalers, and beauty tools in Sialkot, Pakistan."
        keywords="surgical instruments manufacturer,
surgical instruments manufacturer Pakistan,
surgical instruments manufacturer Sialkot,
surgical instrument manufacturer,
surgical instruments supplier,
surgical instruments supplier Pakistan,
surgical instruments exporter,
surgical instruments exporter Pakistan,
surgical instrument manufacturer Sialkot Pakistan,
medical instruments manufacturer Pakistan,
surgical instruments factory Pakistan,
surgical instrument manufacturing,
surgical instruments manufacturing company,
surgical instrument supplier,
surgical instrument exporter,
surgical instruments wholesale,
surgical instruments Pakistan,
surgical instruments Sialkot,
medical instrument manufacturer,
medical instruments supplier"
        canonical="https://usfahindustry.com"
        schemaData={homeSchema}
      />
      <Hero />
      <ExploreMenu />
      <BestSeller />
      <FeatureSection />
      <FAQSection />
    </>
  );
};

export default Home;
