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

## License

`washi` is released under the [MIT License](http://opensource.org/licenses/MIT).
