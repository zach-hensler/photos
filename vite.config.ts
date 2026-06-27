import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  base: 'https://pages.zach-hensler.com',
  root: './',
  build: {
    outDir: 'build',
  },
  publicDir: 'public',
  test: {
    exclude: ['node_modules', 'build', '.github'],
    setupFiles: 'setupTests.ts'
  }
})
