jest.autoMockOff();

describe("Washi", function() {

  Washi = require('washi');
  var $ = Washi.$ = require('jquery');

  it ('can be extended multiple times', function() {
    var w = new (Washi.extend({ head: 'head' }).extend({ tail: 'tail' }));

    expect(w.head).toEqual('head');
    expect(w.tail).toEqual('tail');
  });

  it ('can have static methods', function() {
    var W = Washi.extend(null, { val: true });

    expect(W.val).toEqual(true);
  });

  it ('static methods persist', function() {
    var W = Washi.extend(null, { val: true });
    var X = W.extend(null, { anotherVal: true });

    expect(X.val).toEqual(true);
    expect(X.anotherVal).toEqual(true);
  });

});
