// Run `result` upon each member of a list

// For example:
//
//     pluck([{ color: red }, { color: blue }], 'color', 'black')
import result from './result'

export default function pluck(list, prop, fallback) {
  return list.map(function(item) {
    return result(item, prop, fallback)
  })
}
