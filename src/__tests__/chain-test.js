import chain from '../chain'

describe('Chain', function() {
  it('can produce a chainable API for a given object', function() {
    var obj = { toCall: jest.fn() }
    var link = chain(obj)

    link()
      .toCall()
      .toCall()

    expect(obj.toCall).toBeCalled()
  })

  it('chain.valueOf returns the tracked value', function() {
    var obj = { toCall: jest.fn() }
    var link = chain(obj)

    expect(link(1).valueOf()).toEqual(1)
  })

  it('returns the result of the last function it is defined', function() {
    var link = chain({
      four: function() {
        return 4
      }
    })()

    expect(link.four().valueOf()).toEqual(4)
  })

  it('maintains the value if the result of the last call is undefined', function() {
    var value = chain({
      skip: jest.fn()
    })('initial')
      .skip()
      .valueOf()

    expect(value).toEqual('initial')
  })

  it('can retrieve a specific value', function() {
    var value = chain({})([1, 2, 3]).get(0)
    expect(value).toEqual(1)
  })

  it('can return a fallback when retrieving a specific value', function() {
    var value = chain({})([1, 2, 3]).get(10, 'empty')
    expect(value).toEqual('empty')
  })
})
