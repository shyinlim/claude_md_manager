/**
 * Project-wide constant
 * Centralized configuration values used across the application
 */

export const CONFIG_FILE_NAME = '.claude/.claude.md.config.json';

export const OUTPUT_FILE_PATH = '.claude/CLAUDE.md';

export const SUCCESS_MSG = {
    INIT: 'Initialized successfully! Config file created.',
    UPDATE: 'CLAUDE.md updated successfully!',
    CONFIG_CREATED: 'Configuration file created.'
};

export const ERROR_MSG = {
    NO_CONFIG: 'Configuration file not found. Run "claudemd-manager init" first.',
    NO_TOKEN: 'GitLab token not found. Please set GITLAB_TOKEN environment variable.',
    DOWNLOAD_FAILED: 'Failed to download template files.',
    MERGE_FAILED: 'Failed to merge template files.',
    WRITE_FAILED: 'Failed to write CLAUDE.md file.'
};

export const COMMAND_GUIDE = {
    'init': 'claudemd-manager init --team sdet --template sample_repo_1 --force',
    'update': 'claudemd-manager update',
}





