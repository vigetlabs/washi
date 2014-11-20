// Given an object who's keys are names and values are selectors, produce a new object
// with getters that select upon a given element.
//
// For example:
//
//     mapSelection(document.body, { paragraphs: 'p', links: 'a' });
var queryAll = require('./queryAll');
var util     = require('./util');

module.exports = function(el, ui) {
  var assignments = {};

  // For each attribute, perform a selection
  // within the context of this View's element
  for (var component in ui) {
    assignments[component] = queryAll(el, ui[component]);
    assignments['$' + component] = util(assignments[component]);
  }

  return assignments;
};
