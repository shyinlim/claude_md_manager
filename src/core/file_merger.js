/**
* Template merger
* Merges specific template with base template
*/


/**
* Merge specific and base templates
* Order: specific content first, then base content
* @param {string} specific - Specific template content
* @param {string} base - Base template content
* @returns {string} Merged content
*/
function merge_template(specific, base){
    // Remove trailing whitespace from both
    const clean_specific = specific.trim();
    const clean_base = base.trim();

    // Merge with seperator
    const merged = clean_specific + '\n\n---\n\n' + clean_base;

    return merged;
}

module.exports = {
    merge_template
};
