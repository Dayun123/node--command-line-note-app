// module for the create command, should perform as follows:
// node app.js create --title="Title" --body="Body"
// optional aliases -t and -b


const yargs = require('yargs')

const utils = require('./utils')
const log = require('./log')

exports.command = 'create'

exports.describe = '### create a note with --title="Title" --body="Body" ###'

exports.builder = {
  // these are the options
  title: {
    // these are the different keys that the options support
    alias: 't',
    demandOption: true,
    describe: 'Note title',
    requiresArg: 'string',
    string: true
  },
  body: {
    alias: 'b',
    demandOption: true,
    describe: 'Note body',
    requiresArg: 'string',
    string: true
  }
}

exports.handler = function (argv) {
  // require a title and body value in order to create a note
  if (argv.title && argv.body) {
    utils.create(argv.title, argv.body)
  } else {
    log.logMsg('error', '\nMust have a title and a body value to create a note!\n')
    yargs.showHelp()
  }
}