jest.autoMockOff();

describe("Washi", function() {

	Washi = require('washi');
	var $ = Washi.$ = require('jquery');

	it ('can be extended multiple times', function() {
		var w = new (Washi.extend({ head: 'head' }).extend({ tail: 'tail' }));

		expect(w.head).toEqual('head');
		expect(w.tail).toEqual('tail');
	});

	it ('can mixin other washi entities', function() {
		var Child = Washi.extend({
			child: true
		});

		var Parent = Washi.extend({
			mixins: [Child]
		});

		var parent = new Parent();

		expect(parent.children[0] instanceof Child).toBeTruthy();
		expect(parent.children[0].parent instanceof Parent).toBeTruthy();
	});

	describe("Selection", function() {
		var el = document.createElement("p");

		it ("has an `el`", function() {
			var w = new Washi({ el: el });
			expect(w.$el.is(w.el)).toBeTruthy();
		});

		it ("also accepts `$el` as the element option", function() {
			var w = new Washi({ $el: el });
			expect(w.$el.is(w.el)).toBeTruthy();
		});

		it ("defaults `el` to document.body", function() {
			var w = new Washi();
			expect(w.$el.is(document.body)).toBeTruthy();
		});

		it ("has an extendable default view", function() {
			var Meta = Washi.extend({
				el: $("<p>")
			});
			var m = new Meta();

			expect(m.el.tagName).toEqual("P");
		});

		it ("has a scoped selection method", function() {
			var w = new Washi({ el: el });
			expect(w.$().context).toEqual(w.el);
		});

		describe("Children", function() {
			it ("can select children using the `ui` attribute", function() {
				var Meta = Washi.extend({
					el: Washi.$("<div><p></p></div>"),
					ui: {
						child: 'p'
					}
				});

				var m = new Meta();
				expect(m.ui.child.is("p")).toBeTruthy();
			});
		});

	});

	describe("Events", function() {
		var el;

		beforeEach(function() {
			el = $("<div><p class='test'>Test</p></div>");
		});

		it ("delegates events to its element", function() {
			var clicked = false;
			
			var Meta = Washi.extend({
				el: el,
				events: {
					click: 'finished'
				},
				finished: function() {
					clicked = true;
				}
			});

			var m = new Meta();
			
			m.$el.trigger('click');

			expect(clicked).toBeTruthy();
		});

		it ("can alias event names using the ui object", function() {
			var clicked = false;
			
			var Meta = Washi.extend({
				el: el,
				ui: {
					child: 'p'
				},
				events: {
					'click {child}': 'finished'
				},
				finished: function() {
					clicked = true;
				}
			});

			var m = new Meta();
			m.$('p').trigger('click');
			
			expect(clicked).toBeTruthy();
		});
	});
});
