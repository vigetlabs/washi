/**
 * chain()
 * Creates a pipeline for executing multiple operatins on a value, this
 * can be a single object or a list of values. Use `valueOf()` to end
 * the chain, returning the underlying value.
 *
 * @example
 *   let chain = Washi.$.chain([1,2,3]).map(i => i + 1)
 *   let result = chain.valueOf()
 *
 *   console.log(result) // [2,3,4]
 *
 * @param {Object | Array} target Starting value of the chain
 */

//
// Example: `chain(Array.prototype)([1, 2, 3, 4 ]).join(' ').valueOf();`

import isUndefined from './isUndefined'
import _ from './collection'
import result from './result'

export default function buildChain(target) {
  // Return a scoped function so each fork of a chain has its own working value
  // This way, additional chains do not mutate the state of other chains.
  return function(value, scope) {
    var chain = {}

    // Returns a function that will execute a given method
    // upon the `value`, reassigning `value if the result
    // of the function is defined.
    var getChainable = function(method) {
      return function() {
        var args = _.toArray(arguments)

        args.unshift(value)

        var result = method.apply(scope, args)

        if (!isUndefined(result)) {
          value = result
        }

        return chain
      }
    }

    // Extend the chain object with the members of the target. This process
    // is similar to how `./collection.js` is built however the returned
    // result of each invocation is the chain itself.
    for (var d in target) {
      chain[d] = getChainable(target[d])
    }

    // `chain.valueOf` allows the retrieval of the source value
    chain.valueOf = function() {
      return value
    }

    // Allows the retrieval of a specific key in the source value
    // with an optional fallback
    chain.get = function(key, fallback) {
      return result(value, key, fallback)
    }

    return chain
  }
}
