import chalk from 'chalk';
export const logger = {
    info: (...args) => console.log(chalk.blue('ℹ'), ...args),
    success: (...args) => console.log(chalk.green('✅'), ...args),
    error: (...args) => console.error(chalk.red('❌'), ...args),
    warn: (...args) => console.warn(chalk.yellow('⚠'), ...args),
    step: (msg) => console.log(chalk.cyan('➜'), msg)
};
//# sourceMappingURL=logger.js.map