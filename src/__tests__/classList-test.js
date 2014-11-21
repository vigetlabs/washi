jest.dontMock('../classList');
jest.dontMock('is-dom');
jest.dontMock('../tokenize');
jest.dontMock('../result');

describe('classList', function() {

  it ('can add a list of classes to an element', function() {
    var el = document.createElement('div');
    var classList = require('../classList');

    el.classList = {
      add: jest.genMockFunction()
    };

    classList.addClass(el, 'foo bar');

    expect(el.classList.add.mock.calls[0]).toEqual(['foo']);
    expect(el.classList.add.mock.calls[1]).toEqual(['bar']);
  });

  it ('can remove a list of classes to an element', function() {
    var el = document.createElement('div');
    var classList = require('../classList');

    el.classList = {
      remove: jest.genMockFunction()
    };

    classList.removeClass(el, 'foo bar');

    expect(el.classList.remove.mock.calls[0]).toEqual(['foo']);
    expect(el.classList.remove.mock.calls[1]).toEqual(['bar']);
  });

  it ('can toggle a list of classes from an element given a boolean', function() {
    var el = document.createElement('div');
    var classList = require('../classList');

    el.classList = {
      remove: jest.genMockFunction()
    };

    classList.toggleClass(el, 'foo', false);

    expect(el.classList.remove.mock.calls[0]).toEqual(['foo']);
  });

});
