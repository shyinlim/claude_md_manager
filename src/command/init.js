/**
 * Init command implementation
 * Initialize project with CLAUDE.md template configuration
 */

import fs from 'fs';
import path from 'path';
import * as logger from '../utility/logger.js';
import * as config_manager from '../core/config_manager.js';
import {read_template} from '../core/file_reader.js';
import {merge_template} from '../core/file_merger.js';
import {
    TEMPLATE,
    COMMAND_TEMPLATE,
    GITHUB_TEMPLATE_SOURCE,
    GITLAB_TEMPLATE_SOURCE,
    OUTPUT_FILE_PATH,
    SUCCESS_MSG,
    ERROR_MSG
} from '../constant.js';


/**
 * Handle init command
 * @param {Object} options - Command options from commander
 */
async function handle_init(option) {

    // Check if config already exists
    if (config_manager.config_exists()) {
        if (!option.force) {
            logger.warning('Config file already exists!');
            logger.info('If you want to reinitialize, delete .claudemd.config.json first');
            process.exit(1);
        }
        logger.info('Force flag detected, overwriting existing config...');
    }

    // Get template name from options
    const team = option.team
    const template_name = option.template;
    const custom_source = option.source;

    // Validate template name if provided
    if (template_name) {
        const all_template = COMMAND_TEMPLATE;
        if (!all_template.includes(template_name)) {
            logger.error(`Invalid template: ${template_name}`);
            process.exit(1);
        }
    }

    // Determine template source
    let source = custom_source;
    if (!source) {
        // Default: use GitLab for internal template
        source = GITLAB_TEMPLATE_SOURCE;
    }

    // Create config file
    try {
        // Step 1: Create config file '.claude.md.config.json'
        const config = config_manager.create_config(
            team,
            template_name || 'base',
            source
        );
        logger.success(SUCCESS_MSG.CONFIG_CREATED)

        // Step 2: Read template
        logger.info(`Reading templates for: ${config.template}`);
        const template = read_template(team, config.template);
        logger.info(`Template type: ${template.type}`);

        // Step 3: Merge template
        const merged_content = merge_template(template.specific, template.base);

        // Step 4: Create .claude directory if it doesn't exist
        const output_dir = path.dirname(OUTPUT_FILE_PATH);
        if (!fs.existsSync(output_dir)) {
            fs.mkdirSync(output_dir, {recursive: true});
            logger.info(`Created directory: ${output_dir}`);
        }

        // Step 5: Write CLAUDE.md
        fs.writeFileSync(OUTPUT_FILE_PATH, merged_content, 'utf-8');
        logger.success(SUCCESS_MSG.UPDATE);
        logger.info(`File created at: ${OUTPUT_FILE_PATH}`);
    } catch (error) {
        logger.error(`Failed to initialize: ${error.message}`);
        process.exit(1);
    }
}

export default handle_init;

