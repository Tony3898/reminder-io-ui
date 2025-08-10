import react from '@vitejs/plugin-react';
import fs from 'fs';
import * as https from 'https';
import { defineConfig } from 'vite';

// https://vite.dev/config/

const defaultConfig = {
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false,
    minify: 'esbuild' as const,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material'],
          utils: ['axios', 'react-hot-toast']
        }
      }
    }
  },
  css: {
    postcss: './postcss.config.js',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
};

const createServerOption = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem'),
};

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      ...defaultConfig,
      server: {
        host: 'localhost',
        port: 8443,
        https: https.createServer(createServerOption),
        allowUnsafe: true
      },
      preview: {
        host: 'localhost',
        port: 8443,
      }
    };
  } else return defaultConfig;
});
