const path = require('path')
const { readFileSync } = require('fs')
// /!\ this test fails when jsondepth is run as a child process
// cf http://stackoverflow.com/questions/15466383/how-to-detect-if-a-node-js-script-is-running-through-a-shell-pipe/15485424#comment71811390_15485424
const hasStdin = !process.stdin.isTTY

module.exports = program => {
  let { args } = program

  let file
  if (!hasStdin) {
    let filePath = args[0]
    if (filePath) {
      filePath = path.resolve(process.cwd(), filePath)
      file = readFileSync(filePath).toString()
      // Removing the file path from arguments to let other argument parsers
      args = args.slice(1)
    } else {
      program.help()
    }
  }

  let jsonPath, depth
  // jsonPath and depth passed
  if (args.length === 2) {
    jsonPath = args[0]
    depth = parseInt(args[1])
  } else if (args.length === 1) {
    // only depth
    if (/^-?\d+$/.test(args[0])) {
      jsonPath = ''
      depth = parseInt(args[0])
    // only jsonPath
    } else {
      jsonPath = args[0]
      depth = 0
    }
  // no argument passed
  } else if (args.length === 0) {
    jsonPath = ''
    depth = 0
  } else {
    throw new Error('too many arguments')
  }

  return { file, jsonPath, depth }
}
