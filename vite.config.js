import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sonny/' // <-- ¡AÑADE ESTA LÍNEA! (Usa el nombre de tu repo)
})
