import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   https: {
      key: './localhost_2-key.pem',
      cert: './localhost+2.pem'
   },
   port: 4310
  }
})
