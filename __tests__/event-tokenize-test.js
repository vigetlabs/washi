jest.autoMockOff();

describe("Event Tokenizing", function() {

  var Washi = require('washi');
  var $     = Washi.$ = require('jquery');

  it ('properly splits tagName selectors', function() {
    expect(Washi.tokenize('click p')).toEqual([
      'click',
      'p'
    ]);
  });

  it ('properly splits className selectors', function() {
    expect(Washi.tokenize('click .p')).toEqual([
      'click',
      '.p'
    ]);
  });

  it ('properly splits id selectors', function() {
    expect(Washi.tokenize('click #p')).toEqual([
      'click',
      '#p'
    ]);
  });

  it ('properly splits complex selectors', function() {
    expect(Washi.tokenize('click #p[a]')).toEqual([
      'click',
      '#p[a]'
    ]);
  });

  it ('properly splits curly brace syntax', function() {
    expect(Washi.tokenize('click {foo}')).toEqual([
      'click',
      '{foo}'
    ]);
  });

  it ('properly splits curly brace syntax with spaces', function() {
    expect(Washi.tokenize('click { foo }')).toEqual([
      'click',
      '{foo}'
    ]);
  });

  it ('properly splits Backbone.Marionette style syntax', function() {
    expect(Washi.tokenize('click @ui.foo')).toEqual([
      'click',
      '@ui.foo'
    ]);
  });

});
