import tokenize from '../tokenize'

describe('Tokenizing', function() {
  it('properly splits tagName selectors', function() {
    expect(tokenize('click p')).toEqual(['click', 'p'])
  })

  it('properly splits className selectors', function() {
    expect(tokenize('click .p')).toEqual(['click', '.p'])
  })

  it('properly splits id selectors', function() {
    expect(tokenize('click #p')).toEqual(['click', '#p'])
  })

  it('properly splits complex selectors', function() {
    expect(tokenize('click #p[a]')).toEqual(['click', '#p[a]'])
  })
})
