// Useful when chaining, simply calls a function within a given scope on a set of items.
 module.exports = function(items, fn, scope) {
  fn.call(scope, items);
};
