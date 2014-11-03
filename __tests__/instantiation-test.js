jest.autoMockOff();

describe("Instantiation", function() {

  var Washi = require('washi');

  it ("works with new", function() {
    var m = new Washi({
      el: document.createElement('button')
    });

    expect(m.el.tagName).toEqual('BUTTON');
  });

  it ("works as a factory", function() {
    var m = Washi({
      el: document.createElement('button')
    });

    expect(m.el.tagName).toEqual('BUTTON');
  });

  it ("can mix together multiple objects when called, by order of priority", function() {
    var m = Washi({
      el: document.createElement('button')
    }, {
      el: document.createElement('a')
    });

    expect(m.el.tagName).toEqual('A');
  });

});
