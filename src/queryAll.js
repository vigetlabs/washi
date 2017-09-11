// An abstraction around document.querySelectorAll.
//
// - Given an array of elements, it will return the reduction of running queryAll on all items.
// - Given an element, it will return that element embedded in an array
// - Given a string, it will return the result of executing element.querySelectorAll

import isDOM from 'is-dom'
import isString from './isString'
import isUndefined from './isUndefined'
import _ from './collection'

function queryAll(el, selector) {
  var hasSelector = isUndefined(selector) === false

  if (_.isArray(el)) {
    // If the element is an array, and a selector is given,
    // return the reduction of selecting upon each item
    if (hasSelector) {
      return el.reduce(function(a, b) {
        return a.concat(findAll(b, selector))
      }, [])
    } else {
      // Otherwise just return the element list
      return el
    }
  }

  // If no selector is given, but el is a DOM element then
  // just return the element in an array
  if (!hasSelector && isDOM(el)) {
    return [el]
  }

  // If `el` is actually a selector, findAll from document
  if (!hasSelector && isString(el)) {
    selector = el
    el = document
  }

  // Finally, grab selections
  var query = el.querySelectorAll(selector)

  // Find anything? otherwise return an empty list
  return query ? _.slice(query, 0) : []
}

export default queryAll
