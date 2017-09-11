// Taken from Underscore. Given a list of arguments, extend a target
// object with those values.
//
// For example:
//
//      extend({ red: 'red' }, { blue: 'blue' });

import _ from './collection'
import isObject from './isObject'

export default function extend(target) {
  // Remove all keys that are not objects, for safety
  var valid = _.filter(arguments, isObject)

  // For each valid argument
  valid.forEach(function(source) {
    // Take each member key of the source object
    Object.keys(source).forEach(function(key) {
      // And assign it to the target object
      target[key] = source[key]
    })
  })

  return target
}
