// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ command }) => {
  const proxyOptions = {
    target: 'http://localhost:5000',
    changeOrigin: true,
    secure: false,
    headers: { 'vite-proxy': 'true' },
  };

  const config = {
    development: {
      server: {
        port: 3000,
        proxy: {
          '/api': proxyOptions
        },
      },
    },
    production: {
      base: '/dist',
      build: {
        cssCodeSplit: true,
        emptyOutDir: true,
        rollupOptions: {
          output: {
            entryFileNames: '[name].js',
            assetFileNames: '[name][extname]',
          },
        },
      },
    },
  };

  return {
    plugins: [react()],
    ...(command === 'serve' && config.development),
    resolve: {
      alias: {
        src: path.resolve('src/'),
      },
    },
  };
});
