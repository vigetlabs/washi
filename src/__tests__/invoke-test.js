import invoke from '../invoke'

describe('Invoke', function() {
  it('calls a function on all values', function() {
    expect(invoke([1, 2, 3], 'toString')).toEqual(['1', '2', '3'])
  })
})
