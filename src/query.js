// An abstraction around document.querySelector.
//
// - Given an element, it returns it.
// - Given a string, it performs a selection
// - Otherwise returns null
//
// For example:
//
//     query('.selector')
//     query('.selector', document.body);

var isDOM    = require('is-dom');
var isString = require('./isString');

module.exports = function(el, root) {
  if (isDOM(el)) {
    // Don't do any needless work if the first argument is already an element
    return el;
  } else if (isString(el)) {
    // For safety, always check if the root is an actual DOM element
    return (isDOM(root) ? root : document).querySelector(el);
  } else {
    return null;
  }
};
