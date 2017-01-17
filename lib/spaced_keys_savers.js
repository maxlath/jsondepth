const improbableSeparator = 'Mn281wF2hS'
const separatorRegex = new RegExp(improbableSeparator, 'g')

module.exports = {
  substituteSpaces: function (argsString) {
    return argsString
    .split('[')
    .map(function (part, index) {
      // The part before the '[' should not be affected
      // Just as the part after the ']' will be in the 'rest' variable
      // and not affected
      if (index === 0) return part
      const [ spacedArg, rest ] = part.split(']')
      return spacedArg.replace(/\s/g, improbableSeparator) + (rest || '')
    })
    .join('.')
    .split(' ')
  },
  restoreSpaces: (key) => key.replace(separatorRegex, ' ')
}
