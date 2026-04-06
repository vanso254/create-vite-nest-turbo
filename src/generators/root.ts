import { writeFile } from '../utils/fs.js';
import { turboJsonTemplate } from '../templates/turbo.json.js';
import { pnpmWorkspaceTemplate } from '../templates/pnpm-workspace.yaml.js';
import { baseTsConfigTemplate } from '../templates/tsconfig.base.json.js';
import { npmrcTemplate } from '../templates/npmrc.js';
import { gitignoreTemplate } from '../templates/gitignore.js';

export async function generateRootConfigs() {
    await writeFile('turbo.json', turboJsonTemplate());
    await writeFile('pnpm-workspace.yaml', pnpmWorkspaceTemplate());
    await writeFile('tsconfig.json', baseTsConfigTemplate());
    await writeFile('.npmrc', npmrcTemplate());
    await writeFile('.gitignore', gitignoreTemplate());

    // Root package.json
    await writeFile('package.json', JSON.stringify({
        name: "my-monorepo",
        private: true,
        scripts: {
            build: "turbo run build",
            dev: "turbo run dev",
            lint: "turbo run lint",
            clean: "turbo run clean"
        },
        devDependencies: {
            turbo: "^2.3.0",
            typescript: "^5.5.0"
        }
    }, null, 2));
}