require('should')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)

const shellExec = async cmd => {
  const { stdout, stderr } = await exec(cmd)
  return {
    stdout: stdout.trim(),
    stderr: stderr.trim()
  }
}

describe('cli', () => {
  it('should accept keys with spaces', done => {
    shellExec(`echo '{"a b": 123 }'| jd 'a b'`)
    .then(res => {
      res.stdout.should.equal('123')
      done()
    })
    .catch(done)
  })

  it('should accept keys with brakets', done => {
    shellExec(`echo '{"a b": 123 }'| jd '["a b"]'`)
    .then(res => {
      res.stdout.should.equal('123')
      done()
    })
    .catch(done)
  })

  it('should accept keys with a point', done => {
    shellExec(`echo '{"a b": 123 }'| jd '."a b"'`)
    .then(res => {
      res.stdout.should.equal('123')
      done()
    })
    .catch(done)
  })

  describe('piped', () => {
    it('should accept JSON on stdin', done => {
      shellExec('cat package.json | jd license')
      .then(res => {
        res.stdout.should.equal('MIT')
        done()
      })
      .catch(done)
    })

    it('should not throw when the output is truncated', done => {
      shellExec('cat package.json | jd scripts | head -n 1')
      .then(res => {
        done()
      })
      .catch(done)
    })
  })
  // /!\ Can't be tested at the moment as it would run it in a child process
  // which is the one big non-solved case
  // describe('standalone', () => {
  //   it('should accept a file path as first argument', done => {
  //     shellExec('jd package.json license')
  //     .then(res => {
  //       console.log('res', res)
  //       res.stdout.should.equal('MIT')
  //       done()
  //     })
  //     .catch(done)
  //   })
  // })
})
