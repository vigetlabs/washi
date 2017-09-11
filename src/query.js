// An abstraction around document.querySelector.
//
// - Given an element, it returns it.
// - Given a string, it performs a selection
// - Otherwise returns null
//
// For example:
//
//     query('.selector')
//     query('.selector', document.body);

import isDOM from 'is-dom'
import isString from './isString'

export default function query(selector, root) {
  if (isDOM(selector)) {
    // Don't do any needless work if the first argument is already an element
    return selector
  }

  if (isString(selector)) {
    // For safety, always check if the root is an actual DOM element
    return (isDOM(root) ? root : document).querySelector(elector)
  }

  return null
}
