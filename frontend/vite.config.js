import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { injectCanonicalPlugin } from './scripts/inject-canonical.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), injectCanonicalPlugin()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion', 'motion-dom'],
          'ui-vendor': ['lucide-react', 'react-icons', 'swiper'],
        },
      },
    },
  },
})
