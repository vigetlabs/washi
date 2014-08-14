washi
=====

[![Build Status](https://travis-ci.org/vigetlabs/washi.png?branch=master)](https://travis-ci.org/vigetlabs/washi)

A simple, `Backbone` inspired view helper. Washi allows you to quickly define interface logic similarly to `Backbone.View`s.

### Basic usage

Washi can be included globally, with AMD, or CommonJS. This example demonstrates usage with CommonJS:

```javascript
// New as of 2.0 to get around some strangeness with module systems
var Washi = require('washi');
Washi.$   = require('jquery');

var Sample = Washi.extend({

    ui: {
        title: '.title',
    },

    events: {
        'click {title}': 'doSomething',
        'mousedown {title}, touchstart {title}' : doSomethingElse
    },

    initialize: function(options) {
        this.ui.title.text("Washi is for Origami");
    },

    doSomething: function() {
        console.log(this.ui.title.text());
    },

    doSomethingElse: function() {
        console.log("Something else"
    }

});

var sample = new Sample({
    el: "#sample-el"
});
```

Corresponding with:

```html
<div id="sample">
    <h1 class="title">Paper Crane</h1>
</div>
```

### Mixins

Washi defines mixins as other Washi components which layer on top of the including component. This means that mixins have their own `ui` and `event` objects. When instantiated, the parent component will instantiate a copy of all of its mixins with the same arguments.

```javascript
var Child  = Washi.extend({
	ui: { selector: '#foo' }
});

var Parent = Washi.extend({
	mixins: [Child]
});
```

Additionally, parent components have a `children` reference to their mixed in component children. Components used as mixins also have a `parent` attribute that references the component that included them as a mixin.
