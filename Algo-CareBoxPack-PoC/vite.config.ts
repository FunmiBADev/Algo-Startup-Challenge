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
    // Bind to all interfaces for Replit/containers
    host: true,
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
    // Allow Replit-hosted dev URLs
    // Note: some entries may be empty strings at local dev, filter them out
    allowedHosts: [
      process.env.REPLIT_DEV_DOMAIN || '',
      process.env.REPL_SLUG && process.env.REPL_OWNER
        ? `${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : '',
      'localhost',
      '127.0.0.1',
      '.replit.dev',
      '.repl.co',
    ].filter(Boolean) as unknown as string[],
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
})

