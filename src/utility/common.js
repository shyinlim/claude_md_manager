/**
 * Get current timestamp in UTC with explicit +00:00 format
 * @returns {string} Formatted timestamp (e.g., 2025-12-02T00:23:32+00:00)
 */
export function get_utc_timestamp() {
    return new Date().toISOString().slice(0, 19) + '+00:00';
}
