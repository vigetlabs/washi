// Check for ownership of a value, optionally calling it if it is a function. If
// the value is empty, return a default value
//
// Taken from Underscore
// https://github.com/jashkenas/underscore/blob/bc50d7a0e8d610b461f2d520c2f9f13e5c52f179/underscore.js#L1285-L1293
//
// For example:
//
//     result(obj, 'member', fallback)
import isFunction from './isFunction'
import isBlank from './isBlank'
import isUndefined from './isUndefined'

export default function result(target, property, fallback) {
  var value = isBlank(target) ? void 0 : target[property]

  if (isUndefined(value)) {
    value = fallback
  }

  return isFunction(value) ? value.call(target) : value
}
