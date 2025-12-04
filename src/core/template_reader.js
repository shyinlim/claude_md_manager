/**
 * File reader for local templates
 * Reads markdown files from the local template directory
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

// Get CLI project root directory (not current working directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_ROOT = path.resolve(__dirname, '../../');

/**
 * Scan and build template structure dynamically
 * @returns {Object} { sdet: ['00_base', 'sample_repo_1', ...], team1: [...], ... }
 */
function scan_template() {
    const template_dir = path.join(CLI_ROOT, 'template');

    // Check if template directory exists
    if (!fs.existsSync(template_dir)) {
        throw new Error('Template directory not found');
    }

    const result = {};

    // Scan all team directories
    const team = fs.readdirSync(template_dir)
        .filter(item => {
            const item_path = path.join(template_dir, item);
            return fs.statSync(item_path).isDirectory();
        })
        .sort();

    // Scan templates for each team
    for (const t of team) {
        const team_dir = path.join(template_dir, t);
        const template = fs.readdirSync(team_dir)
            .filter(file => file.endsWith('.md'))
            .map(file => file.replace('.md', ''))
            .sort();
        result[t] = template;
    }

    return result;
}

/**
 * Get all template_name
 * @return [...TEMPLATE.SDET, ...TEMPLATE.TEAM1, ...TEMPLATE.TEAM2]
 */
export function get_all_template_name() {
    const scanned = scan_template();
    return [...new Set(Object.values(scanned).flat())];
}


/**
 * Get template type dynamically by template name
 * @param {string} template_name - Template name
 * @param {string} specified_team - Optional team type
 * @returns {string} Template type (e.g., 'SDET', 'TEAM1', 'TEAM2')
 */
function get_template_type(specified_team, template_name) {
    const TEMPLATE = scan_template()

    // If team is specified, use it directly
    if (specified_team) {
        if (TEMPLATE[specified_team] && TEMPLATE[specified_team].includes(template_name)) {
            return specified_team;
        }
        throw new Error(`Template '${template_name}' not found in team '${specified_team}'`);
    }

    // Otherwise, search for the template
    const found_team = [];
    for (const type in TEMPLATE) {
        if (TEMPLATE[type].includes(template_name)) {
            found_team.push(type);
        }
    }

    if (found_team.length === 0) {
        throw new Error(`Template '${template_name}' not found in any team`);
    }
    if (found_team.length > 1) {
        throw new Error(
            `Template '${template_name}' found in multiple teams: ${found_team.join(', ')}.
` +
            `Please specify --team option.`
        );
    }
    return found_team[0];
}

/**
 * Read specific and base templates
 * @param {string} specified_team - Optional team type
 * @param {string} template_name - Template name
 * @param {Object} options - Options
 * @param {boolean} options.skip_base - Skip reading base template
 * @returns {Object} Object with specific and base content
 */
function read_template(specified_team, template_name, options = {}) {
    const template_type = get_template_type(specified_team, template_name);

    // Read specific template (required)
    const specific_path = path.join(CLI_ROOT, `template/${template_type}/${template_name}.md`);
    if (!fs.existsSync(specific_path)) {
        throw new Error(`Template file not found: ${specific_path}`);
    }
    const specific = fs.readFileSync(specific_path, 'utf-8');

    // Read base template (skip if --skip-base is specified)
    let base = '';
    if (!options.skip_base) {
        const base_path = path.join(CLI_ROOT, `template/${template_type}/00_base.md`);
        if (fs.existsSync(base_path)) {
            base = fs.readFileSync(base_path, 'utf-8');
        }
    }


    return {
        specific: specific,
        base: base,
        type: template_type
    };
}

export {
      scan_template,
      get_all_template_name,
      get_template_type,
      read_template
  };