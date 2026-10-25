/**
 * injectCanonicalPlugin
 *
 * A lightweight Vite post-build plugin that generates a static index.html
 * for every route with <title>, <meta name="description">,
 * <link rel="canonical">, and Product JSON-LD schema baked into the HTML
 * at build time.
 *
 * This ensures crawlers that do not execute JavaScript (ahrefs, Bing, etc.)
 * still receive canonical tags and Product schema, eliminating:
 *   - "Duplicate pages without canonical"
 *   - "Product page missing Product schema"
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __rootDir = path.resolve(path.dirname(__filename), '..')

const DOMAIN = 'https://usfahindustry.com'
const DEFAULT_IMAGE = `${DOMAIN}/android-chrome-192x192.png`

// --------------------------------------------------------------------------
// Static pages (non-product, non-blog)
// Each includes an h1 field for the static HTML fallback.
// --------------------------------------------------------------------------
const staticPages = [
  {
    path: '/',
    title: 'Usfah Industry | Surgical & Dental Instruments Manufacturer',
    description: 'Usfah Industry is a leading global manufacturer and exporter of ISO-certified surgical instruments, dental tools, beauty instruments, and more from Sialkot.',
    h1: 'Usfah Industry â€” Premium Surgical, Dental & Beauty Instruments Manufacturer',
  },
  {
    path: '/about',
    title: 'About Usfah Industry | Surgical Instrument Manufacturer Sialkot',
    description: 'Learn about Usfah Industry, a trusted manufacturer and exporter of surgical, dental, and beauty instruments from Sialkot, Pakistan.',
    h1: 'Crafting Excellence in Medical Instruments',
  },
  {
    path: '/products',
    title: 'Surgical & Dental Instruments | Usfah Industry Products',
    description: 'Browse our full range of ISO-certified surgical scissors, dental forceps, beauty instruments, and more from Usfah Industry.',
    h1: 'Surgical and Dental Instruments Catalog',
  },
  {
    path: '/catalogue',
    title: 'Instruments Catalogue | Usfah Industry',
    description: 'Download or view the Usfah Industry product catalogue covering surgical, dental, and beauty instruments with full specifications.',
    h1: 'Surgical, Dental and Beauty Catalogue PDF',
  },
  {
    path: '/blog',
    title: 'Blog & Insights | Surgical Instrument Guide | Usfah Industry',
    description: 'Read articles, sterilization guides, dental forceps tips, and surgical stainless steel metallurgy insights from Usfah Industry.',
    h1: 'Usfah Industry Blog',
  },
  {
    path: '/contact',
    title: 'Contact Usfah Industry | Wholesale & Export Enquiries',
    description: 'Get in touch with Usfah Industry for wholesale pricing, OEM manufacturing, export enquiries, and product documentation.',
    h1: 'Connect With Usfah Industry',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Usfah Industry Surgical Instruments',
    description: 'Read the Usfah Industry privacy policy to understand how we collect, use, and protect your personal information.',
    h1: 'Privacy Policy',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Usfah Industry Surgical Instruments',
    description: 'Terms and conditions for using the Usfah Industry website, covering product orders, OEM manufacturing, export documentation, and instrument purchases.',
    h1: 'Terms & Conditions',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | Usfah Industry Surgical Instruments Manufacturer',
    description: 'Read the disclaimer for the Usfah Industry website regarding the accuracy and use of information provided.',
    h1: 'Product & Legal Disclaimer',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | Usfah Industry Surgical Instruments',
    description: 'Learn how Usfah Industry uses cookies on its website and how you can manage your cookie preferences.',
    h1: 'Cookie Policy',
  },
]

// --------------------------------------------------------------------------
// Blog posts
// --------------------------------------------------------------------------
const blogPosts = [
  {
    path: '/blog/complete-guide-surgical-scissors',
    title: 'Surgical Scissors Guide: Types, Uses & Manufacturing Standards',
    description: 'Explore Mayo, Metzenbaum, Iris, and Lister surgical scissors. Learn about AISI 420/440 stainless steel, TC gold handles, and ISO 13485 export standards.',
    h1: 'Complete Guide to Surgical Scissors: Types, Uses and Manufacturing Standards',
  },
  {
    path: '/blog/mayo-vs-metzenbaum-scissors',
    title: 'Mayo vs Metzenbaum Scissors: What\'s the Difference?',
    description: 'Mayo vs Metzenbaum scissors compared for design, blade strength, and when surgeons use each type. A clear guide for choosing the right instrument.',
    h1: 'Mayo vs Metzenbaum Scissors: What\'s the Difference?',
  },
  {
    path: '/blog/guide-dental-extracting-forceps',
    title: 'Guide to Dental Extracting Forceps: Anatomy, Patterns & Specs',
    description: 'Comprehensive guide to dental extracting forceps patterns, beak angles, hinge mechanics, AISI 420 steel, and ISO 13485 export standards for dental distributors.',
    h1: 'Guide to Dental Extracting Forceps: Anatomy, Patterns & Technical Specs',
  },
  {
    path: '/blog/surgical-instruments-sterilization-guide',
    title: 'Surgical Instruments Sterilization & Autoclave Care Protocol',
    description: 'Essential CSSD protocol for autoclaving surgical stainless steel, enzymatic cleaning, joint lubrication, EN 285 standards, and rust prevention.',
    h1: 'Surgical Instruments Sterilization & Autoclave Care Protocol',
  },
  {
    path: '/blog/what-are-metzenbaum-scissors-used-for',
    title: 'What Are Metzenbaum Scissors Used For? | Usfah Industry',
    description: 'Discover what Metzenbaum scissors are used for in surgery, including design features, tissue applications, blunt dissection, and sourcing standards.',
    h1: 'What Are Metzenbaum Scissors Used For?',
  },
  {
    path: '/blog/what-are-mayo-scissors-used-for',
    title: 'What Are Mayo Scissors Used For? | Usfah Industry',
    description: 'Learn what Mayo scissors are used for, their design characteristics, clinical applications, and key considerations when sourcing them.',
    h1: 'What Are Mayo Scissors Used For?',
  },
  {
    path: '/blog/straight-vs-curved-surgical-scissors',
    title: 'Straight vs Curved Surgical Scissors: Which Should You Choose?',
    description: 'Understand the difference between straight and curved surgical scissors, how blade shape affects handling, and which to choose for different procedures.',
    h1: 'Straight vs Curved Surgical Scissors: Which Should You Choose?',
  },
  {
    path: '/blog/tenotomy-scissors-types-uses',
    title: 'Tenotomy Scissors: Types, Uses and Buyer Considerations',
    description: 'Explore tenotomy scissors, their common variations and applications, and important considerations for buyers and medical instrument suppliers.',
    h1: 'Tenotomy Scissors: Types, Uses and Buyer Considerations',
  },
  {
    path: '/blog/spencer-stitch-scissors-guide',
    title: 'Spencer Stitch Scissors: Uses and Buying Guide',
    description: 'Learn about Spencer stitch scissors, their design, common uses, and key factors to consider when sourcing them from a manufacturer or supplier.',
    h1: 'Spencer Stitch Scissors: Uses and Buying Guide',
  },
  {
    path: '/blog/sharp-vs-blunt-surgical-scissors',
    title: 'Sharp vs Blunt Surgical Scissors: Understanding the Difference',
    description: 'Understand the difference between sharp and blunt surgical scissors and how these design characteristics relate to different applications.',
    h1: 'Sharp vs Blunt Surgical Scissors: Understanding the Difference',
  },
  {
    path: '/blog/iris-scissors-types-uses-and-applications',
    title: 'Iris Scissors: Types, Uses and Applications | Usfah Industry',
    description: 'Learn about Iris scissors, their fine blade design, surgical and ophthalmic applications, and what to look for when sourcing them.',
    h1: 'Iris Scissors: Types, Uses and Applications',
  },
]

// --------------------------------------------------------------------------
// Parse product data from src/assets/assets.js at build time.
// Extracts id, name, category, description for every product.
// --------------------------------------------------------------------------
function parseProducts() {
  const assetsPath = path.join(__rootDir, 'src', 'assets', 'assets.js')
  if (!fs.existsSync(assetsPath)) {
    console.warn('[inject-canonical] assets.js not found, skipping product schema.')
    return []
  }

  const content = fs.readFileSync(assetsPath, 'utf-8')

  // Match each product object: { id: "...", name: "...", ..., category: "...", ..., description: "..." }
  const productRegex = /id:\s*"(USF-[A-Z]+-\d+)"[^}]*?name:\s*"([^"]*)"[^}]*?category:\s*"([^"]*)"[^}]*?description:\s*"([^"]*)"/g

  const products = []
  let match
  while ((match = productRegex.exec(content)) !== null) {
    products.push({
      id: match[1],
      name: match[2],
      category: match[3],
      description: match[4],
    })
  }

  return products
}

// --------------------------------------------------------------------------
// Parse blog post content AND metadata from src/data/blogData.js.
// Returns slug â†’ { content, title, excerpt, publishDate, updatedDate, author, image, faqs }
// --------------------------------------------------------------------------
let _blogContentCache = null

function getBlogContent() {
  if (_blogContentCache) return _blogContentCache
  _blogContentCache = {}

  const blogPath = path.join(__rootDir, 'src', 'data', 'blogData.js')
  if (!fs.existsSync(blogPath)) {
    console.warn('[inject-canonical] blogData.js not found.')
    return _blogContentCache
  }

  const content = fs.readFileSync(blogPath, 'utf-8')

  // Find each blog post block by slug
  const slugRegex = /slug:\s*"([^"]+)"/g
  let slugMatch
  while ((slugMatch = slugRegex.exec(content)) !== null) {
    const slug = slugMatch[1]
    const startPos = slugMatch.index

    // Find the next slug or end of array
    const remaining = content.slice(startPos + slugMatch[0].length)
    const nextSlug = remaining.search(/slug:\s*"/)
    const nextId = remaining.search(/id:\s*"/)
    let endOffset = remaining.length
    if (nextSlug > 0) endOffset = Math.min(endOffset, nextSlug)
    if (nextId > 0) endOffset = Math.min(endOffset, nextId)

    const block = content.slice(startPos, startPos + slugMatch[0].length + endOffset)

    // Extract fields
    const contentMatch = block.match(/content:\s*`([\s\S]*?)`/)
    const rawContent = contentMatch ? contentMatch[1] : ''

    const excerptMatch = block.match(/excerpt:\s*"([^"]*)"/)
    const excerpt = excerptMatch ? excerptMatch[1] : ''

    const titleMatch = block.match(/title:\s*"([^"]*)"/)
    const title = titleMatch ? titleMatch[1] : ''

    const publishDateMatch = block.match(/publishDate:\s*"([^"]*)"/)
    const publishDate = publishDateMatch ? publishDateMatch[1] : ''

    const updatedDateMatch = block.match(/updatedDate:\s*"([^"]*)"/)
    const updatedDate = updatedDateMatch ? updatedDateMatch[1] : publishDate

    const authorMatch = block.match(/author:\s*"([^"]*)"/)
    const author = authorMatch ? authorMatch[1] : 'Usfah Industry Technical Team'

    const imageMatch = block.match(/image:\s*"([^"]*)"/)
    const image = imageMatch ? imageMatch[1] : '/android-chrome-192x192.png'

    const metaDescMatch = block.match(/metaDescription:\s*"([^"]*)"/)
    const metaDescription = metaDescMatch ? metaDescMatch[1] : excerpt

    // Extract FAQs
    const faqs = []
    const faqRegex = /question:\s*"([^"]*)"[^}]*?answer:\s*"([^"]*)"/g
    let faqMatch
    while ((faqMatch = faqRegex.exec(block)) !== null) {
      faqs.push({ question: faqMatch[1], answer: faqMatch[2] })
    }

    _blogContentCache[slug] = {
      content: rawContent,
      title,
      excerpt,
      publishDate,
      updatedDate,
      author,
      image,
      metaDescription,
      faqs,
    }
  }

  return _blogContentCache
}

// --------------------------------------------------------------------------
// Build an Article JSON-LD schema object for a blog post.
// --------------------------------------------------------------------------
function buildArticleSchema(slug, postData) {
  const canonicalUrl = `${DOMAIN}/blog/${slug}`
  const imageUrl = postData.image.startsWith('http') ? postData.image : `${DOMAIN}${postData.image}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.title,
    "description": postData.metaDescription || postData.excerpt,
    "image": imageUrl,
    "datePublished": postData.publishDate,
    "dateModified": postData.updatedDate || postData.publishDate,
    "author": { "@type": "Person", "name": postData.author },
    "publisher": {
      "@type": "Organization",
      "name": "Usfah Industry",
      "logo": { "@type": "ImageObject", "url": `${DOMAIN}/android-chrome-192x192.png` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl }
  }

  // Add FAQPage schema if FAQs exist
  if (postData.faqs && postData.faqs.length > 0) {
    return [
      schema,
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": postData.faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      }
    ]
  }

  return schema
}

// --------------------------------------------------------------------------
// Strip HTML tags to get plain text for word counting.
// --------------------------------------------------------------------------
function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// --------------------------------------------------------------------------
// Build content text for a route. Returns plain text that crawlers can read.
// --------------------------------------------------------------------------
function buildRouteContent(route) {
  // Blog posts: inject the full article content from blogData.js
  if (route.path.startsWith('/blog/') && route.path !== '/blog') {
    const slug = route.path.replace('/blog/', '')
    const blogData = getBlogContent()
    const postData = blogData[slug]
    if (postData && postData.content) {
      // Build full content: title + excerpt + article body + FAQs
      let fullContent = ''
      if (postData.title) fullContent += `<h1>${postData.title}</h1>`
      if (postData.excerpt) fullContent += `<p>${postData.excerpt}</p>`
      fullContent += postData.content
      if (postData.faqs && postData.faqs.length > 0) {
        fullContent += '<h2>Frequently Asked Questions</h2>'
        for (const faq of postData.faqs) {
          fullContent += `<h3>${faq.question}</h3><p>${faq.answer}</p>`
        }
      }
      return fullContent
    }
  }

  // Blog listing page
  if (route.path === '/blog') {
    return `<p>Usfah Industry blog provides expert guides on surgical stainless steel metallurgy, clinical forceps selection, salon hygiene standards, and instrument care. Read articles covering Mayo vs Metzenbaum scissors, dental extracting forceps, sterilization protocols, Iris scissors, straight vs curved surgical scissors, sharp vs blunt tip designs, Spencer stitch scissors, tenotomy scissors, and more. Our technical team shares insights on ISO 13485 manufacturing standards, AISI 420 and 440 stainless steel grades, tungsten carbide inserts, and surgical instrument procurement for hospitals and distributors worldwide.</p>`
  }

  // Product detail pages: build a descriptive paragraph from product data
  if (route.path.startsWith('/productdetails/')) {
    const productId = route.path.replace('/productdetails/', '')
    const product = getProducts().find(p => p.id === productId)
    if (product) {
      return `<p>${escapeHtml(product.description || product.name)} This ${escapeHtml(product.category.toLowerCase())} is manufactured from surgical-grade stainless steel by Usfah Industry in Sialkot, Pakistan. The instrument is designed for professional clinical use and undergoes ISO 13485 quality control testing. It is suitable for autoclave sterilization at 134 degrees Celsius and resists corrosion through repeated cleaning cycles. Usfah Industry exports medical instruments to hospitals, dental clinics, and distributors worldwide. Contact us for wholesale pricing, OEM manufacturing, and bulk order documentation for this ${escapeHtml(product.id)} instrument.</p>`
    }
  }

  // Static pages: add a descriptive paragraph
  const staticContent = {
    '/': 'Usfah Industry is a leading global manufacturer and exporter of ISO-certified surgical instruments, dental tools, beauty instruments, extracting forceps, root elevators, and periodontal scalers. Based in Sialkot, Pakistan, we manufacture premium medical instruments from surgical-grade stainless steel including AISI 420 and 440 grades. Our products meet ISO 13485 quality standards and CE marking requirements for European healthcare markets. We supply hospitals, dental clinics, beauty salons, and medical distributors worldwide with export-quality instruments crafted for precision, durability, and reliability.',
    '/about': 'Usfah Industry is a premier surgical instruments manufacturing company in Sialkot, Pakistan. For over a decade, our facility has delivered export quality medical instruments, dental extracting tools, and beauty equipment trusted by healthcare professionals globally. We specialize in surgical scissors, dental forceps, beauty instruments, root elevators, and scalers manufactured from medical-grade stainless steel. Our manufacturing process follows ISO 13485 quality management systems and CE compliance for international healthcare supply chains.',
    '/products': 'Browse our full range of ISO-certified surgical scissors, dental forceps, beauty instruments, extracting forceps, root elevators, and periodontal scalers from Usfah Industry. Our product catalog includes Mayo scissors, Metzenbaum scissors, Iris scissors, Lister bandage scissors, dental extracting forceps, cuticle nippers, tweezers, and more. All instruments are manufactured from surgical-grade stainless steel and undergo rigorous quality control testing to meet international medical device standards.',
    '/catalogue': 'Download the complete Usfah Industry product catalogue covering surgical instruments, dental tools, beauty instruments, extracting forceps, root elevators, and scalers. Our catalogue includes full specifications, reference numbers, and material certifications for all products. Certified surgical instruments manufacturer in Sialkot, Pakistan supplying export tools worldwide with ISO 13485 compliance and CE marking.',
    '/contact': 'Contact Usfah Industry for wholesale pricing, OEM manufacturing, export enquiries, and product documentation. We are a trusted surgical instruments supplier and medical tools manufacturer in Sialkot, Pakistan. Get in touch for custom manufacturing specifications, bulk order quotes, private labeling, or product inquiries. Our export team serves hospitals, dental distributors, and healthcare networks across Europe, North America, and international markets.',
    '/privacy-policy': 'Read the Usfah Industry privacy policy to understand how we collect, use, and protect your personal information when you visit our website or contact us for product enquiries. This policy covers data collection through contact forms, WhatsApp inquiries, catalogue downloads, and website analytics. We are committed to protecting your privacy and complying with applicable data protection regulations.',
    '/terms-and-conditions': 'Read the terms and conditions governing use of the Usfah Industry website and services. These terms cover website usage, product enquiries, wholesale orders, OEM manufacturing agreements, export documentation, intellectual property, liability limitations, and dispute resolution. By accessing our website or purchasing our surgical, dental, or beauty instruments, you agree to these terms and conditions.',
    '/disclaimer': 'Read the disclaimer for the Usfah Industry website regarding the accuracy and use of information provided about our surgical instruments, dental tools, and beauty equipment. Product specifications, material grades, and manufacturing standards may vary. Always verify current specifications before placing orders. Medical professionals should follow clinical protocols and manufacturer instructions when using any surgical instrument.',
    '/cookie-policy': 'Learn how Usfah Industry uses cookies on its website and how you can manage your cookie preferences. We use cookies for website analytics, user experience improvement, and remembering your preferences. You can control cookie settings through your browser. This policy explains the types of cookies we use, their purpose, and how long they are stored on your device.',
  }

  if (staticContent[route.path]) {
    return `<p>${staticContent[route.path]}</p>`
  }

  return ''
}
function buildItemListSchema(products, pagePath, pageName) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": pageName,
    "numberOfItems": products.length,
    "itemListElement": products.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${DOMAIN}/productdetails/${item.id}`,
      "name": `${item.category} (${item.id})`
    }))
  }
}

// --------------------------------------------------------------------------
// Build Organization + WebSite schema for the home page.
// Matches the schema generated by Home.jsx.
// --------------------------------------------------------------------------
function buildHomeSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Usfah Industry",
      "url": DOMAIN,
      "logo": `${DOMAIN}/android-chrome-192x192.png`,
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
      "url": DOMAIN,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${DOMAIN}/products?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
function buildProductSchema(product) {
  const canonicalUrl = `${DOMAIN}/productdetails/${product.id}`
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.category} (${product.id})`,
    "image": [DEFAULT_IMAGE],
    "description": product.description || `Export-quality ${product.category} (${product.id}) manufactured by Usfah Industry.`,
    "sku": product.id,
    "mpn": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Usfah Industry"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": canonicalUrl,
      "priceCurrency": "USD",
      "price": "0",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Usfah Industry"
      }
    }
  }
}

// --------------------------------------------------------------------------
// Resolve a URL path to a route object (including dynamic product routes).
// Used by both dev-server transformIndexHtml and build closeBundle.
// --------------------------------------------------------------------------
let _productCache = null

function getProducts() {
  if (_productCache) return _productCache
  _productCache = parseProducts()
  return _productCache
}

function resolveRoute(urlPath) {
  // Clean the path (strip query string, trailing slash for non-root, normalize index.html)
  let cleanPath = urlPath.split('?')[0].split('#')[0]
  // Normalize /index.html â†’ /
  if (cleanPath === '/index.html') cleanPath = '/'
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1)
  }
  // Also handle /blog/some-post/index.html â†’ /blog/some-post
  if (cleanPath.endsWith('/index.html')) {
    cleanPath = cleanPath.slice(0, -'/index.html'.length)
    if (cleanPath === '') cleanPath = '/'
  }

  // Check static pages
  const staticRoute = staticPages.find(r => r.path === cleanPath)
  if (staticRoute) {
    // Home page: add Organization + WebSite schema
    if (cleanPath === '/') {
      return { ...staticRoute, schema: buildHomeSchema() }
    }
    // Add ItemList schema for category pages
    if (cleanPath === '/products' || cleanPath === '/catalogue') {
      const products = getProducts()
      const schema = buildItemListSchema(
        products,
        cleanPath,
        cleanPath === '/products'
          ? 'Surgical, Dental & Beauty Instruments Catalog'
          : 'Usfah Industry Instruments Catalogue'
      )
      return { ...staticRoute, schema }
    }
    return staticRoute
  }

  // Check blog posts
  const blogRoute = blogPosts.find(r => r.path === cleanPath)
  if (blogRoute) {
    const slug = cleanPath.replace('/blog/', '')
    const blogData = getBlogContent()
    const postData = blogData[slug]
    if (postData) {
      const ogImage = postData.image.startsWith('http') ? postData.image : `${DOMAIN}${postData.image}`
      return { ...blogRoute, ogType: 'article', ogImage, schema: buildArticleSchema(slug, postData) }
    }
    return { ...blogRoute, ogType: 'article' }
  }

  // Check product detail pages (dynamic)
  if (cleanPath.startsWith('/productdetails/')) {
    const productId = cleanPath.replace('/productdetails/', '')
    const product = getProducts().find(p => p.id === productId)
    if (product) {
      return {
        path: cleanPath,
        title: `${product.name} | Usfah Industry`,
        description: product.description || `Buy or order wholesale ${product.name} manufactured from medical grade stainless steel by Usfah Industry.`,
        h1: `${product.category} (${product.id})`,
        ogType: 'product',
        schema: buildProductSchema(product),
      }
    }
  }

  return null
}

// --------------------------------------------------------------------------
// Plugin
// --------------------------------------------------------------------------
export function injectCanonicalPlugin() {
  // Store the current request URL so transformIndexHtml can read it.
  // Vite's transformIndexHtml always receives /index.html as ctx.path
  // for SPA routes, so we intercept the actual URL in a middleware first.
  let currentUrl = '/'

  return {
    name: 'inject-canonical',

    // â”€â”€ Step 1: Capture the real URL from the browser request â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'GET') {
          const url = (req.url || '/').split('?')[0].split('#')[0]
          // Only store URL for page navigations (no file extension)
          if (!url.includes('.')) {
            currentUrl = url
          }
        }
        next()
      })
    },

    // â”€â”€ Step 2: Inject meta tags using the captured URL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Vite calls this while serving index.html. We use currentUrl
    // (set by our middleware above) instead of ctx.path (always /index.html).
    transformIndexHtml(html, ctx) {
      const route = resolveRoute(currentUrl)
      if (!route) return html
      return patchHtml(html, route)
    },

    // â”€â”€ Production build: generate per-directory static HTML â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // Runs after Vite writes all files to dist/. Generates a static
    // index.html for every route with all meta tags baked in.
    closeBundle() {
      const distDir = path.join(__rootDir, 'dist')
      const templatePath = path.join(distDir, 'index.html')

      if (!fs.existsSync(templatePath)) {
        console.warn('[inject-canonical] dist/index.html not found, skipping.')
        return
      }

      const template = fs.readFileSync(templatePath, 'utf-8')

      // Parse all products from assets.js
      const products = getProducts()

      // Build ItemList schema for category pages
      const productsSchema = buildItemListSchema(products, '/products', 'Surgical, Dental & Beauty Instruments Catalog')
      const catalogueSchema = buildItemListSchema(products, '/catalogue', 'Usfah Industry Instruments Catalogue')

      // Add schema to static pages that need it
      const staticRoutesWithSchema = staticPages.map(sp => {
        if (sp.path === '/') return { ...sp, schema: buildHomeSchema() }
        if (sp.path === '/products') return { ...sp, schema: productsSchema }
        if (sp.path === '/catalogue') return { ...sp, schema: catalogueSchema }
        return sp
      })

      // Build product routes with schema
      const productRoutes = products.map(p => ({
        path: `/productdetails/${p.id}`,
        title: `${p.name} | Usfah Industry`,
        description: p.description || `Buy or order wholesale ${p.name} manufactured from medical grade stainless steel by Usfah Industry.`,
        h1: `${p.category} (${p.id})`,
        ogType: 'product',
        schema: buildProductSchema(p),
      }))

      // Build blog post routes with Article schema
      const blogData = getBlogContent()
      const blogRoutesWithSchema = blogPosts.map(bp => {
        const slug = bp.path.replace('/blog/', '')
        const postData = blogData[slug]
        const ogImage = postData && postData.image
          ? (postData.image.startsWith('http') ? postData.image : `${DOMAIN}${postData.image}`)
          : DEFAULT_IMAGE
        return postData
          ? { ...bp, ogType: 'article', ogImage, schema: buildArticleSchema(slug, postData) }
          : { ...bp, ogType: 'article', ogImage: DEFAULT_IMAGE }
      })

      // Combine all routes
      const allRoutes = [...staticRoutesWithSchema, ...blogRoutesWithSchema, ...productRoutes]

      for (const route of allRoutes) {
        // Root page â€” patch in place
        if (route.path === '/') {
          const patched = patchHtml(template, route)
          fs.writeFileSync(templatePath, patched, 'utf-8')
          continue
        }

        // Build the directory and write index.html
        const routeDir = path.join(distDir, route.path)
        fs.mkdirSync(routeDir, { recursive: true })
        const outFile = path.join(routeDir, 'index.html')
        const patched = patchHtml(template, route)
        fs.writeFileSync(outFile, patched, 'utf-8')
      }

      console.log(`[inject-canonical] Injected canonical + schema into ${allRoutes.length} routes (${products.length} products with Product schema).`)
    },
  }
}

// --------------------------------------------------------------------------
// Patch a single HTML string with static <title>, <meta description>,
// <link rel="canonical">, optional JSON-LD schema, and a static <h1>
// fallback inside <div id="root"> for non-JS crawlers.
// Idempotent: removes any previously-injected tags before adding new ones.
// --------------------------------------------------------------------------
function patchHtml(html, route) {
  const canonicalUrl = `${DOMAIN}${route.path}`

  // â”€â”€ Clean up any previously injected tags (makes this idempotent) â”€â”€â”€â”€â”€â”€
  let patched = html
    // Remove existing meta description (ours or react-helmet's)
    .replace(/\s*<meta name="description"[^>]*>/g, '')
    // Remove existing canonical
    .replace(/\s*<link rel="canonical"[^>]*>/g, '')
    // Remove existing og:url
    .replace(/\s*<meta property="og:url"[^>]*>/g, '')
    // Remove existing robots meta
    .replace(/\s*<meta name="robots" content="index, follow[^"]*"[^>]*>/g, '')
    // Remove existing OG tags
    .replace(/\s*<meta property="og:[^"]*"[^>]*>/g, '')
    // Remove existing Twitter tags
    .replace(/\s*<meta name="twitter:[^"]*"[^>]*>/g, '')
    // Remove existing JSON-LD Product/Article schema scripts (ours)
    // Remove ALL existing JSON-LD schema scripts we injected (single object or array)
    .replace(/\s*<script type="application\/ld\+json">[[{][\s\S]*?<\/script>/g, '')
    .replace(/\s*<noscript><nav[\s\S]*?<\/noscript>/g, '')
    // Reset #root to empty — removes any previously injected H1/content.
    // Uses greedy match to find the LAST </div> before </body>, <script>, or <noscript>.
    .replace(/<div id="root">[\s\S]*<\/div>(?=\s*(?:<\/body|<script|<noscript))/, '<div id="root"></div>')


  const headParts = [
    `  <title>${escapeHtml(route.title)}</title>`,
    `  <meta name="description" content="${escapeHtml(route.description)}" />`,
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `  <meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `  <meta property="og:image" content="${escapeHtml(route.ogImage || DEFAULT_IMAGE)}" />`,
    `  <meta property="og:type" content="${route.ogType || 'website'}" />`,
    `  <meta property="og:site_name" content="Usfah Industry" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `  <meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `  <meta name="twitter:image" content="${escapeHtml(route.ogImage || DEFAULT_IMAGE)}" />`,
  ]

  // Inject JSON-LD schema if available (Product, Article, or FAQPage)
  if (route.schema) {
    const schemaJson = JSON.stringify(route.schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
    headParts.push(`  <script type="application/ld+json">${schemaJson}</script>`)
  }

  const headInject = headParts.join('\n')

  // Replace the placeholder <title> and insert meta/canonical/schema before </head>
  patched = patched
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('</head>', `${headInject}\n</head>`)

  // Inject a static <h1> and content text inside <div id="root">.
  // React replaces #root content on mount, so browsers never see it.
  // This is only visible to non-JS crawlers (ahrefs, Bing, etc.).
  if (route.h1) {
    const contentHtml = buildRouteContent(route)
    const hiddenContent = `<div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);"><h1>${escapeHtml(route.h1)}</h1>${contentHtml}</div>`
    patched = patched.replace(
      /(<div id="root">)(<\/div>)/,
      `$1${hiddenContent}$2`
    )
  }

  // â”€â”€ Add <noscript> navigation block â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Crawlers (ahrefs, Google) read noscript content without executing JS.
  // This ensures every page has visible internal links to all major pages,
  // fixing "Redirected page has no incoming internal links" and preventing
  // orphan pages.
  const buildNoscriptLinks = (currentPath) => {
    const links = []
    links.push(`<a href="${DOMAIN}/">Home</a>`)
    links.push(`<a href="${DOMAIN}/about">About</a>`)
    links.push(`<a href="${DOMAIN}/products">Products</a>`)
    links.push(`<a href="${DOMAIN}/catalogue">Catalogue</a>`)
    links.push(`<a href="${DOMAIN}/blog">Blog</a>`)
    links.push(`<a href="${DOMAIN}/contact">Contact</a>`)
    links.push(`<a href="${DOMAIN}/privacy-policy">Privacy Policy</a>`)
    links.push(`<a href="${DOMAIN}/terms-and-conditions">Terms and Conditions</a>`)
    links.push(`<a href="${DOMAIN}/disclaimer">Disclaimer</a>`)
    links.push(`<a href="${DOMAIN}/cookie-policy">Cookie Policy</a>`)
    const blogSlugs = [
      'complete-guide-surgical-scissors', 'mayo-vs-metzenbaum-scissors',
      'guide-dental-extracting-forceps', 'surgical-instruments-sterilization-guide',
      'what-are-metzenbaum-scissors-used-for', 'what-are-mayo-scissors-used-for',
      'straight-vs-curved-surgical-scissors', 'tenotomy-scissors-types-uses',
      'spencer-stitch-scissors-guide', 'sharp-vs-blunt-surgical-scissors',
      'iris-scissors-types-uses-and-applications',
    ]
    for (const slug of blogSlugs) {
      links.push(`<a href="${DOMAIN}/blog/${slug}">${slug.replace(/-/g, ' ')}</a>`)
    }
    const products = getProducts()
    for (const p of products) {
      if (`/productdetails/${p.id}` !== currentPath) {
        links.push(`<a href="${DOMAIN}/productdetails/${p.id}">${p.id}</a>`)
      }
    }
    return links.join(' ')
  }
  const noscriptBlock = `<noscript><nav aria-label="Site navigation" style="display:none">${buildNoscriptLinks(route.path)}</nav></noscript>`

  // Insert noscript block right after the root div, before any script tags
  patched = patched.replace(
    /(<\/div>)\s*(?=<script|<\/body)/,
    `$1\n    ${noscriptBlock}\n  `
  )

  return patched
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
