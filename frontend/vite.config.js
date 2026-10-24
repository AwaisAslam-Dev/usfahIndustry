import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import VitePluginPrerender from 'vite-plugin-prerender'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// All static routes that should be prerendered so crawlers receive
// server-side HTML with canonical tags baked in (fixes "duplicate pages
// without canonical" in ahrefs / Search Console).
const staticRoutes = [
  '/',
  '/about',
  '/products',
  '/catalogue',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/disclaimer',
  '/cookie-policy',

  // Blog posts
  '/blog/complete-guide-surgical-scissors',
  '/blog/mayo-vs-metzenbaum-scissors',
  '/blog/guide-dental-extracting-forceps',
  '/blog/surgical-instruments-sterilization-guide',
  '/blog/what-are-metzenbaum-scissors-used-for',
  '/blog/what-are-mayo-scissors-used-for',
  '/blog/straight-vs-curved-surgical-scissors',
  '/blog/tenotomy-scissors-types-uses',
  '/blog/spencer-stitch-scissors-guide',
  '/blog/sharp-vs-blunt-surgical-scissors',
  '/blog/iris-scissors-types-uses-and-applications',

  // Product detail pages
  '/productdetails/USF-SURG-001',
  '/productdetails/USF-SURG-002',
  '/productdetails/USF-SURG-003',
  '/productdetails/USF-SURG-004',
  '/productdetails/USF-SURG-005',
  '/productdetails/USF-DENT-001',
  '/productdetails/USF-DENT-002',
  '/productdetails/USF-DENT-003',
  '/productdetails/USF-DENT-004',
  '/productdetails/USF-DENT-005',
  '/productdetails/USF-BEAU-001',
  '/productdetails/USF-BEAU-002',
  '/productdetails/USF-BEAU-003',
  '/productdetails/USF-BEAU-004',
  '/productdetails/USF-BEAU-005',
  '/productdetails/USF-EXTR-001',
  '/productdetails/USF-EXTR-002',
  '/productdetails/USF-EXTR-003',
  '/productdetails/USF-EXTR-004',
  '/productdetails/USF-EXTR-005',
  '/productdetails/USF-ROOT-001',
  '/productdetails/USF-ROOT-002',
  '/productdetails/USF-ROOT-003',
  '/productdetails/USF-ROOT-004',
  '/productdetails/USF-ROOT-005',
  '/productdetails/USF-SCAL-001',
  '/productdetails/USF-SCAL-002',
  '/productdetails/USF-SCAL-003',
  '/productdetails/USF-SCAL-004',
  '/productdetails/USF-SCAL-005',
]

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePluginPrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: staticRoutes,
      renderer: new VitePluginPrerender.PuppeteerRenderer({
        renderAfterDocumentEvent: 'render-event',
        headless: true,
      }),
    }),
  ],
})
