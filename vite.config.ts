import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: path.resolve(__dirname, 'src/presentation'), // Set root to presentation
    build: {
      outDir: path.resolve(__dirname, 'dist/presentation'), // Output directory
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': loadEnv(mode, process.cwd()), // Load environment variables from the root .env file
    },
  };
});
