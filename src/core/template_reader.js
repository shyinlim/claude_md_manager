/**
 * File reader for local templates
 * Reads markdown files from the local template directory
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {TEMPLATE_TYPE} from '../constant.js';

// Get CLI project root directory (not current working directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_ROOT = path.resolve(__dirname, '../../');

/**
 * Scan and build template structure dynamically
 * @returns {Object} { instruction: { sdet: [...] }, skill: { professional1: [...] } }
 */
function scan_template() {
    const template_dir = path.join(CLI_ROOT, 'template');

    // Check if template directory exists
    if (!fs.existsSync(template_dir)) {
        throw new Error('Template directory not found');
    }

    const result = {};

    // Level1: Scan type (instruction, skill)
    const type_list = fs.readdirSync(template_dir)
        .filter(item => {
            const item_path = path.join(template_dir, item);
            return fs.statSync(item_path).isDirectory();
        }).sort()

    // Level2: Scan category (module team, professional)
    for (const type of type_list) {
        const type_dir = path.join(template_dir, type);
        const category_list = fs.readdirSync(type_dir)
            .filter(item => {
                const item_path = path.join(type_dir, item);
                return fs.statSync(item_path).isDirectory();
            }).sort()
        result[type] = {}

        // Level3: All md file
        for (const category of category_list) {
            const category_dir = path.join(type_dir, category);
            const template_list = fs.readdirSync(category_dir)
                .filter(file => file.endsWith('.md'))
                .map(file => file.replace('.md', ''))
                .sort();
            result[type][category] = template_list;
        }
    }

    return result;
}

/**
 * Get all unique profile name from all type and category
 * Extract from structure: { instruction: { sdet: [...] }, skill: { professional1: [...] } }
 * @returns {Array<string>} Array of unique profile name (e.g., ['00_base', 'sample_repo_1', 'SKILL'])
 */
export function get_all_template_name() {
    const scanned = scan_template();
    const all_template = [];
    for (const type in scanned) {
        for (const category in scanned[type]) {
            all_template.push(...scanned[type][category]);
        }
    }
    return [...new Set(all_template)];
}

/**
 * Read template file(s) based on type, category, and profile
 * @param {string} type - Template type (instruction/skill)
 * @param {string} category - Category name (sdet/professional1/etc)
 * @param {string} profile - Profile name (sample_repo_1/SKILL/etc), optional for skill type
 * @param {Object} option - Options
 * @param {boolean} option.skip_base - Skip reading base template (only for instruction type)
 * @returns {Object} Object with specific and base content
 */
function read_template(type, category, profile, option = {}) {
    let specific_path;
    let base_path;

    // Build path based on type
    if (type === TEMPLATE_TYPE.INSTRUCTION) {
        // INSTRUCTION type: need profile + base
        specific_path = path.join(CLI_ROOT, `template/instruction/${category}/${profile}.md`);
        base_path = path.join(CLI_ROOT, `template/instruction/${category}/00_base.md`);
    } else if (type === TEMPLATE_TYPE.SKILL) {
        // SKILL type: only SKILL.md, no base
        specific_path = path.join(CLI_ROOT, `template/skill/${category}/SKILL.md`);
        base_path = null;  // No base for skill
    } else {
        throw new Error(`Invalid type: ${type}. Must be ${TEMPLATE_TYPE.INSTRUCTION} or ${TEMPLATE_TYPE.SKILL}`);
    }

    // Read specific file (required)
    if (!fs.existsSync(specific_path)) {
        throw new Error(`Template file not found: ${specific_path}`);
    }
    const specific = fs.readFileSync(specific_path, 'utf-8');

    // Read base file (only for INSTRUCTION type, can be skipped with --skip-base option)
    let base = '';
    if (type === 'instruction' && !option.skip_base && base_path) {
        if (fs.existsSync(base_path)) {
            base = fs.readFileSync(base_path, 'utf-8');
        }
    }

    return {
        specific: specific,
        base: base,
        type: type,
        category: category
    };

}

export {
    scan_template,
    read_template
};