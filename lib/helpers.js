var specialKeys = ['_keys']

module.exports = {
  parsePath: function (path) {
    var specialKey
    // replace '.' by '' to mimick jq syntax
    path = path.replace(/^\./, '')
    var lastKey = path.split('.').slice(-1)[0]
    if (specialKeys.indexOf(lastKey) !== -1) {
      specialKey = lastKey
      // removing the special key from the path
      re = new RegExp(`.?${lastKey}$`)
      path = path.replace(re, '')
    }
    return [path, specialKey]
  },
  getSpecialValue: function (obj, specialKey) {
    if (specialKey === '_keys') {
      return Object.keys(obj)
    } else {
      return obj
    }
  }
}