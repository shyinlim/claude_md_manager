/**
 * Simple logger utility with colored output
 * Uses chalk for terminal colors and symbols for visual feedback
 */

import chalk from 'chalk';

export function success(message) {
    console.log(chalk.green(`${message}`));
}

export function error(message) {
    console.error(chalk.red(`${message}`));
}

export function info(message) {
    console.log(chalk.blue(`ℹ${message}`));
}

export function warning(message) {
    console.log(chalk.yellow(`${message}`));
}

export function debug(message) {
    if (process.env.DEBUG) {
        console.log(chalk.gray(`${message}`));
    }
}
