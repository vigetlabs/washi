// The core Util library for Washi. Strives to be as small as possible
var extend = require("./extend");
var collection = require("./collection");
var classList = require("./classList");

// Util is a function that returns the result of calling `chain` upon a given value and scope.
var Util = function(value, scope) {
  if (Util.isString(value)) {
    value = Util.queryAll(value);
  }

  return Util.chain(value, scope);
};

// Additionally, it is extended with every method used by Washi interally. Naturally,
// you can extend this as you see fit. Any member value of `Util` will be sent into
// the chaining API.
extend(Util, collection, classList, {
  chain: require("./chain")(Util),
  chainWith: require("./chain"),
  extend: extend,
  has: require("./has"),
  query: require("./query"),
  queryAll: require("./queryAll"),
  invoke: require("./invoke"),
  isBlank: require("./isBlank"),
  isDOM: require("is-dom"),
  isFunction: require("./isFunction"),
  isObject: require("./isObject"),
  isRegExp: require("./isRegExp"),
  isString: require("./isString"),
  isUndefined: require("./isUndefined"),
  mapEvents: require("./mapEvents"),
  matches: require("./matches"),
  off: require("./event").off,
  on: require("./delegate"),
  result: require("./result"),
  tap: require("./tap"),
  template: require("./template"),
  tokenize: require("./tokenize"),

  // DOM operations
  append: require("./append"),
  remove: require("./remove")
});

module.exports = Util;
