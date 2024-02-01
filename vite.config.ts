import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/infinite-images',
  plugins: [react()],
  build: {
    outDir: '../github-pages',
  },
});
