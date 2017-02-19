require('should')
const execa = require('execa')

describe('cli', () => {
  describe('piped', () => {
    it('should accept a file path as first argument', (done) => {
      execa.shell('cat package.json | jd license')
      .then(res => {
        res.stdout.should.equal('MIT')
        done()
      })
    })
    it('should not throw when the output is truncated', (done) => {
      execa.shell('cat package.json | jd scripts | head -n 1')
      .then(res => {
        res.code.should.equal(0)
        done()
      })
    })
  })
})
