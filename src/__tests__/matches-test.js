jest.autoMockOff();

describe("Matches", function() {
  var matches = require('../matches');

  it ("can determine if an element matches a selector", function() {
    var el = document.createElement('div');

    el.className = 'foobar';

    expect(matches(el, '.foobar')).toEqual(true);
  });

  it ("returns false if the element provided is not a DOM element", function() {
    expect(matches(document, '.foobar')).toEqual(false);
  });

});
