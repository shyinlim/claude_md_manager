/**
 * File reader for local templates
 * Reads markdown files from the local template directory
 */

const fs = require('fs');
const path = require('path');
const { TEMPLATE } = require('../constant');

/**
 * Get template type dynamically by template name
 * @param {string} template_name - Template name
 * @returns {string} Template type (e.g., 'SDET', 'RD1', 'RD2')
 */
function get_template_type(template_name) {
    // Loop through all template types in TEMPLATE
    for (const type in TEMPLATE) {
        if (TEMPLATE[type].includes(template_name)) {
            return type;
        }
    }

    // If not found, return the first type as default
    const first_type = Object.keys(TEMPLATE)[0];
    console.warn(`Template '${template_name}' not found in any type, using default: ${first_type}`);
    return first_type;
}

/**
 * Read both specific and base templates
 * Returns in correct merge order: specific first, then base
 * @param {string} template_name - Template name
 * @returns {Object} Object with specific and base content
 */
function read_templates(template_name) {
    const template_type = get_template_type(template_name);

    // Read specific template
    const specific_path = path.join(process.cwd(), `template/${template_type}/${template_name}.md`);
    const specific = fs.readFileSync(specific_path, 'utf-8');

    // Read base template
    const base_path = path.join(process.cwd(), `template/${template_type}/00_base.md`);
    const base = fs.readFileSync(base_path, 'utf-8');

    return {
        specific: specific,
        base: base,
        type: template_type
    };
}

module.exports = {
    get_template_type,
    read_templates
};