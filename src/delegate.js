// Handles event binding, be it through delegation or otherwise.
//
// Example: delegate(window, 'resize', callback);
// Example: delegate(document.body, 'click', 'main', callback);

var event    = require('dom-event');
var matches  = require('./matches');
var isString = require('./isString');

var delegate = function (el, type, selector, fn, capture) {
  // Add an event binding who's callback first checks to identify
  // if the target element matches the given selector
  return event.on(el, type, function(e) {
    var target = e.target || e.srcElement;

    if (matches(target, selector)) {
      fn.call(el, e);
    }
  }, capture);
};

module.exports = function (el, type, selector, fn, capture) {
  if (isString(selector)) {
    // If given a string selector, this function will perform delegation.
    return delegate(el, type, selector, fn, capture);
  } else {
    // Otherwise it performs standard event binding
    return event(el, type, fn, capture);
  }
};
