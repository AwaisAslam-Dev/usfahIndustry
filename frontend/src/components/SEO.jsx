import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_DOMAIN = 'https://usfahindustry.com';
const DEFAULT_IMAGE = 'https://usfahindustry.com/android-chrome-192x192.png';

const SEO = ({
  title = "Usfah Industry | Premium Surgical, Dental & Beauty Instruments Manufacturer",
  description = "Usfah Industry is a leading global manufacturer and exporter of ISO-certified surgical instruments, dental tools, beauty instruments, extracting forceps, root elevators, and scalers in Sialkot.",
  keywords = "surgical instruments, dental instruments, beauty tools, extracting forceps, root elevators, periodontal scalers, medical manufacturing Sialkot, stainless steel surgical tools, Usfah Industry",
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schemaData = null
}) => {
  // Normalize canonical URL to avoid trailing slash mismatch or duplicate paths
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const cleanPath = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath;
  const canonicalUrl = canonical || `${DEFAULT_DOMAIN}${cleanPath}`;

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${DEFAULT_DOMAIN}${ogImage}`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Usfah Industry" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Schema Markup (JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
