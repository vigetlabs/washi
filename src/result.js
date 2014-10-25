// Check for ownership of a value, optionally calling it if it is a function. If
// the value is empty, return a default value
//
// Taken from Underscore
// https://github.com/jashkenas/underscore/blob/bc50d7a0e8d610b461f2d520c2f9f13e5c52f179/underscore.js#L1285-L1293
//
// For example:
//
//     result(obj, 'member', fallback)
var isFunction  = require('./isFunction');
var isBlank     = require('./isBlank');
var isUndefined = require('./isUndefined');

module.exports = function(object, property, fallback) {
  var value = isBlank(object) ? void 0 : object[property];

  if (isUndefined(value)) {
    value = fallback;
  }

  return isFunction(value) ? value.call(object) : value;
};
