jest.autoMockOff();

describe("Template", function() {
  var template = require("../template");

  it("replaces values", function() {
    expect(template("{foo}", { foo: "bar" })).toEqual("bar");
  });

  it("is not strict with spaces", function() {
    expect(template("{ foo }", { foo: "bar" })).toEqual("bar");
  });

  it("falls back to the unreplaced value if no matching attribute is found", function() {
    var str = "{foo}";
    expect(template(str, { baz: "bip" })).toEqual(str);
  });

  it("returns the string if no pool is given", function() {
    var str = "{foo}";
    expect(template(str)).toEqual(str);
  });

  it("only matches on the first instance", function() {
    var str = "{foo} foo";
    expect(template(str, { foo: "bar" })).toEqual("bar foo");
  });
});
