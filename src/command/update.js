/**
 * Update command implementation
 * Update CLAUDE.md from existing configuration
 */

import fs from 'fs';
import path from 'path';
import * as logger from '../utility/logger.js';
import {config_exists, get_all_config, update_timestamp} from '../core/config_manager.js';
import {read_template} from '../core/template_reader.js';
import {merge_template} from '../core/template_merger.js';
import {
    OUTPUT_CLAUDE_MD_FILE_PATH,
    OUTPUT_SKILL_BASE_PATH,
    OUTPUT_SKILL_MD,
    TEMPLATE_TYPE,
} from '../constant.js';


/**
 * Handle update command
 * @param {Object} options - Command options from commander
 */
async function handle_update(option) {
    // Step 1: Check if config exists
    if (!config_exists()) {
        logger.error('Config file not found. Run "claudemd-manager init" first.');
        process.exit(1);
    }

    try {
        // Step 2: Read existing config, then get the template's path
        const all_config = get_all_config();
        if (all_config.length === 0) {
            logger.error('No configs found in config file.');
            process.exit(1);
        }
        logger.info(`Found ${all_config.length} config(s), updating...\n`);

        // Step 3: Read template
        for (const config of all_config) {
            logger.info(`Updating: type=${config.type}, category=${config.category}, profile=${config.profile || 'N/A'}`);

            // Read template
            const template = read_template(config.type, config.category, config.profile, {skip_base: option.skipBase});

            // Merge template
            const merged_content = merge_template(template.specific, template.base);

            // Determine output path
            let output_file_path;
            if (config.type === TEMPLATE_TYPE.INSTRUCTION) {
                output_file_path = OUTPUT_CLAUDE_MD_FILE_PATH;
            } else if (config.type === TEMPLATE_TYPE.SKILL) {
                output_file_path = path.join(OUTPUT_SKILL_BASE_PATH, config.category, OUTPUT_SKILL_MD);
            }

            // Write file
            const output_dir = path.dirname(output_file_path);
            if (!fs.existsSync(output_dir)) {
                fs.mkdirSync(output_dir, {recursive: true});
                logger.info(`  Created directory: ${output_dir}`);
            }
            fs.writeFileSync(output_file_path, merged_content, 'utf-8');

            logger.success(`  ✓ Updated: ${output_file_path}\n`);
        }

        // Step 4: Update timestamp
        update_timestamp();
        logger.success('All configs updated successfully!');

    } catch (error) {
        logger.error(`Failed to update: ${error.message}`);
        process.exit(1);
    }

}

export default handle_update;