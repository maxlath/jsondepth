const improbableSeparator = 'Mn281wF2hS'
const separatorRegex = new RegExp(improbableSeparator, 'g')

module.exports = {
  substituteSpaces: function (argsString) {
    return argsString
    .split('[')
    .map(function (part) {
      const [ spacedArg, rest ] = part.split(']')
      return spacedArg.replace(/\s/g, improbableSeparator) + (rest || '')
    })
    .join('.')
    .split(' ')
  },
  restoreSpaces: (key) => key.replace(separatorRegex, ' ')
}
