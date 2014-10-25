jest.autoMockOff();

describe("Chain", function() {
  var chain = require('../chain');

  it.only ("can produce a chainable API for a given object", function() {
    var obj  = { toCall: jest.genMockFunction() };
    var link = chain(obj);

    link().toCall().toCall();

    expect(obj.toCall).toBeCalled();
  });

  it.only ("chain.valueOf returns the tracked value", function() {
    var obj  = { toCall: jest.genMockFunction() };
    var link = chain(obj);

    expect(link(1).valueOf()).toEqual(1);
 });

  it ("returns the result of the last function it is defined", function() {
    var link = chain({ four: function() { return 4; } })();

    expect(link.four().valueOf()).toEqual(4);
  });

  it ("maintains the value if the result of the last call is undefined", function() {
    var value = chain({
      skip: jest.genMockFunction()
    })('initial').skip().valueOf();

    expect(value).toEqual('initial');
  });

});
