require('should')
const execa = require('execa')

describe('cli', () => {
  describe('piped', () => {
    it('should accept JSON on stdin', done => {
      execa.shell('cat package.json | jd license')
      .then(res => {
        res.stdout.should.equal('MIT')
        done()
      })
      .catch(done)
    })

    it('should not throw when the output is truncated', done => {
      execa.shell('cat package.json | jd scripts | head -n 1')
      .then(res => {
        res.code.should.equal(0)
        done()
      })
      .catch(done)
    })
  })
  // /!\ Can't be tested at the moment as it would run it in a child process
  // which is the one big non-solved case
  // describe('standalone', () => {
  //   it('should accept a file path as first argument', done => {
  //     execa.shell('jd package.json license')
  //     .then(res => {
  //       console.log('res', res)
  //       res.stdout.should.equal('MIT')
  //       done()
  //     })
  //     .catch(done)
  //   })
  // })
})
