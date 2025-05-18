import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/todo-list-app/',
  build: {
    outDir: 'dist'
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
