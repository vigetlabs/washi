// Run `result` upon each member of a list

// For example:
//
//     pluck([{ color: red }, { color: blue }], 'color', 'black')
var result = require("./result");

module.exports = function(list, prop, fallback) {
  return list.map(function(item) {
    return result(item, prop, fallback);
  });
};
