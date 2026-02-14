import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: '@import "./src/theme/variables.styl"'
      }
    }
  }
})
