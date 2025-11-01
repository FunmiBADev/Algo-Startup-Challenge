
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],
  server: {
    // Bind to all interfaces for container environments
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    // Allow localhost and common development hosts
    allowedHosts: [
      'localhost',
      '127.0.0.1',
    ],
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
})
