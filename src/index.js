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
    .description('Initialize project with CLAUDE.md template')
    .option('--team <type>', 'Team type (SDET, TEAM1, TEAM2, etc.)')
    .option('-t, --template <name>', 'Template name (e.g., api_testcase, handytools)')
    .option('--skip-base', 'Skip merging with base template (00_base.md)')
    .option('-f, --force', 'Force overwrite existing config')
    .action(handle_init);

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


/**
 *
 * Command: config
 * Show current configuration
 */
program
    .command('config')
    .description('Show current project configuration')
    .action(() => {
        // TODO: Implement config command logic
        console.log('config command called');
    });


export {program};
