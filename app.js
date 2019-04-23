const argv = require('yargs')
  .command(require('./create'))
  .command(require('./list'))
  .epilogue('For more information, see the GitHub repository for this app at: https://github.com/Dayun123/node--command-line-note-app')
  .argv


