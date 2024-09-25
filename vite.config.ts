import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src/presentation',
  build: {
    outDir: '../../dist/presentation'
  },
  resolve: {
    alias: {
      '@': '/src', // Alias for easier imports
    },
  },
});
