/**                                                                                                                                                   │
 * List command handler                                                                                                                               │
 * Lists all available templates organized by team                                                                                                    │
 */


import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import * as logger from '../utility/logger.js'
import {scan_template} from '../util/scan_template.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_ROOT = path.resolve(__dirname, '../../');
const TEMPLATE_DIR = path.join(CLI_ROOT, 'template');


async function handle_list(option) {
    try {
        // Use scan_templates from template_reader
        const all_template = scan_templates();

        const team = Object.keys(all_template);

        if (team.length === 0) {
            logger.warn('No template found.');
            return;
        }

        console.log('\nAvailable Templates:\n');

        // List templates for each team
        for (const t of team) {
            const template = all_template[t];

            // Filter out base template unless --all is specified
            const filtered_template = option.all
                ? template
                : template.filter(name => name !== '00_base');

            if (filtered_template.length > 0) {
                console.log(`${t.toUpperCase()}:`);
                filtered_template.forEach(tmpl => {
                    const indicator = tmpl === '00_base' ? '⚙' : '✓';
                    console.log(`  ${indicator} ${tmpl}`);
                });
                console.log('');
            }
        }

        logger.info(`Total teams: ${team.length}`);

    } catch (error) {
        logger.error(`Failed to list templates: ${error.message}`);
        process.exit(1);
    }
}


export default handle_list;
