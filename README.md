washi
=====

A simple, backbone inspired view helper.

```javascript
require(['washi'], function(Washi) {

	var Sample = Washi.extend({

		ui: {
			title: '.title',
		},

		events: {
			'click {title}': 'advance'
		},

		initialize: function(options) {
			this.ui.title.text("Washi is for Origami");
		},
		
		doSomething: function() {
			alert(this.ui.title.text());			
		}

	});
	
	return Sample;
});
```
