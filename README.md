washi
=====

A simple, backbone inspired view helper.

```javascript
define(['washi'], function(Washi) {

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
	
	return Sample;
});

require(['sample'], function(Sample) {
	var sample = new Sample({
		el: "#sample-el"
	});
})
```

Corresponding with:

```html
<div id="sample">
    <h1 class="title">Paper Crane</h1>
</div>
```
