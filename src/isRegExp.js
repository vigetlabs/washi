var toString = {}.toString;

module.exports = function(value) {
  return toString.call(value) === '[object RegExp]';
};
