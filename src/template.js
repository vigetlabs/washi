// An intentionally simple templating language. This function is used to swap out event names
// when binding with `mapEvents`. Replaces instances of {value} given an object of properties.
// If these values are absent, nothing is replaced
//
// For example:
//
//     template('{foo}', { foo: 'bar' }) //=> 'bar'
//     template('{foo}') //=> '{foo}'
var isBlank  = require('./isBlank');
var isRegExp = require('./isRegExp');
var result   = require('./result');

// The template function will use this pattern to match values
var pattern = /(?:\{*)([^{}\n]+)(?:\}*)/g;

var template = function (string, pool) {
  // Don't match values if there's nothing to replace
  if (isBlank(pool)) {
    return string;
  }

  // Otherwise replace all instances of `{key}` with the value
  // of the passed `pool` argument. If a key doesn't exist, then
  // just return the whole match.
  return string.replace(pattern, function(whole, capture) {
    return result(pool, capture.trim(), whole);
  });
};

// Expose the templating pattern so that it can be overriden
Object.defineProperty(template, 'pattern', {

  get: function() {
    return pattern;
  },

  set: function(newPattern) {
    if (isRegExp(newPattern)) {
      pattern = newPattern;
    } else {
      throw new TypeError('template.setPattern expects a regular expression');
    }
  }

});

module.exports = template;
