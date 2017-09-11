// Taken from Underscore, this is a predicate that identifies ownership of an attribute.
//
// For example:
//
//      hasOwnProperty({}, 'foo') // => false
//      hasOwnProperty(null, 'foo') // => false
//      hasOwnProperty({ foo: 'bar' }, 'foo') // => true

var has = Object.prototype.hasOwnProperty;
var isBlank = require("./isBlank");

module.exports = function(obj, prop) {
  // If the object is blank, just return false. Otherwise check for membership.
  // This prevents errors where `null` or `undefined` are accidentally
  // provided to hasOwnProperty
  return isBlank(obj) ? false : has.call(obj, prop);
};
