// /!\ this test fails when jsondepth is run as a child process
// cf http://stackoverflow.com/questions/15466383/how-to-detect-if-a-node-js-script-is-running-through-a-shell-pipe/15485424#comment71811390_15485424
const hasStdin = !process.stdin.isTTY

var rawArgs = process.argv.slice(2)
var file, showHelp
if (!hasStdin) {
  if (rawArgs.length === 1 && rawArgs[0].match(/^(--version|-v|-V)$/)) {
    console.log(require('../package.json').version)
    process.exit(0)
  }
  var filePath = rawArgs[0]
  if (filePath) {
    file = require('fs').readFileSync(filePath).toString()
    // Removing the file path from arguments to let other argument parsers
    rawArgs = rawArgs.slice(1)
  } else {
    showHelp = true
  }
}

const parseOptions = require('./parse_options')

var { args, formatAsJson, jsonIndentation, lineByLine } = parseOptions(rawArgs)

var path
var depth
// path and depth passed
if (args.length === 2) {
  path = args[0]
  depth = parseInt(args[1])
} else if (args.length === 1) {
  // only depth
  if (/^-?\d+$/.test(args[0])) {
    path = ''
    depth = parseInt(args[0])
  // only path
  } else {
    path = args[0]
    depth = 0
  }
// no argument passed
} else if (args.length === 0) {
  path = ''
  depth = 0
} else {
  throw new Error('too many arguments')
}

module.exports = { path, depth, file, formatAsJson, jsonIndentation, showHelp, lineByLine }
