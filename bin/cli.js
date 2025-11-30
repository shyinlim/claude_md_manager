/**
* CLI entry point
* This file is executed when user run: npx @your-org/claude-md
*/


// Import the main program
const {program} = require('../src/indx.js')

// Execute the CLI: init, update, uninstall
program.parse(process.argv)




