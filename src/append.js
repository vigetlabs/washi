var slice = Array.prototype.slice;

// A DOM operation helper. Append an Element to a parent
var append = function(parent, a, b, c) {
  var children = slice.call(arguments, 1);

  // Always select the first item of a list, similarly to jQuery
  if (Array.isArray(parent)) {
    parent = parent[0];
  }

  children.forEach(parent.appendChild, parent)

  return parent;
};

module.exports = append;
