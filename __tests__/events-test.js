jest.autoMockOff();

describe("Events", function() {

  Washi = require('washi');
  var $ = Washi.$ = require('jquery');

  describe("Events", function() {

    it ("delegates events to its element", function() {
      var Meta = Washi.extend({
        el: '<div><p></p></div>',
        events: {
          click: 'finished'
        },
        finished: jest.genMockFunction()
      });

      var m = new Meta();

      m.$el.trigger('click');

      expect(m.finished).toBeCalled();
    });

    it ("can alias event names using the ui object", function() {
      var Meta = Washi.extend({
        el: '<div><p></p></div>',
        ui: {
          child: 'p'
        },
        events: {
          'click {child}': 'finished'
        },
        finished: jest.genMockFunction()
      });

      var m = new Meta();
      m.ui.child.trigger('click');

      expect(m.finished).toBeCalled();
      expect(m.finished.mock.calls[0][0].currentTarget.tagName).toEqual('P')
    });

    it ("trims matched aliases", function() {
      var Meta = Washi.extend({
        el: '<div><p></p></div>',
        ui: {
          child: 'p'
        },
        events: {
          'click { child }': 'finished'
        },
        finished: jest.genMockFunction()
      });

      var m = new Meta();

      m.ui.child.trigger('click');

      expect(m.finished).toBeCalled();
      expect(m.finished.mock.calls[0][0].currentTarget.tagName).toEqual('P')
    });

    it ("supports Backbone.Marionette style aliases", function() {
      var Meta = Washi.extend({
        el: '<div><p></p></div>',
        ui: {
          child: 'p'
        },
        events: {
          'click @ui.child': 'finished'
        },
        finished: jest.genMockFunction()
      });

      var m = new Meta();
      m.ui.child.trigger('click');

      expect(m.finished).toBeCalled()
      expect(m.finished.mock.calls[0][0].currentTarget.tagName).toEqual('P')
    });
  });
});
