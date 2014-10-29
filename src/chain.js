// Given a `target` context, build a chainable API.
//
// Example: `chain(Array.prototype)([1, 2, 3, 4 ]).join(' ').valueOf();`

var isUndefined = require('./isUndefined');
var _           = require('./collection');

module.exports = function(target) {
  // Return a scoped function so each fork of a chain has its own working value
  // This way, additional chains do not mutate the state of other chains.
  return function (value, scope) {
    var chain = {};

    // Extend the chain object with the members of the target. This process
    // is similar to how `./collection.js` is built however the returned
    // result of each invocation is the chain itself.
    for (var d in target) {
      chain[d] = (function(method) {
        return function() {
          var args = _.toArray(arguments);

          args.unshift(value);

          var result = method.apply(scope, args);

          if (!isUndefined(result)) {
            value = result;
          }

          return chain;
        }
      }(target[d]));
    };

    // `chain.valueOf` allows the retrieval of the source value
    chain.valueOf = function() {
      return value;
    };

    return chain;
  };

};