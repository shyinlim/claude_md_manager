/**
* Simple logger utility with colored output
* Uses chalk for terminal colors and symbols for visual feedback
*/

const chalk = require('chalk');

function success(message) {
    console.log(chalk.green(`${message}`));
}

function error(message) {
    console.error(chalk.red(`${message}`));
}

function info(message){
    console.log(chalk.blue(`ℹ${message}`));
}

function warning(message){
    console.log(chalk.yellow(`${message}`));
}

function debug(message){
    if (process.env.DEBUG){
        console.log(chalk.gray(`${message}`));
    }
}


module.exports = {
    success,
    error,
    info,
    warning,
    debug
};
