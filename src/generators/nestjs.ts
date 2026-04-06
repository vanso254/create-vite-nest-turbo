import { execSafe } from '../utils/exec.js';
import { writeFile, readFile, updateFile } from '../utils/fs.js';

export async function generateNestJSApp() {
    await execSafe('pnpm', ['dlx', '@nestjs/cli', 'new', 'apps/api', '--package-manager', 'pnpm', '--skip-git', '--skip-install'], {
        stdio: 'inherit'
    });

    // Update NestJS package.json scripts for Turborepo
    const apiPkg = JSON.parse(await readFile('apps/api/package.json', 'utf-8'));
    apiPkg.scripts = {
        ...apiPkg.scripts,
        build: "nest build",
        dev: "nest start --watch",
        clean: "rm -rf dist"
    };
    await writeFile('apps/api/package.json', JSON.stringify(apiPkg, null, 2));

    // Enable CORS for frontend communication
    const mainTs = await readFile('apps/api/src/main.ts', 'utf-8');
    const enhancedMain = mainTs.replace(
        'await app.listen(3000);',
        `await app.listen(3000, '0.0.0.0');`
    ).replace(
        'import { NestFactory } from \'@nestjs/core\';',
        `import { NestFactory } from '@nestjs/core';
import { enableCors } from '@nestjs/common';`
    );
    await writeFile('apps/api/src/main.ts', enhancedMain);
}