// Taken from Underscore, this is a predicate that identifies ownership of an attribute.
//
// For example:
//
//      hasOwnProperty({}, 'foo') // => false
//      hasOwnProperty(null, 'foo') // => false
//      hasOwnProperty({ foo: 'bar' }, 'foo') // => true

import isBlank from './isBlank'

const hasOwnProperty = Object.prototype.hasOwnProperty

export default function has(obj, property) {
  // If the object is blank, just return false. Otherwise check for membership.
  // This prevents errors where `null` or `undefined` are accidentally
  // provided to hasOwnProperty
  return isBlank(obj) ? false : hasOwnProperty.call(obj, property)
}
