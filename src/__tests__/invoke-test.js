jest.autoMockOff();

describe('Invoke', function() {

  var invoke = require('../invoke');

  it ('calls a function on all values', function() {
    expect(invoke([1,2,3], 'toString')).toEqual(['1','2','3'])
  });

});
