/**                                                                                                                                                   │
 * List command handler                                                                                                                               │
 * Lists all available templates organized by team                                                                                                    │
 */


import * as logger from '../utility/logger.js';
import {scan_template} from '../core/template_reader.js';


async function handle_list(option) {
    try {
        // Use scan_template from template_reader
        const all_template = scan_template();

        const type_list = Object.keys(all_template);

        if (type_list.length === 0) {
            logger.warning('No template found.');
            return;
        }

        console.log('\nAvailable Template:\n');

        // List templates for each type
        for (const type of type_list) {
            console.log(`\n${type.toUpperCase()}:`);

            const category_map = all_template[type];
            const category_list = Object.keys(category_map);

            for (const category of category_list) {

                const profile_list = category_map[category]

                // Show all profile
                if (profile_list.length > 0) {
                    console.log(`  ${category}:`);
                    profile_list.forEach(profile => {
                        console.log(`    ✓ ${profile}`);
                    });
                }
            }
        }
    } catch (error) {
        logger.error(`Failed to list template: ${error.message}`);
        process.exit(1);
    }
}


export default handle_list;
