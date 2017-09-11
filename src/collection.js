// A layer on top of `Array.prototype` to allow for the generalization of these methods.
// Collection is mixed directly into `./util.js`, giving the chaining API for washi
// access to functional helpers.

// Save a shorthand reference to the Array prototype
var _ = Array.prototype;

// The whitelist contains all of the methods we want to pluck from Array
var whitelist = [
  "join",
  "reverse",
  "sort",
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "concat",
  "slice",
  "indexOf",
  "lastIndexOf",
  "forEach",
  "map",
  "reduce",
  "reduceRight",
  "filter",
  "some",
  "every"
];

// Reduce the whitelist into an object of wrapped functions that apply
// upon a given list.
var collection = whitelist.reduce(function(memo, method) {
  memo[method] = function(list) {
    // Extract out the list argument
    var withoutList = _.slice.call(arguments, 1);

    // Then apply the Array method within the list context,
    // injecting all of the other arguments provided to this function
    return _[method].apply(list, withoutList);
  };

  return memo;
}, {});

// Next we add a few more helpers. Array.isArray and a method to convert list-like
// values into arrays (useful for working with arguments)
collection.isArray = Array.isArray;
collection.toArray = function(list) {
  return _.slice.call(list, 0);
};

module.exports = collection;
