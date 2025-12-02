/**
* Init command implementation
* Initialize project with CLAUDE.md template configuration
*/

const logger = require('../utility/logger')
const config_manager = require('../core/config_manager');
const { read_template } = require('../core/file_reader');
const { merge_template } = require('../core/file_merger')
const {
    TEMPLATE,
    COMMAND_TEMPLATE,
    GITHUB_TEMPLATE_SOURCE,
    GITLAB_TEMPLATE_SOURCE,
    OUTPUT_FILE_PATH,
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
        // Step 1: Create config file
        const config = config_manager.create_config(
            template_name || 'base',
            source
        );
        logger.success(SUCCESS_MSG.CONFIG_CREATED)

        // Step 2: Read template
        logger.info(`Reading templates for: ${config.template}`);
        const template = read_template(config.template)
        logger.info(`Template type: ${template.type}`);

        // Step 3: Merge template
        const merged_content = merge_template(template.specific, template.base);

        // Step 4: Create .claude directory if it doesn't exist
        const output_dir = path.dirname(OUTPUT_FILE_PATH);
        if (!fs.existsSync(output_idr)){
            fs.mkdirSync(output_idr, {recursive: true});
            logger.info(`Created directory: ${output_dir}`);
        }

        // Step 5: Write CLAUDE.md
        fs.writeFileSync(OUTPUT_FILE_PATH, merge_content, 'utf-8');
        logger.success(SUCCESS_MSG.UPDATE);
        logger.info(`File created at: ${OUTPUT_FILE_PATH}`);
    } catch (error) {
        logger.error(`Failed to initialize: ${error.message}`);
        process.exit(1);
    }
}

module.exports = handle_init;

