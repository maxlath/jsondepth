require('should')
const getValue = require('../lib/get_value')

describe('get value', () => {
  it('should be a function', (done) => {
    getValue.should.be.a.Function()
    done()
  })

  it('should get the value at the end of the path', (done) => {
    var obj = {some: {long: {path: {val: 123}}}}
    getValue(obj, 'some.long.path.val').should.equal(123)
    done()
  })

  it('should return keys when asked', (done) => {
    var obj = {some: {long: {path: {a: 123, b: 456}}}}
    getValue(obj, 'some.long.path._keys').should.deepEqual([ 'a', 'b' ])
    done()
  })

  it('should return values when asked', (done) => {
    var obj = {some: {long: {path: {a: 123, b: 456}}}}
    getValue(obj, 'some.long.path._values').should.deepEqual([ 123, 456 ])
    done()
  })

  it('should return the first value', (done) => {
    var obj = [{a: 1, b: 2}, {a: 3, b: 4}]
    getValue(obj, '._first').a.should.equal(1)
    done()
  })

  it('should return the last value', (done) => {
    var obj = [{a: 1, b: 2}, {a: 3, b: 4}]
    getValue(obj, '._last').a.should.equal(3)
    done()
  })

  it('should return a map of the properties when asked', (done) => {
    var obj = {some: {long: {path: [{a: 123, b: 456}, {a: 789}]}}}
    getValue(obj, 'some.long.path._map.a').should.deepEqual([ 123, 789 ])
    done()
  })

  it('should return a map recursively', (done) => {
    var obj = {
      data: [
        {a: [{b: 1, c: 2}, {b: 3, c: 4}]},
        {a: [{b: 5, c: 6}, {b: 7, c: 8}]}
      ]
    }
    getValue(obj, 'data._map.a._map.b').should.deepEqual([
      [ 1, 3 ],
      [ 5, 7 ]
    ])
    done()
  })

  it('should return undefined when one of the value is missing', (done) => {
    var obj = {
      data: [
        {a: [{b: 1, c: 2}, {b: 3, c: 4}]},
        {d: {}},
        {a: [{b: 5, c: 6}, {b: 7, c: 8}]}
      ]
    }
    getValue(obj, 'data._map.a._map.b').should.deepEqual([
      [ 1, 3 ],
      undefined,
      [ 5, 7 ]
    ])
    done()
  })
})
