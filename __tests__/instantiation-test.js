jest.autoMockOff();

describe("Instantiation", function() {
  var Washi = require("washi");

  it("works with new", function() {
    var m = new Washi({
      el: document.createElement("button")
    }).get(0);

    expect(m.el.tagName).toEqual("BUTTON");
  });

  it("works as a factory", function() {
    var m = Washi({
      el: document.createElement("button")
    }).get(0);

    expect(m.el.tagName).toEqual("BUTTON");
  });

  it("can mix together multiple objects when called, by order of priority", function() {
    var m = Washi(
      {
        el: document.createElement("button")
      },
      {
        el: document.createElement("a")
      }
    ).get(0);

    expect(m.el.tagName).toEqual("A");
  });

  it("doesn't do anything if no element is found", function() {
    var m = Washi({
      el: ".blatenty-unselectable"
    });

    expect(m.valueOf().length).toEqual(0);
  });

  it("receives the instantiation options", function() {
    Washi({
      el: document.createElement("button"),
      prop: true,

      initialize: function(options) {
        expect(options.el.tagName).toEqual("BUTTON");
        expect(options.prop).toEqual(true);
      }
    });
  });
});
