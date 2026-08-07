import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' is REQUIRED for FiveM NUI — assets must be loaded with
// relative paths, not absolute ones, or they will 404 inside the game.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
