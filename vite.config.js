import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: JS, CSS and fonts are inlined into dist/index.html,
// so the site opens straight from the folder (no server needed).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
