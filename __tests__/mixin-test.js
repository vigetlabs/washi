jest.autoMockOff();

describe("Washi", function() {

  var Washi = require('washi');

  it.only ('can mixin other washi entities', function() {
    var Child = {
      isChild: true
    }

    var Parent = {
      children: [ Child ]
    }

    var parent = Washi(Parent);

    expect(parent.children[0].isChild).toBeTruthy();
  });

  it ('does not mixin washi entities whose precondition fails', function() {
    var Child = {
      child: true,

      precondition: function() {
        return false;
      }
    }

    var Parent = {
      children: [Child]
    }

    var parent = Washi(Parent);

    expect(parent.children.length).toEqual(0);
  });

});
