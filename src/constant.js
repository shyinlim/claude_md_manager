/**
 * Project-wide constant
 * Centralized configuration values used across the application
 */

export const TEMPLATE_TYPE = {
    INSTRUCTION: 'instruction',
    SKILL: 'skill'
}
export const CONFIG_FILE_NAME = '.claude/.claude.md.config.json';

export const OUTPUT_CLAUDE_MD_FILE_PATH = '.claude/CLAUDE.md';
export const OUTPUT_SKILL_BASE_PATH = '.claude/skills';
export const OUTPUT_SKILL_MD = 'SKILL.md'


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
    WRITE_FAILED: 'Failed to write CLAUDE.md file.',
};

export const COMMAND_GUIDE = {
    'init_instruction': 'claudemd-manager init --type instruction --category sdet --profile sample_repo_1 --force',
    'init_skill': 'claudemd-manager init --type skill --category professional1',
    'update': 'claudemd-manager update',
}





