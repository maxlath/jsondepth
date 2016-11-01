const values = require('lodash.values')

module.exports = function getValue (obj, valuePath) {
  if (!valuePath || valuePath === '') {
    return obj
  }

  var pathParts = valuePath
    // replace '.' by '' to mimick jq syntax
    .replace(/^\./, '')
    .split('.')

  while (obj != null && pathParts != null && pathParts.length > 0) {

    nextPart = pathParts.shift()

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
    } else {
      obj = obj[nextPart]
    }

  }

  return obj
}
