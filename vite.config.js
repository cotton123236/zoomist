import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'url'

const name = 'Zoomist'
const fileName = name.toLowerCase()
const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/zoomist.ts'),
      name,
      fileName: (format) => `${fileName}${format.includes('es') ? '' : `.${format}`}.js`
    },
    rollupOptions: {
      output: {
        assetFileNames: () => `${fileName}[extname]`
      }
    }
  },
  plugins: [dts()]
})
