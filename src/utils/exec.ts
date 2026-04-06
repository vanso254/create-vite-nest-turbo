import { execa } from 'execa';
import { logger } from './logger.js';

export async function execSafe(command: string, args: string[], options?: any) {
    try {
        const child = execa(command, args, {
            stdio: 'inherit',
            ...options
        });
        return await child;
    } catch (error: any) {
        logger.error(`Command failed: ${command} ${args.join(' ')}`);
        throw error;
    }
}