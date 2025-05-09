import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost/trail/apni-zameen-backend',
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  build: {
    cssCodeSplit: true,
    sourcemap: true,
  },
  css: {
    devSourcemap: true
  },
  // Add CSP configuration to handle external images
  csp: {
    directives: {
      'img-src': ["'self'", 'data:', 'blob:', 'https://images.unsplash.com']
    }
  }
})
