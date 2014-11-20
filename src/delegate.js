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

  function bubble(target, e) {
    if (matches(target, selector)) {
      fn.call(target, e);
    } else if (target.parentNode !== el) {
      bubble(target.parentNode, e);
    }
  }

  return event.on(el, type, function(e) {
    bubble(e.target || e.srcElement, e);
  }, capture);
};

module.exports = function (el, type, selector, fn, capture) {
  if (isString(selector) && selector.length > 0) {
    // If given a non-empty string selector, this function will perform delegation.
    return delegate(el, type, selector, fn, capture);
  } else {
    // Otherwise it performs standard event binding
    return event(el, type, fn, capture);
  }
};
