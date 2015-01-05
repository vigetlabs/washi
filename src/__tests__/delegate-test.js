jest.autoMockOff();

function click(el) {
  var click = document.createEvent("MouseEvents");
  click.initEvent("click", true, true);
  el.dispatchEvent(click);
}

describe("Delegate", function() {
  var delegate = require('../delegate');

  it ("can delegate an event", function() {
    var el   = document.createElement('button');
    var mock = jest.genMockFunction();

    el.className = 'foobar';

    delegate(document, 'click', '.foobar', mock);

    document.body.appendChild(el);

    click(el);

    expect(mock).toBeCalled();
  });

});
