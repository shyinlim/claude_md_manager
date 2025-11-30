/**
* Init command implementation
* Initialize project with CLAUDE.md template configuration
*/

const logger = require('../utility/logger')
const config_manager = require('../core/config_manager');
const {
    TEMPLATE,
    COMMAND_TEMPLATE,
    GITHUB_TEMPLATE_SOURCE,
    GITLAB_TEMPLATE_SOURCE,
    SUCCESS_MSG,
    ERROR_MSG
} = require('../constant');


/**
* Handle init command
* @param {Object} options - Command options from commander
*/
async function handle_init(option){

    // Check if config already exists
    if (config_manager.config_exists()){
        logger.warning('Config file already exists!');
        logger.info('If you want to reinitialize, delete .claudemd.config.json first');
        process.exit(1);
    }

    // Get template name from options
    const template_name = option.template;
    const custom_source = option.source;

    // Validate template name if provided
    if (template_name){
        const all_template = COMMAND_TEMPLATE;
        if (!all_template.includes(template_name)){
            logger.error(`Invalid template: ${template_name}`);
            process.exit(1);
        }
    }

    // Determine template source
    let source = custom_source;
    if (!source){
        // Default: use GitLab for internal template
        source = GITLAB_TEMPLATE_SOURCE;
    }

    // Create config file
    try{
        const config = config_manager.create_config(
            template_name || 'base',
            source
        );

        logger.success(SUCCESS_MSG.INIT);
        logger.info(`Template: ${config.template}`);
        logger.info(`Source: ${config.source}`);
        logger.info(`Config file created: .claudemd.config.json`);

        // TODO: Step 10 - Download and merge templates
        logger.info('Next: Run "claude-md update" to generate CLAUDE.md');
    } catch (error) {
        logger.error(`Failed to initialize: ${error.message}`);
        process.exit(1);
    }
}

 module.exports = handle_init;

