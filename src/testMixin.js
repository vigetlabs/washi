// Checks for ownership of a 'precondition' function and returns if the value was false.
// This is used to prefilter mixins that are not valid for a given setting.
var hasOwnProperty = require('./hasOwnProperty');

module.exports = function(mixin, options) {
  return (hasOwnProperty(mixin, 'precondition') ? mixin.precondition(options) : true) !== false;
};
