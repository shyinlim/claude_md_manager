/**
 * Main CLI program entry point
 * Registers all commands using commander.js
 */

import {program} from 'commander';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

import handle_init from './command/init.js';
import handle_update from './command/update.js';
import handle_list from './command/list.js';

// Read package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const package_json = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

// Set CLI metadata
program
    .name('claude_md_manager')
    .version(package_json.version)
    .description('Centralized CLAUDE.md management tool for teams');

/**
 * Command: init
 * Initialize a new project with template configuration
 */
program
    .command('init')
    .description('Initialize project with CLAUDE.md or SKILL.md template')
    .option('--type <type>', 'Template type (instruction or skill)')
    .option('--category <category>', 'Category name (e.g., sdet, professional1)')
    .option('--profile <profile>', 'Profile name (e.g., sample_repo_1), optional for skill type')
    .option('--skip-base', 'Skip merging with base template (only for instruction type)')
    .option('--force', 'Force overwrite existing config')
    .action(handle_init)

/**
 * Command: update
 * Update CLAUDE.md with latest templates
 */
program
    .command('update')
    .description('Update CLAUDE.md from configured templates')
    .option('--skip-base', 'Skip merging with base template (00_base.md)')
    .option('-f, --force', 'Force update even if no changes detected')
    .action(handle_update);

/**
 * Command: list
 * List all available templates
 */
program
    .command('list')
    .description('List all available templates')
    .option('-a, --all', 'Show both public and internal templates')
    .action(handle_list);


export {program};
