import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const name = 'Zoomist'
const fileName = name.toLowerCase()

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd', 'iife'],
      name,
      fileName
    },
    rollupOptions: {
      output: {
        assetFileNames: () => {
          return `${fileName}[extname]`
        }
      }
    }
  },
  plugins: [dts()]
})