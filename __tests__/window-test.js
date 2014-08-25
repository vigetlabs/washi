jest.autoMockOff();

describe("When Washi is added to the page", function() {

  it ('should have jQuery defined by the window', function() {
    window.jQuery = require('jquery');
    Washi = require('washi');

    expect(Washi.$).toEqual(window.jQuery)
  });

});
