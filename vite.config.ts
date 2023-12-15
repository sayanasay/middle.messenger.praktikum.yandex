import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: '/',
  },
  plugins: [
    handlebars({
      helpers: {},
    }) as unknown as Plugin,
  ],
  build: {
    outDir: resolve(__dirname, 'dist')
  },
});
