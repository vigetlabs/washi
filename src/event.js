module.exports = on;
module.exports.on = on;
module.exports.off = off;

function on(element, event, callback, capture) {
  !element.addEventListener && (event = "on" + event);

  if (element.addEventListener) {
    element.addEventListener(event, callback, capture);
  } else {
    element.attachEvent(event, callback, capture);
  }

  return callback;
}

function off(element, event, callback, capture) {
  !element.removeEventListener && (event = "on" + event);

  if (element.removeEventListener) {
    element.removeEventListener(event, callback, capture);
  } else {
    element.detachEvent(event, callback, capture);
  }

  return callback;
}
