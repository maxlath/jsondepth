module.exports = () => {
  const { name, version, description, homepage } = require('../package.json')
  console.log(`${name}
v${version}
${description}
For documentation, see ${homepage}`)
}
