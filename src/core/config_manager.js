/**
 * Configuration file manager
 * Handles reading and writing .claudemd.config.json
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {get_utc_timestamp} from '../utility/common.js';
import {
    CONFIG_FILE_NAME,
    COMMAND_GUIDE
} from '../constant.js';

// Read package.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const package_json = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
);

/**
 * Check if config file exists in current directory
 * @returns {boolean} True if config exists
 */
function config_exists() {
    return fs.existsSync(CONFIG_FILE_NAME)
}

/**
 * Read config file
 * @returns {Object|null} Config object or null if not exists
 */
function read_config() {
    if (!config_exists()) {
        return null;
    }

    try {
        const content = fs.readFileSync(CONFIG_FILE_NAME, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        throw new Error(`Failed to read config file: ${error.message}`);
    }
}

/**
 * Write config file
 * @param {Object} config - Configuration object to write
 */
function write_config(config) {
    try {
        const config_dir = path.dirname(CONFIG_FILE_NAME);
        if (!fs.existsSync(config_dir)) {
            fs.mkdirSync(config_dir, {recursive: true});
        }

        const content = JSON.stringify(config, null, 2);
        fs.writeFileSync(CONFIG_FILE_NAME, content, 'utf-8')
    } catch (error) {
        throw new Error(`Failed to write config file: ${error.message}`);
    }
}

/**
 * Create initial config with template info
 * @param {string} team - Team name (optional, auto-detected if not provided)
 * @param {string} template - Template name
 * @param {string} source - Template source URL
 * @returns {Object} Created config object
 */
function create_config(team, template, source) {
    const config = {
        version: package_json.version,
        team: team || null,
        template: template,
        source: source,
        create_at: get_utc_timestamp(),
        update_at: get_utc_timestamp(),
        command: COMMAND_GUIDE,
    };

    write_config(config);
    return config;
}

/**
 * Update config file
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated config object
 */
function update_config(update) {

    const current_config = read_config();
    if (!current_config) {
        throw new Error('Config file not found. Run "init" first.');
    }

    const updated_config = {
        ...current_config,
        ...update,
        update_at: get_utc_timestamp(),
    };

    write_config(updated_config);
    return updated_config;
}

export {
    config_exists,
    read_config,
    write_config,
    create_config,
    update_config
};



