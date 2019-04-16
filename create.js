// module for the create command, should perform as follows:
// node app.js create --title="Title" --body="Body"
// optional aliases -t and -b

const utils = require('./utils.js')

exports.command = 'create'

exports.describe = '### create a note with --title="Title" --body="Body" ###'

exports.builder = {
  // these are the options
  title: {
    // these are the different keys that the options support
    alias: 't',
    demandOption: true,
    describe: 'Note title',
    string: true
  },
  body: {
    alias: 'b',
    demandOption: true,
    describe: 'Note body',
    string: true
  }
}

exports.handler = function (argv) {
  // do something with argv.
  utils.create(argv.title, argv.body)
}