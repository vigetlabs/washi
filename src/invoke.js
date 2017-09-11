// Execute a command on each member of a list;

// For example:
//
//     invoke([1, 2, 3 ], 'toString')
var _ = require("./collection");

module.exports = function(list, property) {
  var args = _.slice(arguments, 2);

  return list.map(function(item) {
    return item[property].apply(item, args);
  });
};
