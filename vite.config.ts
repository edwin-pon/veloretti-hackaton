import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // The app, and the standalone campaign-intake preview at /intake.html.
      input: { main: 'index.html', intake: 'intake.html' },
    },
  },
})
