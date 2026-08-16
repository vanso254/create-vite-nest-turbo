import { execa } from 'execa';
import { logger } from './logger.js';
export async function execSafe(command, args, options) {
    try {
        const child = execa(command, args, {
            stdio: 'inherit',
            ...options
        });
        return await child;
    }
    catch (error) {
        logger.error(`Command failed: ${command} ${args.join(' ')}`);
        throw error;
    }
}
//# sourceMappingURL=exec.js.map