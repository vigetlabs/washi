jest.autoMockOff();

describe('Remove', function() {

  var remove = require('../remove');

  describe('when given a single item', function() {
    var parent = document.createElement('div');
    var child  = document.createElement('div');

    parent.appendChild(child);

    it ('can remove children', function() {
      remove(child)
      expect(parent.children.length).toEqual(0);
    });
  });

  describe('when given a list', function() {
    var a      = document.createElement('div');
    var b      = document.createElement('div');
    var parent = document.createElement('div');

    parent.appendChild(a);
    parent.appendChild(b);

    it ('removes all children', function() {
      remove([ a, b ])

      expect(parent.children.length).toEqual(0)
    });
  })
});
