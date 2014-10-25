// Given an object who's keys are names and values are selectors, produce a new object
// with getters that select upon a given element.
//
// For example:
//
//     mapSelection(document.body, { paragraphs: 'p', links: 'a' });

var queryAll = require('./queryAll');

module.exports = function(el, ui) {
  var assignments = {};

  // For each attribute, perform a selection
  // within the context of this View's element
  for (var component in ui) {
    Object.defineProperty(assignments, component, {
      enumerable : true,

      get: function() {
        return queryAll(el, ui[component]);
      }
    });
  }

  return assignments;
};
