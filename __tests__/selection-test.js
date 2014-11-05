jest.autoMockOff();

describe("Selection", function() {

  var Washi = require('washi');

  var el = document.createElement("p");

  it ("has an `el`", function() {
    var w = Washi({ el: el });

    expect(w.el === el).toBeTruthy();
  });

  it ("defaults `el` to document.body", function() {
    var w = Washi();
    expect(w.el === document.body).toBeTruthy();
  });

  it ("has an extendable default view", function() {
    var m = Washi({
      el: document.createElement('p')
    })

    expect(m.el.tagName).toEqual("P");
  });

  describe("Children", function() {
    it ("can select children using the `ui` attribute", function() {
      var m = Washi({
        el: function() {
          var div = document.createElement('div');
          div.innerHTML = '<p></p>';
          return div;
        },
        ui: {
          child: 'p'
        }
      });

      expect(m.ui.child.valueOf()[0].tagName).toEqual('P');
    });
  });
});
