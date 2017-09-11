// A DOM operation helper to remove children
export default function remove(element) {
  if (Array.isArray(element)) {
    element.forEach(remove)
    return element
  }

  element.parentNode.removeChild(element)

  return element
}
