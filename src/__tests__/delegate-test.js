import delegate from '../delegate'

function click(el) {
  var click = document.createEvent('MouseEvents')
  click.initEvent('click', true, true)
  el.dispatchEvent(click)
}

describe('Delegate', function() {
  it('can delegate an event', function() {
    var el = document.createElement('button')
    var mock = jest.fn()

    el.className = 'foobar'

    delegate(document, 'click', '.foobar', mock)

    document.body.appendChild(el)

    click(el)

    expect(mock).toBeCalled()
  })
})
