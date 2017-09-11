// Taken from Underscore. Given a list of arguments, extend a root
// object with those values.
//
// For example:
//
//      extend({ red: 'red' }, { blue: 'blue' });

var _ = require("./collection");
var isObject = require("./isObject");

module.exports = function(root) {
  // Remove all keys that are not objects, for safety
  var valid = _.filter(arguments, isObject);

  // For each valid argument
  valid.forEach(function(source) {
    // Take each member key of the source object
    Object.keys(source).forEach(function(key) {
      // And assign it to the root object
      root[key] = source[key];
    });
  });

  return root;
};
