/**
 * File reader for local templates
 * Reads markdown files from the local template directory
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {TEMPLATE} from '../constant.js';

// Get CLI project root directory (not current working directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_ROOT = path.resolve(__dirname, '../../');


/**
 * Get template type dynamically by template name
 * @param {string} template_name - Template name
 * @param {string} specified_team - Optional team type
 * @returns {string} Template type (e.g., 'SDET', 'TEAM1', 'TEAM2')
 */
function get_template_type(specified_team, template_name) {

    // If team is specified, use it directly
    if (specified_team) {
        if (TEMPLATE[specified_team] && TEMPLATE[specified_team].includes(template_name)) {
            return specified_team;
        }
        throw new Error(`Template '${template_name}' not found in team '${specified_team}'`);
    }

    // Otherwise, search for the template
    const found_team = []
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
 * Read both specific and base templates
 * Returns in correct merge order: specific first, then base
 * @param {string} template_name - Template name
 * @param {string} specified_team - Optional team type
 * @returns {Object} Object with specific and base content
 */
function read_template(specified_team, template_name) {
    const template_type = get_template_type(specified_team, template_name);

    // Read specific template
    const specific_path = path.join(CLI_ROOT, `template/${template_type}/${template_name}.md`);
    const specific = fs.readFileSync(specific_path, 'utf-8');

    // Read base template
    const base_path = path.join(CLI_ROOT, `template/${template_type}/00_base.md`);
    const base = fs.readFileSync(base_path, 'utf-8');

    return {
        specific: specific,
        base: base,
        type: template_type
    };
}

export {
    get_template_type,
    read_template
};