import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    '__ENCRYPTION_KEY__': JSON.stringify([
      57, 114, 107, 120, 67, 80, 108, 106, 83, 77, 49, 71, 86, 81, 104, 87,
      119, 49, 114, 49, 114, 75, 79, 72, 71, 99, 99, 98, 50, 105, 74, 53,
    ])
  }
})