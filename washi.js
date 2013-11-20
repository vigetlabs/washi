define(['jquery'], function($) {

	var View = function (options) {
		this.el = options.el;
		this.$el = $(options.el);

		this.bindEvents();
		this.bindUIElements();

		this.initialize(options);
	};

	View.extend = function(options) {
		var Child = function(options) {
			View.apply(this, arguments);
		};

		Child.extend = View.extend;

		$.extend(Child.prototype, View.prototype, options);

		return Child;
	};

	View.prototype = {

		initialize: function() {},

		events: {},
		ui: {},

		$: function(selector) {
			return this.$el.find(selector);
		},

		_eventMatcher: function(string) {
			var pool = this._ui || this.ui;

			return string.replace(/\{(.+?)\}/g, function(match, capture, index) {
				return pool[capture];
			});
		},

		bindEvents: function() {
			$.each(this.events, function(name, method) {
				var singletons = name.split(',');

				$.each(singletons, function(i, event) {
					var props = event.split(' ');
					var type = props[0];
					var selector = this._eventMatcher(props[1]);

					this.$el.on(type, selector, this[method].bind(this));
				}.bind(this));
			}.bind(this));
		},

		bindUIElements: function() {
			// Make a deep clone for later reference
			// should rebinding be necessary
			this._ui = this._ui || $.extend(true, {}, this.ui);
			this.ui = {};

			// For each attribute, perform a selection
			// within the context of this View's element
			$.each(this._ui, function(component, selector) {
				this.ui[component] = this.$el.find(selector);
			}.bind(this));
		}
	};

	return View;
});
