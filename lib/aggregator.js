const { inspect } = require('util')
const getValue = require('./get_value')
const { path, formatAsJson, jsonIndentation } = require('../lib/parse_arguments')
var { depth } = require('../lib/parse_arguments')

var data = ''

function append (buf) { data += buf.toString() }

function log (chunk) {
  var obj
  try {
    // A chunk can be a sub-part of the full data
    // See the line by line parsing attempt bellow
    // Beware of chunks that are empty strings that could trigger an infinite loop
    if (chunk == null) chunk = data
    // if (chunk == '') process.exit(0)
    obj = JSON.parse(chunk)
  } catch (error) {
    // Try to parse line per line, keeping only lines that could be JSON
    const lines = chunk.split('\n').filter((line) => line[0] === '{')
    if (lines.length > 1) {
      return lines.forEach(log)
    } else {
      const extract = chunk.lenght > 20 ? `${chunk.slice(0, 15)}...` : `${chunk} (${typeof chunk})`
      console.error(`couldn't parse JSON: ${extract}\n`, error)
      process.exit(1)
    }
  }

  obj = getValue(obj, path)

  if (obj == null) {
    // No value could be found
    // Return an error code to signal so that commands such as the following can work:
    // cat package.json | jd nonexistingkey || echo 'key not found, do something else then'
    return process.exit(1)
  } else if (typeof obj === 'string') {
    // Avoid using util.inspect on strings as it keeps the quotes
    console.log(obj)
  } else if (formatAsJson) {
    console.log(JSON.stringify(obj, null, jsonIndentation))
  } else {
    // Avoid colorizing when stdout isn't the terminal
    var colors = process.stdout.isTTY
    if (depth === -1) depth = Infinity
    // util.inspect doc: https://nodejs.org/api/util.html#util_util_inspect_object_options
    console.log(inspect(obj, { depth, colors, maxArrayLength: null }))
  }
}

module.exports = { append, log }
