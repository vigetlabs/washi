(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    window.Washi = factory();
  }
}(function() {

  var eventAliasPattern = /\{(\s*.+?\s*)\}|\@ui\.(.+)/;

  var Washi = function (options) {
    var $ = Washi.$;

    options = options || {};

    this.$el = Washi.$(this._getElement(options));
    this.el  = this.$el.get(0);

    this.mixins   = this.mixins || []
    this.parent   = options.parent || null;
    this.children = [];

    this.bindEvents();
    this.bindUIElements();

    this.initialize(options);

    var mixinOptions = Washi.$.extend({}, options, { parent: this });

    for (var i = 0, j = this.mixins.length; i < j; i++) {
      if (Washi.testMixin(this.mixins[i], mixinOptions)) {
        this.children.push(new this.mixins[i](mixinOptions));
      }
    }
  };

  var $ = Washi.$ = window.jQuery;

  Washi.testMixin = function(mixin, options) {
    return mixin.precondition ? mixin.precondition(options) : true;
  };

  Washi.extend = function(options, statics) {
    var Parent = this;
    var Child = function(options) {
      Parent.apply(this, arguments);
    };

    Child.extend = Parent.extend;

    Washi.$.extend(Child.prototype, Parent.prototype, options);
    Washi.$.extend(Child, Parent, statics);

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

      return isString ? string.replace(eventAliasPattern, function(match, capture, index) {
        return pool[Washi.$.trim(capture)];
      }) : '';
    },

    bindEvents: function() {
      var $ = Washi.$;

      $.each(this.events, function(name, method) {
        var singletons = name.split(',');

        $.each(singletons, function(i, event) {
          var props = event.split(' ', 1);
          var type = props[0];
          var selector = this._eventMatcher(props[1]);

          this.$el.on(type, selector, this[method].bind(this));
        }.bind(this));
      }.bind(this));
    },

    bindUIElements: function() {
      // Make a deep clone for later reference
      // should rebinding be necessary
      this._ui = this._ui || Washi.$.extend(true, {}, this.ui);
      this.ui = {};

      // For each attribute, perform a selection
      // within the context of this View's element
      Washi.$.each(this._ui, function(component, selector) {
        this.ui[component] = this.$(selector);
      }.bind(this));
    }
  };

  return Washi;
}));
