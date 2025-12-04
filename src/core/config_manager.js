/**
 * Configuration file manager
 * Handles reading and writing .claudemd.config.json with config array structure
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
 * Read entire config file
 * @returns {Object|null} Config object with config array, or null if not exists
 */
function read_config_file() {
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
 * Write entire config file
 * @param {Object} config_data - Configuration object with config array
 */
function write_config_file(config_data) {
    try {
        const config_dir = path.dirname(CONFIG_FILE_NAME);
        if (!fs.existsSync(config_dir)) {
            fs.mkdirSync(config_dir, {recursive: true});
        }

        const content = JSON.stringify(config_data, null, 2);
        fs.writeFileSync(CONFIG_FILE_NAME, content, 'utf-8')
    } catch (error) {
        throw new Error(`Failed to write config file: ${error.message}`);
    }
}

/**
 * Find config by type, category, and profile
 * @param {string} type - Template type
 * @param {string} category - Category name
 * @param {string} profile - Profile name (can be null)
 * @returns {Object|null} Config object or null if not found
 */
function find_config(type, category, profile) {
    const config_data = read_config_file();
    if (!config_data || !config_data.config) {
        return null;
    }

    return config_data.config.find(c =>
        c.type === type &&
        c.category === category &&
        c.profile === (profile || null)
    ) || null;
}

/**
 * Check if specific config exists
 * @param {string} type - Template type
 * @param {string} category - Category name
 * @param {string} profile - Profile name (can be null)
 * @returns {boolean} True if config exists
 */
function config_exists_exact(type, category, profile) {
    return find_config(type, category, profile) !== null;
}

/**
 * Create or append config
 * @param {string} type - Template type (instruction/skill)
 * @param {string} category - Category name
 * @param {string} profile - Profile name (optional for skill)
 * @returns {Object} Created config object
 */
function create_config(type, category, profile) {
    const new_config = {
        type: type,
        category: category,
        profile: profile || null
    };

    let config_data = read_config_file();

    if (!config_data) {
        // Create new config file with config array
        config_data = {
            version: package_json.version,
            config: [new_config],
            create_at: get_utc_timestamp(),
            update_at: get_utc_timestamp(),
            command: COMMAND_GUIDE
        };
    } else {
        // Append to existing config array
        config_data.config.push(new_config);
        config_data.update_at = get_utc_timestamp();
    }

    write_config_file(config_data);
    return new_config;
}

/**
 * Replace existing config
 * @param {string} type - Template type
 * @param {string} category - Category name
 * @param {string} profile - Profile name (can be null)
 * @returns {Object} Replaced config object
 */
function replace_config(type, category, profile) {
    const config_data = read_config_file();
    if (!config_data || !config_data.config) {
        throw new Error('Config file not found.');
    }

    const new_config = {
        type: type,
        category: category,
        profile: profile || null
    };

    // Find and replace
    const config_index = config_data.config.findIndex(c =>
        c.type === type &&
        c.category === category &&
        c.profile === (profile || null)
    );

    if (config_index !== -1) {
        config_data.config[config_index] = new_config;
        config_data.update_at = get_utc_timestamp();
        write_config_file(config_data);
        return new_config;
    }

    throw new Error(`Config not found: type=${type}, category=${category}, profile=${profile}`);
}

/**
 * Get all config from the config array
 * @returns {Array<Object>} Array of config objects
 */
function get_all_config() {
    const config_data = read_config_file();
    if (!config_data || !config_data.config) {
        return [];
    }

    return config_data.config;
}

/**
 * Update file timestamp (called after updating output files)
 */
function update_timestamp() {
    const config_data = read_config_file();
    if (!config_data) {
        throw new Error('Config file not found.');
    }

    config_data.update_at = get_utc_timestamp();
    write_config_file(config_data);
}

export {
    config_exists,
    config_exists_exact,
    find_config,
    read_config_file,
    write_config_file,
    create_config,
    replace_config,
    get_all_config,
    update_timestamp
};


