/**
 * Init command implementation
 * Initialize project with CLAUDE.md template configuration
 */

import fs from 'fs';
import path from 'path';
import * as logger from '../utility/logger.js';
import {config_exists, config_exists_exact, create_config, replace_config} from '../core/config_manager.js';
import {read_template} from '../core/template_reader.js';
import {merge_template} from '../core/template_merger.js';

import {
    OUTPUT_CLAUDE_MD_FILE_PATH,
    OUTPUT_SKILL_BASE_PATH,
    OUTPUT_SKILL_MD,
    TEMPLATE_TYPE,
    SUCCESS_MSG
} from '../constant.js';


/**
 * Handle init command
 * @param {Object} options - Command options from commander
 */
async function handle_init(option) {
    // Check require command
    if (!option.type) {
        logger.error('Missing required option: --type');
        process.exit(1);
    }
    if (!option.category) {
        logger.error('Missing required option: --category');
        process.exit(1);
    }
    // instruction type requires profile
    if (option.type === TEMPLATE_TYPE.INSTRUCTION && !option.profile) {
        logger.error('Missing required option: --profile');
        process.exit(1);
    }

    // Get template attribute first
    const type = option.type;
    const category = option.category;
    const profile = option.profile;

    // Check if this specific config already exists
    if (config_exists_exact(type, category, profile)) {
        if (!option.force) {
            logger.warning(`Config already exists: type=${type}, category=${category}, profile=${profile || 'N/A'}`);
            logger.info('Use --force to replace it');
            process.exit(1);
        }
        logger.info('Force flag detected, will replace existing config...');
    }

    // Create config file
    try {
        // Step 1: Create config file '.claude.md.config.json'
        let config;
        if (config_exists_exact(type, category, profile) && option.force) {
            config = replace_config(type, category, profile);
            logger.success('Config replaced successfully!');
        } else {
            config = create_config(type, category, profile);
            logger.success(SUCCESS_MSG.CONFIG_CREATED);
        }

        // Step 2: Read template
        logger.info(`Reading template: type=${type}, category=${category}, profile=${profile || 'N/A'}`);
        const template = read_template(type, category, profile, {skip_base: option.skipBase});

        // Step 3: Merge template
        const merged_content = merge_template(template.specific, template.base);

        // Step 4: Create .claude directory if it doesn't exist
        let output_file_path;
        if (type === TEMPLATE_TYPE.INSTRUCTION) {
            output_file_path = OUTPUT_CLAUDE_MD_FILE_PATH;
        } else if (type === TEMPLATE_TYPE.SKILL) {
            output_file_path = path.join(OUTPUT_SKILL_BASE_PATH, category, OUTPUT_SKILL_MD);
        }

        const output_dir = path.dirname(output_file_path);
        if (!fs.existsSync(output_dir)) {
            fs.mkdirSync(output_dir, {recursive: true});
            logger.info(`Created directory: ${output_dir}`);
        }

        // Step 5: Write md file
        fs.writeFileSync(output_file_path, merged_content, 'utf-8');
        logger.success(SUCCESS_MSG.UPDATE);
        logger.info(`File created at: ${output_file_path}`);

    } catch (error) {
        logger.error(`Failed to initialize: ${error.message}`);
        process.exit(1);
    }
}

export default handle_init;

