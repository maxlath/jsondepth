const jsonOptionRegex = /--json|-j=(\d+)/

module.exports = rawArgs => {
  const args = []
  const optionsArgsIndexes = []
  var formatAsJson = false
  var jsonIndentation = 2
  var lineByLine = false

  rawArgs.forEach((arg, index) => {
    // This argument as already been handled
    if (optionsArgsIndexes.includes(index)) return

    if (arg === '--json' || arg === '-j') {
      formatAsJson = true
      const nextArgIndex = index + 1
      const nextArg = rawArgs[nextArgIndex]
      if (nextArg != null && nextArg.match(/^\d+$/)) {
        jsonIndentation = parseInt(nextArg)
        optionsArgsIndexes.push(nextArgIndex)
      }
    } else if (arg.match(jsonOptionRegex)) {
      formatAsJson = true
      jsonIndentation = parseInt(arg.match(jsonOptionRegex)[1])
    } else if (arg.match(/^(--line|-l)$/)) {
      lineByLine = true
    } else {
      args.push(arg)
    }
  })

  return { args, formatAsJson, jsonIndentation, lineByLine }
}
