jest.autoMockOff();

describe("Chain", function() {
  var Washi = require("washi");

  it("can chain objects", function() {
    var obj = {};
    var mock = jest.genMockFunction();

    Washi.$.chain(obj).tap(mock);

    expect(mock.mock.calls[0][0]).toEqual(obj);
  });

  it("can chain arrays", function() {
    var arr = [1];

    var result = Washi.$
      .chain(arr)
      .map(function(i) {
        return i + 1;
      })
      .valueOf();

    expect(result).toEqual([2]);
  });

  it("has access to the element on calls", function() {
    var el = document.createElement("button");
    var mock = jest.genMockFunction();

    Washi.$.chain(el).tap(mock).tap(mock);

    expect(mock.mock.calls[0][0]).toEqual(el);
  });

  it("can chain multiple times", function() {
    var el = document.createElement("button");
    var mock = jest.genMockFunction();

    Washi.$.chain(el).tap(mock).tap(mock);

    expect(mock.mock.calls.length).toEqual(2);
  });

  it("returns the result of a previous chain to the next if provided", function() {
    var el = document.createElement("button");
    var mock = jest.genMockFunction();

    var result = Washi.$([el, el])
      .map(function(el) {
        return el.tagName;
      })
      .reduce(function(a, b) {
        return [a, b].join(" ");
      }, "")
      .valueOf()
      .trim();

    expect(result).toEqual("BUTTON BUTTON");
  });
});
