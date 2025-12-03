/**
 * Update command implementation
 * Update CLAUDE.md from existing configuration
 */


const fs = require('fs');
const path = require('path');
const logger = require('../utility/logger')
const config_manager = require('../core/config_manager');
const {read_template} = require('../core/file_reader');
const {merge_template} = require('../core/file_merger')
const {
    OUTPUT_FILE_PATH,
    SUCCESS_MSG,
    ERROR_MSG
} = require('../constant');


/**
 * Handle update command
 * @param {Object} options - Command options from commander
 */
async function handle_update(option) {
    // Step 1: Check if config exists
    if (!config_manager.config_exists()) {
        logger.error('Config file not found. Run "claude-md init" first.');
        process.exit(1);
    }

    try {
        // Step 2: Read existing config, then get the template's path
        const config = config_manager.read_config();
        logger.info(`Current template: ${config.template}`);
        if (config.team) {
            logger.info(`Team: ${config.team}`);
        }

        // Step 3: Read templates
        logger.info('Reading templates...');
        const template = read_template(config.team, config.template);
        logger.info(`Template type: ${template.type}`);

        // Step 4: Merge templates
        const merged_content = merge_template(template.specific, template.base);

        // Step 5: Write CLAUDE.md
        const output_dir = path.dirname(OUTPUT_FILE_PATH);
        if (!fs.existsSync(output_dir)) {
            fs.mkdirSync(output_dir, {recursive: true});
            logger.info(`Created directory: ${output_dir}`);
        }
        fs.writeFileSync(OUTPUT_FILE_PATH, merged_content, 'utf-8');

        // Step 6: Update config timestamp
        config_manager.update_config({})
        logger.success(SUCCESS_MSG.UPDATE);
        logger.info(`File updated at: ${OUTPUT_FILE_PATH}`);
    } catch (error) {
        logger.error(`Failed to update: ${error.message}`);
        process.exit(1);
    }

}

module.exports = handle_update;