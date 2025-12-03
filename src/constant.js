/**
 * Project-wide constant
 * Centralized configuration values used across the application
 */

export const GITHUB_TEMPLATE_SOURCE = 'https://github.com/shyinlim/claude_md_manager/template';

export const GITLAB_TEMPLATE_SOURCE = 'https://gitlab-company/shyinlim/claude_md_manager/template';

export const CONFIG_FILE_NAME = '.claude/.claude.md.config.json';

export const OUTPUT_FILE_PATH = '.claude/CLAUDE.md';

export const TEMPLATE = {
    sdet: ['00_base', 'sample_repo_1', 'sample_repo_2'],
    team1: ['00_base', 'sample_repo_1'],
    team2: ['00_base', 'sample_repo_1']
};

export const COMMAND_TEMPLATE = Object.values(TEMPLATE).flat(); // [...TEMPLATE.SDET, ...TEMPLATE.TEAM1, ...TEMPLATE.TEAM2]

export const ENV_VAR = {
    GITHUB_TOKEN: 'GITHUB_TOKEN',
    GITLAB_TOKEN: 'GITLAB_TOKEN'
};

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





