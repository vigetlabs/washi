import extend from './extend'
import collection from './collection'
import classList from './classList'
import chain from './chain'
import has from './has'
import query from './query'
import queryAll from './queryAll'
import invoke from './invoke'
import isBlank from './isBlank'
import isDOM from 'is-dom'
import isFunction from './isFunction'
import isObject from './isObject'
import isRegExp from './isRegExp'
import isString from './isString'
import isUndefined from './isUndefined'
import mapEvents from './mapEvents'
import matches from './matches'
import { on, off } from './event'
import result from './result'
import tap from './tap'
import template from './template'
import tokenize from './tokenize'
import append from './append'
import remove from './remove'

// Util is a function that returns the result of calling `chain` upon a given value and scope.
var Util = function(value, scope) {
  if (Util.isString(value)) {
    value = Util.queryAll(value)
  }

  return Util.chain(value, scope)
}

// Additionally, it is extended with every method used by Washi interally. Naturally,
// you can extend this as you see fit. Any member value of `Util` will be sent into
// the chaining API.
extend(Util, collection, classList, {
  chain: chain(Util),
  chainWith: chain,
  extend: extend,
  has: has,
  query: query,
  queryAll: queryAll,
  invoke: invoke,
  isBlank: isBlank,
  isDOM: isDOM,
  isFunction: isFunction,
  isObject: isObject,
  isRegExp: isRegExp,
  isString: isString,
  isUndefined: isUndefined,
  mapEvents: mapEvents,
  matches: matches,
  on: on,
  off: off,
  result: result,
  tap: tap,
  template: template,
  tokenize: tokenize,

  // DOM operations
  append: append,
  remove: remove
})

export default Util
