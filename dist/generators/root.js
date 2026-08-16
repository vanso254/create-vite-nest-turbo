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
        packageManager: "pnpm@9.0.0",
        scripts: {
            build: "turbo run build",
            dev: "concurrently \"pnpm run dev:backend\" \"pnpm run dev:frontend\"",
            "dev:backend": "turbo run dev --filter=@my-monorepo/api",
            "dev:frontend": "turbo run dev --filter=@my-monorepo/web",
            "dev:all": "turbo run dev",
            start: "turbo run start --filter=@my-monorepo/api",
            "start:backend": "turbo run start --filter=@my-monorepo/api",
            lint: "turbo run lint",
            clean: "turbo run clean",
            "build:frontend": "turbo run build --filter=@my-monorepo/web",
            "build:backend": "turbo run build --filter=@my-monorepo/api"
        },
        devDependencies: {
            turbo: "^2.3.0",
            typescript: "^5.5.0",
            concurrently: "^8.2.0"
        }
    }, null, 2));
}
//# sourceMappingURL=root.js.map