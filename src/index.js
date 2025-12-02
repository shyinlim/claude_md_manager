/**
 * Main CLI program entry point
 * Registers all commands using commander.js
 */


const {program} = require('commander');
const package_json = require('../package.json');

// Import command handlers
const handle_init = require('./command/init');

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
    .option('-s, --source <url>', 'Custom template source URL')
    .option('-f, --force', 'Force overwrite existing config')
    .action(handle_init);

/**
 * Command: update
 * Update CLAUDE.md with latest templates
 */
program
    .command('update')
    .description('Update CLAUDE.md from configured templates')
    .option('-f, --force', 'Force update even if no changes detected')
    .action((options) => {
        // TODO: Implement update command logic (Step 12)
        console.log('update command called with options:', options);
    });

/**
 * Command: list
 * List all available templates
 */
program
    .command('list')
    .description('List all available templates')
    .option('-a, --all', 'Show both public and internal templates')
    .action((options) => {
        // TODO: Implement list command logic
        console.log('list command called with options:', options);
    });


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


module.exports = {program};
