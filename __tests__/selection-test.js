jest.autoMockOff();

describe("Selection", function() {

  Washi = require('washi');
  var $ = Washi.$ = require('jquery');
  var el = document.createElement("p");

  it ("has an `el`", function() {
    var w = new Washi({ el: el });
    expect(w.$el.is(w.el)).toBeTruthy();
  });

  it ("also accepts `$el` as the element option", function() {
    var w = new Washi({ $el: el });
    expect(w.$el.is(w.el)).toBeTruthy();
  });

  it ("defaults `el` to document.body", function() {
    var w = new Washi();
    expect(w.$el.is(document.body)).toBeTruthy();
  });

  it ("has an extendable default view", function() {
    var Meta = Washi.extend({
      el: $("<p>")
    });
    var m = new Meta();

    expect(m.el.tagName).toEqual("P");
  });

  it ("has a scoped selection method", function() {
    var w = new Washi({ el: el });
    expect(w.$().context).toEqual(w.el);
  });

  describe("Children", function() {
    it ("can select children using the `ui` attribute", function() {
      var Meta = Washi.extend({
        el: Washi.$("<div><p></p></div>"),
        ui: {
          child: 'p'
        }
      });

      var m = new Meta();
      expect(m.ui.child.is("p")).toBeTruthy();
    });
  });
});
