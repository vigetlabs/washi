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
  "use strict";

  var eventAliasPattern = /(?:\@ui\.|\{|\s*)(\w+)(?:\s*|\})/i;
  var eventTokenPattern = /(^\w+)|(\{\s*\w+\s*\}|(\@ui\.(\w+)))|\b(\w+)$/g;

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

  Washi.tokenize = function(string) {
    return string.match(eventTokenPattern);
  };

  Washi.prototype = {

    initialize: function() {},

    el: document.body,

    $: function(selector) {
      return this.$el.find(selector);
    },

    events: {},
    ui: {},

    _getElement: function(options) {
      var el = options.el || options.$el || this.el;
      return typeof el === 'function'? el() : el;
    },

    _eventMatcher: function(string) {
      var pool    = this._ui || this.ui;
      var toMatch = typeof string === 'string' ? string : '';
      var matches = toMatch.match(eventAliasPattern);
      return matches? pool[matches[1]] : string;
    },

    _getMethod: function(signature) {
      var isFunction = typeof signature === 'function';
      return (isFunction ? signature : this[signature]).bind(this);
    },

    _delegate: function(type, selector, fn) {
      this.$el.on(type, selector, fn);
    },

    _bindEvent: function(name, method) {
      var items  = name.split(',');
      var toCall = this._getMethod(method);

      do {
        var tokens = Washi.tokenize(items.pop());
        this._delegate(tokens[0], this._eventMatcher(tokens[1]), toCall);
      } while (items.length)
    },

    bindEvents: function() {
      for (var e in this.events) {
        if (this.events.hasOwnProperty(e)) this._bindEvent(e, this.events[e]);
      }
    },

    bindUIElements: function() {
      // Make a deep clone for later reference
      // should rebinding be necessary
      this._ui = this._ui || Washi.$.extend(true, {}, this.ui);
      this.ui = {};

      // For each attribute, perform a selection
      // within the context of this View's element
      for (var component in this._ui) {
        if (this._ui.hasOwnProperty(component)) {
          this.ui[component] = this.$(this._ui[component]);
        }
      }
    }
  };

  return Washi;
}));
