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

export function merge_template(specific, base) {
    // Remove trailing whitespace from both
    const clean_specific = specific.trim();
    const clean_base = base.trim();

    // If no base (skipped or not exists), just return specific
    if (!clean_base) {
        return clean_specific;
    }

    // If no specific (shouldn't happen), just return base
    if (!clean_specific) {
        return clean_base;
    }

    // Both exist, merge with separator
    const merged = clean_specific + '\n\n---\n\n' + clean_base;

    return merged;
}
