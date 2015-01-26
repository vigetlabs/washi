jest.autoMockOff();

describe('Append', function() {

  var append = require('../append');

  describe('when given a single item', function() {
    var parent = document.createElement('div');

    it ('can append children to a parent', function() {
      var a      = document.createElement('div');
      var b      = document.createElement('div');
      var c      = document.createElement('div');

      append(parent, a, b, c)

      expect(a.parentNode).toEqual(parent)
      expect(b.parentNode).toEqual(parent)
      expect(c.parentNode).toEqual(parent)
    });
  });

  describe('when given a list', function() {
    var expected   = document.createElement('div');
    var unexpected = document.createElement('div');
    var parent     = [ expected, unexpected ]

    it ('appends children to the first item', function() {
      var a = document.createElement('div');

      append(parent, a)

      expect(a.parentNode).toEqual(expected)
    });

    it ('does not append children to other items', function() {
      var a = document.createElement('div');

      append(parent, a)

      expect(a.parentNode).not.toEqual(unexpected)
    });
  })

});
