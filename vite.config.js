// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "./dist",
    lib: {
      // Entry point of your component library
      entry: path.resolve(__dirname, 'src/index.ts'), // or index.ts
      name: '@dcodegroup-au/dcode-chat-vue',
      fileName: (format) => `dcode-chat-vue.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
