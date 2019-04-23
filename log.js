// module which provides logging functions that were originally in utils.js but moved here to create better separation of concerns.

const chalk = require('chalk')

const logMsg = (type, msg) => {
  if (type === 'success') {
    console.log(chalk.greenBright(msg))
  } else if (type === 'error') {
    console.log(chalk.redBright(msg))
  }
}

module.exports = {
  logMsg: logMsg
}
