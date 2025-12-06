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


export const COMMAND_GUIDE = {
      'init': {
          'description': 'Initialize Claude.md or Skill configuration',
          'option': {
              '--type': 'Template type (instruction/skill)',
              '--category': 'Category name (ex. sdet/professional1)',
              '--profile': 'Profile name (optional for skill, ex. sample_repo_1)',
              '--skip-base': 'Skip merging base template',
              '--force': 'Force overwrite existing config'
          },
          'example': {
              'instruction': 'npx claude-setting-manager@latest init --type instruction --category sdet --profile sample_repo_1',
              'skill': 'npx claude-setting-manager@latest init --type skill --category professional1',
          }
      },
      'update': {
          'description': 'Update all configurations based on config file',
          'option': {
              '--skip-base': 'Skip merging base template'
          },
          'example': {
              'basic': 'npx claude-setting-manager@latest update'
          }
      },
      'list': {
          'description': 'List all available templates',
          'example': {
              'basic': 'npx claude-setting-manager@latest list'
          }
      }
  }





