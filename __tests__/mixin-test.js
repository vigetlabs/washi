jest.autoMockOff();

describe("Washi", function() {

  Washi = require('washi');
  var $ = Washi.$ = require('jquery');

  it ('can mixin other washi entities', function() {
    var Child = Washi.extend({
      child: true
    });

    var Parent = Washi.extend({
      mixins: [Child]
    });

    var parent = new Parent();

    expect(parent.children[0] instanceof Child).toBeTruthy();
    expect(parent.children[0].parent instanceof Parent).toBeTruthy();
  });

  it ('does not mixin washi entities whose precondition fails', function() {
    var Child = Washi.extend({
      child: true
    }, {
      precondition: function() {
        return false;
      }
    });

    var Parent = Washi.extend({
      mixins: [Child]
    });

    var parent = new Parent();

    expect(parent.children.length).toEqual(0);
  });

});
