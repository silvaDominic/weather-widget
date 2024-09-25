import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'src/presentation',
  build: {
    outDir: '../../dist/presentation'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),    },
  },
});
