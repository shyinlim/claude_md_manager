#!/usr/bin/env node

/**
 * CLI entry point
 * This file is executed when user run: claudemd-manager
 */

// Import the main program
import {program} from '../src/index.js';

// Execute the CLI: init, update, uninstall
program.parse(process.argv);
