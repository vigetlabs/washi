import classList from '../classList'

describe('classList', function() {
  it('can add a list of classes to an element', function() {
    var el = document.createElement('div')

    classList.addClass(el, 'foo bar')

    expect(el.className).toEqual('foo bar')
  })

  it('can remove a list of classes to an element', function() {
    var el = document.createElement('div')

    el.className = 'foo bar baz'

    classList.removeClass(el, 'foo bar')

    expect(el.className).toEqual('baz')
  })

  it('can toggle a list of classes from an element given a boolean', function() {
    var el = document.createElement('div')

    el.className = 'foo bar'

    classList.toggleClass(el, 'foo', false)

    expect(el.className).toEqual('bar')
  })

  it('can toggle a list of classes from an element if no third option is provided', function() {
    var el = document.createElement('div')

    classList.toggleClass(el, 'foo')

    expect(el.className).toEqual('foo')
  })
})
