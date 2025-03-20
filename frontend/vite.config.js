import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,            // Ensures Vite binds to 0.0.0.0, making it accessible via Docker
    port: 5173,            // Ensures consistent port usage
    strictPort: true,      // Prevents Vite from switching ports if 5173 is busy
    watch: {
      usePolling: true,    // Forces Vite to poll for file changes (important for Docker on Windows)
    },
  },
})
