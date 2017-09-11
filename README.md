# washi

A Backbone-inspired library for greater organization on small projects.

1. [Basic Usage](#basic-usage)
2. [API](#api)

## Basic usage

```javascript
var Washi = require('washi');
var $     = Washi.$;

var Sample = {
  ui: {
    title: '.title',
  },
  events: {
    // Use ui helper selectors as aliases with {element}
    'mousedown {title}, touchstart {title}' : 'doSomething',

    // Alternatively, follow the syntax used by Backbone.Marionette
    'click @ui.title': 'doSomethingElse'
  },
  initialize: function(options) {
    this.ui.title.forEach(function(e) {
      e.innerHTML = 'Washi is for Origami'
    });
  },
  doSomething: function() {
    var text = $.map(this.ui.title, el => el.innerHTML).join(' ')
    console.log(text)
  },
  doSomethingElse: function() {
    console.log("Something else")
  }
}

var sample = Washi(Sample, {
    el: "#sample-el"
})
```

Corresponding with:

```html
<div id="sample">
  <h1 class="title">Paper Crane</h1>
</div>
```


## API

1. [Washi Components](#washi-components)
2. [Washi Utilities](#washi-utilities)

### Washi Components

Create a view component based upon a configuration:

```javascript
let Sample = {
  ui: {
    title: '.title',
  },
  events: {
    'click @ui.title': 'doSomething'
  },
  initialize: function(options) {
    // Startup
    console.log("Hello, world!")
  },
  doSomething: function() {
    alert("click!")
  }
}

let sample = Washi(Sample, {
  el: "#sample-el"
})
```

#### initialize(options: Object)

Invoked after the Washi instance has been created. Use this method for setup behavior.

```javascript
let Widget = {
  initialize: function(options) {
    console.log('all set!')
  }
}

let component = Washi(Widget, { el: document.body }) // "all set!"
```

#### events: Object

Attach event listeners to the element associated with the component. Keys in this object are selectors, values are string references to methods on the configuration object:

```javascript
let Widget = {
  events: {
    'click button': 'onClick'
  },

  onClick: function(event) {
    alert("HELLO!")
  }
}

let component = Washi(Widget, { el: '.selector' })

component.query('button').invoke('click') // "HELLO!"
```

#### ui: Object

Preselect child nodes within the element provided to Washi. These selections are available in a few places.

##### As aliases to their underlying selectors in the events object

In the events object, `@ui.{name}` is replaced with the CSS selector for the UI entry:

```javascript
let Widget = {
  ui: {
    'button': 'button'
  },
  events: {
    'click @ui.button': 'onClick'
  },
  onClick: function(event) {
    alert("HELLO!")
  }
}
```

##### As entries in `this.ui`

Reference the selected elements associated with a `ui` entry under `this.ui`:

```javascript
let Widget = {
  ui: {
    'button': 'button'
  },
  initialize: function() {
    // An array of DOM elements
    this.ui.button.forEach(el => el.click())
    // Alternatively, a Washi chain
    this.ui.$button.invoke('click')
  }
}
```



### Washi Utilities

Washi exposes a number of utility methods under the `$` namespace:

1. [chain](#chaintarget-object--array)
2. [Array operations](#array-operations)
3. [toArray](#toarraylist-enumerable)
4. [extend](#extendtarget-object-others)
5. [has](#hastarget-object-property-string)
6. [query](#queryselector-string-root-htmlelement--document)
7. [queryAll](#queryallselector-string)
8. [invoke](#invokelist-array-method-string-arguments-any)
9. [isBlank](#isblankvalue-any)
10. [isDOM](#isdomvalue-any)
11. [isFunction](#isfunctionvalue-any)
12. [isObject](#isobjectvalue-any)
13. [isRegExp](#isregexpvalue-any)
14. [isString](#isstringvalue-any)
15. [isUndefined](#isundefinedvalue-any)
16. [matches](#matchesel-element-selector-string)
17. [on](#onel-element-event-string-callback-function-capture-boolean)
18. [off](#offel-element-event-string-callback-function-capture-boolean)
18. [result](#resulttarget-any-property-string-fallback-any)
19. [tap](#taptarget-any-fn-function-scope-any)
20. [template](#templatetarget-any-fn-function-scope-any)
21. [append](#appendparent-element-elements-element)
22. [remove](#removeelements-element--element)
23. [addClass](#addclasselement-element-classes-string)
24. [removeClass](#removeclasselement-element-classes-string)
25. [toggleClass](#toggleclasselement-element-classes-string-keep-boolean)

#### chain(target: Object | Array)

Creates a pipeline for executing multiple operatins on a value, this can be a single object or a list of values. Use `valueOf()` to end the chain, returning the underlying value:

```javascript
const $ = Washi.$

let chain = $.chain([1,2,3]).map(i => i + 1)
let result = chain.valueOf()

console.log(result) // [2,3,4]
```

Passing a string to `Washi.$` executes `document.querySelectorAll`, converting the selection into a chain:

```javascript
const $ = Washi.$

$('button').on('click', () => {
  alert("HI!")
})
```

#### Array operations

Washi.$ includes most ES5 methods from the Array prototype. The primary benefit of doing this is to work around DOM APIs that return _"array like"_ values such as [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList):

- [`join`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
- [`reverse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [`push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [`pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
- [`shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
- [`unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)
- [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- [`concat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
- [`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [`lastIndexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [`reduceRight`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
- [`filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [`some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

You can use these directly, however they are primary intended for use with chaining:

```javascript
const $ = Washi.$

let internalLinks = $('a').filter(el => el.href.origin === window.location.origin)

internalLinks.on('click', () => console.log("Retention! Hurrah!"))
```

#### toArray(list: Enumerable) 

Convert a list-like value, such as a `NodeList` returned from `document.querySelectorAll` into an array:

```javascript
const $ = Washi.$

let links = document.querySelectorAll('a')
let hrefs = $.toArray(links).map(el => el.href)
```

#### extend(target: Object, ...others)

Given a list of arguments, extend a target object with additional properties:

```javascript
const $ = Washi.$

let red = { r: 200, g: 0, b: 0 }
let blue = { r: 0, g: 0, b: 220 }

let purple = $.extend({}, red, blue) // { r: 200, g: 0, b: 200 }
```

**Important:** the first argument, `target`, is mutated. This is a destructive operation!

#### has(target: Object, property: String)

Returns true if a given object has a property. This is sugar around `Object.prototype.hasOwnProperty` that covers some edge cases, such as null or undefined values.

```javascript
const $ = Washi.$

let styles = { color: 'blue', font: '14px Helvetica' }

$.has(styles, 'color')  // true
$.has(styles, 'border') // false
```

#### query(selector: String, root: HTMLElement = document)

Select an HTML element. When no second argument is given, selection occurs on the `document`. When no element is found, it returns `null`.

```javascript
const $ = Washi.$

let btn = $.query('button')

if (btn) {
  btn.click()
}
```

#### queryAll(selector: String)

Select multiple HTML elements. The resulting selection is converted into an Array, making its safe to perform operations like `forEach`, `map`, and `reduce`. When no element is found, it returns an empty array.

```javascript
const $ = Washi.$

let items = $('ul').queryAll('li')

items.forEach(el => console.log(item.innerHTML))
```

#### invoke(list: Array, method: String, ...arguments: any[])

Execute a method on each member of a list:

```javascript
const $ = Washi.$

// Operate on data
let planets = ['Mercury', 'Venus', 'Earth', 'Mars']
$.invoke(planets, 'toUpperCase') // ['MERCURY', 'VENUS', 'EARTH', 'MARS']

// Or call methods on a list of elements
$('button').invoke('click')
```

#### isBlank(value: any)

Is a value null or undefined?

```javascript
const $ = Washi.$

$.isBlank('')         // false
$.isBlank(false)      // false
$.isBlank(0)          // false
$.isBlank(null)       // true
$.isBlank(undefined)  // true
```

#### isDOM(value: any)

Is a value a DOM element?

```javascript
const $ = Washi.$

$.isDOM({})          // false
$.isDOM(new Image()) // true
```

#### isFunction(value: any)

Is a value a function?

```javascript
const $ = Washi.$

$.isFunction({})            // false
$.isFunction(function() {}) // true
```

#### isObject(value: any)

Is a value an object? This function helps to avoid pitfalls with type checking objects. For example: `typeof null === 'object'`!

```javascript
const $ = Washi.$

$.isObject({})            // true
$.isObject([])            // true
$.isObject(null)          // false
$.isObject(function() {}) // false
```

#### isRegExp(value: any)

Is a value a regular expression?

```javascript
const $ = Washi.$

$.isRegExp({})                  // false
$.isRegExp(/[A-Z]/)             // true
$.isRegExp(new RegExp("[A-Z]")) // true
```

#### isString(value: any)

Is a value a string?

```javascript
const $ = Washi.$

$.isString({})            // false
$.isString("Hello world") // true
```

#### isUndefined(value: any)

Is a value undefined?

```javascript
const $ = Washi.$

$.isUndefined(null)      // false
$.isUndefined('')        // false
$.isUndefined(0)         // false
$.isUndefined(undefined) // true
```

#### matches(el: Element, selector: String)

Returns true if the provided element matches a CSS selector. When possible, this function uses the [Element.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) DOM API.

```javascript
const $ = Washi.$

$.matches(document.body, '.class-name')
```

#### on(el: Element, event: String, callback: Function, capture: boolean)

Safely attach an event listener with extreme browser support (IE5+).

```javascript
const $ = Washi.$

$.on(document.body, 'click', event => alert("CLICK!"))

// Or chain it:
$('button').on('click', event => alert("CLICK!"))
```

For more information about event listening, see [EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

#### off(el: Element, event: String, callback: Function, capture: boolean)

Safely remove an event listener with extreme browser support (IE5+).

```javascript
const $ = Washi.$

let buttons = $('button')
let handler = event => alert("CLICK!")

buttons.on('click', handler)
buttons.invoke('click') // CLICK! CLICK! CLICK!

buttons.off('click', handler)
buttons.invoke('click') // silence
```

#### result(target: any, property: String, fallback: any)

Check for ownership of a value, optionally calling it if it is a function. If the value is `undefined`, return the fallback value.

```javascript
const $ = Washi.$

$.result({}, 'method', 'missing') // 'missing'
$.result('foobar', 'toUpperCase', 'UNKNOWN') // 'FOOBAR'
```

#### tap(target: any, fn: Function, scope: any)

Calls a function at a given scope, passing in the target value as the only argument. This is primarily intended side-effects when chaining:

```javascript
const $ = Washi.$

function render(items) {
  let p = document.createElement('p')

  p.innerHTML = items.join(', ')

  document.body.appendChild(p)
}

let dates = $([new Date('01-01-2000'), new Date('02-02-2010'])
```

#### template(target: any, fn: Function, scope: any)

An extremely simple templating language. Primary used for basic string replacement. For more serious uses, particulary with DOM manipulation, **use a vetted templating language such as [mustachejs](https://github.com/janl/mustache.js/)**.

```javascript
const $ = Washi.$

$.template('{foo}', { foo: 'bar' }) //=> 'bar'
$.template('{foo}') //=> '{foo}'
```

#### append(parent: Element, ...elements: Element[])

Append a list of children to an element:

```javascript
const $ = Washi.$

let planets = $(['Mercury', 'Venus', 'Earth', 'Mars'])

planets.map(item => {
  var el = document.createElement('li')
  el.innerHTML = item
  return el
})

$('ul').append(planets.valueOf())
```

#### remove(elements: Element | Element[])

Remove a single HTML element from its parent, or each element within a list:

```javascript
const $ = Washi.$

// Remove buttons from a form:
$('#my-form button').remove()
```

#### addClass(element: Element, classes: String)

Add one or more class names to an element:

```javascript
const $ = Washi.$

let el = document.createElement('button')

el.className = 'btn'

$.addClass(el, 'btn-large')

console.log(el.className) // 'btn btn-large'
```

#### removeClass(element: Element, classes: String)

Remove one or more class names to an element:

```javascript
const $ = Washi.$

let el = document.createElement('button')

el.className = 'btn btn-large'

$.removeClass(el, 'btn btn-large')

console.log(el.className) // ''
```

#### toggleClass(element: Element, classes: String, keep?: Boolean)

Toggle one or more class names to an element. When provided, adds/removes the class names based upon the `keep` argument

```javascript
const $ = Washi.$

let el = document.createElement('button')

el.className = 'btn'

$.toggleClass(el, 'active')
console.log(el.className) // 'btn active'

$.toggleClass(el, 'active')
console.log(el.className) // 'btn'

$.toggleClass(el, 'active', false)
console.log(el.className) // 'btn'

$.toggleClass(el, 'active', true)
console.log(el.className) // 'btn active'
```

***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)

