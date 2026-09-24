import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-local-assets',
      configureServer(server) {
        // Chặn truy cập trực tiếp vào references, source, hoặc tài liệu nhạy cảm
        server.middlewares.use((req, res, next) => {
          const rawUrl = decodeURIComponent(req.url?.split('?')[0] || '');
          if (rawUrl.startsWith('/assets/references') || rawUrl.startsWith('/assets/source')) {
            res.statusCode = 403;
            res.end('Access to raw reference and source assets is forbidden.');
            return;
          }
          next();
        });

        server.middlewares.use('/assets/game', (req, res, next) => {
          const cleanUrl = decodeURIComponent(req.url?.split('?')[0] || '');
          const assetPath = path.join(__dirname, 'assets', 'game', cleanUrl);
          if (fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
            const ext = path.extname(assetPath).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.png': 'image/png',
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.json': 'application/json',
              '.mp3': 'audio/mpeg',
              '.wav': 'audio/wav',
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            return fs.createReadStream(assetPath).pipe(res);
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
