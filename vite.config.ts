import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        blog: path.resolve(__dirname, 'blog.html'),
        contacto: path.resolve(__dirname, 'contacto.html'),
        nosotros: path.resolve(__dirname, 'nosotros.html'),
        portfolio: path.resolve(__dirname, 'portfolio.html'),
        servicioBranding: path.resolve(__dirname, 'servicio-branding.html'),
        servicioIa: path.resolve(__dirname, 'servicio-ia.html'),
        servicioPosicionamiento: path.resolve(__dirname, 'servicio-posicionamiento.html'),
        servicioWeb: path.resolve(__dirname, 'servicio-web.html'),
      }
    }
  }
})
