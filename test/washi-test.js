describe("Washi", function() {

	describe("Selection", function() {
		var el = document.createElement("p");

		it ("has an `el`", function() {
			var w = new Washi({ el: el });

			w.el.should.equal(el);
			w.$el.is(el).should.equal(true);
		});

		it ("also accepts `$el` as the element option", function() {
			var w = new Washi({ $el: el });

			w.el.should.equal(el);
			w.$el.is(el).should.equal(true);
		});

		it ("defaults `el` to document.body", function() {
			var w = new Washi();

			w.el.should.equal(document.body);
			w.$el.is(document.body).should.equal(true);
		});

		it ("has an extendable default view", function() {
			var Meta = Washi.extend({
				el: $("<p>")
			});
			var m = new Meta();

			m.el.tagName.should.equal("P");
		});

		it ("has a scoped selection method", function() {
			var w = new Washi({ el: el });
			w.$().context.should.equal(el);
		});

		describe("Children", function() {
			it ("can select children using the `ui` attribute", function() {
				var Meta = Washi.extend({
					el: $("<div><p></p></div>"),
					ui: {
						child: 'p'
					}
				});

				var m = new Meta();
				m.ui.child.is("p").should.equal(true);
			});
		});

	});

	describe("Events", function() {
		var el;

		beforeEach(function() {
			el = $("<div><p class='test'>Test</p></div>");
		});

		it ("delegates events to its element", function(done) {
			var Meta = Washi.extend({
				el: el,
				events: {
					click: 'finished'
				},
				finished: function() {
					done();
				}
			});

			var m = new Meta();
			m.$el.trigger('click');
		});

		it ("delegates events to child elements", function(done) {
			var Meta = Washi.extend({
				el: el,
				events: {
					'click p': 'finished'
				},
				finished: function() {
					done();
				}
			});

			var m = new Meta();
			m.$('p').trigger('click');
		});

		it ("can alias event names using the ui object", function(done) {
			var Meta = Washi.extend({
				el: el,
				ui: {
					child: 'p'
				},
				events: {
					'click {child}': 'finished'
				},
				finished: function() {
					done();
				}
			});

			var m = new Meta();
			m.$('p').trigger('click');
		});
	});
});
