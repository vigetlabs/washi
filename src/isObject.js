// Returns true only if given a true object. Not an array.
var _ = require('./collection');

module.exports = function(obj) {
  // Determine that the object is not an array, then do a simple typeof check
  return _.isArray(obj) !== true && typeof obj === 'object';
};
