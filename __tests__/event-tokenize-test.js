jest.autoMockOff();

describe("Event Tokenizing", function() {

  var Washi = require('washi');
  var $     = Washi.$ = require('jquery');

  it ('properly splits curly brace syntax', function() {
    expect(Washi.tokenize('click {foo}')).toEqual([
      'click',
      '{foo}'
    ]);
  });

  it ('properly splits curly brace syntax with spaces', function() {
    expect(Washi.tokenize('click { foo }')).toEqual([
      'click',
      '{ foo }'
    ]);
  });

  it ('properly splits Backbone.Marionette style syntax', function() {
    expect(Washi.tokenize('click @ui.foo')).toEqual([
      'click',
      '@ui.foo'
    ]);
  });

});
