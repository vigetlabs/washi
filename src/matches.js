// Given an element and selector, returns true of the selector matches.
// This uses the native Element.matches API when possible.
//
// For example:
//
//     matches(document.body, 'body') // => true

var proto  = Element.prototype;
var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
var isDOM  = require('is-dom');

module.exports = function match(el, selector) {

  // Always return false if the element provided is not a DOM Element
  // or is the document. This catches an illegal invocation error.
  if (isDOM(el) === false || el === document) {
    return false
  }

  // Element.matches is still a newer feature, so it must be identified
  // that it is supported
  if (vendor) {
    return vendor.call(el, selector);
  }

  // Otherwise we traverse the tree
  var nodes = el.parentNode.querySelectorAll(selector);

  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }

  return false;
};
