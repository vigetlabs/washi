// An intentionally simple templating language. This function is used to swap out event names
// when binding with `mapEvents`. Replaces instances of {value} given an object of properties.
// If these values are absent, nothing is replaced
//
// For example:
//
//     template('{foo}', { foo: 'bar' }) //=> 'bar'
//     template('{foo}') //=> '{foo}'
var isBlank = require('./isBlank');
var result  = require('./result');

var template = function (string, pool) {
  if (isBlank(pool)) {
    // Don't match values if there's nothing to replace
    return string;
  }

  // Otherwise get all instances of template logic and replace them
  // as they are assigned within the given pool of values.
  //
  // If the result of accessing the property is blank, return the whole value
  return string.replace(result(template, 'pattern'), function(whole, capture) {
    return result(pool, capture.trim(), whole);
  });
}

// Expose the templating pattern so that it can be overriden
template.pattern = /(?:\{*)([^{}\n]+)(?:\}*)/g;

module.exports = template;
