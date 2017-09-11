import pluck from '../pluck'

describe('Pluck', function() {
  it('replaces values', function() {
    expect(pluck([{ color: 'red' }, { color: 'blue' }], 'color')).toEqual([
      'red',
      'blue'
    ])
  })

  it('has fallbacks', function() {
    expect(pluck([{ color: 'red' }, {}], 'color', 'black')).toEqual([
      'red',
      'black'
    ])
  })

  it('works on elements', function() {
    var div = document.createElement('div')
    var p = document.createElement('p')

    var names = pluck([div, p], 'tagName')

    expect(names).toEqual(['DIV', 'P'])
  })
})
