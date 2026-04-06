import { execSafe } from '../utils/exec.js';
import { writeFile, ensureDir } from '../utils/fs.js';

export async function generateViteReactApp() {
    await ensureDir('apps/web');

    // Use Vite CLI to scaffold
    await execSafe('pnpm', ['create', 'vite', 'apps/web', '--template', 'react-ts'], {
        stdio: 'inherit'
    });

    // Enhance vite.config.ts with NestJS proxy
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }
})`;
    await writeFile('apps/web/vite.config.ts', viteConfig);

    // Update package.json scripts for Turborepo compatibility
    // (Vite already has dev/build/lint, so we're good!)
}