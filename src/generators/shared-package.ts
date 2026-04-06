import { execSafe } from '../utils/exec.js';
import { writeFile } from '../utils/fs.js';

export async function generateSharedPackage() {
    await execSafe('mkdir', ['-p', 'packages/types/src']);

    // packages/types/package.json
    await writeFile('packages/types/package.json', JSON.stringify({
        name: "@my-monorepo/types",
        version: "0.0.0",
        main: "./dist/index.js",
        types: "./dist/index.d.ts",
        scripts: {
            "build": "tsc",
            "dev": "tsc -w",
            "clean": "rm -rf dist"
        },
        devDependencies: {
            "typescript": "^5.5.0"
        }
    }, null, 2));

    // packages/types/tsconfig.json
    await writeFile('packages/types/tsconfig.json', JSON.stringify({
        extends: "../../tsconfig.json",
        compilerOptions: {
            outDir: "dist",
            rootDir: "src",
            declaration: true,
            emitDeclarationOnly: false
        },
        include: ["src/**/*"]
    }, null, 2));

    // packages/types/src/index.ts
    await writeFile('packages/types/src/index.ts', `export interface User {
    id: string;
    name: string;
    email: string;
}
`);
}
