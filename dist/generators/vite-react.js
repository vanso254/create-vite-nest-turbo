import { execSafe } from '../utils/exec.js';
import { writeFile, readFile, ensureDir, removeFile } from '../utils/fs.js';
export async function generateViteReactApp() {
    await ensureDir('apps/web');
    // Use Vite CLI to scaffold
    await execSafe('pnpm', ['create', 'vite', 'apps/web', '--template', 'react-ts'], {
        stdio: 'inherit'
    });
    // Remove the nested .gitignore from Vite since we manage a root one
    await removeFile('apps/web/.gitignore');
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
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})`;
    await writeFile('apps/web/vite.config.ts', viteConfig);
    // Update package.json scripts for Turborepo compatibility
    const webPkg = JSON.parse(await readFile('apps/web/package.json', 'utf-8'));
    webPkg.name = '@my-monorepo/web';
    webPkg.scripts = {
        ...webPkg.scripts,
        build: "tsc && vite build",
        dev: "vite",
        preview: "vite preview",
        clean: "rm -rf dist"
    };
    await writeFile('apps/web/package.json', JSON.stringify(webPkg, null, 2));
}
//# sourceMappingURL=vite-react.js.map