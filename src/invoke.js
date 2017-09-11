// Execute a command on each member of a list;

// For example:
//
//     invoke([1, 2, 3 ], 'toString')
import _ from './collection'

export default function invoke(list, method) {
  var args = _.slice(arguments, 2)

  return list.map(function(item) {
    return item[method].apply(item, args)
  })
}
