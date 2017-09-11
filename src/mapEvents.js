// Given an element, an object of events, a pool of selectors, and a scope,
// this function binds those events within the provided scope.
//
// For example:
//
//     mapEvents(window, { resize: method }, {}, obj)
//     mapEvents(document.boyd, { 'click {items}': method }, { items: '.class' }, obj);

import delegate from './delegate'
import tokenize from './tokenize'
import template from './template'
import isFunction from './isFunction'

function bindEvent(el, name, method, selectors, scope) {
  var items = name.split(',')
  var toCall = (isFunction(method) ? method : scope[method]).bind(scope)

  while (items.length) {
    var tokens = tokenize(template(items.pop(), selectors))

    delegate(el, tokens[0], tokens[1], toCall)
  }
}

export default function mapEvents(el, events, selectors, scope) {
  for (var name in events) {
    bindEvent(el, name, events[name], selectors, scope)
  }
}
