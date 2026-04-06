import { Command } from 'commander';
import prompts from 'prompts';
import { logger } from '../utils/logger.js';
import { validateProjectName } from '../utils/validate.js';
import { generateRootConfigs } from '../generators/root.js';
import { generateViteReactApp } from '../generators/vite-react.js';
import { generateNestJSApp } from '../generators/nestjs.js';
import { generateSharedPackage } from '../generators/shared-package.js';
import { execSafe } from '../utils/exec.js';

export function createCommand() {
    return new Command('create')
        .argument('[project-name]', 'Name of the monorepo project')
        .option('--skip-install', 'Skip pnpm install after scaffolding')
        .option('--skip-git', 'Skip git init')
        .option('--with-shared', 'Include a shared @my-monorepo/types package')
        .action(async (projectName: string | undefined, options) => {
            try {
                // 1. Get & validate project name
                if (!projectName) {
                    const res = await prompts({
                        type: 'text',
                        name: 'name',
                        message: 'Project name:',
                        validate: (val) => validateProjectName(val) || 'Invalid name'
                    });
                    projectName = res.name;
                }

                if (!projectName) {
                    logger.error('Project name is required.');
                    process.exit(1);
                }

                validateProjectName(projectName);

                // 2. Ask about shared package if not specified
                if (options.withShared === undefined) {
                    const res = await prompts({
                        type: 'confirm',
                        name: 'shared',
                        message: 'Add a shared @my-monorepo/types package?',
                        initial: true
                    });
                    options.withShared = res.shared;
                }

                logger.info(`🚀 Creating monorepo: ${projectName}`);

                // 3. Create project directory
                await execSafe('mkdir', ['-p', projectName]);
                process.chdir(projectName);

                // 4. Generate root configs
                logger.step('Generating root configuration files...');
                await generateRootConfigs();
                // 5. Scaffold NestJS app
                logger.step('Scaffolding NestJS backend...');
                await generateNestJSApp();

                // 6. Scaffold Vite + React app
                logger.step('Scaffolding Vite + React (TypeScript) app...');
                await generateViteReactApp();



                // 7. Optional: Shared package
                if (options.withShared) {
                    logger.step('Generating shared @my-monorepo/types package...');
                    await generateSharedPackage();
                }

                // 8. Install dependencies (unless skipped)
                if (!options.skipInstall) {
                    logger.step('Installing dependencies with pnpm...');
                    await execSafe('pnpm', ['install'], { cwd: process.cwd() });
                }

                // 9. Initialize Git (unless skipped)
                if (!options.skipGit) {
                    logger.step('Initializing Git repository...');
                    await execSafe('git', ['init'], { cwd: process.cwd() });
                    await execSafe('git', ['add', '.'], { cwd: process.cwd() });
                }

                logger.success(`\n✅ Monorepo "${projectName}" created successfully!\n`);
                logger.info('Next steps:');
                logger.info(`  cd ${projectName}`);
                logger.info('  pnpm dev    # Start both apps concurrently');
                logger.info('  pnpm build  # Build all apps');
                logger.info('\n📚 Docs: https://turborepo.org/docs\n');

            } catch (error: any) {
                logger.error('❌ Failed to create monorepo:', error.message);
                process.exit(1);
            }
        });
}