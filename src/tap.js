// Useful when chaining, simply calls a function within a given scope on a set of items.
export default function tap(target, fn, scope) {
  fn.call(scope, target)
}
