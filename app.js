const l = console.log

const chalk = require('chalk')
const argv = require('yargs')
  .command(require('./create.js'))
  .epilogue('For more information, see the GitHub repository for this app at: https://github.com/Dayun123/node--command-line-note-app')
  .argv


