var toString = {}.toString

export default function isRegExp(value) {
  return toString.call(value) === '[object RegExp]'
}
