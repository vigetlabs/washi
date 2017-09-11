// A DOM operation helper. Append an Element to a parent
export default function append(parent, ...children) {
  // Always select the first item of a list, similarly to jQuery
  if (Array.isArray(parent)) {
    parent = parent[0]
  }

  children.forEach(parent.appendChild, parent)

  return parent
}
