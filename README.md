washi
=====

[![Build Status](https://travis-ci.org/vigetlabs/washi.png?branch=master)](https://travis-ci.org/vigetlabs/washi)

### Basic usage

```javascript
var Washi = require('washi');

var Sample = {

    ui: {
        title: '.title',
    },

    events: {
        // Use ui helper selectors as aliases with {element}
        'mousedown {title}, touchstart {title}' : doSomethingElse,

        // Alternatively, follow the syntax used by Backbone.Marionette
        'click @ui.title': 'doSomething'
    },

    initialize: function(options) {
        this.ui.title.innerHTML = "Washi is for Origami";
    },

    doSomething: function() {
        console.log(this.ui.title.innerHTML);
    },

    doSomethingElse: function() {
        console.log("Something else");
    }

};

var sample = Washi(Sample, {
    el: "#sample-el"
});
```

Corresponding with:

```html
<div id="sample">
    <h1 class="title">Paper Crane</h1>
</div>
```

### Child components

Washi defines children as other Washi components which layer on top of the including component. This means that mixins have their own `ui` and `event` objects. When instantiated, the parent component will instantiate a copy of all of its mixins with the same arguments.

```javascript
var Child  = {
	ui: { selector: '#foo' }
};

var Parent = {
	children: [ Child ]
};

var p = Washi(Parent);
```

### Conditionally applying mixins

Mixins may be conditionally applied by providing a static `precondition` method to a component:

```javascript
var Mixin = {
	precondition: function(options) {
	    return true
	}
}
```

## License

`washi` is released under the [MIT License](http://opensource.org/licenses/MIT).
