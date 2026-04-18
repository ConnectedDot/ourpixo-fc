
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Standard port for vercel dev backend ifFrontend is 3000
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

