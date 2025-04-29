// frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import envCompatible from 'vite-plugin-env-compatible'

export default defineConfig({
  plugins: [react(), envCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['lucide-react']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-icons': ['lucide-react'],
        }
      }
    },
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
})