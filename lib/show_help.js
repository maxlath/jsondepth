const { spawn } = require('child_process')
module.exports = () => {
  spawn('./node_modules/.bin/mdless', [ './README.md' ], { stdio: 'inherit' })
}
