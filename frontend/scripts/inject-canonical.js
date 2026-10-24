/**
 * injectCanonicalPlugin
 *
 * A lightweight Vite post-build plugin that generates a static index.html
 * for every route with <title>, <meta name="description">, and
 * <link rel="canonical"> baked into the HTML at build time.
 *
 * This ensures crawlers that do not execute JavaScript (ahrefs, Bing, etc.)
 * still receive the correct canonical tag, eliminating the
 * "Duplicate pages without canonical" issue reported by ahrefs.
 */

import fs from 'fs'
import path from 'path'

const DOMAIN = 'https://usfahindustry.com'

// --------------------------------------------------------------------------
// Route map: path → { title, description }
// Keep this in sync with what each page's <SEO> component renders.
// --------------------------------------------------------------------------
const routes = [
  {
    path: '/',
    title: 'Usfah Industry | Premium Surgical, Dental & Beauty Instruments Manufacturer',
    description: 'Usfah Industry is a leading global manufacturer and exporter of ISO-certified surgical instruments, dental tools, beauty instruments, and more from Sialkot.',
  },
  {
    path: '/about',
    title: 'About Usfah Industry | Surgical Instrument Manufacturer Sialkot',
    description: 'Learn about Usfah Industry, a trusted manufacturer and exporter of surgical, dental, and beauty instruments from Sialkot, Pakistan.',
  },
  {
    path: '/products',
    title: 'Surgical & Dental Instruments | Usfah Industry Products',
    description: 'Browse our full range of ISO-certified surgical scissors, dental forceps, beauty instruments, and more from Usfah Industry.',
  },
  {
    path: '/catalogue',
    title: 'Instruments Catalogue | Usfah Industry',
    description: 'Download or view the Usfah Industry product catalogue covering surgical, dental, and beauty instruments with full specifications.',
  },
  {
    path: '/blog',
    title: 'Blog & Insights | Medical & Surgical Instrument Guide | Usfah Industry',
    description: 'Read articles, sterilization guides, dental forceps tips, and surgical stainless steel metallurgy insights from Usfah Industry.',
  },
  {
    path: '/contact',
    title: 'Contact Usfah Industry | Wholesale & Export Enquiries',
    description: 'Get in touch with Usfah Industry for wholesale pricing, OEM manufacturing, export enquiries, and product documentation.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Usfah Industry',
    description: 'Read the Usfah Industry privacy policy to understand how we collect, use, and protect your personal information.',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Usfah Industry',
    description: 'Read the terms and conditions governing use of the Usfah Industry website and services.',
  },
  {
    path: '/disclaimer',
    title: 'Disclaimer | Usfah Industry',
    description: 'Read the disclaimer for the Usfah Industry website regarding the accuracy and use of information provided.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | Usfah Industry',
    description: 'Learn how Usfah Industry uses cookies on its website and how you can manage your cookie preferences.',
  },

  // ── Blog posts ────────────────────────────────────────────────────────────
  {
    path: '/blog/complete-guide-surgical-scissors',
    title: 'Surgical Scissors Guide: Types, Uses & Manufacturing Standards',
    description: 'Explore Mayo, Metzenbaum, Iris, and Lister surgical scissors. Learn about AISI 420/440 stainless steel, TC gold handles, and ISO 13485 export standards.',
  },
  {
    path: '/blog/mayo-vs-metzenbaum-scissors',
    title: 'Mayo vs Metzenbaum Scissors: What\'s the Difference?',
    description: 'Mayo vs Metzenbaum scissors compared for design, blade strength, and when surgeons use each type. A clear guide for choosing the right instrument.',
  },
  {
    path: '/blog/guide-dental-extracting-forceps',
    title: 'Guide to Dental Extracting Forceps: Anatomy, Patterns & Specs',
    description: 'Comprehensive guide to dental extracting forceps patterns, beak angles, hinge mechanics, AISI 420 steel, and ISO 13485 export standards for dental distributors.',
  },
  {
    path: '/blog/surgical-instruments-sterilization-guide',
    title: 'Surgical Instruments Sterilization & Autoclave Care Protocol',
    description: 'Essential CSSD protocol for autoclaving surgical stainless steel, enzymatic cleaning, joint lubrication, EN 285 standards, and rust prevention.',
  },
  {
    path: '/blog/what-are-metzenbaum-scissors-used-for',
    title: 'What Are Metzenbaum Scissors Used For? | Usfah Industry',
    description: 'Discover what Metzenbaum scissors are used for in surgery, including design features, tissue applications, blunt dissection, and sourcing standards.',
  },
  {
    path: '/blog/what-are-mayo-scissors-used-for',
    title: 'What Are Mayo Scissors Used For? | Usfah Industry',
    description: 'Learn what Mayo scissors are used for, their design characteristics, clinical applications, and key considerations when sourcing them.',
  },
  {
    path: '/blog/straight-vs-curved-surgical-scissors',
    title: 'Straight vs Curved Surgical Scissors: Which Should You Choose?',
    description: 'Understand the difference between straight and curved surgical scissors, how blade shape affects handling, and which to choose for different procedures.',
  },
  {
    path: '/blog/tenotomy-scissors-types-uses',
    title: 'Tenotomy Scissors: Types, Uses and Buyer Considerations',
    description: 'Explore tenotomy scissors, their common variations and applications, and important considerations for buyers and medical instrument suppliers.',
  },
  {
    path: '/blog/spencer-stitch-scissors-guide',
    title: 'Spencer Stitch Scissors: Uses and Buying Guide',
    description: 'Learn about Spencer stitch scissors, their design, common uses, and key factors to consider when sourcing them from a manufacturer or supplier.',
  },
  {
    path: '/blog/sharp-vs-blunt-surgical-scissors',
    title: 'Sharp vs Blunt Surgical Scissors: Understanding the Difference',
    description: 'Understand the difference between sharp and blunt surgical scissors and how these design characteristics relate to different applications.',
  },
  {
    path: '/blog/iris-scissors-types-uses-and-applications',
    title: 'Iris Scissors: Types, Uses and Applications | Usfah Industry',
    description: 'Learn about Iris scissors, their fine blade design, surgical and ophthalmic applications, and what to look for when sourcing them.',
  },

  // ── Product detail pages ──────────────────────────────────────────────────
  ...['USF-SURG-001','USF-SURG-002','USF-SURG-003','USF-SURG-004','USF-SURG-005',
      'USF-DENT-001','USF-DENT-002','USF-DENT-003','USF-DENT-004','USF-DENT-005',
      'USF-BEAU-001','USF-BEAU-002','USF-BEAU-003','USF-BEAU-004','USF-BEAU-005',
      'USF-EXTR-001','USF-EXTR-002','USF-EXTR-003','USF-EXTR-004','USF-EXTR-005',
      'USF-ROOT-001','USF-ROOT-002','USF-ROOT-003','USF-ROOT-004','USF-ROOT-005',
      'USF-SCAL-001','USF-SCAL-002','USF-SCAL-003','USF-SCAL-004','USF-SCAL-005',
  ].map(id => ({
    path: `/productdetails/${id}`,
    title: `${id} | Surgical Instrument | Usfah Industry`,
    description: `View full specifications and details for ${id} — a certified surgical instrument manufactured by Usfah Industry.`,
  })),
]

// --------------------------------------------------------------------------
// Plugin
// --------------------------------------------------------------------------
export function injectCanonicalPlugin() {
  return {
    name: 'inject-canonical',
    // Runs after Vite has written all files to dist/
    closeBundle() {
      const distDir = path.resolve('dist')
      const templatePath = path.join(distDir, 'index.html')

      if (!fs.existsSync(templatePath)) {
        console.warn('[inject-canonical] dist/index.html not found, skipping.')
        return
      }

      const template = fs.readFileSync(templatePath, 'utf-8')

      for (const route of routes) {
        // Skip root — index.html already handles it
        if (route.path === '/') {
          // Just patch the root index.html in place
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

      console.log(`[inject-canonical] Injected canonical tags into ${routes.length} routes.`)
    },
  }
}

// --------------------------------------------------------------------------
// Patch a single HTML string with static <title>, <meta description>,
// and <link rel="canonical"> inside <head>.
// --------------------------------------------------------------------------
function patchHtml(html, route) {
  const canonicalUrl = `${DOMAIN}${route.path}`

  const headInject = [
    `  <title>${escapeHtml(route.title)}</title>`,
    `  <meta name="description" content="${escapeHtml(route.description)}" />`,
    `  <link rel="canonical" href="${canonicalUrl}" />`,
    `  <meta property="og:url" content="${canonicalUrl}" />`,
    `  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
  ].join('\n')

  // Replace the placeholder <title> and insert meta/canonical before </head>
  return html
    .replace(/<title>[^<]*<\/title>/, '')
    .replace('</head>', `${headInject}\n</head>`)
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
