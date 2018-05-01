const values = require('lodash.values')
const spacedKeysSavers = require('./spaced_keys_savers')

module.exports = function getValue (obj, valuePath) {
  if (!valuePath || valuePath === '') {
    return obj
  }

  var pathParts = valuePath
    // replace '.' by '' to mimick jq syntax
    .replace(/^\./, '')
    .split('.')
    .map(spacedKeysSavers.restoreSpaces)

  while (obj != null && pathParts != null && pathParts.length > 0) {
    let nextPart = pathParts.shift()

    if (nextPart === '_keys') {
      obj = Object.keys(obj)
    } else if (nextPart === '_map') {
      if (!obj.map) {
        throw new Error(`this object has no map function: ${JSON.stringify(obj)}`)
      }
      const restPath = pathParts.join('.')
      // The loop should stop there as the rest of the parsing will happen in the map
      pathParts = null
      obj = obj.map(e => getValue(e, restPath))
    } else if (nextPart === '_values') {
      obj = values(obj)
    } else if (nextPart === '_first') {
      obj = obj[0]
    } else if (nextPart === '_last') {
      obj = obj.slice(-1)[0]
    } else {
      obj = obj[nextPart]
    }
  }

  return obj
}
