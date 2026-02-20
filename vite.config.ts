import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Use root path for Vercel, /todo/ for GitHub Pages
  base: process.env.VERCEL ? '/' : '/todo/',
})
