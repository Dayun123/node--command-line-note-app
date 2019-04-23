/*

Module for the list command, should perform as follows:

`node app.js list`

Current Notes:

-- Title --     ||  -- Body --
Allie Presents  || Trip To Port Arthur, Spa Day
Dog Stuff       || Vet Appointment, Flea Medicine
Grocery List    || Eggs, Ham, Cheese, Bread (this could be colored)

*/

const yargs = require('yargs')

const utils = require('./utils')
const log = require('./log')

exports.command = 'list'

exports.describe = '### list all notes ###'

exports.handler = function (argv) {
  utils.list()
}