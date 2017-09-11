// Washi
//
// by Viget
// https://github.com/vigetlabs/washi
// https://viget.com
//
// Washi is a DOM utility library with inspirations from Backbone, Underscore,
// and React. You build washi components by constructing objects with a given
// pattern, then invoking Washi upon that object.

import $ from './src/util'
import result from './src/result'
import mapSelections from './src/mapSelections'

function Washi() {
  var options = $.extend.apply(null, [{}].concat($.toArray(arguments)))
  var selection = $.queryAll(result(options, 'el', document.body))

  return Washi.$(selection).map(function(el) {
    return factory(options, { el: el })
  })
}

// Expose the utility helpers. Assigned to $ for familiarity with Backbone Views.
Washi.$ = $

function factory() {
  // Construct a new object, building from a given prototype and
  // folding in all "mixins"
  var options = $.extend.apply(null, $.toArray(arguments))
  var assembled = $.extend(Object.create(Washi.prototype), options)

  // Verify our element exists
  assembled.el = $.query(result(assembled, 'el', document.body))
  assembled.$el = $(assembled.el)

  // Bind events. Taken the target `el` and assign `events` to it, using `ui` when running
  // the `template` function upon the event declarations.
  $.mapEvents(
    assembled.el,
    result(assembled, 'events'),
    result(assembled, 'ui'),
    assembled
  )

  // Next, reassign the UI object using `mapSelections` to construct getters that return
  // query selections.
  assembled.ui = mapSelections(assembled.el, result(assembled, 'ui'))

  // Setup a selector helper method, a short hand similar to Backbone's `View.$`
  assembled.$ = $(assembled.el)

  // Call the initialize method on the object. This is useful as a pseudo
  // replacement for the constructor function
  if (typeof assembled.initialize === 'function') {
    assembled.initialize(options)
  }

  return assembled
}

export default Washi
