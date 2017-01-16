const jsonOptionRegex = /(--json|-j)(=(\d{1}))?/

module.exports = function () {
  var argsString = process.argv.slice(2).join(' ')
  const jsonOptionRegexMatch = argsString.match(jsonOptionRegex)
  const formatAsJson = jsonOptionRegexMatch != null

  var jsonIndentation
  if (formatAsJson) {
    // Look for an indentation parameter
    jsonIndentation = /\d{1}/.test(jsonOptionRegexMatch[3]) && parseInt(jsonOptionRegexMatch[3])
    // or default to an indentation level of 2
    if (!(jsonIndentation || jsonIndentation === 0)) jsonIndentation = 2
  }

  // Recovering an args array without the json option
  argsString = argsString.replace(jsonOptionRegex, '').trim()

  return [ argsString, formatAsJson, jsonIndentation ]
}
