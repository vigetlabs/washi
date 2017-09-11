// Returns true only if given a true object. Not an array.
import _ from './collection'

export default function isObject(obj) {
  // Determine that the object is not an array, then do a simple typeof check
  return _.isArray(obj) !== true && typeof obj === 'object'
}
