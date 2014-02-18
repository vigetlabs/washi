(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		window.Washi = factory(window.jQuery);
	}
}(function($) {

	var Washi = function (options) {
		options = options || {};

		this.$el = $(this._getElement(options));
		this.el  = this.$el.get(0);

		this.bindEvents();
		this.bindUIElements();

		this.initialize(options);
	};

	Washi.extend = function(options) {
		var Child = function(options) {
			Washi.apply(this, arguments);
		};

		Child.extend = Washi.extend;

		$.extend(Child.prototype, Washi.prototype, options);

		return Child;
	};

	Washi.prototype = {

		initialize: function() {},

		el: function() {
			return document.body;
		},

		events: {},
		ui: {},

		$: function(selector) {
			return this.$el.find(selector);
		},

		_getElement: function(options) {
			var el = options.el || options.$el || this.el;
			return typeof el === 'function'? el() : el;
		},

		_eventMatcher: function(string) {
			var pool = this._ui || this.ui;

			var isString = typeof string === 'string';

			return isString? string.replace(/\{(.+?)\}/g, function(match, capture, index) {
				return pool[capture];
			}) : '';
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

	return Washi;
}));
