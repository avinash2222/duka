import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@datagrid': path.resolve(__dirname, 'src/components/datagrid'),
      '@common': path.resolve(__dirname, 'src/components/common'),
      '@charts': path.resolve(__dirname, 'src/components/charts'),
      '@branding': path.resolve(__dirname, 'src/components/branding'),
      '@widgets': path.resolve(__dirname, 'src/components/mui'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
