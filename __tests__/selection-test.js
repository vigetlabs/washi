jest.autoMockOff();

describe("Selection", function() {
  var Washi = require("washi");

  var el = document.createElement("p");

  it("has an `el`", function() {
    var w = Washi({ el: el }).get(0);

    expect(w.el === el).toBeTruthy();
  });

  it("defaults `el` to document.body", function() {
    var w = Washi().get(0);
    expect(w.el === document.body).toBeTruthy();
  });

  it("has an extendable default view", function() {
    var m = Washi({
      el: document.createElement("p")
    }).get(0);

    expect(m.el.tagName).toEqual("P");
  });

  describe("Children", function() {
    it("can select children using the `ui` attribute", function() {
      var m = Washi({
        el: function() {
          var div = document.createElement("div");
          div.innerHTML = "<p></p>";
          return div;
        },
        ui: {
          child: "p"
        }
      }).get(0);

      expect(m.ui.child[0].tagName).toEqual("P");
    });
  });
});
