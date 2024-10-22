import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  //should match the repo name when deploying to github pages. alternatively --base option can be used on vite build
  base: '/infinite-images',
  plugins: [react()],
  build: {
    outDir: './dist',
  },
});
