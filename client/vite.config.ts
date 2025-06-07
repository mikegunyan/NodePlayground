import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  server: {
    port: process.env.PORT_CLIENT ? parseInt(process.env.PORT_CLIENT) : 4444,
    open: true
  }
})
