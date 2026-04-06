import { Command } from 'commander';
import { createCommand } from './commands/create.js';
import { logger } from './utils/logger.js';

export const program = new Command();

program
    .name('create-vite-nest-turbo')
    .description('🚀 Scaffold a Turborepo monorepo with Vite+React + NestJS + pnpm')
    .version('1.0.0')
    .addCommand(createCommand());

// Global error handler
process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled error:', reason);
    process.exit(1);
});