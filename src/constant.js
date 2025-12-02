/**
 * Project-wide constant
 * Centralized configuration values used across the application
 */

const GITHUB_TEMPLATE_SOURCE = 'https://github.com/shyinlim/claude_md_manager/template'

const GITLAB_TEMPLATE_SOURCE = 'https://gitlab-company/shyinlim/claude_md_manager/template'

const CONFIG_FILE_NAME = '.claude.md.config.json'

const OUTPUT_FILE_PATH = '.claude/CLAUDE.md'

const TEMPLATE = {
    sdet: ['00_base', 'sample_repo_1', 'sample_repo_2'],
    team1: ['00_base', 'sample_repo_1'],
    team2: ['00_base', 'sample_repo_1']
};

const COMMAND_TEMPLATE = Object.values(TEMPLATE).flat(); // [...TEMPLATE.SDET, ...TEMPLATE.TEAM1, ...TEMPLATE.TEAM2]

const ENV_VAR = {
    GITHUB_TOKEN: 'GITHUB_TOKEN',
    GITLAB_TOKEN: 'GITLAB_TOKEN'
};

const SUCCESS_MSG = {
    INIT: 'Initialized successfully! Config file created.',
    UPDATE: 'CLAUDE.md updated successfully!',
    CONFIG_CREATED: 'Configuration file created.'
};

const ERROR_MSG = {
    NO_CONFIG: 'Configuration file not found. Run "claude-md init" first.',
    NO_TOKEN: 'GitLab token not found. Please set GITLAB_TOKEN environment variable.',
    DOWNLOAD_FAILED: 'Failed to download template files.',
    MERGE_FAILED: 'Failed to merge template files.',
    WRITE_FAILED: 'Failed to write CLAUDE.md file.'
};

module.exports = {
    GITHUB_TEMPLATE_SOURCE,
    GITLAB_TEMPLATE_SOURCE,
    CONFIG_FILE_NAME,
    OUTPUT_FILE_PATH,
    TEMPLATE,
    COMMAND_TEMPLATE,
    ENV_VAR,
    SUCCESS_MSG,
    ERROR_MSG
};





