// The core Util library for Washi. Strives to be as small as possible
var extend     = require('./extend');
var collection = require('./collection');

// Util is a function that returns the result of calling `chain` upon a given value and scope.
var Util = function(value, scope) {
  return Util.chain(value, scope);
};

// Additionally, it is extended with every method used by Washi interally. Naturally,
// you can extend this as you see fit. Any member value of `Util` will be sent into
// the chaining API.
extend(Util, collection, {
  chain          : require('./chain')(Util),
  chainWith      : require('./chain'),
  extend         : extend,
  query          : require('./query'),
  queryAll       : require('./queryAll'),
  hasOwnProperty : require('./hasOwnProperty'),
  isBlank        : require('./isBlank'),
  isDOM          : require('is-dom'),
  isFunction     : require('./isFunction'),
  isObject       : require('./isObject'),
  isString       : require('./isString'),
  isUndefined    : require('./isUndefined'),
  mapEvents      : require('./mapEvents'),
  mapSelections  : require('./mapSelections'),
  matches        : require('./matches'),
  off            : require('dom-event'),
  on             : require('./delegate'),
  result         : require('./result'),
  tap            : require('./tap'),
  template       : require('./template'),
  tokenize       : require('./tokenize')
});

module.exports = Util;
