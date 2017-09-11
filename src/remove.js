// A DOM operation helper to remove children
var remove = function(element) {
  if (Array.isArray(element)) {
    element.forEach(remove);
    return element;
  }

  element.parentNode.removeChild(element);

  return element;
};

module.exports = remove;
